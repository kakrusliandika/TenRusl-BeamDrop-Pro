// create-tenrusl-structure.js
// Script untuk membuat struktur folder & file TenRusl BeamDrop Pro (kosong).
// node create-tenrusl-structure.js


const fs = require("fs");
const path = require("path");

const baseDir = path.resolve(__dirname);

// Daftar semua direktori yang akan dibuat
const directories = [
    // Root
    "",
    "backend",
    "frontend",
    "config",
    "locales",
    "scripts",
    "tests",
    "docs",
    "logs",
    "storage",

    // Backend
    "backend/app",
    "backend/app/routes",
    "backend/app/services",
    "backend/app/models",
    "backend/app/security",
    "backend/app/utils",
    "backend/app/middleware",
    "backend/app/extensions",
    "backend/config",
    "backend/requirements",
    "backend/migrations",
    "backend/wsgi",

    // Frontend
    "frontend/public",
    "frontend/public/icons",
    "frontend/src",
    "frontend/src/components",
    "frontend/src/components/layout",
    "frontend/src/components/files",
    "frontend/src/components/upload",
    "frontend/src/components/howto",
    "frontend/src/components/common",
    "frontend/src/pages",
    "frontend/src/hooks",
    "frontend/src/contexts",
    "frontend/src/styles",
    "frontend/src/assets",
    "frontend/src/assets/icons",
    "frontend/src/assets/illustrations",
    "frontend/src/assets/fonts",
    "frontend/src/utils",
    "frontend/src/i18n",
    "frontend/tests",
    "frontend/tests/components",
    "frontend/tests/e2e",

    // Config
    "config/env",
    "config/nginx",
    "config/nginx/snippets",
    "config/systemd",
    "config/docker",
    "config/ci",
    "config/ci/github-actions",
    "config/ci/gitlab-ci",

    // Locales
    "locales/backend",
    "locales/frontend",

    // Scripts
    "scripts/dev",
    "scripts/prod",
    "scripts/maintenance",
    "scripts/tools",

    // Tests (root)
    "tests/backend",
    "tests/backend/unit",
    "tests/backend/integration",
    "tests/backend/security",
    "tests/frontend",
    "tests/frontend/unit",
    "tests/frontend/e2e",

    // Docs
    "docs/overview",
    "docs/architecture",
    "docs/security",
    "docs/seo",
    "docs/i18n",
    "docs/usage",

    // Logs
    "logs/backend",
    "logs/frontend",

    // Storage
    "storage/shared_files",
    "storage/temp",
    "storage/backups",
    "storage/backups/files",
    "storage/backups/config",
];

