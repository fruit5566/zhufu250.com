// const Op = Sequelize.Op;
const { Sequelize } = require('sequelize')

const BookMarkModel = require('../db_schema/bookmark_schema')

class BookMarkModelAction {
  static async addBookmark(bookmark) {
    const result = await BookMarkModel.create(bookmark)
    // result.toJSON() // 返回原始格式数据
    const id = result.get('id')
    return id
  }

  static async findBookmarks(flag) {
    let attributes = ['id', 'url', 'title', 'desc', 'created_at']
    if (flag) {
      attributes.push('icon_base64')
    }
    return await BookMarkModel.findAll({
      attributes: attributes,
      raw: true,
      order: [['id', 'DESC']],
      limit: 200
    })
  }

  static async findBookmarksByPage(page) {
    let pageSize = 10
    return await BookMarkModel.findAll({
      attributes: ['id', 'url', 'title', 'desc', 'icon', 'created_at', 'icon_base64'],
      raw: true,
      order: [['id', 'DESC']],
      offset: (page - 1) * pageSize,
      limit: pageSize
    })
  }

  static async updateIconById(id, base64) {
    BookMarkModel.update(
      {
        icon_base64: base64
      },
      {
        where: {
          id: id
        }
      }
    )
  }

  static async searchBookMarks(key) {
    return await BookMarkModel.findAll({
      attributes: ['id', 'url', 'title', 'desc', 'icon', 'created_at'],
      raw: true,
      order: [['id', 'DESC']],
      where: {
        [Sequelize.Op.or]: [
          {
            title: {
              [Sequelize.Op.like]: '%' + key + '%'
            }
          },
          {
            desc: {
              [Sequelize.Op.like]: '%' + key + '%'
            }
          }
        ]
      }
    })
  }

  static async updateBookmark({ id, title, desc }) {
    return await BookMarkModel.update(
      {
        title,
        desc
      },
      {
        where: {
          id
        }
      }
    )
  }
}

module.exports = BookMarkModelAction
