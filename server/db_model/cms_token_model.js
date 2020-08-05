const CmsTokenModel = require('../db_schema/cms_token_schema')
const { createToken } = require('../utils/_crypto')

class CmsTokenModelAction {
    static async updateToken (uuid) {
        const token = createToken(uuid)
        const result =  await CmsTokenModel.create({
            uuid,
            token
        })

        return result.get('token')
    }

    static async removeToken(token) {
       return  await CmsTokenModel.destroy({
            where: {
                token: token
            }
        })
    }
}


module.exports = CmsTokenModelAction