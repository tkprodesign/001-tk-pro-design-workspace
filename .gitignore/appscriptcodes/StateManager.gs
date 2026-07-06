/**
 * ============================================================
 * State Manager
 * ============================================================
 */

class StateManager {

  static save(snapshot) {

    PropertiesService
      .getScriptProperties()
      .setProperty(
        "SYNC_STATE",
        JSON.stringify(snapshot)
      );

    LoggerUtil.success(
      `Snapshot saved (${Object.keys(snapshot).length} items).`
    );

  }

  static load() {

    const json = PropertiesService
      .getScriptProperties()
      .getProperty("SYNC_STATE");

    if (!json) {
      LoggerUtil.warn("No previous snapshot found.");
      return {};
    }

    return JSON.parse(json);

  }

  static clear() {

    PropertiesService
      .getScriptProperties()
      .deleteProperty("SYNC_STATE");

    LoggerUtil.warn("Snapshot cleared.");

  }

}
