const Router = require('koa-router');
const router = new Router();

const hotnews = require('../libs/hotnews_spider.js');

const IndexRouteAction = require('../controller/index_route')


router.get('/hotnews', async ctx => {
    ctx.body = {
        code: 0,
        data: await hotnews(),
        msg: null
    } ;
})


router.get('/recommends', IndexRouteAction.findRecommends)

// 新增书签记录
router.post('/bookmark', IndexRouteAction.createBookmark)

// 自动爬取网站 title description
router.get('/bookmark/title_desc', IndexRouteAction.fetchTitleAndDesc)

router.get('/bookmarks', IndexRouteAction.findBookmarks)

router.get('/download', IndexRouteAction.downloadBookmarks)


module.exports = router