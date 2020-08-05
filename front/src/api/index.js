import request from '@/utils/request';

export function getMarkList() {
  return request({ url: '/bookmarks' });
}

export function getRecomendList() {
  return request({ url: '/recommends' });
}

export function getHotNews() {
  return request({ url: '/hotnews' });
}
