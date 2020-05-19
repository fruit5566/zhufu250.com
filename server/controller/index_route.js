const urlA = require('url')
const BookMarkModelAction = require('../db_model/bookmark_model')
const RecommendModelAction = require('../db_model/recommend_model')
const {
    spiderTitleDesc,
    spiderIcon
} = require('../libs/icon_title_desc_spider')

const URL_REG = /(^https?:\/\/)((\w+\.)+([a-z]{2,6})+|(([0-9]{1,3}\.){3}[0-9]{1,3}))/

class IndexRouteAction {

    /** 新建书签 */
    static async createBookmark(ctx) {
        try {
            const {
                url,
                title,
                desc
            } = ctx.request.body

            if (!URL_REG.test(url) || url.length > 255) {
                ctx.status = 400
                ctx.body = {
                    code: 2000,
                    message: 'url too long or null'
                }
                return
            } else if (!title || !desc) {
                const result = await spiderTitleDesc(url)
                title = title || result.title
                desc = desc || result.desc
            }
            const urlParse = urlA.parse(url)
            const icon = `${urlParse.protocol}//${urlParse.host}/favicon.ico`
            const id = await BookMarkModelAction.addBookmark({
                url,
                title,
                desc,
                icon
            })

            spiderIcon(url).then(base64 => {
                BookMarkModelAction.updateIconById(id, base64)
            })

            ctx.body = {
                code: 0,
                data: {
                    id
                }
            }


        } catch (error) {
            console.log(error)
            ctx.status = 500
        }

    }

    /** 查询书签列表 */
    static async findBookmarks(ctx) {

        // TODO 分页查询
        try {
            let result = await BookMarkModelAction.findBookmarks()
            ctx.body = {
                code: 0,
                data: result
            }
        } catch (error) {
            console.log(error)
            ctx.status = 500
        }
    }

    static async fetchTitleAndDesc(ctx) {
        let {
            url
        } = ctx.query
        if (!URL_REG.test(url) || url.length > 255) {
            ctx.status = 400
            ctx.body = {
                code: 2001,
                message: 'url too long or null'
            }
        } else {
            let {
                title,
                desc
            } = await spiderTitleDesc(url)

            ctx.body = {
                code: 0,
                data: {
                    title,
                    desc
                }
            }
        }
    }

    static async findRecommends(ctx) {
        const data = await RecommendModelAction.findRecommends()
        ctx.body = {
            code: 0,
            data: data
        }
    }

    static async downloadBookmarks(ctx) {
        const bookmarks = await BookMarkModelAction.findBookmarks(true)
        const ADD_DATE = new Date(bookmarks[bookmarks.length -1].created_at).getTime()
        const LAST_MODIFIED = new Date(bookmarks[0].created_at) .getTime()
        const TEMP = `
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>
    <DT><H3 ADD_DATE="${ADD_DATE}" LAST_MODIFIED="${LAST_MODIFIED}" PERSONAL_TOOLBAR_FOLDER="true">书签栏</H3>
    <DL><p>
TEMPCONTENT
    </DL><p>
</DL><p>
        `
        let tmpContent = ''
        for (let i = 0, len = bookmarks.length; i < len; i++) {
            let time = new Date(bookmarks[i].created_at).getTime()
            tmpContent += `\t\t<DT><A HREF="${bookmarks[i].url}" ADD_DATE="${time}" ICON="${bookmarks[i].icon_base64}">${bookmarks[i].title}</A>\n`
        }
        ctx.body = TEMP.replace('TEMPCONTENT', tmpContent)
    }
}

module.exports = IndexRouteAction