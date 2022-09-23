import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        "05-transform": resolve(__dirname, "05-transform/index.html"),
        "06-group": resolve(__dirname, "06-group/index.html"),
        "07-animation": resolve(__dirname, "07-animation/index.html")
      }
    }
  }
});
