import request from "@/utils/request";

export function getSearchResult(key) {
  return request({
    url: "/search",
    params: {
      key
    }
  });
}
