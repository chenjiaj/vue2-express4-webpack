<template>
	<div>
		<form class="search-area">
			<div class="input-wrapper">
				<span class="search-icon" v-on:click="fetchData"></span>
				<input type="text" placeholder="搜索" class="search-input" v-model="searchData"/>
				<span class="search-result" v-if="resultNum"> {{ resultNum }} 个结果</span>
				<span class="clear-search" v-on:click="clearSearchInpt"></span>
			</div>
		</form>
		
		<div class="plugins-wrapper">
			<div class="plugins-item" v-for="item in resultList">
				<img v-if="item.IconName" v-bind:src="item.IconName" class="img"/>
				<img v-else src="../../assets/icons.png" class="img"/>
				<div class="content">
					<p class="c-title">{{item.Plugin_Cname}}</p>
					<p class="c-des">{{item.Description}}</p>
					<p class="c-info">（{{item.Installed}}人下载）</p>
				</div>
				<div class="operate">
					<button type="button" class="btn" v-on:click="insallPlugin">安装</button>
				</div>
			</div>
			<div v-if="resultList.length == 0" class="no-data">暂无数据</div>
		</div>
		
		<div class="model" v-if="isShowModel">
			<p>安装插件</p>
			<p v-on:click="cacelInstallPlugin">终止安装</p>
		</div>
		<div class="dark" v-if="isShowModel"></div>
	</div>
</template>

<script>
	import es6Promise from 'es6-promise';
	import fetch from 'isomorphic-fetch';
	import api from '../../tool/fetch-api'
		
	export default {
		data(){
			return {
				resultNum:false,
				searchData:"",
				isShowModel:false,
				resultList:[]
			};
		},
		created(){
			es6Promise.polyfill();
			this.fetchData();
		},
		watch: {
			// 如果路由有变化，会再次执行该方法
			'$route': 'fetchData'
		},
		methods:{
			clearSearchInpt() {
				this.searchData = "";
				//this.resultNum = false;
			},
			fetchData(){
				console.log('fetchData');
				var $this = this;
				
				var query = this.$route.query;
				var data = {
					serviceName: "appHandleService",
					methodName: "appGatewayPluginListGet",
					uid: query.uid,
					utype: query.utype,
					parameters: {
						requestJson: {
							CmdType: "APP_GATEWAY_PLUGIN_LIST_GET",
							OpenId: query.openId,
							ID: 42,
							OsType: query.osType,
							PVersion: parseInt(query.pVersion),
							Parameter: {
								GatewayMac: query.mac
							},
							RPCMethod: "get",
							SequenceId: "00000052"
						}
					}
				};
				
				api(data,$this,function (res) {
					var list = res.responseJson.ResultData.Plugin;
					$this.resultList = list;
					$this.resultNum = list.length;
				});
			},
			insallPlugin(){
				this.isShowModel = true;
			},
			cacelInstallPlugin(){
				this.isShowModel = false;
			}
		}
	}
</script>

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
		width: 94%;
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
	    
	    .search-result{
		    font-size: 0.55rem;
		    color: #999;
		    padding: 0 5px;
	    }
	    
	    .clear-search{
		    width: 0.6rem;
		    height: 0.6rem;
	        .iconsBg(-0.2rem, -1.19rem);
	    }
	}
	
	.plugins-wrapper{
		padding-left: 4%;
		border-top: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		font-size:0.65rem;
		line-height:1.4em;
	
		.plugins-item{
			display: flex;
			padding: 0.65rem 4% 0.65rem 0;
			border-bottom:1px solid #ddd;
			align-items: center;
			
			&:last-child{
				 border-bottom:0;
			 }
	         
		}
		
		.content{
			padding-left: 0.4rem;
			flex: 1;
			width:60%;
			
			.c-title{
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			
			.c-des,.c-info{
				font-size: 0.5rem;
				color: #999;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
		
		.img{
			width: 2.75rem;
			height: 2.75rem;
		}
	    
	    .operate{
		    .btn{
			    background: none;
			    padding: 0.2rem 0.4rem;
			    border:1px solid #41e3a7;
			    border-radius: 5px;
			    font-size: 0.5rem;
			    color:#41e3a7;
		    }
	    }
	
		.no-data{
			text-align: center;
			padding: 0.5rem 0 ;
			color:#999;
		}
	}
	
	.model{
		position: fixed;
		left:50%;
		top:10%;
		width: 80%;
		background: #fff;
		z-index:1;
		transform: translate(-50%,0);
		border-radius: 0.3rem;
		padding: 5%;
		text-align: center;
	}
	
	.dark{
		position: fixed;
		left:0;
		top:0;
		background: rgba(0,0,0,0.3);
		width: 100%;
		height:100%;
	}
</style>