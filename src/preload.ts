import { timer, Subscription } from "rxjs";
import { clipboard } from "electron";
import dayjs from "dayjs";

const { getPath } = window.utools;
const STORAGE_NAME = "utools-clipboard-database";
const storagePath = `${getPath("userData")}/${STORAGE_NAME}.json`;
console.log("storagePath", storagePath);
console.log(dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"));
import { readFileSync, existsSync, writeFileSync } from "fs";
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

export interface Text {
  id: string;
  content: string;
  type: string;
  createTime: number;
}

type ClipboardContent = Text;
interface StorageContent {
  data: ClipboardContent[];
  updateTime: number;
}

export interface Storage {
  get: () => Promise<StorageContent>;
  set: (content: ClipboardContent) => Promise<void>;
}

class StorageImpl implements Storage {
  private path = "";
  constructor(path: string) {
    this.path = path;
  }

  private _initialize() {
    const content = {
      data: [],
      updateTime: dayjs(new Date()).valueOf(),
    };
    writeFileSync(this.path, JSON.stringify(content), "utf-8");
  }

  async get(): Promise<StorageContent> {
    try {
      if (existsSync(this.path)) {
        const content = readFileSync(this.path, "utf-8");
        return JSON.parse(content);
      } else {
        this._initialize();
        return await this.get();
      }
    } catch {
      throw new Error("读取文件失败");
    }
  }

  async set(content: ClipboardContent): Promise<void> {
    try {
      const result = await this.get();
      const setData = {
        data: [content, ...result.data],
        updateTime: dayjs(new Date()).valueOf(),
      };
      writeFileSync(this.path, JSON.stringify(setData), "utf-8");
    } catch {
      throw new Error("写入文件失败");
    }
  }
}

export const storage = new StorageImpl(storagePath);
