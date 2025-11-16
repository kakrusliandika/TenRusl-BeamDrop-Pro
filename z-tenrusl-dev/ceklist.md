# ceklist.md — Checklist Pembuatan Struktur TenRusl BeamDrop Pro

Checklist ini membantu kamu membuat **seluruh folder & file** TenRusl BeamDrop Pro secara **berurutan**, supaya struktur project dan script generator (`create-tenrusl-structure.js`) tetap konsisten.

Gunakan tanda centang `[x]` saat langkah sudah selesai, dan `[ ]` untuk yang belum.

> **Root project:**  
> `E:\PROJECT\TENRUSL\TenRusl-BeamDrop-Pro`

---

## 0. Root Project

-   [ ] Buat folder root proyek: `E:\PROJECT\TENRUSL\TenRusl-BeamDrop-Pro`
-   [ ] Buat file `.env.example`
-   [ ] Buat file `README.md`
-   [ ] Buat file `LICENSE`
-   [ ] Buat file `create-tenrusl-structure.js`

---

## 1. Backend

### 1.1. Struktur dasar backend

-   [ ] Buat folder `backend`
-   [ ] Buat folder `backend\app`
-   [ ] Buat folder `backend\config`
-   [ ] Buat folder `backend\migrations`
-   [ ] Buat folder `backend\requirements`
-   [ ] Buat folder `backend\wsgi`

### 1.2. File utama backend/app

-   [ ] Buat file `backend\app\__init__.py`
-   [ ] Buat file `backend\app\main.py`

### 1.3. Extensions

-   [ ] Buat folder `backend\app\extensions`
-   [ ] Buat file `backend\app\extensions\__init__.py`
-   [ ] Buat file `backend\app\extensions\cache.py`
-   [ ] Buat file `backend\app\extensions\db.py`
-   [ ] Buat file `backend\app\extensions\limiter.py`

### 1.4. Middleware

-   [ ] Buat folder `backend\app\middleware`
-   [ ] Buat file `backend\app\middleware\__init__.py`
-   [ ] Buat file `backend\app\middleware\error_handler.py`
-   [ ] Buat file `backend\app\middleware\request_logging.py`
-   [ ] Buat file `backend\app\middleware\security_middleware.py`

### 1.5. Models

-   [ ] Buat folder `backend\app\models`
-   [ ] Buat file `backend\app\models\__init__.py`
-   [ ] Buat file `backend\app\models\audit_log.py`
-   [ ] Buat file `backend\app\models\file_metadata.py`
-   [ ] Buat file `backend\app\models\user.py`

### 1.6. Routes

-   [ ] Buat folder `backend\app\routes`
-   [ ] Buat file `backend\app\routes\__init__.py`
-   [ ] Buat file `backend\app\routes\auth.py`
-   [ ] Buat file `backend\app\routes\files.py`
-   [ ] Buat file `backend\app\routes\health.py`
-   [ ] Buat file `backend\app\routes\info.py`

### 1.7. Security

-   [ ] Buat folder `backend\app\security`
-   [ ] Buat file `backend\app\security\__init__.py`
-   [ ] Buat file `backend\app\security\csrf.py`
-   [ ] Buat file `backend\app\security\headers.py`
-   [ ] Buat file `backend\app\security\rate_limit.py`
-   [ ] Buat file `backend\app\security\token_utils.py`

### 1.8. Utils

-   [ ] Buat folder `backend\app\utils`
-   [ ] Buat file `backend\app\utils\__init__.py`
-   [ ] Buat file `backend\app\utils\paths.py`
-   [ ] Buat file `backend\app\utils\serializers.py`
-   [ ] Buat file `backend\app\utils\validators.py`
-   [ ] Buat file `backend\app\utils\version.py`

### 1.9. Config backend

-   [ ] Buat file `backend\config\__init__.py`
-   [ ] Buat file `backend\config\logging_conf.yaml`
-   [ ] Buat file `backend\config\settings_base.py`
-   [ ] Buat file `backend\config\settings_dev.py`
-   [ ] Buat file `backend\config\settings_prod.py`

