const puppeteer = require('puppeteer');

const baiduHotSpider = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.baidu.com/s?wd=zhusanzhi');

    // console.time()

    /** 获取百度热搜title*/
    let hotlistname = page.$$eval('.opr-toplist1-cut', el => {
        let list = [];
        for (let i = 0; i < 10; i++) {
            list.push(el[i].innerText)
        }
        return list
    });

    /**获取百度热搜num */
    let hotlistnum = page.$$eval('.opr-toplist1-right-hot', el => {
        let list = [];
        for (let i = 0; i < 10; i++) {
            list.push(el[i].innerText)
        }
        return list
    });

    /** await 并发执行 */
    const [topics, nums] = await Promise.all([hotlistname, hotlistnum]);


    /** 合并数据结构 */
    const hotlist = []
    topics.forEach((item, index) => {
        hotlist.push({
            name: item,
            num: nums[index]
        })
    })

    // console.log(hotlist)
    // console.timeEnd()

    page.close()

    return Promise.resolve(hotlist)

    // /** 这种方法，获取数据时间多 10ms左右 */
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

    //  console.log(list)
    //  console.timeEnd()

}

export {
    baiduHotSpider
}