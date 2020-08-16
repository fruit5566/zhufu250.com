const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const merge = require("lodash.merge");
const nodeExternals = require("webpack-node-externals");
const TARGET_NODE = process.env.VUE_APP_MODE === "server";
const target = TARGET_NODE ? "server" : "client";

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  outputDir: "dist",
  filenameHashing: true,
  indexPath: "indexc.html",
  css: {
    extract: false
  },
  configureWebpack: () => ({
    entry: `./src/entry-${target}.js`,
    target: TARGET_NODE ? "node" : "web",
    devtool: "source-map",
    output: {
      libraryTarget: TARGET_NODE ? "commonjs2" : undefined
    },
    externals: TARGET_NODE ? nodeExternals({ allowlist: /\.css$/ }) : undefined,
    optimization: {
      splitChunks: TARGET_NODE ? false : undefined
    },
    plugins: [TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()]
  }),
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap(options => {
        return merge(options, {
          optimizeSSR: false
        });
      });
    if (TARGET_NODE) {
      config.plugins.delete("hmr"); // fix ssr hot update bug
      // config.optimization.splitChunks(undefined);
    }
  }
};
