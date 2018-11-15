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
						<el-form-item label="重复密码" prop="repassword">
							<el-input type="password" v-model="form.repassword" placeholder="重复密码"></el-input>
						</el-form-item>
						<el-form-item label="性别" prop="gender">
							<el-select v-model="form.gender" placeholder="请选择性别">
								<el-option label="男" value="m"></el-option>
								<el-option label="女" value="f"></el-option>
								<el-option label="保密" value="x"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="头像">
							<el-upload
								multiple
								:limit="1"
								class="upload-demo"
								action="string"
								:on-success="handleSuccess"
								:on-remove="handleRemove"
								:on-exceed="handleExceed"
								:http-request="selfUpload"
								:file-list="fileList"
								list-type="picture">
								<el-button size="small" type="primary">点击上传</el-button>
								<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
							</el-upload>
						</el-form-item>
						<el-form-item label="活动形式" prop="bio">
							<el-input type="textarea" v-model="form.bio"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="onSubmit('ruleForm')" class="lml-btn">注册</el-button>
						</el-form-item>
					</el-form>
				</div>
			</section>
		</transition>
	</div>
</template>

<script>
	const va = window.va || {};
	import Api from '../api/getData';
	export default {
		data(){
			var password = (rule, value, callback) => {
        if (va.isEmpty(value)) {
          callback(new Error('请输入密码'));
        } else {
          if (va.isNotEmpty(this.form.repassword)) {
            this.$refs.ruleForm.validateField('repassword');
          }
          callback();
        }
			};

			var repassword = (rule, value, callback) => {
        if (va.isEmpty(value)) {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
					if(va.isEmpty(this.form.password)){
						return;
					}
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
			};

			return {
				showLogin: false,
				form: {
          name: '',
          password: '',
          repassword: '',
					gender: '',
					bio: ''
				},
				fileList: [],
				formData: null,
				rules: {
					name: [ { required: true, message: '请输入用户名', trigger: 'blur' } ],
					password: [ { required: true, validator: password, trigger: 'blur' } ],
					repassword: [ { required: true, validator: repassword, trigger: 'blur' } ],
					gender: [ { required: true, message: '请选择性别', trigger: 'change' } ],
					bio: [ { required: true, message: '请填写个人简介', trigger: 'blur' } ],
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
						if(va.isEmpty(this.formData)){
							this.$message.error('请上传头像');
						}else{
							this.register(formName);
						}
          } else {
            return false;
          }
        });
			},
			async register(formName){
				if(va.isEmpty(this.formData)){
					return this.$message.error('请上传头像');
				}
				for(let item in this.form){
					this.formData.append(item, this.form[item]);
				}
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				};
				try {
					let res = await Api.register(this.formData, config);
					if(+res.status === 1){
						this.$refs[formName].resetFields();
						this.formData = null;
						this.fileList = [];
						this.$message('注册成功，自动跳转到登录');
						setTimeout(() => {
							this.$router.push('/login');
						}, 2000);
					}else{
						throw new Error(res.message);
					}
				} catch (err) {
					this.$message.error(err.message)
				}
			},
			handleRemove() {
				this.formData = null;
				this.fileList = [];
      },
      handleSuccess() {

			},
			handleExceed() {
        this.$message.warning('只能上传1个头像图片哦');
			},
			selfUpload (param) {
				this.formData = new FormData();
				this.formData.append('avatar', param.file);
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
		height: 160px;
		line-height: 160px;
	}
	.lm-login{
		width: 500px;
		height: auto;
		background: #fff;
		margin: 0 auto;
		padding: 55px 88px 30px 35px;
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
