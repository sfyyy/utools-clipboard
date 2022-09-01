import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import utools from "vite-plugin-utools";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  server: {
    port: 3000,
  },
  publicDir: "plugin",
  plugins: [
    vue(),
    utools({
      external: "uTools",
      preload: {
        path: "./src/preload.ts",
        watch: true,
        name: "window.preload",
      },
      buildUpx: {
        pluginPath: "./plugin/plugin.json",
        outDir: "upx",
        outName: "[pluginName]_[version].upx",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
