/**
 * ============================================================
 * GitHub Mapper
 * ============================================================
 *
 * Converts Google Drive paths into GitHub repository paths.
 */

class GitHubMapper {

  /**
   * Convert a Drive item to a GitHub repository path.
   *
   * @param {Object} item
   * @returns {String}
   */
  static toGitHubPath(item) {

    const rootName = DriveApp
      .getFolderById(CONFIG.ROOT_FOLDER_ID)
      .getName();

    let path = item.path;

    // Remove the Google Drive root folder name
    if (path.indexOf(rootName) === 0) {
      path = path.substring(rootName.length);
    }

    // Remove leading slash
    while (path.indexOf("/") === 0) {
      path = path.substring(1);
    }

    // Root folder
    if (path === "") {
      return CONFIG.REPO_ROOT;
    }

    return CONFIG.REPO_ROOT + "/" + path;

  }

}
