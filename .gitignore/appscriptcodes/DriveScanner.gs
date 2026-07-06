/**
 * ============================================================
 * Drive Scanner
 * ============================================================
 */

class DriveScanner {

  /**
   * Scan the configured root folder.
   * Returns a snapshot object keyed by Google Drive ID.
   */
  static scan() {

    LoggerUtil.info("Starting Google Drive scan...");

    const root = DriveApp.getFolderById(CONFIG.ROOT_FOLDER_ID);

    const snapshot = {};

    this.scanFolder(root, "", snapshot);

    LoggerUtil.success(
      `Scan complete. ${Object.keys(snapshot).length} item(s) found.`
    );

    return snapshot;

  }

  /**
   * Recursively scan folders.
   */
  static scanFolder(folder, currentPath, snapshot) {

    const folderPath = currentPath
      ? `${currentPath}/${folder.getName()}`
      : folder.getName();

    // Add current folder
    snapshot[folder.getId()] = {
      id: folder.getId(),
      type: "FOLDER",
      name: folder.getName(),
      path: folderPath,
      parentId: null
    };

    // Scan files
    const files = folder.getFiles();

    while (files.hasNext()) {

      const file = files.next();

      snapshot[file.getId()] = {
        id: file.getId(),
        type: "FILE",
        name: file.getName(),
        path: `${folderPath}/${file.getName()}`,
        mimeType: file.getMimeType(),
        modifiedTime: file.getLastUpdated().toISOString(),
        size: file.getSize(),
        parentId: folder.getId()
      };

    }

    // Scan subfolders
    const folders = folder.getFolders();

    while (folders.hasNext()) {
      this.scanFolder(folders.next(), folderPath, snapshot);
    }

  }

}
