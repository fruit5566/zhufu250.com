const crypto = require('crypto')

function cryPassword(password) {
    const md5 = crypto.createHash('md5')
    md5.update('zhufu250')
    md5.update(password)
    md5.update('zhufu250')

    return md5.digest('hex')
}

function createToken(uuid) {
    const md5 = crypto.createHash('md5')
    const timeStamp = new Date().getTime()
    md5.update(uuid + timeStamp)
    
    return md5.digest('hex')
}

module.exports = {
    cryPassword,
    createToken
}