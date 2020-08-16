<template>
  <transition name="fade">
    <div class="scrolltop" v-if="visible" @click="scrollTop">
      <img src="../assets/scrolltop.png" />
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    };
  },
  mounted() {
    window.addEventListener("scroll", () => {
      let topDistance = document.documentElement.scrollTop || document.body.scrollTop;
      if (topDistance > 500) {
        this.visible = true;
      } else {
        this.visible = false;
      }
    });
  },
  methods: {
    scrollTop(e) {
      e.currentTarget.style.bottom = 200 + "px";
      e.currentTarget.style.opacity = 0;
      window.scroll({
        top: 0,
        behavior: "smooth"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.scrolltop {
  position: fixed;
  width: 26px;
  z-index: 999;
  bottom: 100px;
  right: 10%;
  cursor: pointer;
  transition: 0.5s;
  img {
    width: 26px;
  }
}
</style>