### 1.10. Migrations

-   [ ] Pastikan folder `backend\migrations` sudah ada (boleh kosong dulu)

### 1.11. Requirements backend

-   [ ] Buat file `backend\requirements\base.txt`
-   [ ] Buat file `backend\requirements\dev.txt`
-   [ ] Buat file `backend\requirements\prod.txt`

### 1.12. WSGI / ASGI

-   [ ] Buat file `backend\wsgi\wsgi.py`
-   [ ] Buat file `backend\wsgi\asgi.py`

---

## 2. Config (CI, Docker, Env, Nginx, Systemd)

### 2.1. Struktur dasar config

-   [ ] Buat folder `config`
-   [ ] Buat folder `config\ci`
-   [ ] Buat folder `config\ci\github-actions`
-   [ ] Buat folder `config\ci\gitlab-ci`
-   [ ] Buat folder `config\docker`
-   [ ] Buat folder `config\env`
-   [ ] Buat folder `config\nginx`
-   [ ] Buat folder `config\nginx\snippets`
-   [ ] Buat folder `config\systemd`

### 2.2. CI

-   [ ] Buat file `config\ci\github-actions\backend-frontend.yml`
-   [ ] Buat file `config\ci\gitlab-ci\.gitlab-ci.yml`

### 2.3. Docker

-   [ ] Buat file `config\docker\Dockerfile.backend`
-   [ ] Buat file `config\docker\Dockerfile.frontend`
-   [ ] Buat file `config\docker\docker-compose.dev.yml`
-   [ ] Buat file `config\docker\docker-compose.prod.yml`

### 2.4. Env examples

-   [ ] Buat file `config\env\.env.dev.example`
-   [ ] Buat file `config\env\.env.local.example`
-   [ ] Buat file `config\env\.env.prod.example`

### 2.5. Nginx

-   [ ] Buat file `config\nginx\tenrusl-beamdrop-pro.conf`
-   [ ] Buat file `config\nginx\snippets\security-headers.conf`

### 2.6. Systemd

-   [ ] Buat file `config\systemd\tenrusl-beamdrop-pro.service`

---

## 3. Dokumentasi (docs)

### 3.1. Struktur dasar docs

-   [ ] Buat folder `docs`
-   [ ] Buat folder `docs\overview`
-   [ ] Buat folder `docs\architecture`
-   [ ] Buat folder `docs\security`
-   [ ] Buat folder `docs\seo`
-   [ ] Buat folder `docs\i18n`
-   [ ] Buat folder `docs\usage`

### 3.2. Overview

-   [ ] Buat file `docs\overview\introduction.md`
-   [ ] Buat file `docs\overview\features.md`
-   [ ] Buat file `docs\overview\roadmap.md`

### 3.3. Architecture

-   [ ] Buat file `docs\architecture\backend-architecture.md`
-   [ ] Buat file `docs\architecture\frontend-architecture.md`
-   [ ] Buat file `docs\architecture\deployment-architecture.md`

### 3.4. Security docs

-   [ ] Buat file `docs\security\threat-model.md`
-   [ ] Buat file `docs\security\hardening-guide.md`
-   [ ] Buat file `docs\security\checklist.md`

### 3.5. SEO docs

-   [ ] Buat file `docs\seo\meta-tags.md`
-   [ ] Buat file `docs\seo\performance-checklist.md`
-   [ ] Buat file `docs\seo\lighthouse-report.md`

### 3.6. i18n docs

-   [ ] Buat file `docs\i18n\languages-overview.md`
-   [ ] Buat file `docs\i18n\translation-guide.md`

### 3.7. Usage docs

-   [ ] Buat file `docs\usage\quickstart.md`
-   [ ] Buat file `docs\usage\cli-usage.md`
-   [ ] Buat file `docs\usage\faq.md`

