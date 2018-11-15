<template>
	<div class="page-createup container">
		<Header/>
		<div class="c-main container-main bf">
			<el-form ref="form" :model="form" label-width="80px" :rules="rules">
				<el-form-item label="文章标题" prop="title">
					<el-input v-model="form.title"></el-input>
				</el-form-item>
				<el-form-item label="文章内容" prop="content">
					<el-input type="textarea" v-model="form.content"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit('form')">{{btnTxt}}</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import Api from '../api/getData';
	import Header from '../components/header';

	export default {
		data(){
			return {
				form: {
          title: '',
					content: ''
				},
				rules: {
					title: [ { required: true, message: '请输入文章标题', trigger: 'blur' } ],
					content: [ { required: true, message: '请输入文章内容', trigger: 'blur' } ],
				},
				isEdit: this.$route.params.articleId !== 'new' ? true : false,
				btnTxt: this.$route.params.articleId !== 'new' ? '修改保存' : '立即创建'
			}
		},
		created() {
			if(this.isEdit){
				this.initArticleDetail(this.$route.params.articleId);
			}
		},
		mounted() {

		},
		components: {
			Header
		},
		computed: {

		},
		methods: {
			onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
						if(this.isEdit){
							this.updateArticle('form');
						}else{
							this.createArticle('form');
						}
          } else {
            return false;
          }
        });
			},
			async createArticle (formName) {
				try {
					let res = await Api.createArticle(this.form);
					if(+res.status === 1){
						this.$message('创建成功');
						this.$refs[formName].resetFields();
					}else{
						throw new Error(res.message);
					}
				} catch (err) {
					this.$message.error(err.message || '创建失败，请稍后重试');
				}
			},
			async updateArticle (formName) {
				try {
					let res = await Api.updateArticle(Object.assign({}, this.form, {postId: this.$route.params.articleId}));
					if(+res.status === 1){
						this.$message('修改成功');
						this.$refs[formName].resetFields();
					}else{
						throw new Error(res.message);
					}
				} catch (err) {
					this.$message.error(err.message || '修改失败，请稍后重试');
				}
			},
			async initArticleDetail (id) {
				try {
					let res = await Api.getArticleDetail(id);
					if(+res.status === 1){
						this.form.title = res.data.article.title;
						this.form.content = res.data.article.content;
					}else{
						throw new Error(res.message);
					}
				} catch (err) {
					this.$message.error(err.message || '文章详情获取失败，请稍后重试');
				}
			}
		},
		watch: {

		}
	}
</script>

<style lang="less" scoped>
	.page-createup{

	}
	.c-main{
		height: auto;
		border: 1px solid #f0f0f0;
		padding:  30px 30px 20px;
		box-sizing: border-box;
		border-radius: 8px;
		margin-bottom: 20px;
		margin-top: 30px;
	}
</style>
