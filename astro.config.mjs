// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://new.ingerslev.io",
  base: "/",
  i18n: {
    locales: ["en", "da"],
    defaultLocale: "da",
  },
});
