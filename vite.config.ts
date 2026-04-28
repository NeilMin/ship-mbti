import { configDefaults } from "vitest/config";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  test: {
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "output/**"],
    setupFiles: "./src/test/setup.ts",
  },
});
