

let lenis;
if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    duration: 1.0,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
  });
  (function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  })(performance.now());

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    lenis.destroy();
    lenis = null;
  }
}

const state = {
  currentStep: 1,
  studentName: '',
  studentSchool: '',
  studentYear: '',
  track: '',       // 'sma-ipa' | 'sma-ips' | 'smk-teknik' | 'smk-bisnis'
  rawGrades: {},   // field-id → raw value (0-100)
  mappedProfile: { C1: 0, C2: 0, C3: 0, C4: 0, C5: 0, C6: 0 },
  psychoAnswers: {},  // q1..q24 → 1..5
  results: [],
};

const TRACK_CONFIG = {
  'sma-ipa': {
    label: 'SMA - IPA',
    mapFields: [

      { fieldId: 'm-mtk',    criteriaId: 'C1' },
      { fieldId: 'm-ing',    criteriaId: 'C2' },
      { fieldId: 'm-ind',    criteriaId: 'C3' },
    ],

  },
  'sma-ips': {
    label: 'SMA - IPS',
    mapFields: [
      { fieldId: 'm-mtk-ips', criteriaId: 'C1' },
      { fieldId: 'm-ing',     criteriaId: 'C2' },
      { fieldId: 'm-ind',     criteriaId: 'C3' },
    ],
  },
  'smk-teknik': {
    label: 'SMK - Teknik',
    mapFields: [
      { fieldId: 'm-mtk-tek', criteriaId: 'C1' },
      { fieldId: 'm-ing',     criteriaId: 'C2' },
      { fieldId: 'm-ind',     criteriaId: 'C3' },
    ],
  },
  'smk-bisnis': {
    label: 'SMK - Bisnis',
    mapFields: [
      { fieldId: 'm-mtk-bisnis', criteriaId: 'C1' },
      { fieldId: 'm-ing',        criteriaId: 'C2' },
      { fieldId: 'm-ind',        criteriaId: 'C3' },
    ],
  },
};

function setStep(n) {
  state.currentStep = n;

  document.querySelectorAll('.view-panel').forEach((p, i) => {
    p.classList.toggle('active', i + 1 === n);
  });

  document.querySelectorAll('.stepper-step').forEach((el, i) => {
    const stepNum = i + 1;
    el.classList.remove('active', 'completed');
    if (stepNum < n) el.classList.add('completed');
    else if (stepNum === n) el.classList.add('active');
  });

  const navLabel = document.getElementById('nav-progress-label');
  if (navLabel) navLabel.textContent = `Langkah ${n} / 4`;

  if (lenis) lenis.scrollTo(0, { duration: 0.8 });
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {

  if (typeof auth !== 'undefined') {
    const user = auth.getCurrentUser();
    if (!user) {
      alert("Silakan login terlebih dahulu untuk mengakses fitur SPK.");
      window.location.href = "index.html";
      return;
    }

    if (user.track) {
      state.track = user.track.replace('_', '-'); // e.g. sma_ipa -> sma-ipa
    }
    state.studentName = user.fullName || 'Anonim';

    document.getElementById('auth-name').textContent = user.fullName;
    document.getElementById('auth-avatar').textContent = user.fullName.charAt(0).toUpperCase();
    
    const trackMap = {
      'sma_ipa': 'SMA IPA', 'sma_ips': 'SMA IPS',
      'smk_teknik': 'SMK Teknik', 'smk_bisnis': 'SMK Bisnis',
      'sma-ipa': 'SMA IPA', 'sma-ips': 'SMA IPS',
      'smk-teknik': 'SMK Teknik', 'smk-bisnis': 'SMK Bisnis'
    };
    document.getElementById('auth-track').textContent = trackMap[state.track] || state.track;
  }

  document.addEventListener('input', (e) => {
    if (e.target.classList.contains('multi-input')) {
      const subjectId = e.target.getAttribute('data-subject');
      const inputsForSubject = document.querySelectorAll(`.multi-input[data-subject="${subjectId}"]`);
      
      let sum = 0;
      let count = 0;
      inputsForSubject.forEach(inp => {
        if (inp.value) {
          sum += parseFloat(inp.value);
          count++;
        }
      });
      
      const avg = count > 0 ? (sum / count).toFixed(1) : 0;

      const badge = document.getElementById(`avg-${subjectId}`);
      if (badge) badge.textContent = `Rata-rata: ${avg}`;

      const hiddenInput = document.getElementById(subjectId);
      if (hiddenInput) hiddenInput.value = avg;
    }
  });
});