---

## 4. Frontend

### 4.1. Struktur dasar frontend & public

-   [ ] Buat folder `frontend`
-   [ ] Buat folder `frontend\public`
-   [ ] Buat folder `frontend\public\icons`

### 4.2. File public

-   [ ] Buat file `frontend\public\index.html`
-   [ ] Buat file `frontend\public\favicon.ico`
-   [ ] Buat file `frontend\public\manifest.json`
-   [ ] Buat file `frontend\public\icons\logo-192.png`
-   [ ] Buat file `frontend\public\icons\logo-512.png`
-   [ ] Buat file `frontend\public\icons\mask-icon.svg`

### 4.3. Struktur dasar `frontend\src`

-   [ ] Buat folder `frontend\src`
-   [ ] Buat folder `frontend\src\assets`
-   [ ] Buat folder `frontend\src\assets\fonts`
-   [ ] Buat folder `frontend\src\assets\icons`
-   [ ] Buat folder `frontend\src\assets\illustrations`
-   [ ] Buat folder `frontend\src\components`
-   [ ] Buat folder `frontend\src\components\common`
-   [ ] Buat folder `frontend\src\components\files`
-   [ ] Buat folder `frontend\src\components\howto`
-   [ ] Buat folder `frontend\src\components\layout`
-   [ ] Buat folder `frontend\src\components\upload`
-   [ ] Buat folder `frontend\src\contexts`
-   [ ] Buat folder `frontend\src\hooks`
-   [ ] Buat folder `frontend\src\i18n`
-   [ ] Buat folder `frontend\src\pages`
-   [ ] Buat folder `frontend\src\styles`
-   [ ] Buat folder `frontend\src\utils`

### 4.4. Entry React

-   [ ] Buat file `frontend\src\index.js`
-   [ ] Buat file `frontend\src\App.jsx`

### 4.5. Components: common

-   [ ] Buat file `frontend\src\components\common\Alert.jsx`
-   [ ] Buat file `frontend\src\components\common\Badge.jsx`
-   [ ] Buat file `frontend\src\components\common\Button.jsx`
-   [ ] Buat file `frontend\src\components\common\ModalConfirm.jsx`
-   [ ] Buat file `frontend\src\components\common\Spinner.jsx`

### 4.6. Components: files

-   [ ] Buat file `frontend\src\components\files\FileFilter.jsx`
-   [ ] Buat file `frontend\src\components\files\FileRow.jsx`
-   [ ] Buat file `frontend\src\components\files\FileStats.jsx`
-   [ ] Buat file `frontend\src\components\files\FileTable.jsx`

### 4.7. Components: howto

-   [ ] Buat file `frontend\src\components\howto\HowToCard.jsx`

### 4.8. Components: layout

-   [ ] Buat file `frontend\src\components\layout\Header.jsx`
-   [ ] Buat file `frontend\src\components\layout\Footer.jsx`
-   [ ] Buat file `frontend\src\components\layout\Shell.jsx`
-   [ ] Buat file `frontend\src\components\layout\ThemeToggle.jsx`

### 4.9. Components: upload

-   [ ] Buat file `frontend\src\components\upload\DropZone.jsx`
-   [ ] Buat file `frontend\src\components\upload\UploadPanel.jsx`

### 4.10. Contexts

-   [ ] Buat file `frontend\src\contexts\LanguageContext.jsx`
-   [ ] Buat file `frontend\src\contexts\ThemeContext.jsx`

### 4.11. Hooks

-   [ ] Buat file `frontend\src\hooks\useClipboard.js`
-   [ ] Buat file `frontend\src\hooks\useFiles.js`
-   [ ] Buat file `frontend\src\hooks\useLanguage.js`
-   [ ] Buat file `frontend\src\hooks\useTheme.js`

### 4.12. i18n frontend

