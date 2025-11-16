# Panduan Proyek TenRusl BeamDrop Pro

Blueprint Struktur, Tujuan, dan Konsistensi Script Generator

---

## 1. Gambaran Umum Proyek

### 1.1. Nama & Konteks

-   **Nama proyek**: **TenRusl BeamDrop Pro**
-   **Kelas aplikasi**: Aplikasi file sharing lokal sejenis **Xender / SHAREit**:
    -   Berbagi file cepat antar perangkat di jaringan lokal / melalui URL atau IP address.
    -   Akses melalui browser (PC / mobile) tanpa perlu install aplikasi berat.

### 1.2. Tujuan Utama

1. **Super Cepat**

    - Transfer file via LAN / jaringan lokal untuk meminimalkan latency.
    - Backend ringan, tanpa proses berat yang tidak perlu.
    - Frontend minimalis dan efisien (minified build, lazy-load bila perlu).

2. **Super Ringan**

    - Dependency dibatasi yang benar-benar perlu saja.
    - Struktur kode modular: mudah dirawat dan tidak “bengkak”.
    - Asset (ikon, ilustrasi) dioptimalkan dan reusable.

3. **Super Aman dari Serangan**

    - Pemisahan yang jelas antara logika, konfigurasi, dan storage.
    - Middleware & header security di backend.
    - Rate limiting dan logging keamanan.
    - Pemisahan environment (dev/prod) + file `.env`.

4. **SEO Full (untuk halaman web utama)**

    - HTML shell (`frontend/public/index.html`) memuat meta tags dasar SEO.
    - Struktur front-end mendukung pengaturan judul dan deskripsi (via `seo.js`).

5. **Mode Dark & Light**

    - Pengaturan tema lewat `ThemeContext` + `useTheme` + CSS `dark-mode.css`.
    - Ikon tema (sun/moon) dari assets.

6. **UI/UX Modern dan Powerfull**

    - Komponen layout yang rapi (Header, Footer, Shell).
    - Komponen file management yang jelas (tabel, filter, stats).
    - Responsif untuk mobile + desktop.

7. **Multi Language (i18n)**

    - Bahasa yang didukung (kode):  
      `en`, `id`, `ar`, `de`, `hi`, `ja`, `ko`, `pt`, `ru`, `th`, `zh`, `es`
    - Dipisah antara:
        - **Backend locales**: pesan error/log server.
        - **Frontend locales**: teks di UI.

8. **Responsive**
    - Layout adaptif (`layout.css`) + penggunaan unit responsif di CSS.
    - Komponen diuji pada ukuran layar desktop & mobile.

---

## 2. Arsitektur Tingkat Tinggi

### 2.1. Pembagian Besar

Root proyek (folder utama):

```text
E:\PROJECT\TENRUSL\TenRusl-BeamDrop-Pro\
├─ backend\        # Server & API (Python)
├─ frontend\       # UI/UX (React/JS)
├─ config\         # Konfigurasi environment, deployment, infra
├─ docs\           # Dokumentasi
├─ locales\        # Multi-bahasa backend & frontend
├─ logs\           # Log backend & frontend
├─ scripts\        # Script dev/prod/maintenance/tools
├─ storage\        # File upload & backup
├─ tests\          # Pengujian backend & frontend
├─ .env.example
├─ README.md
├─ LICENSE
└─ create-tenrusl-structure.js
```

### 2.2. Peran dan Keterhubungan Global

