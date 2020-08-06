const Router = require('koa-router');
const router = new Router();

const SearchRouteAction = require('../controller/search_route_con');

// 首页推荐列表
router.get('/search', SearchRouteAction.searchBookMarks);

module.exports = router;
