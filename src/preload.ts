import { timer, Subscription } from "rxjs";
import { clipboard } from "electron";
const { getPath } = window.utools;
const STORAGE_NAME = "utools-clipboard-database";
const storagePath = `${getPath("userData")}/${STORAGE_NAME}.json`;
console.log(storagePath, "storagePath");
interface ClipboardOptions {
  textCallback: (text: string) => void;
  duration?: number;
}

export interface ClipboardConstructor {
  new (options: ClipboardOptions): Clipboard;
}
export class Clipboard {
  private beforeText: string | undefined;
  private textCallback: (text: string) => void;
  private duration: number;
  private timer: Subscription | undefined;

  constructor({ textCallback, duration = 500 }: ClipboardOptions) {
    this.textCallback = textCallback;
    this.duration = duration;
    this.onClipboard();
  }

  private onClipboard() {
    if (!this.timer) {
      this.timer = timer(0, this.duration).subscribe(() => {
        if (this.textCallback) {
          const text = clipboard.readText();
          if (text !== this.beforeText) {
            this.textCallback(text);
            this.beforeText = text;
          }
        }
      });
    }
  }

  public destroyedOnClipboard() {
    if (this.timer) {
      this.timer.unsubscribe();
    }
  }
}

// class Storage {
//   private path = "";
//   constructor(path: string) {
//     this.path = path;
//   }
// }

export const ClipboardConstructor = Clipboard;
