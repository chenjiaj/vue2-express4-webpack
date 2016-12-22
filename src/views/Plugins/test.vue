<template>
	<CssCircle width="150" font-size=48 v-bind:pv="60" bold=8 class="cssCircle"></CssCircle>
</template>

<script>
	import cssCircle  from '../../components/CssCircle';
	
	export default{
		components: {
			CssCircle: cssCircle
		}
	}
</script>