# LANGKAH.md — Urutan & Keterhubungan Struktur Proyek TenRusl BeamDrop Pro

Dokumen ini menjelaskan **urutan pembuatan folder dan file** untuk proyek:

`E:\PROJECT\TENRUSL\TenRusl-BeamDrop-Pro`

Dengan fokus pada:

- **Urutan**: mana yang sebaiknya dibuat dulu.
- **Peran**: fungsi setiap folder/file.
- **Keterhubungan**: folder/file ini dipakai oleh apa dan bergantung pada apa.

Anggap ini seperti **blueprint arsitektur** proyek TenRusl BeamDrop Pro.  

---

## 0. Root Project (Pondasi Utama)

### 0.1. Folder root proyek

1. **Buat folder proyek utama**:

   - **Path**: `E:\PROJECT\TENRUSL\TenRusl-BeamDrop-Pro`
   - **Fungsi**: Menjadi akar (root) seluruh source code, konfigurasi, dokumentasi, dan storage.
   - **Terhubung ke**: semua folder lain di bawahnya.

2. **Buat file root umum** (boleh kosong dulu):

   - **File**:  
     - `E:\PROJECT\TENRUSL\TenRusl-BeamDrop-Pro\.env.example`  
     - `E:\PROJECT\TENRUSL\TenRusl-BeamDrop-Pro\README.md`  
     - `E:\PROJECT\TENRUSL\TenRusl-BeamDrop-Pro\LICENSE`  
     - `E:\PROJECT\TENRUSL\TenRusl-BeamDrop-Pro\create-tenrusl-structure.js`
   - **Fungsi**:  
     - `.env.example` → template variabel environment global.  
     - `README.md` → dokumentasi ringkas cara pakai proyek.  
     - `LICENSE` → lisensi proyek.  
     - `create-tenrusl-structure.js` → script Node.js pembuat struktur otomatis.
   - **Terhubung ke**:  
     - `.env.example` akan disalin menjadi `.env` dan dibaca oleh backend/frontend.  
     - `create-tenrusl-structure.js` digunakan hanya saat setup awal struktur.

> Setelah root siap, lanjut ke **backend** (server), karena frontend nanti akan memanggil API backend.

---

## 1. Backend (Server, API, Security)

