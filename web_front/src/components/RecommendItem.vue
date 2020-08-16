<template>
  <div>
    <a class="recommend" :href="item.url" target="_blank">{{ item.title }}</a>
  </div>
</template>

<script>
export default {
  props: ["item"]
};
</script>

<style>
.recommend {
  font-size: 14px;
  color: #555;
}
</style>
