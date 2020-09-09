// const got = require('got')
const cheerio = require("cheerio");
const url = require("url");
const request = require("request");

const HEADERS = {
  "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
};

const webUrl = "https://www.baidu.com/s?wd=106960400&usm=3&rsv_idx=2&rsv_page=1";
const HOT_NEWS_LIMIT = 15;

let tempHotNews = [];
let block = false;

const hotnews = async () => {
  block = true;
  return new Promise((resolve, reject) => {
    request(
      {
        method: "get",
        url: encodeURI(webUrl),
        headers: HEADERS
      },
      function (err, res, body) {
        if (err) {
          block = false;
          resolve(tempHotNews);
        } else {
          $ = cheerio.load(body);
          // console.log(body);
          let titles = [];
          let nums = [];

          if ($(".opr-toplist1-subtitle").length) {
            let array = $(".opr-toplist1-subtitle");
            for (let index = 0; index < HOT_NEWS_LIMIT; index++) {
              titles[index] = $(array[index]).attr("title");
            }
          } else if ($(".opr-toplist1-cut").length) {
            let array = $(".opr-toplist1-cut");
            for (let index = 0; index < HOT_NEWS_LIMIT; index++) {
              titles[index] = $(array[index]).attr("title");
            }
          } else {
            block = false;
            resolve(tempHotNews);
            return;
          }

          if ($(".toplist1-right-num").length) {
            let array = $(".toplist1-right-num");
            for (let index = 0; index < HOT_NEWS_LIMIT; index++) {
              nums[index] = $(array[index]).text();
            }
          }
          if ($(".opr-toplist1-right-hot").length) {
            let array = $(".opr-toplist1-right-hot");
            for (let index = 0; index < HOT_NEWS_LIMIT; index++) {
              nums[index] = $(array[index]).text();
            }
          }

          /** 合并数据结构 */
          const hotlist = [];
          for (let i = 0; i < HOT_NEWS_LIMIT; i++) {
            hotlist.push({
              id: i,
              title: titles[i],
              num: nums[i]
            });
          }

          block = false;
          tempHotNews = hotlist;
          resolve(hotlist);
          // console.log(hotlist);
        }
      }
    );
  });
};

// hotnews();

module.exports = hotnews;
