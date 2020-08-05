const Router = require('koa-router');
const router = new Router();

const IndexRouteAction = require('../controller/index_route_con')


// 首页推荐列表
router.get('/recommends', IndexRouteAction.findRecommends)

// 新增书签记录
router.post('/bookmark', IndexRouteAction.createBookmark)

// 自动爬取网站 title description
router.get('/bookmark/title_desc', IndexRouteAction.fetchTitleAndDesc)

// 首页书签列表
router.get('/bookmarks', IndexRouteAction.findBookmarks)

// 首页导出书签
router.get('/download', IndexRouteAction.downloadBookmarks)

// 首页 爬取百度热搜榜
router.get('/hotnews', IndexRouteAction.spiderHotNews)


module.exports = router