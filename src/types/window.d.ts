import { ClipboardConstructor } from "@/preload";

declare global {
  interface Window {
    preload: {
      ClipboardConstructor: ClipboardConstructor;
    };
  }
}
