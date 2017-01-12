<template>
	<div>
		<form class="search-area">
			<div class="input-wrapper">
				<span class="search-icon" @click="fetchData"></span>
				<input type="text" placeholder="搜索" class="search-input" v-model="searchData"/>
				<span class="search-result" v-if="resultNum"> {{ resultNum }} 个结果</span>
				<span class="clear-search" @click="clearSearchInpt"></span>
			</div>
		</form>
		
		<div class="plugins-wrapper">
			<div class="plugins-item" v-for="item in resultList">
				<router-link :to="getUrl(item)">
					<img v-if="item.IconName" :src="item.IconName" class="img"/>
					<img v-else src="../../assets/icons.png" class="img"/>
				</router-link>
				<router-link :to="getUrl(item)" class="content">
					<p class="c-title">{{item.Plugin_Cname}}</p>
					<p class="c-des">{{item.Description}}</p>
					<p class="c-info">（{{item.Installed}}人下载）</p>
				</router-link>
				<div class="operate">
					<installBtn :item="item" :query="this"></installBtn>
				</div>
			</div>
			<div v-if="resultList.length == 0" class="no-data">暂无数据</div>
		</div>
	</div>
</template>

<script>
	import api from '../../tool/fetch-api';
	import installBtn from './components/installBtn';
	
	export default {
		data(){
			return {
				resultNum: false,
				searchData: "",
				resultList: [],
			};
		},
		components: {
			installBtn: installBtn
		},
		created(){
			this.fetchData();
			console.log('this.$store.state.count:',this.$store.state.isShow);
		},
		watch: {
			'$route': 'fetchData'// 如果路由有变化，会再次执行该方法
		},
		methods: {
			/**
			* 清空查询表单
			* */
			clearSearchInpt() {
				this.searchData = "";
			},
			/**
			 * 获取跳转到插件详情的url
			 * */
			getUrl(item){
				let query = this.$route.query;
				return "/plugin/detail?uid=" + query.uid + "&utype=" + query.utype + "&openId=" + query.openId + "&pluginID=" + item.Plugin_Name + "&pVersion=" + query.pVersion + "&osType=" + query.osType + "&mac=" + query.mac + "&version=" + item.Version;
			},
			/**
			 * 查询插件列表
			 */
			fetchData(){
				let query = this.$route.query;//获取url的参数
				let findObj = {
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
								
				api(this,'appGatewayPluginListGet', findObj, res => {
					let list = res.responseJson.ResultData.Plugin;
					let resList = new Array();
					/**
					 * 搜索现在暂时做在前端，过滤搜索条件
					 */
					if(this.searchData){
						list.forEach(item=>{
							if(item.Plugin_Cname.indexOf(this.searchData) != -1){
								resList.push(item);
							}
						});
					}else{
						resList = list;
					}
					
					this.resultList = resList;
					this.resultNum = resList.length;
				});
				
			}
		}
	}
</script>

<style lang="less" rel="stylesheet/less" scoped>
	
	/**变量**/
	
	@height :1.325rem;
	
	/**mixin**/
	
	.iconsBg(@left ,@top ) {
		background: url("../../assets/icons.png") @left @top no-repeat;
		background-size: 7.5rem 7.5rem;
	}
	
	/**搜索区域**/
	
	.search-area {
		padding: 0.75rem 0;
	}
	
	.input-wrapper {
		width: 94%;
		border: 1px solid #ccc;
		border-radius: @height;
		margin: 0 auto;
		padding: 0 @height / 2;
		display: flex;
		align-items: center;
	
		.search-icon {
			display: inline-block;
			width: 0.78rem;
			height: 0.75rem;
			.iconsBg(-0.15rem, -0.2rem);
		}
	
		.search-input {
			height: @height;
			flex: 1;
			outline: none;
			font-size: 0.65rem;
			padding: 0 0.25rem;
		}
	
		.search-result {
			font-size: 0.55rem;
			color: #999;
			padding: 0 5px;
		}
	
		.clear-search {
			width: 0.6rem;
			height: 0.6rem;
			.iconsBg(-0.2rem, -1.19rem);
		}
		
	}
	
	/**插件列表区域**/
	
	.plugins-wrapper {
		padding-left: 4%;
		border-top: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		font-size: 0.65rem;
		line-height: 1.4em;
	
		.plugins-item {
			display: flex;
			padding: 0.65rem 4% 0.65rem 0;
			border-bottom: 1px solid #ddd;
			align-items: center;
		
			a {
				color: #000;
			}
	
			&:last-child {
				border-bottom: 0;
			}
		
		}
	
		.content {
			padding-left: 0.4rem;
			flex: 1;
			width: 60%;
		
			.c-title {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			
			.c-des, .c-info {
				font-size: 0.5rem;
				color: #999;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			
		}
	
		.img {
			width: 2.75rem;
			height: 2.75rem;
		}
		
		.no-data {
			text-align: center;
			padding: 0.5rem 0;
			color: #999;
		}
		
	}
	
</style>