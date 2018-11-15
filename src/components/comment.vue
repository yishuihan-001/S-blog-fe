<template>
	<div class="com-comment">
		<el-row>
			<el-col :span="1">
				<div class="grid-content">
					<div><img :src="comment.author.avatarPre + comment.author.avatar" class="c-avatar"></div>
				</div>
			</el-col>
			<el-col :span="23">
				<div class="grid-content">
					<div class="c-title flex">
						<i>{{comment.author.name}}</i>
						<em>{{comment.created_at}}</em>
					</div>
					<div class="c-con">
						<p>{{comment.content}}</p>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				defaultAvatar: 'http://mp5.jmstatic.com/zengzhang/a6030869c5809c29d962a555cf744cbf.jpg'
			}
		},
		props: ['comment'],
		created() {

		},
		mounted() {

		},
		components: {

		},
		computed: {

		},
		methods: {

		},
		watch: {

		}
	}
</script>

<style lang="less" scoped>
	.com-comment{
		margin-bottom: 20px;
	}
	.c-avatar{
		width: 38px;
		height: 38px;
		overflow: hidden;
		border-radius: 50%;
		vertical-align: middle;
		border: 1px solid #EFF2F7;
		box-sizing: border-box;
	}
	.c-title{
		padding-left: 20px;
		justify-content: flex-start;
		i{
			width: 120px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			margin-right: 20px;
		}
	}
	.c-con{
		padding-left: 20px;
		padding-top: 10px;
		line-height: 20px;
	}
</style>
