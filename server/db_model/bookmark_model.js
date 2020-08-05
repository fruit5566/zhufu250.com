const BookMarkModel = require('../db_schema/bookmark_schema')

class BookMarkModelAction {

    static async addBookmark(bookmark) {
        const result = await BookMarkModel.create(bookmark)
        // result.toJSON() // 返回原始格式数据
        const id = result.get('id')
        return id
    }

    static async findBookmarks(flag) {
        let attributes = ['id', 'url', 'title', 'desc', 'icon', 'created_at']
        if (flag) attributes.push('icon_base64')
        return await BookMarkModel.findAll({
            attributes: attributes,
            raw: true,
            order: [
                ['id', 'DESC']
            ],
            limit: 100
        })
    }

    static async updateIconById(id, base64) {
        BookMarkModel.update({
            icon_base64: base64
        }, {
            where: {
                id: id
            }
        })
    }
}

module.exports = BookMarkModelAction