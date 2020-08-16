const Router = require("koa-router");
const router = new Router();

router.get("/api/fetchTodos", async ctx => {
  ctx.body = ["吃饭", "喝水", "睡觉"];
});

router.post("/api/addTodo", async ctx => {
  ctx.body = "Watch A Move";
});

module.exports = router;
