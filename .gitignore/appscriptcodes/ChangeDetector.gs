/**
 * ============================================================
 * Change Detector
 * ============================================================
 */

class ChangeDetector {

  /**
   * Compare two snapshots.
   *
   * @param {Object} previous
   * @param {Object} current
   * @returns {Object}
   */
  static compare(previous, current) {

    LoggerUtil.info("Detecting changes...");

    const changes = {
      added: [],
      modified: [],
      deleted: [],
      renamed: [],
      moved: [],
      unchanged: []
    };

    // Detect added and changed items
    for (const id in current) {

      const currentItem = current[id];
      const previousItem = previous[id];

      // New item
      if (!previousItem) {
        changes.added.push(currentItem);
        continue;
      }

      let changed = false;

      // Parent changed = moved
      if (currentItem.parentId !== previousItem.parentId) {

        changes.moved.push({
          before: previousItem,
          after: currentItem
        });

        changed = true;

      }

      // Name changed = renamed
      if (currentItem.name !== previousItem.name) {

        changes.renamed.push({
          before: previousItem,
          after: currentItem
        });

        changed = true;

      }

      // File contents changed
      if (currentItem.type === "FILE") {

        const contentChanged =
          currentItem.size !== previousItem.size;

        if (contentChanged) {

          changes.modified.push({
            before: previousItem,
            after: currentItem
          });

          changed = true;

        }

      }

      if (!changed) {
        changes.unchanged.push(currentItem);
      }

    }

    // Detect deleted items
    for (const id in previous) {

      if (!current[id]) {
        changes.deleted.push(previous[id]);
      }

    }

    LoggerUtil.success(
      `Added: ${changes.added.length}, ` +
      `Modified: ${changes.modified.length}, ` +
      `Deleted: ${changes.deleted.length}, ` +
      `Renamed: ${changes.renamed.length}, ` +
      `Moved: ${changes.moved.length}`
    );

    return changes;

  }

}
