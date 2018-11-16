<template>
	<div class="page-article container">
		<Header/>
		<div class="a-main container-main bf">
			<el-row>
				<el-col :span="24">
					<div class="grid-content bg-purple-dark">
						<h2 class="f20 fwb tac">{{essay.title}}</h2>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="1">
					<div class="grid-content">
						<div style="margin-top: 20px;"><img :src="essay.author.avatarPre + essay.author.avatar" class="a-avatar"></div>
					</div>
				</el-col>
				<el-col :span="23">
					<div class="grid-content">
						<div class="a-con f16 markdown-body" v-highlight v-html="markdownToHtml">
						</div>
						<h1 class="f18 fwb" style="margin: 20px 0;" v-if="comments.length">留言</h1>
						<div class="a-comment" v-if="comments.length">
							<Comment v-for="item in comments" :key="item._id" :comment="item"/>
						</div>
						<div class="a-newcomment">
							<el-input type="textarea" :rows="2" placeholder="请输入留言" v-model="textarea"></el-input>
							<el-button type="primary" plain style="margin-top: 15px;" @click="onSubmit">留言</el-button>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	const va = window.va || {};
	import $ from 'jQuery';
	import Header from '../components/header';
	import Comment from '../components/comment';
	import Api from '../api/getData';
	import marked from 'marked';

	export default {
		data(){
			return {
				defaultAvatar: 'http://mp5.jmstatic.com/zengzhang/a6030869c5809c29d962a555cf744cbf.jpg',
				textarea: '',
				essay: {},
				comments: []
			}
		},
		created() {
			this.initArticleDetail(this.$route.params.articleId);
		},
		mounted() {

		},
		components: {
			Header,
			Comment
		},
		computed: {
			markdownToHtml(){
				return this.essay && marked(this.essay.content);
			}
		},
		methods: {
			async onSubmit(){
				if(!this.$store.state.isLogin){
					this.$message('登录后才评论哦')
					return;
				}
				if(va.isEmpty(this.textarea)){
					this.$message('请输入评论')
					return;
				}
				let obj = {
					content: this.textarea,
					postId: this.$route.params.articleId
				}
				try {
					let res = await Api.createComment(obj);
					if(+res.status === 1){
						this.$message('评论成功');
						setTimeout(() => {
							window.location.reload();
						}, 1000);
					}
				} catch (err) {
					this.$message.error(err.message)
				}
			},
			async initArticleDetail (id) {
				try {
					let res = await Api.getArticleDetail(id);
					if(+res.status === 1){
						this.essay = res.data.article;
						this.comments = res.data.comments
					}else{
						throw new Error(res.message);
					}
				} catch (err) {
					this.$message.error(err.message || '文章详情获取失败，请稍后重试');
				}
			},
			addLineNum () {
				$("code").each(function(){
					$(this).html("<ul><li>" + $(this).html().replace(/\n/g,"\n</li><li>") +"\n</li></ul>");
				});
			}
		},
		watch: {
			'essay.content': {
				handler() {
					setTimeout(() => {
						// this.addLineNum();
					}, 1000);
				},
				immediate: true,
				deep: true
			}
		}
	}
</script>

<style lang="less" scoped>
	.page-login{

	}
	.a-main{
		height: auto;
		border: 1px solid #f0f0f0;
		padding: 20px 30px;
		box-sizing: border-box;
		border-radius: 8px;
		margin-bottom: 20px;
		margin-top: 30px;
	}
	.a-avatar{
		width: 38px;
		height: 38px;
		overflow: hidden;
		border-radius: 50%;
		vertical-align: middle;
		border: 1px solid #EFF2F7;
		box-sizing: border-box;
	}
	.a-con{
		margin-top: 20px;
		padding: 20px 30px;
		// background: pink;
		border-radius: 8px;
	}
	.a-comment{
		padding: 20px 30px;
		border: 1px solid #cccccc;
		border-radius: 8px;
	}
	.a-newcomment{
		margin: 20px 0;
	}
</style>
