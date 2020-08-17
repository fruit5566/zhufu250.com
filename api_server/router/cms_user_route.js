const Router = require('koa-router');
const router = new Router();
const CmsUserRouteAction = require('../controller/cms_user_route_con')


// cms 登录
router.post('/cms/login', CmsUserRouteAction.login)

// cms 登出
router.get('/cms/logout', CmsUserRouteAction.logout)


module.exports = router