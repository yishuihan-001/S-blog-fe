<template>
	<div class="page-login container">
		<transition name="form-fade" mode="in-out">
			<section class="l-main" v-show="showLogin">
				<div class="lm-title">
					<h3 class="cf tac f28">社区后台视频上传平台</h3>
				</div>
				<div class="lm-login">
					<el-form :model="form" label-width="80px" :rules="rules" ref="ruleForm">
						<el-form-item label="用户名" prop="name">
							<el-input v-model="form.name" placeholder="用户名"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="password">
							<el-input type="password" v-model="form.password" placeholder="密码"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="onSubmit('ruleForm')" class="lml-btn">登录</el-button>
						</el-form-item>
					</el-form>
				</div>
			</section>
		</transition>
	</div>
</template>

<script>
	import Api from '../api/getData';

	export default {
		data(){
			return {
				showLogin: false,
				form: {
          name: '',
          password: ''
				},
				rules: {
					name: [ { required: true, message: '请输入用户名', trigger: 'blur' } ],
					password: [ { required: true, message: '请输入密码', trigger: 'blur' } ]
				}
			}
		},
		created() {

		},
		mounted() {
			this.showLogin = true;
		},
		components: {

		},
		computed: {

		},
		methods: {
			onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.login();
          } else {
            return false;
          }
        });
			},
			async login(){
				try {
					let res = await Api.login(this.form);
					if(+res.status === 1){
						this.$router.push('/home');
					}else{
						throw new Error(res.message);
					}
				} catch (err) {
					this.$message.error(err.message || '登录失败，请重试');
				}
			}
		},
		watch: {

		}
	}
</script>

<style lang="less" scoped>
	.page-login{
		background: #324057;
	}
	.l-main{
		padding-bottom: 100px;
		overflow: hidden;
	}
	.lm-title{
		height: 200px;
		line-height: 200px;
	}
	.lm-login{
		width: 500px;
		height: 300px;
		background: #fff;
		margin: 0 auto;
		padding: 55px 88px 0 35px;
		box-sizing: border-box;
		border-radius: 10px;
	}
	.lml-btn{
		width: 100%;
		margin-top: 15px;
	}
	.form-fade-enter-active, .form-fade-leave-active {
		transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
			transform: translate3d(0, -50px, 0);
			opacity: 0;
	}
</style>
