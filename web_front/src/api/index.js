import request from "@/utils/request";

export function getBookmarks(params) {
  return request.get("/bookmarks", { params });
}

export function getRecommends() {
  return request.get("/recommends");
}

export function getHotnews() {
  return request.get("/hotnews");
}

export function downBookmarks() {
  return request.get("/download", { responseType: "blob" });
}

export function getTitleAndDescByUrl(params) {
  return request.get("/bookmark/title_desc", { params });
}

export function createBookMark(data) {
  return request.post("/bookmark", data);
}
