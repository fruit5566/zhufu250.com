const path = require("path");
const fs = require("fs");

const { createBundleRenderer } = require("vue-server-renderer");
const serverBundle = require(path.join(__dirname, "../dist/vue-ssr-server-bundle.json"));
const clientManifest = require(path.join(__dirname, "../dist/vue-ssr-client-manifest.json"));
const template = require("fs").readFileSync(path.join(__dirname, "../public/server.template.html"), "utf-8");
const cTemplate = fs.readFileSync(path.join(__dirname, "../dist/indexc.html"), "utf-8");

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest
});

function renderToString(context) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      // resolve(cTemplate); return; // 模拟SSR渲染失败, 返回前端模板
      if (!err) {
        resolve(html);
        return;
      } else if (err.code !== 404) {
        resolve(cTemplate); // 若SSR生html错误，则返回前端模板 路由会进行前端渲染
        console.log(err.message);
        return;
      } else {
        reject(err);
        return;
      }
    });
  });
}

module.exports = renderToString;
