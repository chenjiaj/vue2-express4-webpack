<template>
	<div class="wrapper">
		<div class="plugins-item">
			<img v-if="item.IconName" v-bind:src="item.IconName" class="img"/>
			<img v-else src="../../assets/icons.png" class="img"/>
			<div class="content">
				<p class="c-title">{{item.Plugin_Cname}}</p>
				<p class="c-des">{{item.Description}}</p>
				<p class="c-info">（{{item.Installed}}人下载）</p>
			</div>
			<div class="operate">
				<button type="button" class="btn" v-on:click="insallPlugin.call(this,item)">安装</button>
				<!--<button type="button" class="btn" v-if="item.Installed == 0" v-on:click="insallPlugin(item)">安装</button>
				<button type="button" class="btn" v-else disabled v-on:click="insallPlugin(item)">安装</button>-->
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
		
		<div class="model" v-if="isShowModel">
			<p class="title">安装插件</p>
			<div class="progress">
				<CssCircle width="150" font-size=48 v-bind:pv="pv" bold=8 class="cssCircle"></CssCircle>
			</div>
			<p class="stop-btn"><span v-on:click="cacelInstallPlugin">终止安装</span></p>
		</div>
		<div class="dark" v-if="isShowModel"></div>
		
	</div>
</template>

<script>
	import es6Promise from 'es6-promise';
	import fetch from 'isomorphic-fetch';
	import api from '../../tool/fetch-api'
	import CssCircle  from '../../components/CssCircle'
	
	export default {
		data(){
			return {
				resultNum:false,
				searchData:"",
				isShowModel:false,
				pv:55,
				item:{}
			};
		},
		components:{
			CssCircle:CssCircle
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
			getUrl(item){
				var query = this.$route.query;
				return "/detail?uid="+query.uid+"&utype="+query.utype+"&openId="+query.openId+"&pluginID="+item.Plugin_Name+"&pVersion="+query.pVersion+"&osType="+query.osType+"&mac="+query.mac+"&version="+item.Version;
			},
			fetchData(){
				console.log('fetchData');
				var $this = this;
				
				var query = this.$route.query;
				var data = {
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
				
				api($this,data,function (res) {
					var item = res.responseJson.ResultData;
					$this.item = item;
				});
				
				console.log("this.pv",this.pv);
			},
			insallPlugin(item){
				const speed = 2000;
				let query = this.$route.query;
				let data = {
					serviceName: 'pluginHandleService',
					methodName: 'pluginActionInstall',
					uid: query.uid,
					utype: query.utype,
					parameters: {
						requestJson:{
							OpenId: query.openId,
							PVersion: query.pVersion,
							OsType: query.osType,
							ID: 99,
							RPCMethod: 'Install',
							SequenceId: '00000099',
							CmdType: 'PLUGIN_ACTION_INSTALL',
							"GatewayMac": query.mac,
							'Plugin_Name': item.Plugin_Name,
							"OS": item.OS,
							"Plugin_size": item.Plugin_size,
							"Download_url": item.Download_url,
							"Version": item.Version
						}
					}
				};
				
				api(this,data,res => {
					let da = res.responseJson;
					
					if(!da){
						this.$toast.show("服务器内部错误,请稍后再试",speed);
						return false;
					}
					
					if(da.Result == 0){
						this.pv = 0;
						this.getProgress(item);
					}else{
						switch (da.Result){
							case -101:
								this.$toast.show("安装任务不存在",speed);
								break;
							case -102:
								this.$toast.show("插件签名验证失败",speed);
								break;
							case -103:
								this.$toast.show("下载地址错误",speed);
								break;
							case -104:
								this.$toast.show("空间不足",speed);
								break;
							case -105:
								this.$toast.show("已存在一个安装任务",speed);
								break;
							case -106:
								this.$toast.show("版本不正确",speed);
								break;
							case -107:
								this.$toast.show("系统不匹配",speed);
								break;
							case -108:
								this.$toast.show("重启后继续安装",speed);
								break;
							case -109:
								this.$toast.show("下载失败",speed);
								break;
							case -110:
								this.$toast.show("启动失败",speed);
								break;
							case -111:
								this.$toast.show("插件已完成安装",speed);
								break;
							case -112:
								this.$toast.show("插件不存在",speed);
								break;
							case -117:
								this.$toast.show("安装失败",speed);
								break;
							default:
								this.$toast.show("服务器内部错误,请重新安装",speed);
						};
					}
				});
			},
			getProgress(item,isError){
				this.isShowModel = true;
				const speed = 2000;
				let query = this.$route.query;
				let data = {
					serviceName: 'pluginHandleService',
					methodName: 'pluginActionInstallQuery',
					uid: query.uid,
					utype: query.utype,
					parameters: {
						requestJson:{
							OpenId: query.openId,
							PVersion: query.PVersion,
							OsType: query.osType,
							ID: 89,
							RPCMethod: 'Install_query',
							CmdType: 'PLUGIN_ACTION_INSTALL_QUERY',
							SequenceId: '00000089',
							"GatewayMac": query.mac,
							"Plugin_Name": item.Plugin_Name
						}
					}
				};
				
				api(this,data,res => {
					let da = res.responseJson;
					if(!da){
						this.$toast.show("服务器内部错误,请稍后再试",speed);
						return false;
					}
					
					var percent = da.Percent;
					if(percent>=0){
						this.pv = percent;
						if(percent < 100){
							this.timer = setTimeout(() => {
								this.getProgress(item,true);
							},1000)
						}
					}else{
						if(!isError){
							this.getProgress(item,true);
							return;
						}
						this.pv = 0;
						switch (da.Result){
							case -101:
								this.$toast.show("安装任务不存在",speed);
								break;
							case -102:
								this.$toast.show("插件签名验证失败",speed);
								break;
							case -103:
								this.$toast.show("下载地址错误",speed);
								break;
							case -104:
								this.$toast.show("空间不足",speed);
								break;
							case -105:
								this.$toast.show("已存在一个安装任务",speed);
								break;
							case -106:
								this.$toast.show("版本不正确",speed);
								break;
							case -107:
								this.$toast.show("系统不匹配",speed);
								break;
							case -108:
								this.$toast.show("重启后继续安装",speed);
								break;
							case -109:
								this.$toast.show("下载失败",speed);
								break;
							case -110:
								this.$toast.show("启动失败",speed);
								break;
							case -111:
								this.$toast.show("插件已完成安装",speed);
								break;
							case -112:
								this.$toast.show("插件不存在",speed);
								break;
							case -117:
								this.$toast.show("安装失败",speed);
								break;
							default:
								this.$toast.show("服务器内部错误,请重新安装",speed);
						};
					}
				});
			},
			cacelInstallPlugin(){
				this.isShowModel = false;
				clearTimeout(this.timer);
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
	
	
	.btn{
		background: none;
		padding: 0.2rem 0.4rem;
		border:1px solid #41e3a7;
		border-radius: 5px;
		font-size: 0.5rem;
		color:#41e3a7;
		outline: none;
	}
	
	.btn[disabled="disabled"]{
		color: #ccc;
		border-color: #ccc;
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
	
		.progress{
			margin: 1rem 0 2rem 0;
			text-align: center;
		}
		
		.stop-btn{
			color:#ff6565;
		}
		
		.cssCircle{
			margin: 0 auto;
		}
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