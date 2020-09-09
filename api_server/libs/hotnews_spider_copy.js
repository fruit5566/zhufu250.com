const puppeteer = require("puppeteer");

const url = "https://www.baidu.com/s?wd=106960400";
const HOT_NEWS_LIMIT = 10;

let browser, page;
let tempHotNews = [];
let block = false;

const pageInit = async () => {
  block = true;
  browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] });
  page = await browser.newPage();

  /** 拦截请求，除了html，其余请求全部拦截，接口变快 */
  await page.setRequestInterception(true);
  page.on("request", interceptedRequest => {
    if (interceptedRequest.url() == url) {
      interceptedRequest.continue();
    } else {
      interceptedRequest.abort();
    }
  });
  await page.goto(url);
  block = false;
};

pageInit();

const hotnews = async () => {
  /** 锁 解决： Execution context was destroyed */
  if (block) return tempHotNews;

  try {
    block = true;
    await page.reload();
  } catch (error) {
    browser && browser.close();
    await pageInit();
  }

  /** 获取百度热搜title*/
  let hotlistname = page.$$eval(
    ".opr-toplist1-cut",
    (el, HOT_NEWS_LIMIT) => {
      let list = [];
      for (let i = 0; i < HOT_NEWS_LIMIT; i++) {
        list.push(el[i].innerText);
      }
      return list;
    },
    HOT_NEWS_LIMIT
  );

  /**获取百度热搜num */
  let hotlistnum = page.$$eval(
    ".opr-toplist1-right-hot",
    (el, HOT_NEWS_LIMIT) => {
      let list = [];
      for (let i = 0; i < HOT_NEWS_LIMIT; i++) {
        list.push(el[i].innerText);
      }
      return list;
    },
    HOT_NEWS_LIMIT
  );

  /** await 并发执行 */
  const [titles, nums] = await Promise.all([hotlistname, hotlistnum]);

  /** 合并数据结构 */
  const hotlist = [];
  for (let i = 0; i < HOT_NEWS_LIMIT; i++) {
    hotlist.push({
      id: i,
      title: titles[i],
      num: nums[i]
    });
  }

  tempHotNews = hotlist;
  block = false;
  console.log(hotlist);
  return hotlist;

  /** 这种方法代码简单，api获取数据时间长 60ms左右 */
  // console.time()
  // let list = await page.$$eval('.opr-toplist1-table tr', () => {
  //     let divs = document.querySelectorAll('.opr-toplist1-table tr')
  //      let result = []
  //      for (let i = 0; i < 10; i++) {
  //          let name = divs[i].querySelector('.opr-toplist1-cut').innerText;
  //          let num =  divs[i].querySelector('.opr-toplist1-right-hot').innerText;
  //          result.push({name, num})
  //      }
  //      return result;
  //  })
  // return Promise.resolve(list)
  //  console.log(list)
  //  console.timeEnd()
};
hotnews();
module.exports = hotnews;
