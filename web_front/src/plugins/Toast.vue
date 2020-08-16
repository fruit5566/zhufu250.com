<template>
  <transition name="slide">
    <div class="toast" v-if="visible">{{ message }}</div>
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
