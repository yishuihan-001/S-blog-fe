import axios from 'axios';
import fetch from './fetch';
//添加响应拦截器
axios.interceptors.response.use(
	function(response) {
		// 处理响应数据
		return response.data;
	},
	function(error) {
		// 处理响应失败
		return Promise.reject(error);
	}
);

const Api = {};

/**
 * 用户信息
 */
Api.userInfo = (data = '') => fetch('/blog/user/info', data, 'GET');

/**
 * 注册
 */
// Api.register = data => fetch('/blog/user/register', data, 'POST');
Api.register = (data, config) => {
	return new Promise((resolve, reject) => {
		axios.post('/blog/user/register', data, config).then(res => {
			resolve(res);
		}).catch(error => {
			reject(error);
		})
	})
}

/**
 * 登陆
 */
Api.login = data => fetch('/blog/user/login', data, 'POST');

/**
 * 登出
 */
Api.signout = (data = '') => fetch('/blog/user/signout', data, 'GET');

/**
 * 创建评论
 */
Api.createComment = data => fetch('/blog/comments', data, 'POST');

/**
 * 删除评论
 */
Api.deleteComment = data => fetch('/blog/comments', data, 'DELETE');

/**
 * 获取文章列表
 */
Api.getArticleList = data => fetch('/blog/article/list', data, 'GET');

/**
 * 获取文章详情
 */
Api.getArticleDetail = data => fetch('/blog/article/detail', data, 'GET');

/**
 * 创建文章
 */
Api.createArticle = data => fetch('/blog/article/create', data, 'POST');

/**
 * 更新文章
 */
Api.updateArticle = data => fetch('/blog/article', data, 'PUT');

/**
 * 删除文章
 */
Api.deleteArticle = data => fetch('/blog/article', data, 'DELETE');


export default Api;