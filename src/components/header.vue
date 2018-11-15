<template>
	<div class="com-header-wrap bf">
		<div class="com-header flex">
			<h3 class="h-title f20" @click="goHome">社区后台视频上传平台</h3>
			<el-dropdown @command="handleCommand" trigger="click">
				<img :src="defaultAvatar" class="h-avatar">
				<el-dropdown-menu slot="dropdown" v-if="isLogin">
					<el-dropdown-item command="userhome">个人主页</el-dropdown-item>
					<el-dropdown-item command="createup">新建博客</el-dropdown-item>
					<el-dropdown-item command="signOut">退出登录</el-dropdown-item>
				</el-dropdown-menu>
				<el-dropdown-menu slot="dropdown" v-else>
					<el-dropdown-item command="login">登录</el-dropdown-item>
					<el-dropdown-item command="register">注册</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
	import Api from '../api/getData';

	export default {
		data(){
			return {
				defaultAvatar: 'http://mp5.jmstatic.com/zengzhang/a6030869c5809c29d962a555cf744cbf.jpg'
			}
		},
		created() {
			this.initUerData();
		},
		mounted() {

		},
		components: {

		},
		computed: {
			isLogin () {
				return this.$store.state.isLogin
			}
		},
		methods: {
			handleCommand(command) {
        switch (command) {
					case 'userhome':
						this.$router.push('/' + command);
						break;
					case 'createup':
						this.$router.push('/' + command + '/new');
						break;
					case 'login':
					case 'register':
						this.$router.push('/' + command);
						break;
					case 'signOut':
						this.signOut();
						break;
					default:
						break;
				}
			},
			async signOut () {
				try {
					let res = await Api.signout();
					if(+res.status === 1){
						this.$store.commit('setLoginStatus', false);
						this.$message('即将推出');
						setTimeout(() => {
							this.$router.push('/login');
						}, 2000);
					}else{
						throw new Error(res.message);
					}
				} catch (err) {
					this.$message.error(err.message || '退出失败，请重试');
				}
			},

			async initUerData () {
				try {
					let res = await Api.userInfo();
					if(+res.status === 1){
						this.$store.commit('setLoginStatus', true);
						this.$store.commit('setUserInfo', res.data);
					}
				} catch (err) {
					return;
				}
			},

			goHome () {
				this.$router.push('/home');
			}
		},
		watch: {

		}
	}
</script>

<style lang="less" scoped>
	.com-header-wrap{
		min-width: 1260px;
		height: 50px;
		border-bottom: 1px solid #d2d2d2;
		box-sizing: border-box;
	}
	.com-header{
		width: 1200px;
		height: 50px;
		line-height: 50px;
		justify-content: space-between;
		padding: 0 30px;
		margin: 0 auto;
	}
	.h-title{
		cursor: pointer;
	}
	.h-avatar{
		width: 38px;
		height: 38px;
		overflow: hidden;
		border-radius: 50%;
		vertical-align: middle;
		border: 1px solid #EFF2F7;
		box-sizing: border-box;
	}
</style>
