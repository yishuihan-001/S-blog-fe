import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../lib/js/validator';

import hljs from 'highlight.js'
import '../lib/style/school-book';
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
	render: h => h(App),
	router,
	store
}).$mount('#app')

/*
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
*/