-   [ ] Buat file `frontend\src\i18n\index.js`
-   [ ] Buat file `frontend\src\i18n\messages.en.json`
-   [ ] Buat file `frontend\src\i18n\messages.id.json`
-   [ ] Buat file `frontend\src\i18n\messages.ar.json`
-   [ ] Buat file `frontend\src\i18n\messages.de.json`
-   [ ] Buat file `frontend\src\i18n\messages.es.json`
-   [ ] Buat file `frontend\src\i18n\messages.hi.json`
-   [ ] Buat file `frontend\src\i18n\messages.ja.json`
-   [ ] Buat file `frontend\src\i18n\messages.ko.json`
-   [ ] Buat file `frontend\src\i18n\messages.pt.json`
-   [ ] Buat file `frontend\src\i18n\messages.ru.json`
-   [ ] Buat file `frontend\src\i18n\messages.th.json`
-   [ ] Buat file `frontend\src\i18n\messages.zh.json`

### 4.13. Pages

-   [ ] Buat file `frontend\src\pages\Home.jsx`
-   [ ] Buat file `frontend\src\pages\NotFound.jsx`

### 4.14. Styles

-   [ ] Buat file `frontend\src\styles\globals.css`
-   [ ] Buat file `frontend\src\styles\variables.css`
-   [ ] Buat file `frontend\src\styles\layout.css`
-   [ ] Buat file `frontend\src\styles\components.css`
-   [ ] Buat file `frontend\src\styles\dark-mode.css`

### 4.15. Assets frontend

-   [ ] Buat file `frontend\src\assets\icons\file-archive.svg`
-   [ ] Buat file `frontend\src\assets\icons\file-audio.svg`
-   [ ] Buat file `frontend\src\assets\icons\file-generic.svg`
-   [ ] Buat file `frontend\src\assets\icons\file-image.svg`
-   [ ] Buat file `frontend\src\assets\icons\file-video.svg`
-   [ ] Buat file `frontend\src\assets\icons\moon.svg`
-   [ ] Buat file `frontend\src\assets\icons\sun.svg`
-   [ ] Buat file `frontend\src\assets\illustrations\empty-state.svg`
-   [ ] Pastikan folder `frontend\src\assets\fonts` sudah ada (boleh kosong dulu)

### 4.16. Konfigurasi frontend & tests lokal

-   [ ] Buat folder `frontend\tests`
-   [ ] Buat file `frontend\package.json`
-   [ ] Buat file `frontend\tsconfig.json`
-   [ ] Buat file `frontend\vite.config.js`
-   [ ] Buat file `frontend\webpack.config.js`

---

## 5. Locales (Backend & Frontend)

### 5.1. Struktur dasar locales

-   [ ] Buat folder `locales`
-   [ ] Buat folder `locales\backend`
-   [ ] Buat folder `locales\frontend`

### 5.2. Locales backend

-   [ ] Buat file `locales\backend\en.json`
-   [ ] Buat file `locales\backend\id.json`
-   [ ] Buat file `locales\backend\ar.json`
-   [ ] Buat file `locales\backend\de.json`
-   [ ] Buat file `locales\backend\es.json`
-   [ ] Buat file `locales\backend\hi.json`
-   [ ] Buat file `locales\backend\ja.json`
-   [ ] Buat file `locales\backend\ko.json`
-   [ ] Buat file `locales\backend\pt.json`
-   [ ] Buat file `locales\backend\ru.json`
-   [ ] Buat file `locales\backend\th.json`
-   [ ] Buat file `locales\backend\zh.json`

### 5.3. Locales frontend

-   [ ] Buat file `locales\frontend\en.json`
-   [ ] Buat file `locales\frontend\id.json`
-   [ ] Buat file `locales\frontend\ar.json`
-   [ ] Buat file `locales\frontend\de.json`
-   [ ] Buat file `locales\frontend\es.json`
-   [ ] Buat file `locales\frontend\hi.json`
-   [ ] Buat file `locales\frontend\ja.json`
-   [ ] Buat file `locales\frontend\ko.json`
-   [ ] Buat file `locales\frontend\pt.json`
-   [ ] Buat file `locales\frontend\ru.json`
-   [ ] Buat file `locales\frontend\th.json`
-   [ ] Buat file `locales\frontend\zh.json`

