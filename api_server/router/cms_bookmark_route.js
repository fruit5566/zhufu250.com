const Router = require('koa-router')
const router = new Router()
const CmsBookmarkRouteAction = require('../controller/cms_bookmark_route_con')

// cms 书签列表
router.get('/cms/bookmarks', CmsBookmarkRouteAction.findBookmarks)

// cms update 书签
router.post('/cms/bookmark', CmsBookmarkRouteAction.updateBookmark)

module.exports = router