// Daftar semua file kosong yang akan dibuat
const files = [
    // Root files
    ".env.example",
    "README.md",
    "LICENSE",

    // Backend app
    "backend/app/__init__.py",
    "backend/app/main.py",

    // Backend routes
    "backend/app/routes/__init__.py",
    "backend/app/routes/files.py",
    "backend/app/routes/health.py",
    "backend/app/routes/auth.py",
    "backend/app/routes/info.py",

    // Backend services
    "backend/app/services/__init__.py",
    "backend/app/services/file_service.py",
    "backend/app/services/security_service.py",
    "backend/app/services/audit_service.py",
    "backend/app/services/i18n_service.py",

    // Backend models
    "backend/app/models/__init__.py",
    "backend/app/models/file_metadata.py",
    "backend/app/models/user.py",
    "backend/app/models/audit_log.py",

    // Backend security
    "backend/app/security/__init__.py",
    "backend/app/security/csrf.py",
    "backend/app/security/rate_limit.py",
    "backend/app/security/token_utils.py",
    "backend/app/security/headers.py",

    // Backend utils
    "backend/app/utils/__init__.py",
    "backend/app/utils/paths.py",
    "backend/app/utils/validators.py",
    "backend/app/utils/serializers.py",
    "backend/app/utils/version.py",

    // Backend middleware
    "backend/app/middleware/__init__.py",
    "backend/app/middleware/request_logging.py",
    "backend/app/middleware/error_handler.py",
    "backend/app/middleware/security_middleware.py",

    // Backend extensions
    "backend/app/extensions/__init__.py",
    "backend/app/extensions/cache.py",
    "backend/app/extensions/db.py",
    "backend/app/extensions/limiter.py",

    // Backend config
    "backend/config/__init__.py",
    "backend/config/settings_base.py",
    "backend/config/settings_dev.py",
    "backend/config/settings_prod.py",
    "backend/config/logging_conf.yaml",

    // Backend requirements
    "backend/requirements/base.txt",
    "backend/requirements/dev.txt",
    "backend/requirements/prod.txt",

    // Backend wsgi/asgi
    "backend/wsgi/wsgi.py",
    "backend/wsgi/asgi.py",

    // Frontend public
    "frontend/public/index.html",
    "frontend/public/favicon.ico",
    "frontend/public/manifest.json",
    "frontend/public/icons/logo-192.png",
    "frontend/public/icons/logo-512.png",
    "frontend/public/icons/mask-icon.svg",

    // Frontend src root
    "frontend/src/index.js",
    "frontend/src/App.jsx",

    // Frontend components/layout
    "frontend/src/components/layout/Header.jsx",
    "frontend/src/components/layout/Footer.jsx",
    "frontend/src/components/layout/Shell.jsx",
    "frontend/src/components/layout/ThemeToggle.jsx",

    // Frontend components/files
    "frontend/src/components/files/FileTable.jsx",
    "frontend/src/components/files/FileRow.jsx",
    "frontend/src/components/files/FileStats.jsx",
    "frontend/src/components/files/FileFilter.jsx",

    // Frontend components/upload
    "frontend/src/components/upload/UploadPanel.jsx",
    "frontend/src/components/upload/DropZone.jsx",

    // Frontend components/howto
    "frontend/src/components/howto/HowToCard.jsx",

    // Frontend components/common
    "frontend/src/components/common/Button.jsx",
    "frontend/src/components/common/Badge.jsx",
    "frontend/src/components/common/Alert.jsx",
    "frontend/src/components/common/ModalConfirm.jsx",
    "frontend/src/components/common/Spinner.jsx",

    // Frontend pages
    "frontend/src/pages/Home.jsx",
    "frontend/src/pages/NotFound.jsx",

    // Frontend hooks
    "frontend/src/hooks/useTheme.js",
    "frontend/src/hooks/useFiles.js",
    "frontend/src/hooks/useLanguage.js",
    "frontend/src/hooks/useClipboard.js",

    // Frontend contexts
    "frontend/src/contexts/ThemeContext.jsx",
    "frontend/src/contexts/LanguageContext.jsx",

    // Frontend styles
    "frontend/src/styles/globals.css",
    "frontend/src/styles/variables.css",
    "frontend/src/styles/layout.css",
    "frontend/src/styles/components.css",
    "frontend/src/styles/dark-mode.css",

    // Frontend assets/icons
    "frontend/src/assets/icons/file-generic.svg",
    "frontend/src/assets/icons/file-image.svg",
    "frontend/src/assets/icons/file-video.svg",
    "frontend/src/assets/icons/file-audio.svg",
    "frontend/src/assets/icons/file-archive.svg",
    "frontend/src/assets/icons/sun.svg",
    "frontend/src/assets/icons/moon.svg",

    // Frontend assets/illustrations
    "frontend/src/assets/illustrations/empty-state.svg",

    // Frontend utils
    "frontend/src/utils/apiClient.js",
    "frontend/src/utils/fileTypeUtils.js",
    "frontend/src/utils/sizeFormatter.js",
    "frontend/src/utils/seo.js",
    "frontend/src/utils/constants.js",

    // Frontend i18n
    "frontend/src/i18n/index.js",
    "frontend/src/i18n/messages.en.json",
    "frontend/src/i18n/messages.id.json",
    "frontend/src/i18n/messages.ar.json",
    "frontend/src/i18n/messages.de.json",
    "frontend/src/i18n/messages.hi.json",
    "frontend/src/i18n/messages.ja.json",
    "frontend/src/i18n/messages.ko.json",
    "frontend/src/i18n/messages.pt.json",
    "frontend/src/i18n/messages.ru.json",
    "frontend/src/i18n/messages.th.json",
    "frontend/src/i18n/messages.zh.json",
    "frontend/src/i18n/messages.es.json",

    // Frontend tests
    "frontend/tests/components/.gitkeep",
    "frontend/tests/e2e/.gitkeep",

    // Frontend configs
    "frontend/package.json",
    "frontend/vite.config.js",
    "frontend/webpack.config.js",
    "frontend/tsconfig.json",

    // Config env examples
    "config/env/.env.dev.example",
    "config/env/.env.prod.example",
    "config/env/.env.local.example",

    // Config nginx
    "config/nginx/tenrusl-beamdrop-pro.conf",
    "config/nginx/snippets/security-headers.conf",

    // Config systemd
    "config/systemd/tenrusl-beamdrop-pro.service",

    // Config docker
    "config/docker/Dockerfile.backend",
    "config/docker/Dockerfile.frontend",
    "config/docker/docker-compose.dev.yml",
    "config/docker/docker-compose.prod.yml",

    // Config CI
    "config/ci/github-actions/backend-frontend.yml",
    "config/ci/gitlab-ci/.gitlab-ci.yml",

    // Locales backend
    "locales/backend/en.json",
    "locales/backend/id.json",
    "locales/backend/ar.json",
    "locales/backend/de.json",
    "locales/backend/hi.json",
    "locales/backend/ja.json",
    "locales/backend/ko.json",
    "locales/backend/pt.json",
    "locales/backend/ru.json",
    "locales/backend/th.json",
    "locales/backend/zh.json",
    "locales/backend/es.json",

    // Locales frontend
    "locales/frontend/en.json",
    "locales/frontend/id.json",
    "locales/frontend/ar.json",
    "locales/frontend/de.json",
    "locales/frontend/hi.json",
    "locales/frontend/ja.json",
    "locales/frontend/ko.json",
    "locales/frontend/pt.json",
    "locales/frontend/ru.json",
    "locales/frontend/th.json",
    "locales/frontend/zh.json",
    "locales/frontend/es.json",

    // Scripts dev
    "scripts/dev/run_backend_dev.sh",
    "scripts/dev/run_frontend_dev.sh",
    "scripts/dev/reset_storage.sh",

    // Scripts prod
    "scripts/prod/build_frontend.sh",
    "scripts/prod/migrate_db.sh",
    "scripts/prod/deploy.sh",

    // Scripts maintenance
    "scripts/maintenance/cleanup_old_files.py",
    "scripts/maintenance/rotate_logs.sh",

    // Scripts tools
    "scripts/tools/generate_secret_key.py",
    "scripts/tools/localization_check.py",

    // Root tests/backend
    "tests/backend/unit/test_file_service.py",
    "tests/backend/unit/test_security_service.py",
    "tests/backend/unit/test_utils.py",
    "tests/backend/integration/test_routes_files.py",
    "tests/backend/integration/test_upload_limits.py",
    "tests/backend/security/test_headers.py",
    "tests/backend/security/test_rate_limit.py",

    // Root tests/frontend
    "tests/frontend/unit/FileTable.test.jsx",
    "tests/frontend/unit/ThemeToggle.test.jsx",
    "tests/frontend/unit/LanguageSwitcher.test.jsx",
    "tests/frontend/e2e/upload_flow.spec.js",
    "tests/frontend/e2e/delete_flow.spec.js",

    // Docs overview
    "docs/overview/introduction.md",
    "docs/overview/features.md",
    "docs/overview/roadmap.md",

    // Docs architecture
    "docs/architecture/backend-architecture.md",
    "docs/architecture/frontend-architecture.md",
    "docs/architecture/deployment-architecture.md",

    // Docs security
    "docs/security/threat-model.md",
    "docs/security/hardening-guide.md",
    "docs/security/checklist.md",

    // Docs SEO
    "docs/seo/meta-tags.md",
    "docs/seo/performance-checklist.md",
    "docs/seo/lighthouse-report.md",

    // Docs i18n
    "docs/i18n/languages-overview.md",
    "docs/i18n/translation-guide.md",

    // Docs usage
    "docs/usage/quickstart.md",
    "docs/usage/cli-usage.md",
    "docs/usage/faq.md",

    // Logs
    "logs/backend/app.log",
    "logs/backend/security.log",
    "logs/backend/access.log",
    "logs/frontend/error.log",
];

// Helper: buat folder (kalau belum ada)
function ensureDir(dirPath) {
    const fullPath = path.join(baseDir, dirPath);
    fs.mkdirSync(fullPath, { recursive: true });
}

// Helper: buat file kosong (kalau belum ada)
function ensureFile(filePath) {
    const fullPath = path.join(baseDir, filePath);
    const dirName = path.dirname(fullPath);
    fs.mkdirSync(dirName, { recursive: true });
    if (!fs.existsSync(fullPath)) {
        fs.writeFileSync(fullPath, "", "utf8");
    }
}

function main() {
    console.log(`Membuat struktur TenRusl BeamDrop Pro di: ${baseDir}`);

    // Direktori root project
    fs.mkdirSync(baseDir, { recursive: true });

    // Buat semua direktori
    directories.forEach((dir) => {
        ensureDir(dir);
    });

    // Buat semua file kosong
    files.forEach((file) => {
        ensureFile(file);
    });

    console.log("Selesai! Struktur folder dan file kosong sudah dibuat.");
}

main();