Semua kode backend ada di `backend\`. Ini adalah **otak server**, mengelola upload/download file dan keamanan.

### 1.1. Folder backend

3. **Buat folder**:

   - `E:\PROJECT\TENRUSL\TenRusl-BeamDrop-Pro\backend`
   - **Fungsi**: Root untuk seluruh kode backend (Python).
   - **Dipakai oleh**:  
     - `backend\wsgi\*.py` (entry WSGI/ASGI).  
     - `config\docker\Dockerfile.backend` saat build image backend.  
     - `scripts\dev\run_backend_dev.sh` untuk menjalankan server dev.

---

### 1.2. Paket aplikasi backend (`backend\app`)

4. **Buat folder**:

   - `backend\app`
   - **Fungsi**: Paket Python utama: routing, services, models, middleware.
   - **Dipakai oleh**: `backend\wsgi\wsgi.py`, `backend\wsgi\asgi.py`.

5. **Buat file**:

   - `backend\app\__init__.py`  
     - Menandai `app` sebagai package Python.  
     - Biasanya menyimpan fungsi `create_app()` yang memanggil: routes, services, middleware, extensions.
   - `backend\app\main.py`  
     - Titik masuk jika kamu ingin menjalankan server langsung (`python backend\app\main.py`).  
     - Akan memanggil `create_app()` dari `__init__.py`.

**Keterhubungan utama**:

- `main.py` → memanggil `create_app()` → mendaftarkan routes, middleware, security, extensions, dll.
- Extensions, middleware, models, routes saling dihubungkan melalui `create_app()`.

---

### 1.3. Extensions backend (`backend\app\extensions`)

6. **Buat folder**:

   - `backend\app\extensions`

7. **Buat file**:

   - `backend\app\extensions\__init__.py`  
     - Meng-**register** extension seperti DB, cache, limiter.  
     - Biasanya di-import dari `app\__init__.py`.
   - `backend\app\extensions\cache.py`  
     - Menyiapkan objek cache (Redis / in-memory).
   - `backend\app\extensions\db.py`  
     - Menyiapkan koneksi database / ORM.
   - `backend\app\extensions\limiter.py`  
     - Menyiapkan rate limiter (batas request per IP/user).

**Keterhubungan**:

- Dipanggil oleh: `backend\app\__init__.py` ketika app diinisialisasi.
- Dipakai oleh: `services`, `routes`, dan `security` (misalnya limiter di route upload).

---

### 1.4. Middleware (`backend\app\middleware`)

8. **Buat folder**:

   - `backend\app\middleware`

9. **Buat file**:

   - `backend\app\middleware\__init__.py`  
     - Menyediakan fungsi helper untuk mendaftarkan semua middleware ke app.
   - `backend\app\middleware\error_handler.py`  
     - Mengubah error/exception menjadi respon HTTP yang rapi ⇒ digunakan global.
   - `backend\app\middleware\request_logging.py`  
     - Logging setiap request (method, path, status, durasi) ke `logs\backend\access.log` & `logs\backend\app.log`.
   - `backend\app\middleware\security_middleware.py`  
     - Menambah header keamanan dasar, memverifikasi hal-hal penting pada setiap request.

**Keterhubungan**:

- Didaftarkan di `app\__init__.py` saat `create_app()`.  
- `request_logging.py` menulis ke folder `logs\backend`.  
- `error_handler.py` sering menggunakan konfigurasi dari `backend\config\logging_conf.yaml`.

---

### 1.5. Models (`backend\app\models`)

10. **Buat folder**:

    - `backend\app\models`

11. **Buat file**:

    - `backend\app\models\__init__.py`  
      - Meng-**export** semua model sehingga mudah di-import (`from app.models import User`).
    - `backend\app\models\audit_log.py`  
      - Menyimpan data log aktivitas penting (upload, delete, login).  
      - Keluaran bisa ditulis juga ke `logs\backend\security.log` atau DB.
    - `backend\app\models\file_metadata.py`  
      - Menyimpan metadata file yang diupload ke `storage\shared_files`.
    - `backend\app\models\user.py`  
      - Model user (jika TenRusl mendukung multi user, auth, role).

**Keterhubungan**:

- Dipakai oleh: `services\file_service.py`, `services\audit_service.py`, `routes\files.py`, `routes\auth.py`.  
- Bergantung pada: `backend\app\extensions\db.py` (jika pakai DB).

---

### 1.6. Routes (`backend\app\routes`)

12. **Buat folder**:

    - `backend\app\routes`

13. **Buat file**:

    - `backend\app\routes\__init__.py`  
      - Menggabungkan semua blueprint route (files, auth, health, info).  
      - Di-import dan didaftarkan di `app\__init__.py`.
    - `backend\app\routes\auth.py`  
      - Endpoint login/logout/token (opsional).  
      - Bisa memanggil `services\security_service.py` dan `models\user.py`.
    - `backend\app\routes\files.py`  
      - Endpoint upload/download/delete/list file.  
      - Menggunakan `services\file_service.py`, `storage\shared_files`, `services\audit_service.py`.
    - `backend\app\routes\health.py`  
      - Endpoint health check untuk monitoring, digunakan oleh `config\nginx` atau container.
    - `backend\app\routes\info.py`  
      - Memberikan info versi dari `utils\version.py` dan konfigurasi ringan.

**Keterhubungan**:

- Dipakai oleh: frontend (`frontend\src\utils\apiClient.js`) untuk memanggil API.  
- Bergantung pada: `services` (logika bisnis), `security` (proteksi), `middleware` (logging/error).

---

### 1.7. Security (`backend\app\security`)

14. **Buat folder**:

    - `backend\app\security`

15. **Buat file**:

    - `backend\app\security\__init__.py`  
      - Inisialisasi modul keamanan.
    - `backend\app\security\csrf.py`  
      - Proteksi terhadap CSRF.
    - `backend\app\security\headers.py`  
      - Menyediakan konfigurasi header keamanan HTTP (bisa digunakan juga di Nginx).
    - `backend\app\security\rate_limit.py`  
      - Detail aturan rate limit per route/per IP.
    - `backend\app\security\token_utils.py`  
      - Pembuatan & verifikasi token (JWT / custom).

**Keterhubungan**:

- Dipakai oleh: `routes\auth.py`, `routes\files.py`, `middleware\security_middleware.py`.  
- Bergantung pada: `extensions\limiter.py` (untuk rate limit), mungkin `extensions\db.py` untuk token blacklist.

---

### 1.8. Utils (`backend\app\utils`)

16. **Buat folder**:

    - `backend\app\utils`

17. **Buat file**:

    - `backend\app\utils\__init__.py`  
      - Menandai sebagai package utilitas.
    - `backend\app\utils\paths.py`  
      - Menyusun path aman ke `storage\shared_files`, `storage\temp`, dll.
    - `backend\app\utils\serializers.py`  
      - Fungsi helper untuk JSON / response format.
    - `backend\app\utils\validators.py`  
      - Validasi nama file, ekstensi, limit size, dll.
    - `backend\app\utils\version.py`  
      - Menyimpan versi aplikasi → dibaca `routes\info.py` dan juga bisa ditampilkan di frontend.

**Keterhubungan**:

- Dipakai oleh banyak bagian: `services`, `routes`, `tests`.  
- `paths.py` sangat terkait dengan struktur `storage\*`.

---

### 1.9. Konfigurasi backend (`backend\config`)

18. **Buat folder**:

    - `backend\config`

19. **Buat file**:

    - `backend\config\__init__.py`  
      - Memudahkan import (`from backend.config import settings_base`).
    - `backend\config\logging_conf.yaml`  
      - Konfigurasi logging (dipakai oleh middleware dan modul logging).
    - `backend\config\settings_base.py`  
      - Konfigurasi dasar (host, port, folder storage).  
      - Mengarah ke `storage\shared_files`, `logs\backend`, dll.
    - `backend\config\settings_dev.py`  
      - Override saat dev (debug mode on, log lebih verbose).
    - `backend\config\settings_prod.py`  
      - Override saat production (debug off, security ketat).

**Keterhubungan**:

- Dibaca oleh: `app\__init__.py`, `app\main.py`, `wsgi\wsgi.py`, `wsgi\asgi.py`.  
- Sinkron dengan: `config\env\.env.*.example` (nilai ENV akan dipetakan ke settings).

---

### 1.10. Migrations (`backend\migrations`)

20. **Buat folder**:

    - `backend\migrations`
    - **Fungsi**: Tempat script migrasi database.

**Keterhubungan**:

- Dipakai oleh: `scripts\prod\migrate_db.sh`.  
- Bergantung pada: `backend\app\models` dan `backend\config\settings_*`.

---

### 1.11. Requirements backend (`backend\requirements`)

21. **Buat folder**:

    - `backend\requirements`

22. **Buat file**:

    - `backend\requirements\base.txt`  
    - `backend\requirements\dev.txt`  
    - `backend\requirements\prod.txt`  

**Keterhubungan**:

- Dibaca oleh: `scripts\dev\run_backend_dev.sh` dan Dockerfile backend.  
- `base.txt` digunakan di semua environment, `dev.txt` + `prod.txt` menambahkan paket khusus.

---

### 1.12. WSGI / ASGI (`backend\wsgi`)

23. **Buat folder**:

    - `backend\wsgi`

24. **Buat file**:

    - `backend\wsgi\wsgi.py`  
      - Entry WSGI (untuk server seperti gunicorn / uwsgi).
    - `backend\wsgi\asgi.py`  
      - Entry ASGI (untuk uvicorn/daphne).

**Keterhubungan**:

- Dipanggil oleh: server production / config Docker, dan `config\systemd\tenrusl-beamdrop-pro.service`.  
- Meng-import `backend\app\create_app()` dari `app\__init__.py`.

---

## 2. Config (Deployment, Env, Docker, CI)

Semua konfigurasi infra/deployment disimpan di `config\` agar terpisah dari kode.

### 2.1. Folder utama config

25. **Buat folder**:

   - `config`

**Keterhubungan**:

- Menampung konfigurasi untuk CI, Docker, nginx, systemd, env.  
- Sangat terkait dengan `backend\` dan `frontend\` karena mengatur cara mereka dijalankan.

---

### 2.2. CI (Continuous Integration)

26. **Buat folder**:

   - `config\ci`
   - `config\ci\github-actions`
   - `config\ci\gitlab-ci`

27. **Buat file**:

   - `config\ci\github-actions\backend-frontend.yml`  
   - `config\ci\gitlab-ci\.gitlab-ci.yml`  

**Keterhubungan**:

- CI akan menjalankan test di `tests\backend\*` dan `tests\frontend\*`.  
- CI juga bisa menjalankan build frontend (menggunakan `frontend\package.json`) dan check docker (menggunakan `config\docker\*`).

---

### 2.3. Docker

28. **Buat folder**:

   - `config\docker`

29. **Buat file**:

   - `config\docker\Dockerfile.backend`  
   - `config\docker\Dockerfile.frontend`  
   - `config\docker\docker-compose.dev.yml`  
   - `config\docker\docker-compose.prod.yml`  

**Keterhubungan**:

- Dockerfile.backend → mem-build image dari `backend\`.  
- Dockerfile.frontend → mem-build image dari `frontend\`.  
- `docker-compose.*.yml` → menggabungkan backend, frontend, volume `storage\`, dan mungkin `logs\`.

---

### 2.4. Environment examples (`config\env`)

30. **Buat folder**:

   - `config\env`

31. **Buat file**:

   - `config\env\.env.dev.example`  
   - `config\env\.env.local.example`  
   - `config\env\.env.prod.example`  

**Keterhubungan**:

- Nilai di file ini akan dipakai oleh backend & frontend (via `.env` di root).  
- Senada dengan `backend\config\settings_*` dan mungkin config build Vite/webpack.

---

### 2.5. Nginx

32. **Buat folder**:

   - `config\nginx`
   - `config\nginx\snippets`

33. **Buat file**:

   - `config\nginx\tenrusl-beamdrop-pro.conf`  
   - `config\nginx\snippets\security-headers.conf`  

**Keterhubungan**:

- Nginx akan meneruskan request API ke backend (WSGI/ASGI) dan serve file statis hasil build frontend.  
- `security-headers.conf` sejalan dengan `backend\app\security\headers.py` untuk defense in depth.

---

### 2.6. Systemd

34. **Buat folder**:

   - `config\systemd`

35. **Buat file**:

   - `config\systemd\tenrusl-beamdrop-pro.service`  

**Keterhubungan**:

- Unit systemd ini menjalankan backend (via `backend\wsgi\wsgi.py` / `asgi.py`) dan bisa mengacu ke config env.

---

## 3. Dokumentasi (`docs\`)

36. **Buat folder**:

   - `docs`
   - `docs\overview`
   - `docs\architecture`
   - `docs\security`
   - `docs\seo`
   - `docs\i18n`
   - `docs\usage`

37. **Buat file overview**:

   - `docs\overview\introduction.md`  
   - `docs\overview\features.md`  
   - `docs\overview\roadmap.md`  

38. **Buat file arsitektur**:

   - `docs\architecture\backend-architecture.md`  
   - `docs\architecture\frontend-architecture.md`  
   - `docs\architecture\deployment-architecture.md`  

39. **Buat file keamanan**:

   - `docs\security\threat-model.md`  
   - `docs\security\hardening-guide.md`  
   - `docs\security\checklist.md`  

40. **Buat file SEO**:

   - `docs\seo\meta-tags.md`  
   - `docs\seo\performance-checklist.md`  
   - `docs\seo\lighthouse-report.md`  

41. **Buat file i18n**:

   - `docs\i18n\languages-overview.md`  
   - `docs\i18n\translation-guide.md`  

42. **Buat file usage**:

   - `docs\usage\quickstart.md`  
   - `docs\usage\cli-usage.md`  
   - `docs\usage\faq.md`  

**Keterhubungan**:

- Dokumentasi menjelaskan cara kerja `backend`, `frontend`, `locales`, `config`, dan `tests`.  
- Bisa dirujuk dari `README.md` di root.

---

## 4. Frontend (UI/UX, Dark/Light, Multi-language)

### 4.1. Folder frontend & public assets

43. **Buat folder**:

   - `frontend`
   - `frontend\public`
   - `frontend\public\icons`

44. **Buat file**:

   - `frontend\public\index.html`  
   - `frontend\public\favicon.ico`  
   - `frontend\public\manifest.json`  
   - `frontend\public\icons\logo-192.png`  
   - `frontend\public\icons\logo-512.png`  
   - `frontend\public\icons\mask-icon.svg`  

**Keterhubungan**:

- `index.html` menjadi shell aplikasi React (`frontend\src\index.js`).  
- Ikon & manifest digunakan untuk PWA dan SEO, dapat dirujuk di `docs\seo\*`.

---

### 4.2. Source frontend (`frontend\src`)

45. **Buat folder**:

   - `frontend\src`
   - `frontend\src\assets`
   - `frontend\src\assets\fonts`
   - `frontend\src\assets\icons`
   - `frontend\src\assets\illustrations`
   - `frontend\src\components`
   - `frontend\src\components\common`
   - `frontend\src\components\files`
   - `frontend\src\components\howto`
   - `frontend\src\components\layout`
   - `frontend\src\components\upload`
   - `frontend\src\contexts`
   - `frontend\src\hooks`
   - `frontend\src\i18n`
   - `frontend\src\pages`
   - `frontend\src\styles`
   - `frontend\src\utils`

46. **Buat file root React**:

   - `frontend\src\index.js`  
   - `frontend\src\App.jsx`  

**Keterhubungan**:

- `index.js` merender `App.jsx`.  
- `App.jsx` menggunakan `contexts`, `components\layout`, `pages`, dan i18n.  
- `App.jsx` memakai `apiClient.js` untuk memanggil backend routes (misalnya `routes\files.py`).

---

### 4.3. Komponen umum (`frontend\src\components\common`)

47. **Buat file**:

   - `frontend\src\components\common\Alert.jsx`  
   - `frontend\src\components\common\Badge.jsx`  
   - `frontend\src\components\common\Button.jsx`  
   - `frontend\src\components\common\ModalConfirm.jsx`  
   - `frontend\src\components\common\Spinner.jsx`  

**Keterhubungan**:

- Digunakan di banyak tempat: `UploadPanel`, `FileTable`, `Shell`, dsb.  
- `ModalConfirm.jsx` dipakai untuk konfirmasi delete file (yang memanggil API backend).

---

### 4.4. Komponen file (`frontend\src\components\files`)

48. **Buat file**:

   - `frontend\src\components\files\FileFilter.jsx`  
   - `frontend\src\components\files\FileRow.jsx`  
   - `frontend\src\components\files\FileStats.jsx`  
   - `frontend\src\components\files\FileTable.jsx`  

**Keterhubungan**:

- `FileTable.jsx` memanggil API files melalui `useFiles.js` / `apiClient.js`.  
- Data yang ditampilkan berasal dari backend (`routes\files.py`, model `file_metadata.py`).  
- Ikon file memanfaatkan `frontend\src\assets\icons\file-*.svg` dan util `fileTypeUtils.js`.

---

### 4.5. How-to card (`frontend\src\components\howto`)

49. **Buat file**:

   - `frontend\src\components\howto\HowToCard.jsx`  

**Keterhubungan**:

- Menampilkan teks panduan dari i18n (`frontend\src\i18n\messages.*.json`).  
- Ditempatkan di halaman Home (`pages\Home.jsx`).

---

### 4.6. Layout (`frontend\src\components\layout`)

50. **Buat file**:

   - `frontend\src\components\layout\Header.jsx`  
   - `frontend\src\components\layout\Footer.jsx`  
   - `frontend\src\components\layout\Shell.jsx`  
   - `frontend\src\components\layout\ThemeToggle.jsx`  

**Keterhubungan**:

- `Shell.jsx` membungkus halaman utama, menggunakan `ThemeContext` dan `LanguageContext`.  
- `ThemeToggle.jsx` memakai `useTheme.js` untuk mengubah mode dark/light.  
- `Header.jsx` bisa menampilkan versi app dari `utils\version` (via API `routes\info.py`).

---

### 4.7. Upload (`frontend\src\components\upload`)

51. **Buat file**:

   - `frontend\src\components\upload\DropZone.jsx`  
   - `frontend\src\components\upload\UploadPanel.jsx`  

**Keterhubungan**:

- `UploadPanel.jsx` memanggil API upload di backend (`routes\files.py`).  
- `DropZone.jsx` mem-passing file ke `UploadPanel` dan memanfaatkan `useFiles.js` untuk refresh list.

---

### 4.8. Contexts (`frontend\src\contexts`)

52. **Buat file**:

   - `frontend\src\contexts\LanguageContext.jsx`  
   - `frontend\src\contexts\ThemeContext.jsx`  

**Keterhubungan**:

- Dipakai oleh: `App.jsx`, `ThemeToggle.jsx`, komponen yang ingin baca bahasa & tema.  
- `LanguageContext` akan membaca data dari `i18n\messages.*.json`.  
- `ThemeContext` bisa berkaitan dengan preferensi di localStorage.

---

### 4.9. Hooks (`frontend\src\hooks`)

53. **Buat file**:

   - `frontend\src\hooks\useClipboard.js`  
   - `frontend\src\hooks\useFiles.js`  
   - `frontend\src\hooks\useLanguage.js`  
   - `frontend\src\hooks\useTheme.js`  

**Keterhubungan**:

- `useFiles` → memanggil backend (API file) via `apiClient.js`.  
- `useLanguage` → membaca & mengubah bahasa UI, sinkron dengan `LanguageContext` & `locales\frontend\*.json`.  
- `useTheme` → mengatur state tema di `ThemeContext`.  
- `useClipboard` → dipakai di tombol copy URL server.

---

### 4.10. i18n frontend (`frontend\src\i18n`)

54. **Buat file**:

   - `frontend\src\i18n\index.js`  
   - `frontend\src\i18n\messages.en.json`  
   - `frontend\src\i18n\messages.id.json`  
   - `frontend\src\i18n\messages.ar.json`  
   - `frontend\src\i18n\messages.de.json`  
   - `frontend\src\i18n\messages.es.json`  
   - `frontend\src\i18n\messages.hi.json`  
   - `frontend\src\i18n\messages.ja.json`  
   - `frontend\src\i18n\messages.ko.json`  
   - `frontend\src\i18n\messages.pt.json`  
   - `frontend\src\i18n\messages.ru.json`  
   - `frontend\src\i18n\messages.th.json`  
   - `frontend\src\i18n\messages.zh.json`  

**Keterhubungan**:

- Parallel dengan `locales\frontend\*.json` (bisa jadi sumber asli).  
- Dipakai oleh `LanguageContext`, `useLanguage`, dan semua komponen teks UI.  

---

### 4.11. Pages (`frontend\src\pages`)

55. **Buat file**:

   - `frontend\src\pages\Home.jsx`  
   - `frontend\src\pages\NotFound.jsx`  

**Keterhubungan**:

- `Home.jsx` menampilkan gabungan: `Header`, `UploadPanel`, `FileTable`, `HowToCard`.  
- `NotFound.jsx` digunakan oleh router frontend bila path tidak dikenal.

---

### 4.12. Styles (`frontend\src\styles`)

56. **Buat file**:

   - `frontend\src\styles\globals.css`  
   - `frontend\src\styles\variables.css`  
   - `frontend\src\styles\layout.css`  
   - `frontend\src\styles\components.css`  
   - `frontend\src\styles\dark-mode.css`  

**Keterhubungan**:

- Di-import oleh entry React (misalnya `index.js` atau `App.jsx`).  
- `dark-mode.css` bekerja sama dengan `ThemeContext` / `useTheme`.  

---

### 4.13. Assets frontend

57. **Buat file ikon**:

   - `frontend\src\assets\icons\file-archive.svg`  
   - `frontend\src\assets\icons\file-audio.svg`  
   - `frontend\src\assets\icons\file-generic.svg`  
   - `frontend\src\assets\icons\file-image.svg`  
   - `frontend\src\assets\icons\file-video.svg`  
   - `frontend\src\assets\icons\moon.svg`  
   - `frontend\src\assets\icons\sun.svg`  

58. **Buat ilustrasi**:

   - `frontend\src\assets\illustrations\empty-state.svg`  

59. **Folder font**:

   - `frontend\src\assets\fonts`  

**Keterhubungan**:

- Ikon file digunakan oleh `FileRow.jsx` lewat `fileTypeUtils.js`.  
- `moon.svg` / `sun.svg` digunakan di `ThemeToggle.jsx`.  
- `empty-state.svg` muncul ketika belum ada file (data dari backend kosong).

---

### 4.14. Utilitas frontend (`frontend\src\utils`)

60. **Buat file**:

   - `frontend\src\utils\apiClient.js`  
   - `frontend\src\utils\constants.js`  
   - `frontend\src\utils\fileTypeUtils.js`  
   - `frontend\src\utils\seo.js`  
   - `frontend\src\utils\sizeFormatter.js`  

**Keterhubungan**:

- `apiClient.js` memanggil backend routes (`routes\files.py`, `routes\info.py`).  
- `constants.js` bisa menyimpan base URL API, versi, dsb.  
- `fileTypeUtils.js` terkait dengan ikon di `assets\icons`.  
- `seo.js` mendukung pengaturan title/description (selaras dengan `docs\seo\meta-tags.md`).  
- `sizeFormatter.js` paralel dengan format ukuran di backend (supaya tampilan konsisten).

---

### 4.15. Konfigurasi frontend & testing

61. **Buat folder & file**:

   - `frontend\tests`  
   - `frontend\package.json`  
   - `frontend\tsconfig.json`  
   - `frontend\vite.config.js`  
   - `frontend\webpack.config.js`  

**Keterhubungan**:

- `package.json` dipakai oleh CI (`config\ci\*`) dan Dockerfile frontend.  
- `vite.config.js` / `webpack.config.js` mengatur build output yang nanti di-serve oleh Nginx.  
- `frontend\tests` bisa diisi test tambahan di samping `tests\frontend\*` (root).

---

## 5. Locales (Backend & Frontend)

62. **Buat folder**:

   - `locales`
   - `locales\backend`
   - `locales\frontend`

63. **Buat file JSON backend** (`locales\backend`) untuk semua bahasa:

   - `en.json`, `id.json`, `ar.json`, `de.json`, `es.json`, `hi.json`,  
     `ja.json`, `ko.json`, `pt.json`, `ru.json`, `th.json`, `zh.json`  

64. **Buat file JSON frontend** (`locales\frontend`) untuk semua bahasa:

   - `en.json`, `id.json`, `ar.json`, `de.json`, `es.json`, `hi.json`,  
     `ja.json`, `ko.json`, `pt.json`, `ru.json`, `th.json`, `zh.json`  

**Keterhubungan**:

- Backend: dibaca oleh `backend\app\services\i18n_service.py` (nanti) dan digunakan di error / pesan server.  
- Frontend: menjadi sumber string untuk `frontend\src\i18n\messages.*.json` (bisa di-sync via script `scripts\tools\localization_check.py`).  
- Dijelaskan di `docs\i18n\*`.

---

## 6. Logs

65. **Buat folder**:

   - `logs`
   - `logs\backend`
   - `logs\frontend`

66. **Buat file log**:

   - `logs\backend\access.log`  
   - `logs\backend\app.log`  
   - `logs\backend\security.log`  
   - `logs\frontend\error.log`  

**Keterhubungan**:

- Ditulis oleh backend (middleware logging, security, app) dan oleh frontend (error logging).  
- Diproses / dibersihkan oleh `scripts\maintenance\rotate_logs.sh`.  

---

## 7. Scripts

67. **Buat folder**:

   - `scripts`
   - `scripts\dev`
   - `scripts\prod`
   - `scripts\maintenance`
   - `scripts\tools`

68. **Buat file dev**:

   - `scripts\dev\run_backend_dev.sh`  
   - `scripts\dev\run_frontend_dev.sh`  
   - `scripts\dev\reset_storage.sh`  

69. **Buat file prod**:

   - `scripts\prod\build_frontend.sh`  
   - `scripts\prod\deploy.sh`  
   - `scripts\prod\migrate_db.sh`  

70. **Buat file maintenance/tools**:

   - `scripts\maintenance\cleanup_old_files.py`  
   - `scripts\maintenance\rotate_logs.sh`  
   - `scripts\tools\generate_secret_key.py`  
   - `scripts\tools\localization_check.py`  

**Keterhubungan**:

- Dev scripts memakai: `backend\requirements\dev.txt`, `frontend\package.json`, `storage\*`.  
- Prod scripts memakai: `config\docker\*`, `backend\requirements\prod.txt`, `backend\migrations\*`.  
- Maintenance scripts memakai: `logs\*` dan `storage\*`.  
- `generate_secret_key.py` membantu membuat nilai SECRET_KEY untuk `.env` (backend security).  
- `localization_check.py` membandingkan `locales\backend` dan `locales\frontend` agar konsisten.

---

## 8. Storage

71. **Buat folder**:

   - `storage`
   - `storage\shared_files`
   - `storage\temp`
   - `storage\backups`
   - `storage\backups\files`
   - `storage\backups\config`

**Keterhubungan**:

- `storage\shared_files` → dipakai langsung oleh backend (`file_service.py`) sebagai lokasi file upload.  
- `storage\temp` → dipakai untuk file sementara ketika upload besar.  
- `storage\backups\files` & `storage\backups\config` → digunakan oleh script backup & maintenance.  
- Path-nya diatur di `backend\config\settings_*` dan mungkin di `.env`.

---

## 9. Tests (Root Testing Structure)

72. **Buat folder**:

   - `tests`
   - `tests\backend`
   - `tests\backend\unit`
   - `tests\backend\integration`
   - `tests\backend\security`
   - `tests\frontend`
   - `tests\frontend\unit`
   - `tests\frontend\e2e`

73. **Buat file test backend**:

   - `tests\backend\unit\test_file_service.py`  
   - `tests\backend\unit\test_security_service.py`  
   - `tests\backend\unit\test_utils.py`  
   - `tests\backend\integration\test_routes_files.py`  
   - `tests\backend\integration\test_upload_limits.py`  
   - `tests\backend\security\test_headers.py`  
   - `tests\backend\security\test_rate_limit.py`  

74. **Buat file test frontend**:

   - `tests\frontend\unit\FileTable.test.jsx`  
   - `tests\frontend\unit\LanguageSwitcher.test.jsx`  
   - `tests\frontend\unit\ThemeToggle.test.jsx`  
   - `tests\frontend\e2e\upload_flow.spec.js`  
   - `tests\frontend\e2e\delete_flow.spec.js`  

**Keterhubungan**:

- CI (`config\ci\*`) akan menjalankan test ini.  
- Test backend memanggil kode dari `backend\app\*`.  
- Test frontend memanggil komponen di `frontend\src\*` dan juga dapat menjalankan flow end-to-end yang menyentuh backend API.

---

## 10. Ringkasan Keterhubungan Besar

- **Frontend**:
  - Menggunakan API dari **Backend** (`routes\files.py`, `routes\info.py`, `routes\health.py`).  
  - Memakai **Locales** (frontend) untuk multi-bahasa dan bekerja sama dengan **docs\i18n**.  

- **Backend**:
  - Menyimpan data file di **Storage** (`storage\shared_files`).  
  - Menulis aktivitas ke **Logs** (`logs\backend\*`).  
  - Membaca konfigurasi dari **Config** (`backend\config` + `config\env`).  

- **Scripts**:
  - Mengotomasi dev/prod/maintenance dengan menjalankan backend, frontend, migrasi, backup, dan rotasi log.  

- **Tests**:
  - Menjamin bahwa perubahan pada backend/frontend tetap aman dan stabil.  
  - Terintegrasi dengan **CI** yang ada di `config\ci\*`.  

Dengan langkah dan keterhubungan di atas, struktur:

`E:\PROJECT\TENRUSL\TenRusl-BeamDrop-Pro`

menjadi **super terstruktur, saling terhubung, dan siap diisi kode** TenRusl BeamDrop Pro.