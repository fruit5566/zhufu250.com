const CmsTokenModelAction = require("../db_model/cms_token_model");
const CmsUserModelAction = require("../db_model/cms_user_model");

class CmsUserRouteAction {
  static async login(ctx) {
    const name = ctx.request.body.username;
    const password = ctx.request.body.password;
    if (!name || !password) {
      ctx.status = 400;
      ctx.body = {
        message: "账号或者密码错误",
      };
    }

    const uuid = await CmsUserModelAction.checkLogin({ name, password });
    if (uuid) {
      const token = await CmsTokenModelAction.updateToken(uuid);
      ctx.body = {
        token,
      };
    } else {
      ctx.status = 401;
      ctx.body = {
        message: "账号或者密码错误",
      };
    }
  }

  static async logout(ctx) {
    const token = ctx.cookies.get("z-token");
    if (token) {
      CmsTokenModelAction.removeToken(token);
    }

    ctx.status = 200;
  }
}

module.exports = CmsUserRouteAction;
