import request from '@/utils/request';

export function getMarkList(page) {
  return request({
    url: '/bookmarks',
    params: {
      page,
    },
  });
}

export function getRecomendList() {
  return request({ url: '/recommends' });
}

export function getHotNews() {
  return request({ url: '/hotnews' });
}
