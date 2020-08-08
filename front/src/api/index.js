import request from "@/utils/request";

// 书签列表
export function getMarkList(page) {
  return request({
    url: "/bookmarks",
    params: {
      page
    }
  });
}

// 推荐列表
export function getRecomendList() {
  return request({
    url: "/recommends"
  });
}

// 百度热搜
export function getHotNews() {
  return request({
    url: "/hotnews"
  });
}

// 通过url 拉取网站标题和简介
export function getTitleAndDescByUrl(url) {
  return request({
    url: "/bookmark/title_desc",
    params: {
      url
    }
  });
}

// 创建 单个书签
export function createBookMark(data) {
  return request({
    url: "/bookmark",
    method: "post",
    data
  });
}
