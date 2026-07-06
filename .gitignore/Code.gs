/**
 * ============================================================
 * Entry Point
 * ============================================================
 */

function testConfig() {

  LoggerUtil.info(`Project: ${CONFIG.PROJECT_NAME}`);
  LoggerUtil.info(`Version: ${CONFIG.VERSION}`);

  const folder = DriveApp.getFolderById(CONFIG.ROOT_FOLDER_ID);

  LoggerUtil.success(`Connected to Google Drive`);
  LoggerUtil.info(`Root Folder: ${folder.getName()}`);

  const token = getGitHubToken();

  if (!token) {
    throw new Error("GitHub token not found in Script Properties.");
  }

  LoggerUtil.success("GitHub token loaded successfully.");

}

function testScan() {

  const snapshot = DriveScanner.scan();

  Logger.log(JSON.stringify(snapshot, null, 2));

}
function createBaseline() {

  const snapshot = DriveScanner.scan();

  StateManager.save(snapshot);

}

function viewBaseline() {

  const snapshot = StateManager.load();

  Logger.log(`Items: ${Object.keys(snapshot).length}`);

}

function clearBaseline() {

  StateManager.clear();

}
function testChangeDetection() {

  const previous = StateManager.load();
  const current = DriveScanner.scan();

  const changes = ChangeDetector.compare(previous, current);

  Logger.log(JSON.stringify(changes, null, 2));

}
function testGitHub() {

  const repo = GitHubClient.getRepository();

  Logger.log(repo.full_name);
  Logger.log(repo.default_branch);

}
function testMapper() {

  const snapshot = DriveScanner.scan();

  const firstKey = Object.keys(snapshot)[0];

  const item = snapshot[firstKey];

  Logger.log(item.path);

  Logger.log(
    GitHubMapper.toGitHubPath(item)
  );

}
function uploadFirstFile() {

  const snapshot = DriveScanner.scan();

  for (const id in snapshot) {

    const item = snapshot[id];

    if (item.type !== "FILE") {
      continue;
    }

    GitHubClient.syncFile(item);

    break;

  }

}
function syncWorkspace() {

  LoggerUtil.info("Starting workspace synchronization...");

  const lock = LockService.getScriptLock();

  if (!lock.tryLock(30000)) {
    LoggerUtil.warn("Another synchronization is already running.");
    return;
  }

  try {

    const previous = StateManager.load();
    const current = DriveScanner.scan();

    const changes = ChangeDetector.compare(previous, current);

    // Count all detected changes
    const totalChanges =
      changes.added.length +
      changes.modified.length +
      changes.deleted.length +
      changes.renamed.length +
      changes.moved.length;

    // Nothing to do
    if (totalChanges === 0) {

      LoggerUtil.info(
        "No changes detected. Repository already synchronized."
      );

      return;

    }

    // --------------------------------------------------------
    // Added
    // --------------------------------------------------------
    changes.added.forEach(function(item) {

      if (item.type === "FILE") {

        GitHubClient.syncFile(item);

      }

    });

    // --------------------------------------------------------
    // Modified
    // --------------------------------------------------------
    changes.modified.forEach(function(item) {

      GitHubClient.syncFile(item.after);

    });

    // --------------------------------------------------------
    // Renamed
    // --------------------------------------------------------
    changes.renamed.forEach(function(item) {

      GitHubClient.syncFile(item.after);

      GitHubClient.deleteFile(
        GitHubMapper.toGitHubPath(item.before),
        "Rename: " + item.before.path
      );

      LoggerUtil.success(
        "Renamed: " +
        GitHubMapper.toGitHubPath(item.before) +
        " -> " +
        GitHubMapper.toGitHubPath(item.after)
      );

    });

    // --------------------------------------------------------
    // Moved
    // --------------------------------------------------------
    changes.moved.forEach(function(item) {

      GitHubClient.syncFile(item.after);

      GitHubClient.deleteFile(
        GitHubMapper.toGitHubPath(item.before),
        "Move: " + item.before.path
      );

      LoggerUtil.success(
        "Moved: " +
        GitHubMapper.toGitHubPath(item.before) +
        " -> " +
        GitHubMapper.toGitHubPath(item.after)
      );

    });

    // --------------------------------------------------------
    // Deleted
    // --------------------------------------------------------
    changes.deleted.forEach(function(item) {

      if (item.type !== "FILE") {
        return;
      }

      GitHubClient.deleteFile(
        GitHubMapper.toGitHubPath(item),
        "Delete: " + item.path
      );

      LoggerUtil.success(
        "Deleted: " +
        GitHubMapper.toGitHubPath(item)
      );

    });

    // --------------------------------------------------------
    // Update CHANGELOG
    // --------------------------------------------------------
    const changelog = Changelog.generate(changes);

    GitHubClient.uploadTextFile(
      "CHANGELOG.md",
      changelog,
      "Update CHANGELOG.md"
    );

    // --------------------------------------------------------
    // Save new baseline
    // --------------------------------------------------------
    StateManager.save(current);

    LoggerUtil.success(
      "Synchronization completed successfully."
    );

  } catch (e) {

    LoggerUtil.error(e.toString());

    LoggerUtil.error(
      "Synchronization aborted. Baseline NOT updated."
    );

    throw e;

  }
  finally {

  lock.releaseLock();

}

}
