// const got = require('got')
const cheerio = require('cheerio')
const url = require('url')
const fs = require('fs')
const request = require('request')
const gm = require('gm')
const path = require('path')

const HEADERS = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',
}

/**
 * 爬取网站icon 并转换成16x16像素 base64 
 * @param {string} webUrl 
 * @return {string} base64
 */
const spiderIcon = async (webUrl) => {
    return new Promise((resolve, reject) => {
        const urlParse = url.parse(webUrl)
        iconLink = `${urlParse.protocol}//${urlParse.host}/favicon.ico`
        request({
            method: 'get',
            uri: iconLink,
            encoding: 'binary'
        }, function (err, res, body) {
            if (err) reject(err)
            const filePath = path.resolve(__dirname, `../tmp/${urlParse.host}.ico`)

            /** 图片裁剪后不清晰，放弃裁剪? */
            fs.writeFile(filePath, body, 'binary', function (err) {
                if (err) reject(err)
                gm(filePath).resize(16, 16).toBuffer('PNG', function (err, buffer) {
                    if (err) reject(err)
                    try {
                        const base64String = buffer.toString('base64')
                        const imgBase64String = `data:image/png;base64,` + base64String
                        resolve(imgBase64String)
                    } catch (error) {
                        reject(error)
                    }

                })
            })

            // const imgBase64String = `data:image/png;base64,` + Buffer.from(body, 'binary').toString('base64') 
            // resolve(imgBase64String)


        })
    })
}
/** spiderIcon接口测试 */
// const bilibili = "https://www.bilibili.com/dfdfsdfdfsf"
// spiderIcon(bilibili).then(res => {
//     console.log(res)
// })


/**
 * 
 * @param {*} webUrl 
 * return {title, desc} 返回网站标题和简介(description)
 * 爬虫必须设置use-agent, 不然有些网站抓取不到
 */
const spiderTitleDesc = async (webUrl) => {
    return new Promise((resolve, reject) => {
        request({
            method: 'get',
            url: encodeURI(webUrl),
            headers: HEADERS
        }, function (err, res, body) {
            if (err) reject(err)
            $ = cheerio.load(body)
            let title = $('title').text()
            let desc = $('meta[name="description"]').attr('content') || $('meta[ property="og:description"]').attr('content')
            resolve({
                title,
                desc
            })
        })
    })
}
// spiderTitleDesc 接口测试
// const webUrl = "https://space.bilibili.com/106960400"
// spiderTitleDesc(webUrl).then(res => {
//     console.log(res)
// })


module.exports = {
    spiderIcon,
    spiderTitleDesc
}