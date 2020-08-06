const urlA = require('url');
const BookMarkModelAction = require('../db_model/bookmark_model');

class SearchRouteAction {
  static async searchBookMarks(ctx) {
    const key = decodeURI(ctx.query.key);
    const result = await BookMarkModelAction.searchBookMarks(key);
    ctx.body = result;
  }
}

module.exports = SearchRouteAction;
