<template>
  <div class="row">
      <a :href="'https://www.baidu.com/s?wd=' + item.name" target="_blank">{{item.name}}</a>
      <span class="num">{{item.num}}</span>
  </div>
</template>

<script>
export default {
  props: ["item"]
}
</script>

<style scoped>
.row {
  display: flex;
  justify-content: space-between;
  padding: 3px 0;
    border-bottom: 1px solid #f3f3f3;
}
.row a {
  overflow: hidden;;
}
.row .num {
  margin-left:5px ;
}

</style>