
const CmsUserAction = require('../db_model/cms_user_model')
const CmsTokenAction = require('../db_model/cms_token_model.js')

CmsUserAction.addUser({
    name: 'admin',
    password: '123456'
}).then(uuid => {
    console.log(uuid)
    CmsTokenAction.updateToken(uuid).then(token => {
        console.log(token)
    })
}).catch(error => {
    console.log(error)
})

CmsUserAction.addUser({
    name: 'edit',
    password: '123456'
}).then(uuid => {
    console.log(uuid)
    CmsTokenAction.updateToken(uuid).then(token => {
        console.log(token)
    })
}).catch(error => {
    console.log(error)
})