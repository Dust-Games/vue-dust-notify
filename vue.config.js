module.exports = {
  chainWebpack: config => {
    // If you wish to remove the standard entry point
    config.entryPoints.delete("app");

    // then add your own
    config
      .entry("examples")
      .add("./examples/index.ts")
      .end();
    // .entry("lib")
    // .add("./lib/index.js")
    // .end();
  }
};
