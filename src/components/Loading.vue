<template>
	<div :class="{loading:true,isShow:isShow}">
		<div><i></i></div>
	</div>
</template>

<script>
	export default{
		computed:{
			isShow(){
				return this.$store.state.isShow;
			}
		}
	}
</script>

<style>
	
	@-o-keyframes anim-loading {
		from {-o-transform:rotate(0deg);}
		to {-o-transform:rotate(360deg);}
	}
	@-ms-keyframes anim-loading {
		from {-ms-transform:rotate(0deg);}
		to {-ms-transform:rotate(360deg);}
	}
	@-moz-keyframes anim-loading {
		from {-moz-transform:rotate(0deg);}
		to {-moz-transform:rotate(360deg);}
	}
	@-webkit-keyframes anim-loading {
		from {-webkit-transform:rotate(0deg);}
		to {-webkit-transform:rotate(360deg);}
	}
	@keyframes anim-loading {
		from {transform:rotate(0deg);}
		to {transform:rotate(360deg);}
	}
	
	
	.loading{
		display: none;
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 99;
		background-color: rgba(0,0,0,0.2);
		text-align: center;
		color: #999;
	}
	.loading div {
		position: relative;
		top: 50%;
		-webkit-transform: translateY(-50%);
		-moz-transform: translateY(-50%);
		-ms-transform: translateY(-50%);
		-o-transform: translateY(-50%);
		transform: translateY(-50%);
	}
	
	.loading i {
		display: inline-block;
		width: 40px;
		height: 40px;
		vertical-align: middle;
		margin-right: 10px;
		border: 5px solid #999999;
		border-right-color: #39414d;
		border-radius: 50%;
		-o-animation:anim-loading 1s linear infinite;
		-ms-animation:anim-loading 1s linear infinite;
		-moz-animation:anim-loading 1s linear infinite;
		-webkit-animation:anim-loading 1s linear infinite;
		animation:anim-loading 1s linear infinite;
	}
	
	.isShow{
		display: block;
	}
</style>