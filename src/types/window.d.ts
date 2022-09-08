import { ClipboardConstructor, Storage } from "@/preload";

declare global {
  interface Window {
    preload: {
      Clipboard: ClipboardConstructor;
      storage: Storage;
    };
  }
}
