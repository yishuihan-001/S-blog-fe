import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const register = r => require.ensure([], () => r(require('@/page/register')), 'register');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const userhome = r => require.ensure([], () => r(require('@/page/userhome')), 'userhome');
const detail = r => require.ensure([], () => r(require('@/page/detail')), 'detail');
const createup = r => require.ensure([], () => r(require('@/page/createup')), 'createup');

const routes = [
	{
		path: '/',
		component: home
	},
	{
		path: '/login',
		component: login
	},
	{
		path: '/register',
		component: register
	},
	{
		path: '/home',
		component: home
	},
	{
		path: '/userhome',
		component: userhome
	},
	{
		path: '/detail/:articleId',
		component: detail
	},
	{
		path: '/createup/:articleId',
		component: createup
	},
]

export default new Router({
	routes,
	mode: 'hash',
	strict: process.env.NODE_ENV !== 'production',
})
