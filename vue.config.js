module.exports = {
  chainWebpack: config => {
    // If you wish to remove the standard entry point
    config.entryPoints.delete("app");

    // then add your own
    config
      .entry("examples")
      .add("./src/examples/index.js")
      .end();
    // .entry("lib")
    // .add("./src/lib/index.js")
    // .end();
  }
};
