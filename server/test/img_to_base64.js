const got = require('got')
const CHROME_USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36'
const mimeType = require('mime-types');
const request = require('request')
const fs = require('fs')

// const imgUrl = 'https://www.bilibili.com/favicon.ico'
const imgUrl = 'https://www.baidu.com/img/baidu_85beaf5496f291521eb75ba38eacbd87.svg'

let imgMineType = mimeType.lookup(imgUrl)

console.log(imgMineType)

/**
 * 编码格式 'binary' 不可省略，默认为 'utf8'
 */
got.get(imgUrl, {
    headers: {
        'user-agent': CHROME_USER_AGENT,
    },
    'encoding': 'binary'
}).then(res => {

    const buffer =  Buffer.from(res.body, 'binary')

    fs.writeFile('./file/2.png', res.body, 'binary', function (err) {})

    const base64String = Buffer.from(res.body, 'binary').toString('base64')

    const imgBase64String = `data:${imgMineType};base64,` + base64String

    fs.writeFile('./file/2.txt', imgBase64String, function (err) { })

}).catch(err => {
    console.log(err)
})

request.get({
    uri: imgUrl,
    encoding: 'binary'
}, function (err, res, body) {

    // const buffer =  Buffer.from(res.body, 'binary')

    fs.writeFile('./file/1.png', res.body, 'binary', function (err) { })

    const base64String = Buffer.from(res.body, 'binary').toString('base64')

    const imgBase64String = `data:${imgMineType};base64,` + base64String

    fs.writeFile('./file/1.txt', imgBase64String, 'utf8', function (err) { })
})

request(imgUrl).pipe(fs.createWriteStream('pipe.png'))

