import { ClipboardConstructor } from "@/preload";

declare global {
  interface Window {
    preload: {
      ClipboardEventListener: ClipboardConstructor;
    };
  }
}
