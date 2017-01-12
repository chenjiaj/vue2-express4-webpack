<template>
	<div>
		<router-view></router-view>
		<Loading></Loading>
	</div>
</template>

<script>
	import Loading from './components/Loading';
	
	export default {
		components: {
			Loading: Loading
		}
	}
</script>

<style>
	*{
		margin: 0;
		padding: 0;
		border: 0;
		box-sizing: border-box;
	}
	
	li{
		list-style: none;
	}
	
	a{
		text-decoration: none;
	}
	
	body{
		font-family: 'Microsoft YaHei';
		font-size: 0.75rem;
	}
	
	html{
		font-size: 20px;
	}
	
	@media screen and (min-width:320px) {
		html{
			font-size: 20px;
		}
	}
	
	@media screen and (min-width:360px) {
		html{
			font-size: 22.5px;
		}
	}
	
	@media screen and (min-width:375px) {
		html{
			font-size: 23.44px;
		}
	}
	
	@media screen and (min-width:411px) {
		html{
			font-size: 25.6875px;
		}
	}
	
	
	@media screen and (min-width:414px) {
		html{
			font-size: 25.875px;
		}
	}
	
	@media screen and (min-width:435px) {
		html{
			font-size: 27.1875px;
		}
	}
	
	@media screen and (min-width:640px) {
		html{
			font-size: 40px;
		}
	}
	
	
	@media screen and (min-width:768px) {
		html{
			font-size: 48px;
		}
	}
	
	@media screen and (min-width:980px) {
		html{
			font-size: 61.2px;
		}
	}
	
	@media screen and (min-width:1024px) {
		html{
			font-size: 61.2px;
		}
	}
	
	@media screen and (min-width:1180px) {
		html{
			font-size: 64px;
		}
	}
	
	@media screen and (min-width:1366px) {
		html{
			font-size: 85.375px;
		}
	}
	
	@media screen and (min-width:1600px) {
		html{
			font-size: 100px;
		}
	}
	
	.queue-toast{
		display: none;
		position: absolute;
		z-index: 99;
		color: #fff;
		top: 70%;
		font-size: 1em;
		text-align: center;
		width: 100%;
		left: 0;
		-moz-transition-duration: 400ms;
		-o-transition-duration: 400ms;
		-webkit-transition-duration: 400ms;
		transition-duration: 400ms;
		
	}
	.queue-toast.toast-in {
		opacity: 0.9;
		-moz-transform: translate3d(0, 0, 0);
		-ms-transform: translate3d(0, 0, 0);
		-webkit-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
	}
	.queue-toast.toast-out {
		opacity: 0;
		-moz-transform: translate3d(0, 0, 0) scale(0.815);
		-ms-transform: translate3d(0, 0, 0) scale(0.815);
		-webkit-transform: translate3d(0, 0, 0) scale(0.815);
		transform: translate3d(0, 0, 0) scale(0.815);
	}
	
	.queue-toast>a{
		padding: 10px 15px;
		background: #222;
		opacity :.7;
		display: inline-block;
		max-width: 90%;
		margin: 0 auto;
		color:#fff;
		text-align: center;
		border-radius: 20px;
	}
</style>