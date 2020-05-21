<template>
  <transition name="slide">
    <div class="toast" v-show="visible">{{message}}</div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      message: ""
    };
  }
};
</script>

<style scoped>
.toast {
  position: fixed;
  z-index: 99999;
  min-width: 400px;
  padding: 15px;
  border-radius: 4px;
  white-space: nowrap;
  background-color:#f3f3f3;
  text-align: center;
  color: red;
  top: 10px;
  left: 50%;
  transform: translate(-50%);
}
</style>