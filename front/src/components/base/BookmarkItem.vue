<template>
  <div class="item">
    <a :href="item.url" class="title" target="_blank">
      <img class="icon" :src="item.icon?item.icon:'favicon.ss'" @error="imgError"/>
      {{item.title}}
    </a>
    <div class="desc">{{item.desc}}</div>
    <div class="time">{{new Date(item.created_at).toLocaleString()}}</div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    imgError: function(el) {
      el.target.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACaElEQVQ4jY2SP2gUQRSHvzcze5c977jDiBhQTGEngqIBAyIkRYKNIJggYiOCImprJXiWNnYiEaJoIXIKgiBIIImFqGCMQv7YiWIjGjS62c1lb2fGYs0ZG8kPBh7vzbz38XsDqxqZCrg7f47R6V4Ahhq6XVuNR6d7uTt/jpGpYLUk1L2CK7Dt6C4qlXe00gWa8RFO7X7OWo2+O0DHhkcEhU1E0W4+P5yBy0j7wu23NaR4g7B8jJXkO5kdwuvX+Rjbg9EPKJY2srx0H79ylpN7FnOCay9CNtXqoI7jfQWhig7AWbBZAoA2JZQG2wLPT0QicPdYWKwbOqtXqXReIPoB3iV4iXCpQxDAAODsL6z1gEIwIFupdF7ESyjcmY/RgaLVOoxTrwBoWk+HFirWAxBpaecAlNtPEDzGtaxB6RKt9CfdXyfp68tYjyYnJ/m4eQVjqgbwKBE+dIU0GgnLu8bw3rOSHOL03rzhzTeGQvgUpSCcGeBDV4hxAniD9wIIsU5RPQGFrB/vwTY7crOAxlyRNOhHBOKegDhLqToBUH+gPLXE8Kk7JUsnyLJxPreW28jzX5tk2ThZOsGn7pRakpPnrkpulCpp6uII5wZ4MjtIvS8Dcrp6X0ZpdpBwboC6OFSp/UsNIDjvCXfEAAwP2zV2+Xa0Nl94G5Ps9IAYnE0ICkXi9/005l7ypaDYYH17hauKtBBrYUvqiKWXICjisiWD97coV88T/RgjyRKqrXzXy/LPe4yDqoMEj9ElylVYXLiuOXjiGcpqUNuBAHD/PaIsyDeayQ2+L176O2ZkqoQpa9ajbMlyZl8C8BsqkQfT9fYhAwAAAABJRU5ErkJggg==";
      el.onerror = null
    }
  }
};
</script>

<style scoped>
.item {
  border-bottom: 1px solid #f0f0f0;
  padding: 15px 0;
}
.title {
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 5px;
  cursor: pointer;
}
.title:hover {
  color: #017e66;
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
  color: #666;
  font-size: 14px;
}
.time {
  font-size: 14px;
  color: #888;
  margin-top: 5px;
}
</style>