const BookMarkModelAction = require('../db_model/bookmark_model')

class CmsBookmarkRouteAction {
  /** 查询书签列表 */
  static async findBookmarks(ctx) {
    let { page } = ctx.query
    try {
      let result = await BookMarkModelAction.findBookmarks()
      ctx.body = result
    } catch (error) {
      console.log(error)
      ctx.status = 500
    }
  }

  static async updateBookmark(ctx) {
    // console.log(ctx.request.body)
    let result = await BookMarkModelAction.updateBookmark(ctx.request.body)
    ctx.status = 201
  }
}

module.exports = CmsBookmarkRouteAction