document.getElementById('btn-1-next').addEventListener('click', () => {
  const school = document.getElementById('student-school').value.trim();
  const start = document.getElementById('school-start').value.trim();
  const end = document.getElementById('school-end').value.trim();

  if (!school) { document.getElementById('student-school').focus(); return; }
  if (!start) { document.getElementById('school-start').focus(); return; }
  if (!end) { document.getElementById('school-end').focus(); return; }

  state.studentSchool = school;
  state.schoolStart = start;
  state.schoolEnd = end;

  updateSubjectFields(state.track);
  setStep(2);
});

function updateSubjectFields(track) {
  const container = document.getElementById('subjects-container');
  const trackLabel = document.getElementById('track-label-display');
  const config = TRACK_CONFIG[track];
  if (!config) return;
  trackLabel.textContent = config.label;

  container.querySelectorAll('.form-field').forEach(field => {
    const tracks = field.dataset.tracks?.split(' ') || [];
    if (tracks.includes(track)) {
      field.classList.add('active-field');
      field.querySelectorAll('input').forEach(inp => inp.required = true);
    } else {
      field.classList.remove('active-field');
      field.querySelectorAll('input').forEach(inp => { inp.required = false; inp.value = ''; });
    }
  });
}

document.querySelectorAll('.subject-input').forEach(inp => {
  inp.addEventListener('input', () => {
    const val = parseFloat(inp.value);
    const previewId = 'map-' + inp.id;
    const preview = document.getElementById(previewId);
    if (!preview) return;
    if (isNaN(val) || inp.value === '') {
      preview.className = 'map-preview';
      preview.textContent = '';
      return;
    }
    const mapped = autoMap(val);
    const cls = `map-preview visible map-${mapped}`;
    preview.className = cls;
    preview.textContent = `▶ ${mapped}`;
  });
});

document.getElementById('btn-2-next').addEventListener('click', () => {
  const config = TRACK_CONFIG[state.track];
  if (!config) return;

  const activeFields = document.querySelectorAll('.subjects-container .form-field.active-field input');
  let valid = true;
  activeFields.forEach(inp => {
    const v = parseFloat(inp.value);
    if (isNaN(v) || v < 0 || v > 100) { inp.focus(); valid = false; }
  });
  if (!valid) return;

  config.mapFields.forEach(({ fieldId, criteriaId }) => {
    const inp = document.getElementById(fieldId);
    if (inp && inp.value !== '') {
      state.mappedProfile[criteriaId] = autoMap(parseFloat(inp.value));
    }
  });

  setStep(3);
});

document.getElementById('btn-2-back').addEventListener('click', () => setStep(1));

