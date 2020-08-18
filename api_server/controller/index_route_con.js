const urlA = require("url");
const BookMarkModelAction = require("../db_model/bookmark_model");
const RecommendModelAction = require("../db_model/recommend_model");
const spiderIconTitleDesc = require("../libs/icon_title_desc_spider");
const iconToBase64 = require("../libs/icon_to_base64");
const hotnews = require("../libs/hotnews_spider.js");
const BookMarkTEMP = require("./../utils/bookmarksTemplate");

const URL_REG = /(^https?:\/\/)((\w+\.)+([a-z]{2,6})+|(([0-9]{1,3}\.){3}[0-9]{1,3}))/;

class IndexRouteAction {
  /** 新建书签 */
  static async createBookmark(ctx) {
    try {
      let { url, title, desc, icon } = ctx.request.body;

      if (!URL_REG.test(url) || url.length > 512) {
        ctx.status = 400;
        ctx.body = {
          code: 2000,
          message: "url too long or null"
        };
        return;
      } else if (!title || !desc) {
        const result = await spiderIconTitleDesc(url);
        title = title || result.title;
        desc = desc || result.desc;
        icon = result.icon;
      }
      const id = await BookMarkModelAction.addBookmark({
        url,
        title,
        desc,
        icon
      });

      ctx.body = {
        id
      };

      iconToBase64(icon).then(base64 => {
        BookMarkModelAction.updateIconById(id, base64);
      });
    } catch (error) {
      console.log(error);
      ctx.status = 500;
    }
  }

  /** 查询书签列表 */
  static async findBookmarks(ctx) {
    let { page } = ctx.query;
    try {
      let result = await BookMarkModelAction.findBookmarksByPage(page);
      ctx.body = result;
    } catch (error) {
      console.log(error);
      ctx.status = 500;
    }
  }

  // 爬取网站标题和简介
  static async fetchTitleAndDesc(ctx) {
    let { url } = ctx.query;
    if (!URL_REG.test(url) || url.length > 512) {
      ctx.status = 400;
      ctx.body = {
        code: 2001,
        message: "url too long or null"
      };
    } else {
      let { title, desc, icon } = await spiderIconTitleDesc(url);

      ctx.body = {
        title,
        desc,
        icon
      };
    }
  }

  // 查询推荐列表
  static async findRecommends(ctx) {
    const data = await RecommendModelAction.findRecommends();
    ctx.body = data;
  }

  // 生成书签模板文件
  static async downloadBookmarks(ctx) {
    const bookmarks = await BookMarkModelAction.findBookmarks(true);
    const ADD_DATE = new Date(bookmarks[bookmarks.length - 1].created_at).getTime();
    const LAST_MODIFIED = new Date(bookmarks[0].created_at).getTime();

    let tmpContent = "";
    for (let i = 0, len = bookmarks.length; i < len; i++) {
      let time = new Date(bookmarks[i].created_at).getTime();
      tmpContent += `\t\t<DT><A HREF="${bookmarks[i].url}" ADD_DATE="${time}" ICON="${bookmarks[i].icon_base64}">${bookmarks[i].title}</A>\n`;
    }
    let data = BookMarkTEMP.replace("$ADD_DATE", ADD_DATE).replace("$LAST_MODIFIED", LAST_MODIFIED).replace("$TEMPCONTENT", tmpContent);

    ctx.body = data;
  }

  // 爬取百度热搜榜
  static async spiderHotNews(ctx) {
    ctx.body = await hotnews();
  }
}

module.exports = IndexRouteAction;
