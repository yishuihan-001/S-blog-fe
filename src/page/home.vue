<template>
	<div class="page-index container">
		<Header/>
		<div class="i-main container-main">
			<div class="im-article bf" v-for="item in articleList" :key="item._id">
				<el-row>
					<el-col :span="1">
						<div class="grid-content">
							<div class="ima-img"><img :src="item.author.avatarPre + item.author.avatar"></div>
						</div>
					</el-col>
					<el-col :span="23">
						<div class="grid-content">
							<el-row>
								<el-col :span="21" style="margin-bottom: 12px;">
									<div class="grid-content">
										<h3 class="ima-title ellipsis">
											<span class="f18 fwb" @click="articleDetail(item._id)" style="cursor: pointer;">{{item.title}}</span>
										</h3>
									</div>
								</el-col>
								<el-col :span="1">
									<div class="grid-content"></div>
									<div style="height: 38px;"></div>
								</el-col>
								<el-col :span="2">
									<div class="grid-content">
										<!-- <div class="flex">
											<el-button icon="el-icon-edit" circle></el-button>
											<el-button icon="el-icon-delete" circle></el-button>
										</div> -->
									</div>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="24">
									<div class="grid-content">
										<div class="ima-con">
											<p class="f16">{{item.content}}</p>
										</div>
									</div>
								</el-col>
							</el-row>
							<el-row style="padding-top: 15px;">
								<el-col :span="24">
									<div class="grid-content">
										<el-row>
											<el-col :span="4">
												<div class="grid-content">
													<span>{{item.created_at}}</span>
												</div>
											</el-col>
											<el-col :span="16">
												<div class="grid-content">
													<p>&nbsp;</p>
												</div>
											</el-col>
											<el-col :span="2">
												<div class="grid-content">
													<p>浏览（
														<span>{{item.pv}}</span>）</p>
												</div>
											</el-col>
											<el-col :span="2">
												<div class="grid-content">
													<p>留言（
														<span>{{item.commentsCount}}</span>）</p>
												</div>
											</el-col>
										</el-row>
									</div>
								</el-col>
							</el-row>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
import Api from '../api/getData';
import Header from '../components/header';

export default {
	data () {
		return {
			// defaultAvatar: 'http://mp5.jmstatic.com/zengzhang/a6030869c5809c29d962a555cf744cbf.jpg',
			defaultAvatar: 'http://127.0.0.1:9000/static/img/upload_a910056419db396a8770cdddf08e66d0.png',
			articleList: [],
		}
	},
	created () {
		this.initData();
	},
	mounted () {

	},
	components: {
		Header
	},
	computed: {

	},
	methods: {
		async initData () {
			try {
				let res = await Api.getArticleList('allin')
				if (+res.status === 1) {
					this.articleList = res.data
				} else {
					this.this.articleList = []
				}
			} catch (err) {
				this.$message.error(err.message)
			}
		},
		articleDetail (_id) {
			this.$router.push('/detail/' + _id);
		}
	},
	watch: {

	}
}
</script>

<style lang="less" scoped>
.page-index {
}
.i-main {
}
.im-article {
	height: auto;
	margin: 0 auto;
	border: 1px solid #f0f0f0;
	padding: 20px 30px;
	box-sizing: border-box;
	border-radius: 8px;
	margin-bottom: 20px;
}
.ima-img {
	width: 38px;
	height: 38px;
	overflow: hidden;
	border-radius: 50%;
	vertical-align: middle;
	border: 1px solid #cccccc;
	box-sizing: border-box;
	img {
		width: 100%;
		height: 100%;
	}
}
.ima-title {
	height: 38px;
	line-height: 38px;
}
.ima-con {
	padding: 10px;
	height: auto;
	max-height: 120px;
	box-sizing: border-box;
	overflow: hidden;
	background: #f0f0f0;
	border-radius: 8px;
}
</style>