-   **Backend**

    -   Menyediakan API: upload, download, list, delete, health, info.
    -   Menulis ke `logs\backend\` dan membaca/menulis file ke `storage\`.
    -   Menggunakan konfigurasi dari `backend\config\*` dan `config\env\*.env.*`.

-   **Frontend**

    -   Memanggil API backend via `frontend\src\utils\apiClient.js`.
    -   Menampilkan UI file sharing (upload / list / delete).
    -   Mengambil teks dari `frontend\src\i18n\messages.*.json` (yang konsisten dengan `locales\frontend\*.json`).

-   **Config**

    -   Mengatur cara backend & frontend dijalankan (Docker, nginx, systemd, CI).
    -   Menjadi penghubung antara kode aplikasi dan environment server.

-   **Locales**

    -   Menjamin semua bahasa punya key yang sama antara backend & frontend.
    -   Dibantu oleh script `scripts\tools\localization_check.py` untuk pengecekan konsistensi.

-   **Scripts**

    -   Menyederhanakan proses dev, build, deploy, backup, dan rotasi log.

-   **Storage**

    -   Menjadi lokasi fisik file yang dikirim/diterima aplikasi.

-   **Tests**

    -   Menjamin semua fungsi utama (upload, delete, security, UI) berjalan konsisten setiap update.

-   **create-tenrusl-structure.js**
    -   Script Node.js **satu kali** untuk membangun struktur folder & file kosong sesuai dokumentasi.
    -   Sangat penting untuk tetap sinkron dengan panduan ini (Panduan & LANGKAH).

---

## 3. Detail Backend: Struktur & Peran

### 3.1. Hierarki Backend

```text
backend\
├─ app\
│  ├─ __init__.py
│  ├─ main.py
│  ├─ routes\
│  ├─ services\
│  ├─ models\
│  ├─ security\
│  ├─ utils\
│  ├─ middleware\
│  └─ extensions\
├─ config\
├─ migrations\
├─ requirements\
└─ wsgi\
```

#### 3.1.1. `backend\app\__init__.py`

-   Menandakan `app` sebagai package Python.
-   Biasanya berisi fungsi `create_app()`:
    -   Load konfigurasi dari `backend\config\settings_*`.
    -   Inisialisasi **extensions** (DB, cache, limiter).
    -   Mendaftarkan **middleware** (logging, error handler, security).
    -   Mendaftarkan **routes** (auth, files, health, info).

#### 3.1.2. `backend\app\main.py`

-   Titik masuk server saat dijalankan manual.
-   Contoh alur logika (konseptual):
    -   Import `create_app()` dari `__init__.py`.
    -   Membuat instance app.
    -   Menjalankan server dev (misalnya `app.run()` atau uvicorn).

---

### 3.2. Extensions: `backend\app\extensions\*`

```text
backend\app\extensions\
├─ __init__.py
├─ cache.py
├─ db.py
└─ limiter.py
```

-   **Tujuan**: menampung inisialisasi komponen eksternal yang digunakan di banyak tempat.

**Hubungan**:

-   `__init__.py` mengekspor instance siap-pakai (misalnya `db`, `cache`, `limiter`).
-   `services\*.py`, `routes\*.py`, dan `security\rate_limit.py` mengimport komponen ini.

---

### 3.3. Middleware: `backend\app\middleware\*`

```text
backend\app\middleware\
├─ __init__.py
├─ error_handler.py
├─ request_logging.py
└─ security_middleware.py
```

-   `error_handler.py`: mengubah exception menjadi respon yang terkontrol.
-   `request_logging.py`: menulis request log ke `logs\backend\access.log` dan/atau `app.log`.
-   `security_middleware.py`: menambah header keamanan dan validasi dasar request.

**Hubungan**:

-   Semua middleware didaftarkan di `create_app()` (`app\__init__.py`).
-   Logging konfigurasi mengikuti `backend\config\logging_conf.yaml`.

---

### 3.4. Models: `backend\app\models\*`

```text
backend\app\models\
├─ __init__.py
├─ audit_log.py
├─ file_metadata.py
└─ user.py
```

-   `file_metadata.py`: mencatat nama file, ukuran, jenis, path, waktu upload, pemilik.
-   `audit_log.py`: mencatat tindakan penting (upload, delete, login, pengaturan).
-   `user.py`: struktur tabel user (jika ada auth).

**Hubungan**:

-   Bergantung pada `extensions\db.py` bila pakai DB.
-   Dipakai oleh `services\file_service.py`, `services\audit_service.py`, `routes\auth.py`, `routes\files.py`.

---

### 3.5. Routes: `backend\app\routes\*`

```text
backend\app\routes\
├─ __init__.py
├─ auth.py
├─ files.py
├─ health.py
└─ info.py
```

-   `files.py`:
    -   Endpoint upload (POST), list (GET), download (GET), delete (DELETE).
    -   Berhubungan dengan `storage\shared_files` dan `models\file_metadata.py`.
-   `health.py`:
    -   Endpoint untuk mengecek apakah server OK (dipakai CI/monitoring).
-   `info.py`:
    -   Menyajikan info versi (`utils\version.py`), nama app, mungkin fitur.
-   `auth.py` (opsional):
    -   Menangani login/logout/token.

**Hubungan dengan Frontend**:

-   `frontend\src\utils\apiClient.js` mengakses endpoint-endpoint ini.

---

### 3.6. Security: `backend\app\security\*`

```text
backend\app\security\
├─ __init__.py
├─ csrf.py
├─ headers.py
├─ rate_limit.py
└─ token_utils.py
```

-   `headers.py`: definisi header HTTP security (CSP, HSTS, X-Frame-Options, dll.).
-   `rate_limit.py`: aturan per IP / per route (dipakai limiter).
-   `token_utils.py`: generasi & verifikasi token.
-   `csrf.py`: perlindungan CSRF (jika dipakai).

**Hubungan**:

-   Terintegrasi ke middleware (`security_middleware.py`) dan routes sensitif.
-   Bekerja bersama konfigurasi nginx (`config\nginx\snippets\security-headers.conf`).

---

### 3.7. Utils: `backend\app\utils\*`

```text
backend\app\utils\
├─ __init__.py
├─ paths.py
├─ serializers.py
├─ validators.py
└─ version.py
```

-   `paths.py`: helper path ke `storage\shared_files`, `storage\temp`, dll.
-   `validators.py`: validasi input (nama file, ukuran, tipe konten).
-   `serializers.py`: serialisasi objek ke JSON/respon.
-   `version.py`: menyimpan versi aplikasi, build, dsb.

**Hubungan**:

-   Dipakai oleh hampir semua layer (routes/services/tests).

---

### 3.8. Konfigurasi Backend

```text
backend\config\
├─ __init__.py
├─ logging_conf.yaml
├─ settings_base.py
├─ settings_dev.py
└─ settings_prod.py
```

-   `settings_base.py`: nilai default (folder storage, log, debug=false).
-   `settings_dev.py`: menyalakan debug, log lebih verbose, konfigurasi dev.
-   `settings_prod.py`: memperketat keamanan & performa.

**Hubungan**:

-   Di-load di `app\__init__.py` dan `wsgi\*.py`.
-   Diisi nilainya dari ENV (`config\env\*.env.*` atau `.env`).

---

### 3.9. Requirements & WSGI/ASGI

```text
backend\requirements\
├─ base.txt
├─ dev.txt
└─ prod.txt

