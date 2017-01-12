<template>
	<div>
		<button type="button" class="btn" v-if="isInstall" v-on:click="insallPlugin">安装中</button>
		<button type="button" class="btn" v-else-if="pv == 100" disabled>已安装</button>
		<button type="button" class="btn" v-else-if="item.Installed == 0" v-on:click="insallPlugin">安装</button>
		<button type="button" class="btn" v-else disabled>安装</button>
		
		<div class="model" v-if="isShowModel">
			<p class="title">安装插件</p>
			<div class="progress">
				<CssCircle width="150" font-size=48 v-bind:pv="pv" bold=8 class="cssCircle"></CssCircle>
			</div>
			<p class="stop-btn"><span v-on:click.stop.prevent="cacelInstallPlugin">终止安装</span></p>
		</div>
		<div class="dark" v-if="isShowModel" v-on:click="closeModel"></div>
	</div>
</template>

<script>
	import api from '../../../tool/fetch-api';
	import cssCircle  from '../../../components/CssCircle';
		
	export default{
		components: {
			CssCircle: cssCircle
		},
		props: [
			'item',
			'query'
		],
		data(){
			return {
				isShowModel: false,
				pv: 0,
				isInstall:null
			}
		},
		methods: {
			/**
			 * 发送安装插件请求
			 */
			insallPlugin(){
				const speed = 2000;
				let item = this.item;
				
				if(this.isInstall){//如果在安装中,直接请求进度
					this.resetProgress();//重置进度控件
					this.isShowModel = true;//打开弹出框
					this.getProgress();//请求进度状态
					return;
				}
				
				let query = this.$route.query;
				let data = {
					serviceName: 'pluginHandleService',
					methodName: 'pluginActionInstall',
					uid: query.uid,
					utype: query.utype,
					parameters: {
						requestJson: {
							OpenId: query.openId,
							PVersion: query.pVersion,
							OsType: query.osType,
							ID: 99,
							RPCMethod: 'Install',
							SequenceId: '00000099',
							CmdType: 'PLUGIN_ACTION_INSTALL',
							GatewayMac: query.mac,
							Plugin_Name: item.Plugin_Name,
							OS: item.OS,
							Plugin_size: item.Plugin_size,
							Download_url: item.Download_url,
							Version: item.Version
						}
					}
				};
				
				api(this,'pluginActionInstall', data, res => {
					
					let da = res.responseJson;
					
					if (!da) {
						this.$toast.show("服务器内部错误,请稍后再试", speed);
						return false;
					}
					
					if (da.Result == 0) {
						this.resetProgress();//重置进度控件
						this.isShowModel = true;//打开弹出框
						this.getProgress(true);//请求进度状态
						this.isInstall = true;//标记安装中
					} else {
						console.log(da.Result)
						switch (da.Result) {
							case -101:
								this.$toast.show("安装任务不存在", speed);
								break;
							case -102:
								this.$toast.show("插件签名验证失败", speed);
								break;
							case -103:
								this.$toast.show("下载地址错误", speed);
								break;
							case -104:
								this.$toast.show("空间不足", speed);
								break;
							case -105:
								console.log('已存在一个安装任务')
								this.$toast.show("已存在一个安装任务", speed);
								break;
							case -106:
								this.$toast.show("版本不正确", speed);
								break;
							case -107:
								this.$toast.show("系统不匹配", speed);
								break;
							case -108:
								this.$toast.show("重启后继续安装", speed);
								break;
							case -109:
								this.$toast.show("下载失败", speed);
								break;
							case -110:
								this.$toast.show("启动失败", speed);
								break;
							case -111:
								this.$toast.show("插件已完成安装", speed);
								break;
							case -112:
								this.$toast.show("插件不存在", speed);
								break;
							case -117:
								this.$toast.show("安装失败", speed);
								break;
							default:
								this.$toast.show("服务器内部错误,请重新安装", speed);
						}
						;
					}
				});
			},
			/**
			 * 获取安装进度
			 * @param isFirst 是否是第一次安装,true 第一次安装
			 */
			getProgress(isFirst){
				const speed = 2000;
				let item = this.item;
				let query = this.$route.query;
				let data = {
					serviceName: 'pluginHandleService',
					methodName: 'pluginActionInstallQuery',
					uid: query.uid,
					utype: query.utype,
					parameters: {
						requestJson: {
							OpenId: query.openId,
							PVersion: query.PVersion,
							OsType: query.osType,
							ID: 89,
							RPCMethod: 'Install_query',
							CmdType: 'PLUGIN_ACTION_INSTALL_QUERY',
							SequenceId: '00000089',
							GatewayMac: query.mac,
							Plugin_Name: item.Plugin_Name
						}
					}
				};
								
				api(this,'pluginActionInstallQuery', data, res => {
					
					let da = res.responseJson;
				
					if (!da) {
						this.$toast.show("服务器内部错误,请稍后再试", speed);
						return false;
					}
					
					let percent = da.Percent;
					
					if (percent >= 0) {
						this.pv = percent;
						if (percent < 100) {
							this.timer = setTimeout(() => {
								this.getProgress();
							}, 5000)
						}else if(percent == 100){
							this.$toast.show("下载成功", speed);
							this.isShowModel = false;
							this.isInstall = false;//标记不在安装中
						}
					} else {
						
						if (isFirst) { //第一次请求失败的情况下，再请求一次
							this.getProgress();
							return;
						}
						
						this.resetProgress();//重置进度控件
						
						switch (da.Result) {
							case -101:
								this.$toast.show("安装任务不存在", speed);
								break;
							case -102:
								this.$toast.show("插件签名验证失败", speed);
								break;
							case -103:
								this.$toast.show("下载地址错误", speed);
								break;
							case -104:
								this.$toast.show("空间不足", speed);
								break;
							case -105:
								this.$toast.show("已存在一个安装任务", speed);
								break;
							case -106:
								this.$toast.show("版本不正确", speed);
								break;
							case -107:
								this.$toast.show("系统不匹配", speed);
								break;
							case -108:
								this.$toast.show("重启后继续安装", speed);
								break;
							case -109:
								this.$toast.show("下载失败", speed);
								break;
							case -110:
								this.$toast.show("启动失败", speed);
								break;
							case -111:
								this.$toast.show("插件已完成安装", speed);
								break;
							case -112:
								this.$toast.show("插件不存在", speed);
								break;
							case -117:
								this.$toast.show("安装失败", speed);
								break;
							default:
								this.$toast.show("服务器内部错误,请重新安装", speed);
						}
					}
				},()=>{},()=>{},false);
			},
			/**
			 * 重置进度条
			 * */
			resetProgress(){
				this.pv = 0;//重置
			},
			/**
			 * 发送取消安装请求
			 * */
			cacelInstallPlugin(){
				
				const speed = 2000;
				let item = this.item;
				let query = this.$route.query;
				let data = {
					serviceName: 'pluginHandleService',
					methodName: 'pluginActionInstallCancel',
					uid: query.uid,
					utype: query.utype,
					parameters: {
						requestJson: {
							OpenId: query.openId,
							PVersion: query.PVersion,
							OsType: query.osType,
							ID: 79,
							RPCMethod: 'Install_cancel',
							CmdType: 'PLUGIN_ACTION_INSTALL_CANCEL',
							SequenceId: '00000089',
							GatewayMac: query.mac,
							Plugin_Name: item.Plugin_Name
						}
					}
				};
				
				api(this,'pluginActionInstallCancel', data, res => {
					
					this.isShowModel = false;
					clearTimeout(this.timer);
					
					if(res.Result == 0){
						this.$toast.show("已成功取消安装", speed);
						this.isInstall = false;//标记不在安装中
						return;
					}
				
					switch (res.Result){
						case -101:
							this.$toast.show("安装任务不存在", speed);
							break;
						case -111:
							this.$toast.show("插件已完成安装", speed);
							break;
						default:
							this.$toast.show("请求失败，请稍后再试", speed);
					}
					
				});
				
			},
			/**
			 * 关闭弹窗
			 * */
			closeModel(){
				this.isShowModel = false;
			}
		}
	}
</script>

<style lang="less" scoped>
	.btn {
		background: none;
		padding: 0.2rem 0.4rem;
		border: 1px solid #41e3a7;
		border-radius: 5px;
		font-size: 0.5rem;
		color: #41e3a7;
		outline: none;
	}
	
	.btn[disabled="disabled"] {
		color: #ccc;
		border-color: #ccc;
	}
	
	.title {
		font-size: 0.65rem;
	}
	
	.model {
		position: fixed;
		left: 50%;
		top: 10%;
		width: 80%;
		background: #fff;
		z-index: 1;
		transform: translate(-50%, 0);
		border-radius: 0.3rem;
		padding: 5%;
		text-align: center;
	
		.progress {
			margin: 1rem 0 2rem 0;
			text-align: center;
		}
		
		.stop-btn {
			color: #ff6565;
		}
		
		.cssCircle {
			margin: 0 auto;
		}
		
	}
	
	.dark {
		position: fixed;
		left: 0;
		top: 0;
		background: rgba(0, 0, 0, 0.3);
		width: 100%;
		height: 100%;
	}
</style>