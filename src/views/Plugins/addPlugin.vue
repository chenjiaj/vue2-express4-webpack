<template>
	<div>
		<form class="search-area">
			<div class="input-wrapper">
				<span class="search-icon"></span>
				<input type="text" placeholder="搜索" class="search-input"/>
				<span class="search-result"></span>
				<span class="clear-search"></span>
			</div>
		</form>
		
		<div class="plugins-wrapper">
			<div class="plugins-item">
				
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
	
	@height:1.325rem;
	
	.search-area{
		padding: 0.75rem 0;
	}
	
	.iconsBg(@left,@top){
		background: url("../../assets/icons.png") @left @top no-repeat;
		background-size: 7.5rem 7.5rem;
	}
	
	.input-wrapper{
		width: 96%;
		border:1px solid #ccc;
		border-radius:@height;
		margin: 0 auto;
		padding:0 @height/2;
		display:flex;
		align-items: center;
	
		.search-icon{
			display: inline-block;
			width: 0.78rem;
			height: 0.75rem;
			.iconsBg(-0.15rem, -0.2rem);
		}
	    
	    .search-input{
		    height: @height;
		    flex: 1;
		    outline:none;
		    font-size: 0.65rem;
		    padding: 0 0.25rem;
	    }
	    
	    .clear-search{
		    width: 0.6rem;
		    height: 0.6rem;
	        .iconsBg(-0.15rem, -1.15rem);
	    }
	}
</style>