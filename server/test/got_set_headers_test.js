const got = require('got')
const CHROME_USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36'

/**
 * 不设置 http header 有些网站（bilibili）返回 403 
 */
got.get('https://bilibili.com/',{
    headers: {
        'user-agent': CHROME_USER_AGENT
    }
}).then( res => {
    console.log(res.body)
}).catch( err=> {
    console.log(err)
})