import request from '@/utils/request'

export function fetchList() {
  return request({
    // url: 'https://api.zhufu250.com/cms/bookmarks',
    url: 'http://127.0.0.1:3001/cms/bookmarks',
    method: 'get'
  })
}

export function updateBookmark(data) {
  return request({
    // url: 'https://api.zhufu250.com/cms/bookmarks',
    url: 'http://127.0.0.1:3001/cms/bookmark',
    method: 'post',
    data
  })
}
