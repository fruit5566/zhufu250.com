const path = require("path");
const Koa = require("koa");
const app = new Koa();
const router = require("./route");
const staticPath = require("koa-static");
const bodyParser = require("koa-bodyparser");
const renderToString = require("./render");

app.use(staticPath(path.join(__dirname, "../dist")));
app.use(bodyParser());

// 全局错误处理
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log("2000:", err);
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = err.message || "Internet Server Error 2000";
  }
});

app.use(async (ctx, next) => {
  try {
    const html = await renderToString(ctx);
    ctx.body = html;
  } catch (error) {
    console.log(error);
    next();
  }
  // try {
  //   // 匹配非静态资源非接口的get请求 渲染页面
  //   if (ctx.method == "GET" && !ctx.href.includes("api")) {
  //     const html = await renderToString(ctx);
  //     ctx.body = html;
  //   } else {
  //     next();
  //   }
  // } catch (error) {
  //   if (error.code && error.code == 404) {
  //     ctx.redirect("/404.html");
  //   } else {
  //     throw error;
  //   }
  // }
});

// 加载 koa-router
app.use(router.routes()).use(router.allowedMethods());

app.on("error", (err, ctx) => {
  if (err) {
    console.log("2001:", err);
    ctx.status = 500;
  }
});

app.listen(3000, () => {
  console.log("  Server running at");
  console.log("  - Local: \x1b[36mhttp://localhost:\x1b[96m3000/");
});
