let recommentList = [
    {
        title:"哔哩哔哩 (゜-゜)つロ 干杯~-bilibili",
        url:"https://www.bilibili.com/"
    },
    {
        title:"SegmentFault 思否,开发者社区",
        url:"https://segmentfault.com/"
    },
    {
        title:"菜鸟教程 - 学的不仅是技术，更是梦想！",
        url:"https://www.runoob.com/"
    },
    {
        title:"人人影视|字幕组美剧、日剧",
        url:"http://www.rrys2019.com/"
    },
    {
        title:"TED官网，世界值得分享！",
        url:"https://www.ted.com/"
    },
    {
        title:"豆瓣电影、电影推荐",
        url:"https://movie.douban.com/"
    },
    {
        title:"VUE官方网站、VUE官方网站、VUE官方网站",
        url:"https://cn.vuejs.org/"
    },

]

const RecommendModel = require('../db_schema/recomend_shema')

for(let i =0; i<recommentList.length; i++){
    RecommendModel.create(recommentList[i])
}

