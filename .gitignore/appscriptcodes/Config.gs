/**
 * ============================================================
 * GTL Drive Sync
 * Configuration
 * ============================================================
 */

const CONFIG = {

  // ----------------------------------------------------------
  // Project
  // ----------------------------------------------------------

  PROJECT_NAME: "GTL Drive Sync",
  VERSION: "1.0.0",

  // ----------------------------------------------------------
  // Google Drive
  // ----------------------------------------------------------

  ROOT_FOLDER_ID: "1JFtLLLrWNVpAWavFt03wm0odfunB7UXE",

  // ----------------------------------------------------------
  // GitHub
  // ----------------------------------------------------------

  GITHUB_OWNER: "gtlinternationalchurch",
  GITHUB_REPO: "drive-sync-workspace",
  GITHUB_BRANCH: "main",
  GITHUB_API: "https://api.github.com",

  // ----------------------------------------------------------
  // Repository
  // ----------------------------------------------------------

  REPO_ROOT: "workspace",

  // ----------------------------------------------------------
  // Synchronization
  // ----------------------------------------------------------

  DRY_RUN: false,
  LOG_LEVEL: "INFO",

  // ----------------------------------------------------------
  // Ignore Folders
  // ----------------------------------------------------------

  IGNORE_FOLDERS: [
    ".git",
    ".github",
    "node_modules"
  ],

  // ----------------------------------------------------------
  // Ignore Files
  // ----------------------------------------------------------

  IGNORE_FILES: [
    ".DS_Store",
    "Thumbs.db"
  ]

};

/**
 * ============================================================
 * Script Properties
 * ============================================================
 */

/**
 * GitHub Personal Access Token
 */
function getGitHubToken() {

  return PropertiesService
    .getScriptProperties()
    .getProperty("GITHUB_TOKEN");

}

/**
 * Dropbox Access Token
 * (Reserved for future Apps Script Dropbox features)
 */
function getDropboxAccessToken() {

  return PropertiesService
    .getScriptProperties()
    .getProperty("DROPBOX_ACCESS_TOKEN");

}

/**
 * Dropbox Root Folder
 * (Reserved for future Apps Script Dropbox features)
 */
function getDropboxRoot() {

  return PropertiesService
    .getScriptProperties()
    .getProperty("DROPBOX_ROOT");

}
