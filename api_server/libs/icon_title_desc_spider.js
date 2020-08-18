// const got = require('got')
const cheerio = require("cheerio");
const url = require("url");
const request = require("request");

const HEADERS = {
  "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
};

/**
 * @param {*} webUrl
 * return {title, desc} 返回网站标题和简介(description)
 * 爬虫必须设置use-agent, 不然有些网站抓取不到
 * html.match(/<[^<]*rel=\"\S*\s*icon[^>]*>/)[0] // 正则抓取iconLink
 */
const spiderIconTitleDesc = async webUrl => {
  return new Promise((resolve, reject) => {
    request(
      {
        method: "get",
        url: encodeURI(webUrl),
        headers: HEADERS
      },
      function (err, res, body) {
        if (err) reject(err);
        $ = cheerio.load(body);
        const urlParse = url.parse(webUrl);
        let title = $("title").text();
        let desc = $('meta[name="description"]').attr("content") || $('meta[ property="og:description"]').attr("content");
        let icon = $('link[rel="icon"]').attr("href") || $('link[rel="shortcut icon"]').attr("href") || `https://${urlParse.host}/favicon.ico`;

        if (icon.startsWith("https:")) {
        } else if (icon.startsWith("http:")) {
          icon = icon.replace("http", "https");
        } else if (icon.startsWith("//")) {
          icon = icon.replace("//", "https://");
        } else if (icon.startsWith("/")) {
          icon = "https://" + urlParse.host + icon;
        } else if (!icon.startsWith("data:image")) {
          icon = "https://" + urlParse.host + "/" + icon;
        }

        resolve({
          title,
          desc,
          icon
        });
      }
    );
  });
};

module.exports = spiderIconTitleDesc;