backend\wsgi\
├─ wsgi.py
└─ asgi.py
```

-   Requirements dipakai saat pemasangan dependency untuk backend.
-   `wsgi.py` dan `asgi.py` adalah entry untuk server production (gunicorn/uvicorn).

**Hubungan**:

-   Dockerfile backend dan script deploy akan merujuk ke file-file ini.

---

## 4. Detail Frontend: Struktur & Peran

### 4.1. Hierarki Frontend

```text
frontend\
├─ public\
├─ src\
│  ├─ assets\
│  ├─ components\
│  ├─ contexts\
│  ├─ hooks\
│  ├─ i18n\
│  ├─ pages\
│  ├─ styles\
│  ├─ utils\
│  ├─ App.jsx
│  └─ index.js
├─ tests\
├─ package.json
├─ tsconfig.json
├─ vite.config.js
└─ webpack.config.js
```

-   `public\index.html`: shell HTML utama.
-   `src\index.js`: entry React (render ke DOM).
-   `src\App.jsx`: komposisi layout, routing, context provider.

---

### 4.2. Components

1. **Layout** (`frontend\src\components\layout`)

    - `Header.jsx`, `Footer.jsx`, `Shell.jsx`, `ThemeToggle.jsx`.
    - Mengatur kerangka visual & tema.
    - `Header` bisa menampilkan nama app dan versi (dari backend via `info` endpoint).

2. **Files** (`frontend\src\components\files`)

    - `FileTable`, `FileRow`, `FileStats`, `FileFilter`:
    - Mengambil data via `useFiles.js` → `apiClient.js` → `backend\routes\files.py`.

3. **Upload** (`frontend\src\components\upload`)

    - `UploadPanel.jsx` dan `DropZone.jsx`:
    - Mengirim file ke backend, memanfaatkan validasi (size/type) sebelum kirim.

4. **Common** (`frontend\src\components\common`)

    - `Button`, `Alert`, `Badge`, `ModalConfirm`, `Spinner`:
    - Boilerplate UI untuk semua halaman, membuat UI konsisten.

5. **HowTo** (`frontend\src\components\howto\HowToCard.jsx`)
    - Panel panduan untuk pengguna baru.

---

### 4.3. Contexts & Hooks

-   **Contexts**

    -   `ThemeContext.jsx`: menyimpan state tema (dark/light).
    -   `LanguageContext.jsx`: menyimpan state bahasa.

-   **Hooks**
    -   `useTheme.js`: baca/tulis tema dari context & mungkin localStorage.
    -   `useLanguage.js`: integrasi dengan i18n untuk ganti bahasa.
    -   `useFiles.js`: manajemen fetch/list/upload/delete file (pakai `apiClient.js`).
    -   `useClipboard.js`: helper copy URL / IP ke clipboard.

**Hubungan**:

-   `App.jsx` membungkus semua page dengan Theme & Language Provider.
-   Komponen di `components\*` menggunakan hooks ini untuk tampil sesuai preferensi user.

---

### 4.4. i18n Frontend

```text
frontend\src\i18n\
├─ index.js
├─ messages.en.json
├─ messages.id.json
...
└─ messages.zh.json
```

-   `index.js`: menyatukan semua file messages dan menyediakan fungsi/objek untuk `LanguageContext`.
-   `messages.*.json`: menyimpan string per bahasa sesuai key yang konsisten.

**Hubungan dengan Locales Root**:

-   `locales\frontend\*.json` dapat dianggap sebagai sumber/backup.
-   Script `scripts\tools\localization_check.py` dapat memastikan key di root locales dan di `frontend\src\i18n` tidak berbeda.

---

### 4.5. Styles & Assets

-   `styles\globals.css`: reset & styling umum.
-   `styles\variables.css`: variabel warna, spacing, font.
-   `styles\layout.css`: grid/flex dasar untuk layout.
-   `styles\components.css`: styling komponen kecil.
-   `styles\dark-mode.css`: theme-specfic override untuk dark mode.

-   `assets\icons\*.svg`: ikon untuk file type dan tema.
-   `assets\illustrations\empty-state.svg`: dipakai ketika belum ada file.
-   `assets\fonts\`: untuk font custom (opsional).

---

### 4.6. Utils Frontend

-   `apiClient.js`: abstraksi request ke backend.
-   `constants.js`: base URL API, nama app, dsb.
-   `fileTypeUtils.js`: menentukan ikon/tampilan berdasarkan ekstensi file.
-   `seo.js`: helper untuk set `document.title`, meta tag.
-   `sizeFormatter.js`: format ukuran file (bytes → KB/MB).

**Hubungan**:

-   `useFiles.js` menggunakan `apiClient.js`.
-   `FileRow.jsx` menggunakan `fileTypeUtils` dan `sizeFormatter`.
-   `Home.jsx` / `App.jsx` menggunakan `seo.js` untuk SEO basic.

---

## 5. Locales & Multi-language

### 5.1. Struktur

```text
locales\
├─ backend\
│  ├─ en.json
│  ├─ id.json
│  └─ ... (sampai zh.json)
└─ frontend\
   ├─ en.json
   ├─ id.json
   └─ ... (sampai zh.json)
