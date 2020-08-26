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
 @import './common/uni.css';
</style>
