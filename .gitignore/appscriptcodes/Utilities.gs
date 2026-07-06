/**
 * ============================================================
 * Utilities
 * ============================================================
 */

class SyncUtils {

  static base64Encode(blob) {

    return Utilities.base64Encode(
      blob.getBytes()
    );

  }
  static base64EncodeText(text) {

  return Utilities.base64Encode(text);

}

}
