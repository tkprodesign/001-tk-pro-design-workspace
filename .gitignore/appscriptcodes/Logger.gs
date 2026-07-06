/**
 * ============================================================
 * Logger
 * ============================================================
 */

class LoggerUtil {

  static write(level, message) {

    const time = new Date().toISOString();

    Logger.log(`[${time}] [${level}] ${message}`);

  }

  static info(message) {
    this.write("INFO", message);
  }

  static warn(message) {
    this.write("WARN", message);
  }

  static error(message) {
    this.write("ERROR", message);
  }

  static success(message) {
    this.write("SUCCESS", message);
  }

  static debug(message) {

    if (CONFIG.LOG_LEVEL === "DEBUG") {
      this.write("DEBUG", message);
    }

  }

}
