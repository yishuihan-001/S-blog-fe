<template>
	<div id="app" class="app">
		<router-view></router-view>
	</div>
</template>

<script>
export default {

}
</script>

<style lang="less">
@import '../lib/style/reset';
@import '../lib/style/common';
@import '../lib/style/github-markdown';

html,
body,
.app {
	height: 100%;
}
.container {
	height: 100%;
	position: relative;
	overflow-y: auto;
	background: #f0f0f0;
}
.container-main {
	width: 1200px;
	padding: 30px;
	margin: 0 auto;
}
.markdown-body{
	box-sizing: border-box;
	min-width: 200px;
	max-width: 980px;
	margin: 0 auto;
	padding: 45px;
}
</style>