---

## 6. Logs

-   [ ] Buat folder `logs`
-   [ ] Buat folder `logs\backend`
-   [ ] Buat folder `logs\frontend`
-   [ ] Buat file `logs\backend\access.log`
-   [ ] Buat file `logs\backend\app.log`
-   [ ] Buat file `logs\backend\security.log`
-   [ ] Buat file `logs\frontend\error.log`

---

## 7. Scripts

### 7.1. Struktur dasar scripts

-   [ ] Buat folder `scripts`
-   [ ] Buat folder `scripts\dev`
-   [ ] Buat folder `scripts\prod`
-   [ ] Buat folder `scripts\maintenance`
-   [ ] Buat folder `scripts\tools`

### 7.2. Scripts dev

-   [ ] Buat file `scripts\dev\run_backend_dev.sh`
-   [ ] Buat file `scripts\dev\run_frontend_dev.sh`
-   [ ] Buat file `scripts\dev\reset_storage.sh`

### 7.3. Scripts prod

-   [ ] Buat file `scripts\prod\build_frontend.sh`
-   [ ] Buat file `scripts\prod\migrate_db.sh`
-   [ ] Buat file `scripts\prod\deploy.sh`

### 7.4. Scripts maintenance/tools

-   [ ] Buat file `scripts\maintenance\cleanup_old_files.py`
-   [ ] Buat file `scripts\maintenance\rotate_logs.sh`
-   [ ] Buat file `scripts\tools\generate_secret_key.py`
-   [ ] Buat file `scripts\tools\localization_check.py`

---

## 8. Storage

-   [ ] Buat folder `storage`
-   [ ] Buat folder `storage\shared_files`
-   [ ] Buat folder `storage\temp`
-   [ ] Buat folder `storage\backups`
-   [ ] Buat folder `storage\backups\files`
-   [ ] Buat folder `storage\backups\config`

---

## 9. Tests (Root)

### 9.1. Struktur dasar tests

-   [ ] Buat folder `tests`
-   [ ] Buat folder `tests\backend`
-   [ ] Buat folder `tests\backend\unit`
-   [ ] Buat folder `tests\backend\integration`
-   [ ] Buat folder `tests\backend\security`
-   [ ] Buat folder `tests\frontend`
-   [ ] Buat folder `tests\frontend\unit`
-   [ ] Buat folder `tests\frontend\e2e`

### 9.2. Tests backend

-   [ ] Buat file `tests\backend\unit\test_file_service.py`
-   [ ] Buat file `tests\backend\unit\test_security_service.py`
-   [ ] Buat file `tests\backend\unit\test_utils.py`
-   [ ] Buat file `tests\backend\integration\test_routes_files.py`
-   [ ] Buat file `tests\backend\integration\test_upload_limits.py`
-   [ ] Buat file `tests\backend\security\test_headers.py`
-   [ ] Buat file `tests\backend\security\test_rate_limit.py`

### 9.3. Tests frontend

-   [ ] Buat file `tests\frontend\unit\FileTable.test.jsx`
-   [ ] Buat file `tests\frontend\unit\LanguageSwitcher.test.jsx`
-   [ ] Buat file `tests\frontend\unit\ThemeToggle.test.jsx`
-   [ ] Buat file `tests\frontend\e2e\upload_flow.spec.js`
-   [ ] Buat file `tests\frontend\e2e\delete_flow.spec.js`

---

## 10. Selesai

Jika semua checkbox sudah tercentang, struktur TenRusl BeamDrop Pro sudah **lengkap** dan siap diisi kode.  
Checklist ini bisa kamu jadikan acuan saat menulis script otomatis (`create-tenrusl-structure.js`) agar output-nya 100% konsisten.
