<template>
	<div class="wrapper" v-if="item">
		<div class="plugins-item">
			<img v-if="item.IconName" v-bind:src="item.IconName" class="img"/>
			<img v-else src="../../assets/icons.png" class="img"/>
			<div class="content">
				<p class="c-title">{{item.Plugin_Cname}}</p>
				<p class="c-des">{{item.Description}}</p>
				<p class="c-info">（{{item.Installed}}人下载）</p>
			</div>
			<div class="operate">
				<installBtn :item="item" :query="this"></installBtn>
			</div>
		</div>
		<div class="info">
			<dl>
				<dd class="title">插件简介</dd>
				<dt class="content">{{item.Description}}</dt>
			</dl>
			<dl>
				<dd class="title">应用信息</dd>
				<dt class="content">
					<p>作者 {{item.Author}}</p>
					<p>版本 {{item.Version}}</p>
				</dt>
			</dl>
		</div>
	</div>
	<div class="loading" v-else-if="isloading">
		请稍后,数据请求中...
	</div>
	<div class="no-data" v-else>
		抱歉，未查询到相关信息
	</div>
</template>

<script>
	import api from '../../tool/fetch-api';
	import installBtn from './components/installBtn';
	
	export default {
		data(){
			return {
				resultNum:false,
				searchData:"",
				item:null,
				isloading:true
			};
		},
		components:{
			installBtn:installBtn
		},
		created(){
			this.fetchData();
		},
		watch: {
			'$route': 'fetchData'// 如果路由有变化，会再次执行该方法
		},
		methods:{
			/**
			 * 获取插件详情信息
			 */
			fetchData(){
				var query = this.$route.query;
				var findObj = {
					serviceName: "appHandleService",
					methodName: "appGatewayPluginDetailGet",
					uid: query.uid,
					utype: query.utype,
					parameters: {
						requestJson: {
							CmdType: 'APP_GATEWAY_PLUGIN_DETAIL_GET',
							ID: 42,
							PVersion: parseInt(query.pVersion),
							OsType: query.osType,
							OpenId: query.openId,
							Parameter: {
								Plugin_Name: query.pluginID,
								GatewayMac: query.mac,
								Version: query.version
							}
						}
					}
				};
				
				this.isloading = true;
				
				api(this,'appGatewayPluginDetailGet',findObj,res => {
					var item = res.responseJson.ResultData;
					this.item = item;
					this.isloading = false;
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	
	.plugins-item {
		display: flex;
		color: #000;
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
	
	.title{
		font-size: 0.65rem;
	}
	
	.content{
		font-size: 0.55rem;
		padding-left: 2em;
	}
	
	.wrapper{
		padding: 0 3%;
	}
	
	.info{
		margin-top:1em;
		line-height: 1.5em;
	}
	
	.loading,.no-data{
		text-align: center;
		padding-top: 2em;
	}
	
</style>