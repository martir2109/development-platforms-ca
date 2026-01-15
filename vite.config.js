import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    port: 5501,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./index.html"),
        login: resolve(__dirname, "./auth/sign-in/index.html"),
        register: resolve(__dirname, "./auth/sign-up/index.html"),
        create: resolve(__dirname, "./article/create/index.html"),
        edit: resolve(__dirname, "./article/edit/index.html"),
      },
    },
  },
});
