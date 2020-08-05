const CmsTokenAction = require('../db_model/cms_token_model') 

let uuid = '64211740-a14f-11ea-b422-d726db7d59fb'

CmsTokenAction.updateToken(uuid).then(token => {
    console.log(token)
}).catch(error => {
    console.log(error)
})

let token = '9183bd9ebd7c0bd7d773ebbc649abdea'
CmsTokenAction.removeToken(token).then(result => {
    console.log(result)
}).catch(error => {
    console.log(error)
})