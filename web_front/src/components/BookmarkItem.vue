<template>
  <div class="item">
    <a :href="item.url" class="title" target="_blank">
      <img class="icon" :src="item.icon ? item.icon : '/favicon.ico'" @error="imgError" />
      {{ item.title }}
    </a>
    <div class="desc">{{ item.desc }}</div>
    <!-- <div class="time">{{ new Date(item.created_at).toLocaleString() }}</div> -->
    <div class="time">{{ item.created_at }}</div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    imgError: function(el) {
      el.target.src =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFERkY1RUJDOThGNDExRUE5NTFERkNGRUVFNkRENzFFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFERkY1RUJEOThGNDExRUE5NTFERkNGRUVFNkRENzFFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QURGRjVFQkE5OEY0MTFFQTk1MURGQ0ZFRUU2REQ3MUUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QURGRjVFQkI5OEY0MTFFQTk1MURGQ0ZFRUU2REQ3MUUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6UIdQgAAAKUUlEQVR42syZ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";
      el.onerror = null;
    }
  }
};
</script>

<style scoped>
.item {
  border-bottom: 1px solid #f0f0f0;
  padding: 15px 0;
  text-align: left;
}
.title {
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 5px;
  cursor: pointer;
  word-break: break-all;
}
.icon {
  width: 22px;
  margin-right: 2px;
  margin-top: -2px;
  vertical-align: middle;
}
.desc {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.6;
  color: #555;
  font-size: 14px;
  word-break: break-all;
}
.time {
  font-size: 14px;
  color: #888;
  margin-top: 5px;
}
</style>
