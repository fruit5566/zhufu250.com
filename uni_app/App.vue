<script>
  export default {
    onLaunch: function() {
      console.log('App Launch');
      setTimeout(() => {
        plus.navigator.closeSplashscreen()
      }, 2000)
    },
    onShow: function() {
      console.log('App Show');
    },
    onHide: function() {
      console.log('App Hide');
    }
  };
</script>

<style>
  /* #ifndef APP-PLUS-NVUE */
  /* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
  /* @import './common/uni.css'; */
  /* #endif*/
</style>
