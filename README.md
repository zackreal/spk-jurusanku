# JurusanKu - SPK Pemilihan Program Studi (Profile Matching)

![JurusanKu Banner](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge) ![Tech Stack](https://img.shields.io/badge/Tech-Vanilla_JS_%7C_HTML_%7C_CSS-blue?style=for-the-badge) ![Algorithm](https://img.shields.io/badge/Algorithm-Profile_Matching-orange?style=for-the-badge)

**JurusanKu** adalah sebuah Sistem Pendukung Keputusan (SPK) berbasis *Client-Side Web Application* yang dirancang untuk merekomendasikan program studi (jurusan kuliah) yang paling ideal bagi siswa SMA (IPA/IPS) dan SMK (Teknik/Bisnis). Sistem ini menggunakan metode komputasi **Profile Matching** untuk mencocokkan profil nilai akademik dan profil bakat psikologi siswa terhadap kualifikasi target dari 57 Program Studi di Indonesia.

Proyek ini dibangun sebagai solusi teknis atas tingginya angka fenomena "salah jurusan" di kalangan calon mahasiswa baru.

---

## Fitur Unggulan (Key Features)

- **Algoritma Profile Matching Murni:** Menghitung *Gap* (selisih nilai), memetakan Bobot, dan memecah kriteria ke dalam *Core Factor* (60%) dan *Secondary Factor* (40%).
- **Dynamic Track Alignment (Kesesuaian Jalur):** Algoritma dilengkapi filter pintar untuk mendeteksi jalur asal sekolah. Sistem akan menjatuhkan peringkat secara matematis jika terjadi lintas jurusan yang ekstrem (Misal: Anak IPS mendaftar S1 Kedokteran).
- **Reasoning Engine (AI-Like Analysis):** Sistem tidak sekadar memunculkan skor angka, melainkan merangkai paragraf deskriptif mengenai **Kekuatan Utama** dan **Kelemahan** siswa, layaknya diketik oleh seorang Konsultan Pendidikan.
- **Multi-Semester Auto Averaging:** Form pintar yang otomatis menghitung dan merata-ratakan nilai rapor dari Semester 1 hingga 5 (Kelas 10 - 12) secara *real-time*.
- **Cetak Rapor Otomatis (Export to PDF):** Siswa dapat mengunduh Surat Keterangan Hasil Asesmen dalam bentuk PDF yang rapi (menggunakan `html2pdf.js`).
- **Autentikasi & Histori Lokal:** Menggunakan Web Storage API (`localStorage`) untuk fungsi pendaftaran akun, sesi login, serta dasbor histori asesmen tanpa memerlukan server database eksternal.

---

## Teknologi yang Digunakan (Tech Stack)

Aplikasi ini dibangun *From Scratch* dengan teknologi murni tanpa kerangka kerja (framework) besar untuk menjamin kecepatan dan kejelasan logika:
- **Frontend/UI:** HTML5, CSS3 (Modern Flexbox/Grid, CSS Variables)
- **Logika & SPK Engine:** Vanilla JavaScript (ES6)
- **Penyimpanan Database:** Browser `localStorage`
- **Library Eksternal Tambahan:** `html2pdf.js` (Cetak PDF) & `Lenis` (Smooth Scrolling).

---

## Cara Menjalankan Aplikasi (How to Run)

Karena aplikasi ini dilengkapi modul ekspor PDF yang memerlukan akses pembacaan elemen DOM (*Cross-Origin/CORS policy*), aplikasi **TIDAK BOLEH** dibuka dengan cara klik-ganda file (`file:///...`). Aplikasi harus dijalankan menggunakan **Local Web Server**.

### Opsi 1: Menggunakan Node.js (Disarankan)
1. Pastikan komputer Anda telah terinstal [Node.js](https://nodejs.org/).
2. Buka Terminal/Command Prompt, arahkan ke folder proyek ini.
3. Jalankan perintah berikut:
   ```bash
   npx http-server -p 8000
   ```
4. Buka Browser (Chrome/Edge) dan akses `http://localhost:8000`

### Opsi 2: Menggunakan VS Code
1. Buka folder proyek ini di Visual Studio Code.
2. Pasang Ekstensi **Live Server**.
3. Klik kanan pada file `index.html` lalu pilih **"Open with Live Server"**.

---

## Struktur Logika SPK (Aspek Penilaian)

Sistem membagi 7 kriteria ke dalam 2 Aspek dengan persentase hasil akhir **50% Akademik : 50% Bakat**.
- **Aspek Akademik:** Matematika (C1), Bahasa Inggris (C2), Bahasa Indonesia (C3), dan Kesesuaian Rumpun (C7).
- **Aspek Psikologi/Bakat:** Penalaran Logis (C4), Kreativitas (C5), Komunikasi Verbal (C6).

---
*Proyek ini dirancang sebagai tugas besar perkuliahan mata kuliah Sistem Pendukung Keputusan (SPK) dengan mengutamakan presisi logika algoritma dan fungsionalitas UI/UX.*
