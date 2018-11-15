import axios from 'axios';
import querystring from 'querystring';

let http = axios.create({
	// timeout: 5000,
	transformRequest: [
		function(data) {
			data = querystring.stringify(data);
			return data;
		}
	],
	headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});

//添加请求拦截器
http.interceptors.request.use(
	function(config) {
		let t = Date.now();
		if (config.url.indexOf('?') > 0) {
			config.url = config.url + '&t=' + t;
		} else {
			config.url = config.url + '?t=' + t;
		}
		return config;
	},
	function(error) {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);

//添加响应拦截器
http.interceptors.response.use(
	function(response) {
		// 处理响应数据
		return response.data;
	},
	function(error) {
		// 处理响应失败
		return Promise.reject(error);
	}
);

// export default http;
export default async(url = '', data = {}, type = 'post') => {
	type = type.toLocaleLowerCase()
	if(type === 'post'){
		return new Promise((resolve, reject) => {
			http.post(url, data).then(res => {
				resolve(res);
			}).catch(error => {
				reject(error);
			})
		})
	}else if(type === 'put'){
		return new Promise((resolve, reject) => {
			http.put(url, data).then(res => {
				resolve(res);
			}).catch(error => {
				reject(error);
			})
		})
	}else if(type === 'delete'){
		return new Promise((resolve, reject) => {
			http.delete(url + '/' + data).then(res => {
				resolve(res);
			}).catch(error => {
				reject(error);
			})
		})
	}else{
		return new Promise((resolve, reject) => {
			http.get(url + '/' + data).then(res => {
				resolve(res);
			}).catch(error => {
				reject(error);
			})
		})
	}
}

