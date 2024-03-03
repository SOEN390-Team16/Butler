const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // port: 3000,
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig: import("../client/vite.config.js"),
    },
  },
});