```

-   Backend locales:
    -   Dipakai untuk pesan error/log yang tampil ke user (mis. JSON respon).
-   Frontend locales:
    -   Dipakai untuk teks UI (judul, label, tombol).

**Target Konsistensi**:

-   Key di `locales\frontend\<lang>.json` dan `frontend\src\i18n\messages.<lang>.json` harus identik.
-   Script `scripts\tools\localization_check.py` bertugas memeriksa hal ini.

---

## 6. Logs & Storage

### 6.1. Logs

```text
logs\
├─ backend\
│  ├─ access.log
│  ├─ app.log
│  └─ security.log
└─ frontend\
   └─ error.log
```

-   `access.log`: semua request masuk.
-   `app.log`: log umum backend.
-   `security.log`: log keamanan (mis. percobaan request mencurigakan).
-   `frontend\error.log`: error di sisi UI (optional, mis. dari Sentry/self-logging).

**Hubungan**:

-   Middleware logging & security menulis ke file ini.
-   `scripts\maintenance\rotate_logs.sh` menjaga ukuran log agar tidak bengkak.

### 6.2. Storage

```text
storage\
├─ shared_files\
├─ temp\
└─ backups\
   ├─ files\
   └─ config\
```

-   `shared_files`: tempat file user yang “live”.
-   `temp`: file sementara saat proses upload besar.
-   `backups\files`: backup berkala file penting.
-   `backups\config`: backup konfigurasi `.env`, `settings`, dsb.

**Hubungan**:

-   `backend\app\utils\paths.py` tahu path ke folder-folder ini.
-   `scripts\maintenance\cleanup_old_files.py` bisa menghapus file lama dari `temp` / `shared_files` sesuai aturan.

---

## 7. Scripts & Tests

### 7.1. Scripts

```text
scripts\
├─ dev\
├─ prod\
├─ maintenance\
└─ tools\
```

-   `dev`: jalankan backend/frontend dalam mode dev, reset storage.
-   `prod`: build frontend, migrate DB, deploy backend.
-   `maintenance`: bersih-bersih file lama, rotasi log.
-   `tools`: helper pembentukan secret key, cek lokalisa
