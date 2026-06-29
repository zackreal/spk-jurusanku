

const GAP_WEIGHT_MAP = {
  0:  5.0,
  1:  4.5,
  '-1': 4.0,
  2:  3.5,
  '-2': 3.0,
  3:  2.5,
  '-3': 2.0,
  4:  1.5,
  '-4': 1.0,
};
function gapToWeight(gap) {
  const key = gap >= 0 ? gap : String(gap);
  return GAP_WEIGHT_MAP[key] ?? (gap > 0 ? 1.0 : 1.0);
}

function autoMap(score) {
  const s = Number(score);
  if (s >= 90) return 5;
  if (s >= 80) return 4;
  if (s >= 70) return 3;
  if (s >= 60) return 2;
  return 1;
}

const PRODI_DB = [

  {
    id: 'si_tif', kode: 'S1-TIF', nama: 'Teknik Informatika', jenjang: 'S1', rumpun: 'saintek',
    kriteria: [
      { id:'C1', target:5, type:'CF', aspect:'akademik' },
      { id:'C2', target:4, type:'SF', aspect:'akademik' },
      { id:'C3', target:3, type:'SF', aspect:'akademik' },
      { id:'C4', target:5, type:'CF', aspect:'bakat' },
      { id:'C5', target:4, type:'SF', aspect:'bakat' },
      { id:'C6', target:3, type:'SF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_si', kode: 'S1-SI', nama: 'Sistem Informasi', jenjang: 'S1', rumpun: 'saintek',
    kriteria: [
      { id:'C1', target:4, type:'CF', aspect:'akademik' },
      { id:'C2', target:4, type:'SF', aspect:'akademik' },
      { id:'C3', target:3, type:'SF', aspect:'akademik' },
      { id:'C4', target:4, type:'CF', aspect:'bakat' },
      { id:'C5', target:4, type:'SF', aspect:'bakat' },
      { id:'C6', target:4, type:'SF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_tsipil', kode: 'S1-TSIPL', nama: 'Teknik Sipil', jenjang: 'S1', rumpun: 'saintek',
    kriteria: [
      { id:'C1', target:5, type:'CF', aspect:'akademik' },
      { id:'C2', target:4, type:'SF', aspect:'akademik' },
      { id:'C3', target:3, type:'SF', aspect:'akademik' },
      { id:'C4', target:4, type:'CF', aspect:'bakat' },
      { id:'C5', target:3, type:'SF', aspect:'bakat' },
      { id:'C6', target:3, type:'SF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_telektro', kode: 'S1-TE', nama: 'Teknik Elektro', jenjang: 'S1', rumpun: 'saintek',
    kriteria: [
      { id:'C1', target:5, type:'CF', aspect:'akademik' },
      { id:'C2', target:4, type:'SF', aspect:'akademik' },
      { id:'C3', target:3, type:'SF', aspect:'akademik' },
      { id:'C4', target:5, type:'CF', aspect:'bakat' },
      { id:'C5', target:3, type:'SF', aspect:'bakat' },
      { id:'C6', target:2, type:'SF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_tmesin', kode: 'S1-TM', nama: 'Teknik Mesin', jenjang: 'S1', rumpun: 'saintek',
    kriteria: [
      { id:'C1', target:5, type:'CF', aspect:'akademik' },
      { id:'C2', target:3, type:'SF', aspect:'akademik' },
      { id:'C3', target:3, type:'SF', aspect:'akademik' },
      { id:'C4', target:5, type:'CF', aspect:'bakat' },
      { id:'C5', target:3, type:'SF', aspect:'bakat' },
      { id:'C6', target:2, type:'SF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_tkimia', kode: 'S1-TK', nama: 'Teknik Kimia', jenjang: 'S1', rumpun: 'saintek',
    kriteria: [
      { id:'C1', target:5, type:'CF', aspect:'akademik' },
      { id:'C2', target:4, type:'SF', aspect:'akademik' },
      { id:'C3', target:3, type:'SF', aspect:'akademik' },
      { id:'C4', target:4, type:'CF', aspect:'bakat' },
      { id:'C5', target:3, type:'SF', aspect:'bakat' },
      { id:'C6', target:3, type:'SF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_kedokteran', kode: 'S1-FK', nama: 'Kedokteran Umum', jenjang: 'S1', rumpun: 'saintek',
    kriteria: [
      { id:'C1', target:5, type:'CF', aspect:'akademik' },
      { id:'C2', target:5, type:'SF', aspect:'akademik' },
      { id:'C3', target:4, type:'SF', aspect:'akademik' },
      { id:'C4', target:4, type:'CF', aspect:'bakat' },
      { id:'C5', target:3, type:'SF', aspect:'bakat' },
      { id:'C6', target:5, type:'SF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_farmasi', kode: 'S1-FAR', nama: 'Farmasi', jenjang: 'S1', rumpun: 'saintek',
    kriteria: [
      { id:'C1', target:4, type:'CF', aspect:'akademik' },
      { id:'C2', target:4, type:'SF', aspect:'akademik' },
      { id:'C3', target:3, type:'SF', aspect:'akademik' },
      { id:'C4', target:4, type:'CF', aspect:'bakat' },
      { id:'C5', target:3, type:'SF', aspect:'bakat' },
      { id:'C6', target:4, type:'SF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_biologi', kode: 'S1-BIO', nama: 'Biologi', jenjang: 'S1', rumpun: 'saintek',
    kriteria: [
      { id:'C1', target:3, type:'CF', aspect:'akademik' },
      { id:'C2', target:3, type:'SF', aspect:'akademik' },
      { id:'C3', target:3, type:'SF', aspect:'akademik' },
      { id:'C4', target:4, type:'CF', aspect:'bakat' },
      { id:'C5', target:3, type:'SF', aspect:'bakat' },
      { id:'C6', target:3, type:'SF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_kimia', kode: 'S1-KIM', nama: 'Kimia', jenjang: 'S1', rumpun: 'saintek',
    kriteria: [
      { id:'C1', target:4, type:'CF', aspect:'akademik' },
      { id:'C2', target:3, type:'SF', aspect:'akademik' },
      { id:'C3', target:3, type:'SF', aspect:'akademik' },
      { id:'C4', target:4, type:'CF', aspect:'bakat' },
      { id:'C5', target:3, type:'SF', aspect:'bakat' },
      { id:'C6', target:2, type:'SF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_fisika', kode: 'S1-FIS', nama: 'Fisika', jenjang: 'S1', rumpun: 'saintek',
    kriteria: [
      { id:'C1', target:5, type:'CF', aspect:'akademik' },
      { id:'C2', target:4, type:'SF', aspect:'akademik' },
      { id:'C3', target:3, type:'SF', aspect:'akademik' },
      { id:'C4', target:5, type:'CF', aspect:'bakat' },
      { id:'C5', target:3, type:'SF', aspect:'bakat' },
      { id:'C6', target:2, type:'SF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_statistika', kode: 'S1-STA', nama: 'Statistika', jenjang: 'S1', rumpun: 'saintek',
    kriteria: [
      { id:'C1', target:5, type:'CF', aspect:'akademik' },
      { id:'C2', target:4, type:'SF', aspect:'akademik' },
      { id:'C3', target:3, type:'SF', aspect:'akademik' },
      { id:'C4', target:5, type:'CF', aspect:'bakat' },
      { id:'C5', target:3, type:'SF', aspect:'bakat' },
      { id:'C6', target:3, type:'SF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_matematika', kode: 'S1-MAT', nama: 'Matematika', jenjang: 'S1', rumpun: 'saintek',
    kriteria: [
      { id:'C1', target:5, type:'CF', aspect:'akademik' },
      { id:'C2', target:4, type:'SF', aspect:'akademik' },
      { id:'C3', target:3, type:'SF', aspect:'akademik' },
      { id:'C4', target:5, type:'CF', aspect:'bakat' },
      { id:'C5', target:2, type:'SF', aspect:'bakat' },
      { id:'C6', target:3, type:'SF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_pwk', kode: 'S1-PWK', nama: 'Perencanaan Wilayah & Kota', jenjang: 'S1', rumpun: 'saintek',
    kriteria: [
      { id:'C1', target:4, type:'SF', aspect:'akademik' },
      { id:'C2', target:4, type:'SF', aspect:'akademik' },
      { id:'C3', target:4, type:'CF', aspect:'akademik' },
      { id:'C4', target:4, type:'SF', aspect:'bakat' },
      { id:'C5', target:4, type:'CF', aspect:'bakat' },
      { id:'C6', target:4, type:'SF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_arsitektur', kode: 'S1-ARS', nama: 'Arsitektur', jenjang: 'S1', rumpun: 'saintek',
    kriteria: [
      { id:'C1', target:4, type:'CF', aspect:'akademik' },
      { id:'C2', target:4, type:'SF', aspect:'akademik' },
      { id:'C3', target:3, type:'SF', aspect:'akademik' },
      { id:'C4', target:4, type:'SF', aspect:'bakat' },
      { id:'C5', target:5, type:'CF', aspect:'bakat' },
      { id:'C6', target:4, type:'SF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_pertanian', kode: 'S1-AGR', nama: 'Agroteknologi / Pertanian', jenjang: 'S1', rumpun: 'saintek',
    kriteria: [
      { id:'C1', target:3, type:'CF', aspect:'akademik' },
      { id:'C2', target:3, type:'SF', aspect:'akademik' },
      { id:'C3', target:3, type:'SF', aspect:'akademik' },
      { id:'C4', target:3, type:'CF', aspect:'bakat' },
      { id:'C5', target:3, type:'SF', aspect:'bakat' },
      { id:'C6', target:3, type:'SF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_keperawatan', kode: 'S1-KEP', nama: 'Ilmu Keperawatan', jenjang: 'S1', rumpun: 'saintek',
    kriteria: [
      { id:'C1', target:3, type:'SF', aspect:'akademik' },
      { id:'C2', target:3, type:'SF', aspect:'akademik' },
      { id:'C3', target:4, type:'CF', aspect:'akademik' },
      { id:'C4', target:3, type:'SF', aspect:'bakat' },
      { id:'C5', target:3, type:'SF', aspect:'bakat' },
      { id:'C6', target:5, type:'CF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_gizi', kode: 'S1-GIZ', nama: 'Gizi / Ilmu Gizi', jenjang: 'S1', rumpun: 'saintek',
    kriteria: [
      { id:'C1', target:4, type:'CF', aspect:'akademik' },
      { id:'C2', target:3, type:'SF', aspect:'akademik' },
      { id:'C3', target:4, type:'SF', aspect:'akademik' },
      { id:'C4', target:4, type:'CF', aspect:'bakat' },
      { id:'C5', target:3, type:'SF', aspect:'bakat' },
      { id:'C6', target:4, type:'SF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_lingkungan', kode: 'S1-TL', nama: 'Teknik Lingkungan', jenjang: 'S1', rumpun: 'saintek',
    kriteria: [
      { id:'C1', target:4, type:'CF', aspect:'akademik' },
      { id:'C2', target:4, type:'SF', aspect:'akademik' },
      { id:'C3', target:3, type:'SF', aspect:'akademik' },
      { id:'C4', target:4, type:'CF', aspect:'bakat' },
      { id:'C5', target:3, type:'SF', aspect:'bakat' },
      { id:'C6', target:3, type:'SF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_industri', kode: 'S1-TI', nama: 'Teknik Industri', jenjang: 'S1', rumpun: 'saintek',
    kriteria: [
      { id:'C1', target:4, type:'CF', aspect:'akademik' },
      { id:'C2', target:4, type:'SF', aspect:'akademik' },
      { id:'C3', target:3, type:'SF', aspect:'akademik' },
      { id:'C4', target:4, type:'CF', aspect:'bakat' },
      { id:'C5', target:4, type:'SF', aspect:'bakat' },
      { id:'C6', target:4, type:'SF', aspect:'bakat' },
    ]
  },

  {
    id: 'si_manajemen', kode: 'S1-MAN', nama: 'Manajemen', jenjang: 'S1', rumpun: 'soshum',
    kriteria: [
      { id:'C1', target:4, type:'CF', aspect:'akademik' },
      { id:'C2', target:5, type:'SF', aspect:'akademik' },
      { id:'C3', target:4, type:'SF', aspect:'akademik' },
      { id:'C4', target:4, type:'SF', aspect:'bakat' },
      { id:'C5', target:3, type:'SF', aspect:'bakat' },
      { id:'C6', target:5, type:'CF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_akuntansi', kode: 'S1-AKT', nama: 'Akuntansi', jenjang: 'S1', rumpun: 'soshum',
    kriteria: [
      { id:'C1', target:4, type:'CF', aspect:'akademik' },
      { id:'C2', target:4, type:'SF', aspect:'akademik' },
      { id:'C3', target:4, type:'SF', aspect:'akademik' },
      { id:'C4', target:4, type:'CF', aspect:'bakat' },
      { id:'C5', target:2, type:'SF', aspect:'bakat' },
      { id:'C6', target:4, type:'SF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_ekonomi', kode: 'S1-EKO', nama: 'Ilmu Ekonomi', jenjang: 'S1', rumpun: 'soshum',
    kriteria: [
      { id:'C1', target:4, type:'CF', aspect:'akademik' },
      { id:'C2', target:4, type:'SF', aspect:'akademik' },
      { id:'C3', target:4, type:'SF', aspect:'akademik' },
      { id:'C4', target:4, type:'CF', aspect:'bakat' },
      { id:'C5', target:3, type:'SF', aspect:'bakat' },
      { id:'C6', target:4, type:'SF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_hukum', kode: 'S1-HKM', nama: 'Ilmu Hukum', jenjang: 'S1', rumpun: 'soshum',
    kriteria: [
      { id:'C1', target:3, type:'SF', aspect:'akademik' },
      { id:'C2', target:4, type:'SF', aspect:'akademik' },
      { id:'C3', target:5, type:'CF', aspect:'akademik' },
      { id:'C4', target:4, type:'CF', aspect:'bakat' },
      { id:'C5', target:3, type:'SF', aspect:'bakat' },
      { id:'C6', target:5, type:'CF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_psikologi', kode: 'S1-PSI', nama: 'Psikologi', jenjang: 'S1', rumpun: 'soshum',
    kriteria: [
      { id:'C1', target:3, type:'SF', aspect:'akademik' },
      { id:'C2', target:4, type:'SF', aspect:'akademik' },
      { id:'C3', target:5, type:'CF', aspect:'akademik' },
      { id:'C4', target:4, type:'CF', aspect:'bakat' },
      { id:'C5', target:4, type:'SF', aspect:'bakat' },
      { id:'C6', target:5, type:'SF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_komunikasi', kode: 'S1-IKOM', nama: 'Ilmu Komunikasi', jenjang: 'S1', rumpun: 'soshum',
    kriteria: [
      { id:'C1', target:2, type:'SF', aspect:'akademik' },
      { id:'C2', target:4, type:'SF', aspect:'akademik' },
      { id:'C3', target:5, type:'CF', aspect:'akademik' },
      { id:'C4', target:3, type:'SF', aspect:'bakat' },
      { id:'C5', target:4, type:'SF', aspect:'bakat' },
      { id:'C6', target:5, type:'CF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_hubint', kode: 'S1-HI', nama: 'Hubungan Internasional', jenjang: 'S1', rumpun: 'soshum',
    kriteria: [
      { id:'C1', target:3, type:'SF', aspect:'akademik' },
      { id:'C2', target:5, type:'CF', aspect:'akademik' },
      { id:'C3', target:4, type:'SF', aspect:'akademik' },
      { id:'C4', target:4, type:'SF', aspect:'bakat' },
      { id:'C5', target:3, type:'SF', aspect:'bakat' },
      { id:'C6', target:5, type:'CF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_pendidikan', kode: 'S1-PGSD', nama: 'PGSD / Pendidikan Dasar', jenjang: 'S1', rumpun: 'soshum',
    kriteria: [
      { id:'C1', target:3, type:'SF', aspect:'akademik' },
      { id:'C2', target:3, type:'SF', aspect:'akademik' },
      { id:'C3', target:4, type:'CF', aspect:'akademik' },
      { id:'C4', target:3, type:'SF', aspect:'bakat' },
      { id:'C5', target:4, type:'SF', aspect:'bakat' },
      { id:'C6', target:5, type:'CF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_sosiologi', kode: 'S1-SOS', nama: 'Sosiologi', jenjang: 'S1', rumpun: 'soshum',
    kriteria: [
      { id:'C1', target:2, type:'SF', aspect:'akademik' },
      { id:'C2', target:3, type:'SF', aspect:'akademik' },
      { id:'C3', target:5, type:'CF', aspect:'akademik' },
      { id:'C4', target:3, type:'SF', aspect:'bakat' },
      { id:'C5', target:3, type:'SF', aspect:'bakat' },
      { id:'C6', target:5, type:'CF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_geografi', kode: 'S1-GEO', nama: 'Geografi', jenjang: 'S1', rumpun: 'soshum',
    kriteria: [
      { id:'C1', target:3, type:'CF', aspect:'akademik' },
      { id:'C2', target:3, type:'SF', aspect:'akademik' },
      { id:'C3', target:4, type:'SF', aspect:'akademik' },
      { id:'C4', target:4, type:'CF', aspect:'bakat' },
      { id:'C5', target:3, type:'SF', aspect:'bakat' },
      { id:'C6', target:3, type:'SF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_administrasi', kode: 'S1-ADM', nama: 'Administrasi Bisnis', jenjang: 'S1', rumpun: 'soshum',
    kriteria: [
      { id:'C1', target:3, type:'SF', aspect:'akademik' },
      { id:'C2', target:4, type:'SF', aspect:'akademik' },
      { id:'C3', target:5, type:'CF', aspect:'akademik' },
      { id:'C4', target:3, type:'SF', aspect:'bakat' },
      { id:'C5', target:3, type:'SF', aspect:'bakat' },
      { id:'C6', target:5, type:'CF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_sastraing', kode: 'S1-SAING', nama: 'Sastra Inggris', jenjang: 'S1', rumpun: 'soshum',
    kriteria: [
      { id:'C1', target:2, type:'SF', aspect:'akademik' },
      { id:'C2', target:5, type:'CF', aspect:'akademik' },
      { id:'C3', target:4, type:'SF', aspect:'akademik' },
      { id:'C4', target:3, type:'SF', aspect:'bakat' },
      { id:'C5', target:4, type:'SF', aspect:'bakat' },
      { id:'C6', target:5, type:'CF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_filsafat', kode: 'S1-FIL', nama: 'Filsafat', jenjang: 'S1', rumpun: 'soshum',
    kriteria: [
      { id:'C1', target:2, type:'SF', aspect:'akademik' },
      { id:'C2', target:4, type:'SF', aspect:'akademik' },
      { id:'C3', target:5, type:'CF', aspect:'akademik' },
      { id:'C4', target:5, type:'CF', aspect:'bakat' },
      { id:'C5', target:3, type:'SF', aspect:'bakat' },
      { id:'C6', target:4, type:'SF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_sejarah', kode: 'S1-SEJ', nama: 'Sejarah', jenjang: 'S1', rumpun: 'soshum',
    kriteria: [
      { id:'C1', target:2, type:'SF', aspect:'akademik' },
      { id:'C2', target:3, type:'SF', aspect:'akademik' },
      { id:'C3', target:5, type:'CF', aspect:'akademik' },
      { id:'C4', target:3, type:'SF', aspect:'bakat' },
      { id:'C5', target:3, type:'SF', aspect:'bakat' },
      { id:'C6', target:5, type:'CF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_dkv', kode: 'S1-DKV', nama: 'Desain Komunikasi Visual', jenjang: 'S1', rumpun: 'soshum',
    kriteria: [
      { id:'C1', target:2, type:'SF', aspect:'akademik' },
      { id:'C2', target:4, type:'SF', aspect:'akademik' },
      { id:'C3', target:4, type:'CF', aspect:'akademik' },
      { id:'C4', target:3, type:'SF', aspect:'bakat' },
      { id:'C5', target:5, type:'CF', aspect:'bakat' },
      { id:'C6', target:4, type:'SF', aspect:'bakat' },
    ]
  },

  {
    id: 'd3_ti', kode: 'D3-TI', nama: 'Teknik Informatika', jenjang: 'D3', rumpun: 'saintek',
    kriteria: [
      { id:'C1', target:4, type:'CF', aspect:'akademik' },
      { id:'C2', target:3, type:'SF', aspect:'akademik' },
      { id:'C3', target:3, type:'SF', aspect:'akademik' },
      { id:'C4', target:4, type:'CF', aspect:'bakat' },
      { id:'C5', target:3, type:'SF', aspect:'bakat' },
      { id:'C6', target:3, type:'SF', aspect:'bakat' },
    ]
  },
  {
    id: 'd3_si', kode: 'D3-SI', nama: 'Sistem Informasi', jenjang: 'D3', rumpun: 'saintek',
    kriteria: [
      { id:'C1', target:3, type:'CF', aspect:'akademik' },
      { id:'C2', target:3, type:'SF', aspect:'akademik' },
      { id:'C3', target:3, type:'SF', aspect:'akademik' },
      { id:'C4', target:3, type:'CF', aspect:'bakat' },
      { id:'C5', target:3, type:'SF', aspect:'bakat' },
      { id:'C6', target:4, type:'SF', aspect:'bakat' },
    ]
  },
  {
    id: 'd3_tkomputer', kode: 'D3-TKomp', nama: 'Teknik Komputer', jenjang: 'D3', rumpun: 'saintek',
    kriteria: [
      { id:'C1', target:4, type:'CF', aspect:'akademik' },
      { id:'C2', target:3, type:'SF', aspect:'akademik' },
      { id:'C3', target:3, type:'SF', aspect:'akademik' },
      { id:'C4', target:4, type:'CF', aspect:'bakat' },
      { id:'C5', target:3, type:'SF', aspect:'bakat' },
      { id:'C6', target:3, type:'SF', aspect:'bakat' },
    ]
  },
  {
    id: 'd3_telektronika', kode: 'D3-TEL', nama: 'Teknik Elektronika', jenjang: 'D3', rumpun: 'saintek',
    kriteria: [
      { id:'C1', target:4, type:'CF', aspect:'akademik' },
      { id:'C2', target:3, type:'SF', aspect:'akademik' },
      { id:'C3', target:3, type:'SF', aspect:'akademik' },
      { id:'C4', target:4, type:'CF', aspect:'bakat' },
      { id:'C5', target:4, type:'SF', aspect:'bakat' },
      { id:'C6', target:2, type:'SF', aspect:'bakat' },
    ]
  },
  {
    id: 'd3_farmasi', kode: 'D3-FAR', nama: 'Farmasi (Vokasi)', jenjang: 'D3', rumpun: 'saintek',
    kriteria: [
      { id:'C1', target:3, type:'CF', aspect:'akademik' },
      { id:'C2', target:3, type:'SF', aspect:'akademik' },
      { id:'C3', target:3, type:'SF', aspect:'akademik' },
      { id:'C4', target:3, type:'CF', aspect:'bakat' },
      { id:'C5', target:3, type:'SF', aspect:'bakat' },
      { id:'C6', target:3, type:'SF', aspect:'bakat' },
    ]
  },
  {
    id: 'd3_kebidanan', kode: 'D3-KEB', nama: 'Kebidanan (Vokasi)', jenjang: 'D3', rumpun: 'saintek',
    kriteria: [
      { id:'C1', target:3, type:'SF', aspect:'akademik' },
      { id:'C2', target:3, type:'SF', aspect:'akademik' },
      { id:'C3', target:4, type:'CF', aspect:'akademik' },
      { id:'C4', target:3, type:'SF', aspect:'bakat' },
      { id:'C5', target:3, type:'SF', aspect:'bakat' },
      { id:'C6', target:4, type:'CF', aspect:'bakat' },
    ]
  },
  {
    id: 'd3_analis', kode: 'D3-AKL', nama: 'Analis Kesehatan/Lab', jenjang: 'D3', rumpun: 'saintek',
    kriteria: [
      { id:'C1', target:3, type:'SF', aspect:'akademik' },
      { id:'C2', target:3, type:'SF', aspect:'akademik' },
      { id:'C3', target:4, type:'CF', aspect:'akademik' },
      { id:'C4', target:3, type:'SF', aspect:'bakat' },
      { id:'C5', target:3, type:'SF', aspect:'bakat' },
      { id:'C6', target:4, type:'CF', aspect:'bakat' },
    ]
  },

  {
    id: 'd3_akuntansi', kode: 'D3-AKT', nama: 'Akuntansi (Vokasi)', jenjang: 'D3', rumpun: 'soshum',
    kriteria: [
      { id:'C1', target:4, type:'CF', aspect:'akademik' },
      { id:'C2', target:3, type:'SF', aspect:'akademik' },
      { id:'C3', target:3, type:'SF', aspect:'akademik' },
      { id:'C4', target:4, type:'CF', aspect:'bakat' },
      { id:'C5', target:2, type:'SF', aspect:'bakat' },
      { id:'C6', target:3, type:'SF', aspect:'bakat' },
    ]
  },
  {
    id: 'd3_manajemen', kode: 'D3-MAN', nama: 'Manajemen Bisnis', jenjang: 'D3', rumpun: 'soshum',
    kriteria: [
      { id:'C1', target:3, type:'SF', aspect:'akademik' },
      { id:'C2', target:3, type:'SF', aspect:'akademik' },
      { id:'C3', target:4, type:'CF', aspect:'akademik' },
      { id:'C4', target:3, type:'SF', aspect:'bakat' },
      { id:'C5', target:3, type:'SF', aspect:'bakat' },
      { id:'C6', target:5, type:'CF', aspect:'bakat' },
    ]
  },
  {
    id: 'd3_pemasaran', kode: 'D3-PMR', nama: 'Pemasaran (Marketing)', jenjang: 'D3', rumpun: 'soshum',
    kriteria: [
      { id:'C1', target:2, type:'SF', aspect:'akademik' },
      { id:'C2', target:3, type:'SF', aspect:'akademik' },
      { id:'C3', target:4, type:'CF', aspect:'akademik' },
      { id:'C4', target:2, type:'SF', aspect:'bakat' },
      { id:'C5', target:3, type:'SF', aspect:'bakat' },
      { id:'C6', target:5, type:'CF', aspect:'bakat' },
    ]
  },
  {
    id: 'd3_perhotelan', kode: 'D3-PHT', nama: 'Perhotelan / Pariwisata', jenjang: 'D3', rumpun: 'soshum',
    kriteria: [
      { id:'C1', target:2, type:'SF', aspect:'akademik' },
      { id:'C2', target:4, type:'SF', aspect:'akademik' },
      { id:'C3', target:4, type:'CF', aspect:'akademik' },
      { id:'C4', target:2, type:'SF', aspect:'bakat' },
      { id:'C5', target:4, type:'SF', aspect:'bakat' },
      { id:'C6', target:5, type:'CF', aspect:'bakat' },
    ]
  },
  {
    id: 'd3_admperkantoran', kode: 'D3-ADM', nama: 'Administrasi Perkantoran', jenjang: 'D3', rumpun: 'soshum',
    kriteria: [
      { id:'C1', target:2, type:'SF', aspect:'akademik' },
      { id:'C2', target:3, type:'SF', aspect:'akademik' },
      { id:'C3', target:5, type:'CF', aspect:'akademik' },
      { id:'C4', target:2, type:'SF', aspect:'bakat' },
      { id:'C5', target:3, type:'SF', aspect:'bakat' },
      { id:'C6', target:5, type:'CF', aspect:'bakat' },
    ]
  },

  {
    id: 'si_tkonstruksi', kode: 'S1-TKONS', nama: 'Teknik Konstruksi & Bangunan', jenjang: 'S1', rumpun: 'saintek',
    kriteria: [
      { id:'C1', target:4, type:'CF', aspect:'akademik' },
      { id:'C2', target:3, type:'SF', aspect:'akademik' },
      { id:'C3', target:3, type:'SF', aspect:'akademik' },
      { id:'C4', target:4, type:'CF', aspect:'bakat' },
      { id:'C5', target:5, type:'SF', aspect:'bakat' },
      { id:'C6', target:2, type:'SF', aspect:'bakat' },
    ]
  },
  {
    id: 'd3_multimedia', kode: 'D3-MM', nama: 'Multimedia / Desain Grafis', jenjang: 'D3', rumpun: 'soshum',
    kriteria: [
      { id:'C1', target:2, type:'SF', aspect:'akademik' },
      { id:'C2', target:3, type:'SF', aspect:'akademik' },
      { id:'C3', target:3, type:'CF', aspect:'akademik' },
      { id:'C4', target:3, type:'SF', aspect:'bakat' },
      { id:'C5', target:5, type:'CF', aspect:'bakat' },
      { id:'C6', target:4, type:'SF', aspect:'bakat' },
    ]
  },
  {
    id: 'd3_logistik', kode: 'D3-LOG', nama: 'Logistik & Bisnis Internasional', jenjang: 'D3', rumpun: 'soshum',
    kriteria: [
      { id:'C1', target:3, type:'SF', aspect:'akademik' },
      { id:'C2', target:4, type:'CF', aspect:'akademik' },
      { id:'C3', target:3, type:'SF', aspect:'akademik' },
      { id:'C4', target:3, type:'SF', aspect:'bakat' },
      { id:'C5', target:3, type:'SF', aspect:'bakat' },
      { id:'C6', target:5, type:'CF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_ekonomidigital', kode: 'S1-EKDIG', nama: 'Ekonomi Digital / E-Business', jenjang: 'S1', rumpun: 'soshum',
    kriteria: [
      { id:'C1', target:4, type:'SF', aspect:'akademik' },
      { id:'C2', target:4, type:'SF', aspect:'akademik' },
      { id:'C3', target:4, type:'CF', aspect:'akademik' },
      { id:'C4', target:4, type:'CF', aspect:'bakat' },
      { id:'C5', target:4, type:'SF', aspect:'bakat' },
      { id:'C6', target:4, type:'SF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_penddokter', kode: 'S1-PDKTR', nama: 'Pendidikan Dokter Gigi', jenjang: 'S1', rumpun: 'saintek',
    kriteria: [
      { id:'C1', target:4, type:'CF', aspect:'akademik' },
      { id:'C2', target:4, type:'SF', aspect:'akademik' },
      { id:'C3', target:4, type:'SF', aspect:'akademik' },
      { id:'C4', target:4, type:'CF', aspect:'bakat' },
      { id:'C5', target:4, type:'SF', aspect:'bakat' },
      { id:'C6', target:4, type:'SF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_tekpangan', kode: 'S1-TPG', nama: 'Teknologi Pangan', jenjang: 'S1', rumpun: 'saintek',
    kriteria: [
      { id:'C1', target:4, type:'CF', aspect:'akademik' },
      { id:'C2', target:3, type:'SF', aspect:'akademik' },
      { id:'C3', target:3, type:'SF', aspect:'akademik' },
      { id:'C4', target:4, type:'CF', aspect:'bakat' },
      { id:'C5', target:3, type:'SF', aspect:'bakat' },
      { id:'C6', target:3, type:'SF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_antropologi', kode: 'S1-ANT', nama: 'Antropologi', jenjang: 'S1', rumpun: 'soshum',
    kriteria: [
      { id:'C1', target:2, type:'SF', aspect:'akademik' },
      { id:'C2', target:3, type:'SF', aspect:'akademik' },
      { id:'C3', target:5, type:'CF', aspect:'akademik' },
      { id:'C4', target:3, type:'SF', aspect:'bakat' },
      { id:'C5', target:4, type:'SF', aspect:'bakat' },
      { id:'C6', target:5, type:'CF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_ilmpolitik', kode: 'S1-IP', nama: 'Ilmu Politik', jenjang: 'S1', rumpun: 'soshum',
    kriteria: [
      { id:'C1', target:2, type:'SF', aspect:'akademik' },
      { id:'C2', target:3, type:'SF', aspect:'akademik' },
      { id:'C3', target:5, type:'CF', aspect:'akademik' },
      { id:'C4', target:3, type:'SF', aspect:'bakat' },
      { id:'C5', target:3, type:'SF', aspect:'bakat' },
      { id:'C6', target:5, type:'CF', aspect:'bakat' },
    ]
  },
  {
    id: 'd3_keuangan', kode: 'D3-KEU', nama: 'Keuangan & Perbankan', jenjang: 'D3', rumpun: 'soshum',
    kriteria: [
      { id:'C1', target:4, type:'CF', aspect:'akademik' },
      { id:'C2', target:3, type:'SF', aspect:'akademik' },
      { id:'C3', target:3, type:'SF', aspect:'akademik' },
      { id:'C4', target:4, type:'CF', aspect:'bakat' },
      { id:'C5', target:2, type:'SF', aspect:'bakat' },
      { id:'C6', target:4, type:'SF', aspect:'bakat' },
    ]
  },
  {
    id: 'si_kriya', kode: 'S1-KRY', nama: 'Seni Kriya / Desain Produk', jenjang: 'S1', rumpun: 'soshum',
    kriteria: [
      { id:'C1', target:2, type:'SF', aspect:'akademik' },
      { id:'C2', target:3, type:'SF', aspect:'akademik' },
      { id:'C3', target:4, type:'CF', aspect:'akademik' },
      { id:'C4', target:2, type:'SF', aspect:'bakat' },
      { id:'C5', target:5, type:'CF', aspect:'bakat' },
      { id:'C6', target:4, type:'SF', aspect:'bakat' },
    ]
  },
];

function calculateSPK(studentProfile, studentTrack = 'sma_ipa') {
  const results = [];

  for (const prodi of PRODI_DB) {
    let c7_siswa = 1;

    if (studentTrack === 'sma_ipa') {
      c7_siswa = (prodi.rumpun === 'saintek') ? 5 : 4;
    } else if (studentTrack === 'sma_ips') {
      c7_siswa = (prodi.rumpun === 'saintek') ? 1 : 5;
    } else if (studentTrack === 'smk_teknik') {
      c7_siswa = (prodi.rumpun === 'saintek') ? 5 : 2;
    } else if (studentTrack === 'smk_bisnis') {
      c7_siswa = (prodi.rumpun === 'saintek') ? 1 : 5;
    }

    const dynamicCriteria = [
      ...prodi.kriteria,
      { id: 'C7', target: 5, type: 'CF', aspect: 'akademik' }
    ];

    const auditRows = [];
    const cfAkademik = [], sfAkademik = [];
    const cfBakat = [], sfBakat = [];

    for (const k of dynamicCriteria) {
      const siswa = (k.id === 'C7') ? c7_siswa : (studentProfile[k.id] ?? 0);
      const gap = siswa - k.target;
      const bobot = gapToWeight(gap);
      auditRows.push({ kriteria: k.id, siswa, target: k.target, gap, bobot, type: k.type, aspect: k.aspect });

      if (k.aspect === 'akademik') {
        if (k.type === 'CF') cfAkademik.push(bobot);
        else sfAkademik.push(bobot);
      } else {
        if (k.type === 'CF') cfBakat.push(bobot);
        else sfBakat.push(bobot);
      }
    }

    const avg = arr => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
    const NCF_A = avg(cfAkademik);
    const NSF_A = avg(sfAkademik);
    const NCF_B = avg(cfBakat);
    const NSF_B = avg(sfBakat);
    const N_A = (0.6 * NCF_A) + (0.4 * NSF_A);
    const N_B = (0.6 * NCF_B) + (0.4 * NSF_B);
    const total = (0.5 * N_A) + (0.5 * N_B);

    results.push({
      ...prodi,
      audit: auditRows,
      NCF_A, NSF_A, NCF_B, NSF_B,
      N_A, N_B,
      total,
    });
  }

  results.sort((a, b) => b.total - a.total);
  results.forEach((r, i) => { r.rank = i + 1; });

  const top = results[0];
  top.reason = generateReason(top, studentProfile);

  return results;
}

function generateReason(prodi, profile) {
  const kritMap = { 
    C1:'Matematika', C2:'Bahasa Inggris', C3:'Bahasa Indonesia', 
    C4:'Penalaran Logis', C5:'Kreativitas & Inovasi', C6:'Komunikasi Verbal',
    C7:'Kesesuaian Jalur Sekolah'
  };
  
  const strengths = prodi.audit.filter(r => r.gap >= 0).map(r => kritMap[r.kriteria]).filter(Boolean);
  const weaknesses = prodi.audit.filter(r => r.gap < 0).map(r => kritMap[r.kriteria]).filter(Boolean);

  const naturalJoin = (arr) => {
    if (arr.length === 0) return '';
    if (arr.length === 1) return arr[0];
    if (arr.length === 2) return arr.join(' dan ');
    return arr.slice(0, -1).join(', ') + ', dan ' + arr[arr.length - 1];
  };

  let reason = `Program studi **${prodi.jenjang} ${prodi.nama}** sangat direkomendasikan untukmu berdasarkan kalkulasi algoritma *Profile Matching*. `;
  
  if (strengths.length > 0) {
    reason += `Kekuatan utamamu yang memenuhi atau melampaui standar prodi ini ada pada **${naturalJoin(strengths)}**. `;
  }

  if (weaknesses.length > 0) {
    reason += `Meskipun begitu, kamu disarankan untuk meningkatkan performa di bidang **${naturalJoin(weaknesses)}** (masih di bawah target prodi) agar dapat bersaing secara optimal.`;
  } else {
    reason += `Luar biasa, seluruh kualifikasi akademik dan bakatmu berhasil memenuhi ekspektasi tanpa ada kekurangan!`;
  }

  return reason.trim();
}
