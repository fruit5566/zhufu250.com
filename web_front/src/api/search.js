import request from "@/utils/request";

export function searchBookmarks(params) {
  return request.get("/search", { params });
}
