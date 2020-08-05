const url = require('url')

let urlString = 'https://127.0.0.1:3000'

/**
 *  \w 匹配字母、数字、下划线。等价于'[A-Za-z0-9_]'。
 *  ?  匹配前面的子表达式零次或一次
 *  +  匹配前面的子表达式一次或多次
 *  *  匹配前面的子表达式零次、一次、多次
 *  /([0-9]{1,3}\.){3}[0-9]{1,3}/ 匹配 ip地址
 *  去掉中间多余的空格，并且把|两边都用括号括起来。
 *  url.parse(urlString) 解析url
 */
var urlReg = /(^https?:\/\/)((\w+\.)+([a-z]{2,6})+|(([0-9]{1,3}\.){3}[0-9]{1,3}))/


if (urlReg.test(urlString))
    console.log(url.parse(urlString))
else
    console.log('url 不合法')