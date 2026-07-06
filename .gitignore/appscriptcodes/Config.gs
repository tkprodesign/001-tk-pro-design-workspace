/**
 * ============================================================
 * 001 - TK Pro Design Google Drive Sync
 * Configuration
 * ============================================================
 */

const CONFIG = {

  PROJECT_NAME: "001 - TK Pro Design Google Drive Sync",
  VERSION: "0.1.0",

  // Google Drive
  ROOT_FOLDER_ID: "1842j2plo4pPivihAWXBSkE-dEceUR6qs",

  // GitHub
  GITHUB_OWNER: "tkprodesign",
  GITHUB_REPO: "001-tk-pro-design-workspace",
  GITHUB_BRANCH: "main",
  GITHUB_API: "https://api.github.com",

  // Sync
  DRY_RUN: true,
  LOG_LEVEL: "INFO",

  // Ignore lists
  IGNORE_FOLDERS: [
    ".git",
    ".github",
    "node_modules"
  ],

  IGNORE_FILES: [
    ".DS_Store",
    "Thumbs.db"
  ],
  REPO_ROOT: "workspace"

};

/**
 * Returns the GitHub Personal Access Token
 * Stored securely in Script Properties.
 */
function getGitHubToken() {
  return PropertiesService
    .getScriptProperties()
    .getProperty("GITHUB_TOKEN");
}
