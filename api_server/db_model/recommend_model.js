const RecommendModel = require('../db_schema/recomend_shema')

class RecommendModelAction {

    static async findRecommends() {
        return await RecommendModel.findAll({
            attributes: ['id', 'url', 'title'],
            raw: true,
            order: [
                ['id', 'DESC']
            ],
            limit: 50
        })
    }
}


module.exports = RecommendModelAction