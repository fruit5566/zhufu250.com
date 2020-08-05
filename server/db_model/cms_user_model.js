const CmsUserModel = require('../db_schema/cms_user_schema')
const {
    cryPassword
} = require('../utils/_crypto')


class CmsUserModelAction {
    static async addUser({
        name,
        password
    }) {
        let storePassword = cryPassword(password)
        const result = await CmsUserModel.create({
            name,
            password: storePassword
        })
        // console.log(result.toJSON())
        return result.get('uuid')
    }

    static async checkLogin({
        name,
        password
    }) {
        let storePassword = cryPassword(password)
        const result = await CmsUserModel.findOne({
            where: {
                name: name,
                password: storePassword
            }
        })
        return result ? result.get('uuid') : false
    }

}

module.exports = CmsUserModelAction