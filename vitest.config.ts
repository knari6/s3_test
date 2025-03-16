import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    silent: false,
    environment: "node",
    reporters: ["verbose"],
  },
});