document.getElementById('btn-3-next').addEventListener('click', () => {

  const answers = {};
  let allAnswered = true;
  for (let i = 1; i <= 24; i++) {
    const checked = document.querySelector(`input[name="q${i}"]:checked`);
    if (!checked) { allAnswered = false; break; }
    answers[`q${i}`] = parseInt(checked.value, 10);
  }

  if (!allAnswered) {
    document.getElementById('psycho-error').style.display = 'block';

    for (let i = 1; i <= 24; i++) {
      if (!document.querySelector(`input[name="q${i}"]:checked`)) {
        const el = document.getElementById(`q${i}`);
        if (el) {
          if (lenis) lenis.scrollTo(el, { offset: -120, duration: 0.8 });
          else el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        break;
      }
    }
    return;
  }
  document.getElementById('psycho-error').style.display = 'none';
  state.psychoAnswers = answers;

  const avg = keys => keys.reduce((s, k) => s + (answers[k] || 0), 0) / keys.length;
  const logKeys = ['q1','q2','q3','q4','q5','q6','q7','q8'];
  const kreKeys = ['q9','q10','q11','q12','q13','q14','q15','q16'];
  const verKeys = ['q17','q18','q19','q20','q21','q22','q23','q24'];

  const rawC4 = avg(logKeys);
  const rawC5 = avg(kreKeys);
  const rawC6 = avg(verKeys);

  state.mappedProfile.C4 = Math.round(rawC4);
  state.mappedProfile.C5 = Math.round(rawC5);
  state.mappedProfile.C6 = Math.round(rawC6);

  state.results = calculateSPK(state.mappedProfile, state.track);

  renderResults();
  setStep(4);
});

document.getElementById('btn-3-back').addEventListener('click', () => setStep(2));

function renderResults() {
  const top5 = state.results.slice(0, 5);
  const all = state.results;

  const yearString = (state.schoolStart && state.schoolEnd) ? `${state.schoolStart} - ${state.schoolEnd}` : '';
  document.getElementById('p4-sub').textContent =
    `Atas nama ${state.studentName || 'Siswa'} · ${(state.track || '').toUpperCase()} · ${yearString}`;

  document.getElementById('print-student-info').textContent =
    `Nama: ${state.studentName || 'Siswa'} | Sekolah: ${state.studentSchool || '-'} | Jalur: ${TRACK_CONFIG[state.track]?.label || '-'} | Tahun: ${yearString}`;

  const academicSummary = document.getElementById('academic-summary-stats');
  const bakatSummary = document.getElementById('bakat-summary-stats');
  const summaryLabels = {
    C1: 'C1 - Matematika',
    C2: 'C2 - Bahasa Inggris',
    C3: 'C3 - Bahasa Indonesia',
    C4: 'C4 - Penalaran Logis',
    C5: 'C5 - Kreativitas & Inovasi',
    C6: 'C6 - Komunikasi Verbal'
  };

  if (academicSummary) {
    academicSummary.innerHTML = ['C1', 'C2', 'C3'].map(key => {
      const val = state.mappedProfile[key] || 0;
      const pct = (val / 5 * 100).toFixed(0);
      return `
        <div class="summary-stat-row">
          <span class="summary-stat-label">${summaryLabels[key]}</span>
          <span class="summary-stat-value">${val}</span>
          <div class="summary-stat-gauge">
            <div class="summary-stat-gauge-fill gauge-academic" style="width: ${pct}%"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  if (bakatSummary) {
    bakatSummary.innerHTML = ['C4', 'C5', 'C6'].map(key => {
      const val = state.mappedProfile[key] || 0;
      const pct = (val / 5 * 100).toFixed(0);
      return `
        <div class="summary-stat-row">
          <span class="summary-stat-label">${summaryLabels[key]}</span>
          <span class="summary-stat-value">${val}</span>
          <div class="summary-stat-gauge">
            <div class="summary-stat-gauge-fill gauge-bakat" style="width: ${pct}%"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  const podiumContainer = document.getElementById('podium-container');
  const medals = ['🥇', '🥈', '🥉'];
  const podiumClass = ['podium-1', 'podium-2', 'podium-3'];
  podiumContainer.innerHTML = top5.slice(0, 3).map((p, i) => `
    <div class="ranking-podium-card ${podiumClass[i]}">
      <div class="podium-rank"># ${p.rank}</div>
      <div class="podium-medal">${medals[i]}</div>
      <div class="podium-name">${p.nama}</div>
      <div class="podium-jenjang">${p.jenjang} &middot; <span class="rumpun-badge badge-${p.rumpun.toLowerCase()}">${p.rumpun.toUpperCase()}</span></div>
      <div class="podium-score">${p.total.toFixed(4)}</div>
      <div class="podium-score-label">Total Nilai Akhir</div>
      <div class="podium-bar"><div class="podium-bar-fill" style="width:${(p.total/5*100).toFixed(1)}%"></div></div>
    </div>
  `).join('');

  const top = state.results[0];
  document.getElementById('reason-box').innerHTML =
    `<strong>Alasan Rekomendasi #1:</strong> ${top.reason}`;

  const compContainer = document.getElementById('comparison-container');
  if (compContainer && top) {
    const compKeys = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'];
    const compLabels = {
      C1: 'Matematika',
      C2: 'Bahasa Inggris',
      C3: 'Bahasa Indonesia',
      C4: 'Penalaran Logis',
      C5: 'Kreativitas & Inovasi',
      C6: 'Komunikasi Verbal'
    };
    
    compContainer.innerHTML = `
      <h3 class="comparison-title">
        Analisis Komparasi Kualifikasi Anda vs. Target ${top.jenjang} ${top.nama}
      </h3>
      <div class="comparison-grid">
        ${compKeys.map(k => {
          const studentVal = state.mappedProfile[k] || 0;
          const targetRow = top.audit.find(r => r.kriteria === k);
          const targetVal = targetRow ? targetRow.target : 0;
          const gap = studentVal - targetVal;
          
          let statusLabel = 'Sesuai';
          let statusClass = 'status-match';
          if (gap > 0) {
            statusLabel = `Melampaui (+${gap})`;
            statusClass = 'status-over';
          } else if (gap < 0) {
            statusLabel = `Kurang (${gap})`;
            statusClass = 'status-under';
          }
          
          return `
            <div class="comp-card">
              <span class="comp-card-label">${compLabels[k]}</span>
              <div class="comp-values">
                <span class="comp-val-student">${studentVal}</span>
                <span class="comp-val-target">vs Target ${targetVal}</span>
              </div>
              <span class="comp-status-badge ${statusClass}">${statusLabel}</span>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  const tbody = document.getElementById('ranking-tbody');
  tbody.innerHTML = all.map(p => `
    <tr>
      <td class="rank-pos ${p.rank === 1 ? 'rank-pos-1' : ''}">${p.rank}</td>
      <td>
        <div class="rank-prodi-name">${p.nama}</div>
        <div class="rank-prodi-meta">${p.kode}</div>
      </td>
      <td style="font-family:var(--font-mono); font-size:0.78rem;">${p.jenjang}</td>
      <td><span class="rumpun-badge badge-${p.rumpun.toLowerCase()}">${p.rumpun.toUpperCase()}</span></td>
      <td class="rank-score-cell">${p.total.toFixed(4)}</td>
      <td class="rank-bar-mini">
        <div style="font-family:var(--font-mono); font-size:0.7rem; color:var(--text-muted);">${(p.total/5*100).toFixed(1)}%</div>
        <div class="rank-bar"><div class="rank-bar-fill" style="width:${(p.total/5*100).toFixed(1)}%"></div></div>
      </td>
    </tr>
  `).join('');

  const top10 = all.slice(0, 10);
  const criteriaLabels = { C1:'C1 MTK', C2:'C2 ING', C3:'C3 IND', C4:'C4 LOG', C5:'C5 KRE', C6:'C6 VER' };
  const cKeys = ['C1','C2','C3','C4','C5','C6'];

  const gapTable = document.getElementById('gap-table');
  gapTable.innerHTML = `
    <thead>
      <tr>
        <th>Program Studi</th>
        ${cKeys.map(k => `<th>${criteriaLabels[k]}</th>`).join('')}
      </tr>
    </thead>
    <tbody>
      ${top10.map(p => `
        <tr>
          <td class="td-prodi">${p.nama} (${p.jenjang})</td>
          ${cKeys.map(k => {
            const row = p.audit.find(r => r.kriteria === k);
            const gap = row ? row.gap : '-';
            const cls = gap === 0 ? 'gap-zero' : (gap > 0 ? 'gap-pos' : 'gap-neg');
            const display = gap === 0 ? '0' : (gap > 0 ? `+${gap}` : gap);
            return `<td class="${cls}">${display}</td>`;
          }).join('')}
        </tr>
      `).join('')}
    </tbody>
  `;

  const weightTable = document.getElementById('weight-table');
  weightTable.innerHTML = `
    <thead>
      <tr>
        <th>Program Studi</th>
        ${cKeys.map(k => `<th>${criteriaLabels[k]}</th>`).join('')}
      </tr>
    </thead>
    <tbody>
      ${top10.map(p => `
        <tr>
          <td class="td-prodi">${p.nama} (${p.jenjang})</td>
          ${cKeys.map(k => {
            const row = p.audit.find(r => r.kriteria === k);
            return `<td class="bobot-val">${row ? row.bobot.toFixed(1) : '-'}</td>`;
          }).join('')}
        </tr>
      `).join('')}
    </tbody>
  `;

  const factorTable = document.getElementById('factor-table');
  factorTable.innerHTML = `
    <thead>
      <tr>
        <th>Program Studi</th>
        <th>NCF Akademik</th><th>NSF Akademik</th><th>N Akademik</th>
        <th>NCF Bakat</th><th>NSF Bakat</th><th>N Bakat</th>
        <th>Total Akhir</th>
      </tr>
    </thead>
    <tbody>
      ${top10.map(p => `
        <tr>
          <td class="td-prodi">${p.nama} (${p.jenjang})</td>
          <td class="bobot-val">${p.NCF_A.toFixed(2)}</td>
          <td>${p.NSF_A.toFixed(2)}</td>
          <td class="bobot-val">${p.N_A.toFixed(4)}</td>
          <td class="bobot-val">${p.NCF_B.toFixed(2)}</td>
          <td>${p.NSF_B.toFixed(2)}</td>
          <td class="bobot-val">${p.N_B.toFixed(4)}</td>
          <td class="rank-score-cell">${p.total.toFixed(4)}</td>
        </tr>
      `).join('')}
    </tbody>
  `;

  if (typeof auth !== 'undefined') {
    auth.saveHistory({
      track: state.track,
      topProdi: top10.slice(0, 3).map(r => ({ name: r.nama, score: r.total.toFixed(4) }))
    });
  }

  const now = new Date();
  const dateString = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth()+1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  
  document.getElementById('pdf-date').textContent = dateString;
  document.getElementById('pdf-student-name').textContent = state.studentName || 'Anonim';
  document.getElementById('pdf-student-school').textContent = state.studentSchool || '-';
  document.getElementById('pdf-student-years').textContent = (state.schoolStart && state.schoolEnd) ? `${state.schoolStart} - ${state.schoolEnd}` : '-';
  document.getElementById('pdf-student-track').textContent = TRACK_CONFIG[state.track]?.label || state.track;

  const top1 = top10[0];
  document.getElementById('pdf-top-prodi').textContent = top1 ? `${top1.jenjang} ${top1.nama}` : '-';
  document.getElementById('pdf-top-score').textContent = top1 ? top1.total.toFixed(4) : '-';
  document.getElementById('pdf-reasoning').textContent = top1 ? top1.reason : '-';

  const alternativesContainer = document.getElementById('pdf-alternatives');
  if (alternativesContainer) {
    alternativesContainer.innerHTML = top10.slice(1, 5).map((p, i) => `
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563;">${i + 2}</td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 500;">${p.jenjang} ${p.nama}</td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563;">${p.total.toFixed(4)}</td>
      </tr>
    `).join('');
  }
}

document.querySelectorAll('.result-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.result-tab').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    const contentId = tab.getAttribute('aria-controls');
    document.getElementById(contentId)?.classList.add('active');
  });
});

document.getElementById('btn-excel')?.addEventListener('click', () => {
  if (!state.results.length) return;

  const rows = [
    ['Rank', 'Kode', 'Program Studi', 'Jenjang', 'Rumpun', 'N Akademik', 'N Bakat', 'Total Nilai Akhir'],
    ...state.results.map(p => [
      p.rank, p.kode, p.nama, p.jenjang, p.rumpun,
      p.N_A.toFixed(4), p.N_B.toFixed(4), p.total.toFixed(4)
    ])
  ];

  const csvContent = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `SPK_JurusanKu_${state.studentName.replace(/\s+/g, '_')}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

document.getElementById('btn-restart')?.addEventListener('click', () => {
  if (confirm("Apakah kamu yakin ingin memulai ulang? Semua data yang belum tersimpan akan hilang.")) {
    location.reload();
  }
});

const btnDownloadPdf = document.getElementById('btn-download-pdf');
if (btnDownloadPdf) {
  btnDownloadPdf.addEventListener('click', () => {
    const element = document.getElementById('pdf-template');
    if (!element || typeof html2pdf === 'undefined') {
      alert("Sistem PDF belum siap atau tidak didukung browser ini.");
      return;
    }
    
    element.style.display = 'block'; // Make it visible temporarily for rendering

    const opt = {
      margin:       0,
      filename:     `Hasil_SPK_JurusanKu_${(state.studentName || 'Siswa').replace(/\s+/g, '_')}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    const originalHTML = btnDownloadPdf.innerHTML;
    btnDownloadPdf.innerHTML = 'Memproses PDF...';
    btnDownloadPdf.disabled = true;

    html2pdf().set(opt).from(element).save().then(() => {
      element.style.display = 'none'; // Hide again
      btnDownloadPdf.innerHTML = originalHTML;
      btnDownloadPdf.disabled = false;
    }).catch(err => {
      console.error(err);
      alert("Gagal mencetak PDF. Silakan coba lagi.");
      element.style.display = 'none';
      btnDownloadPdf.disabled = false;
      btnDownloadPdf.innerHTML = originalHTML;
    });
  });
}

const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  });
}

setStep(1);
