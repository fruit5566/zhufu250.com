const Koa = require("koa");
const Router = require("koa-router");
const requireDirectory = require("require-directory");
const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");

const app = new Koa();

app.use(cors());
app.use(bodyParser());

// 全局错误处理
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log(err);
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = err.message || "2000";
  }
});

/**递归遍历文件夹routers下文件， 加载路由*/
const routes = requireDirectory(module, "./router", {
  visit: funcHandler
});

app.listen(3001, res => {
  console.log("serve start at: http://localhost:3001");
});

function funcHandler(obj) {
  if (obj instanceof Router) {
    app.use(obj.routes(), obj.allowedMethods());
  }
}
