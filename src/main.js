import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/scss/reset.scss'

//导入mock
import './mock/index.js'
import ElementUI from 'element-ui';//引入element-ui
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入axios的全局配置
import http from './api/config.js'

//添加到vue的原型，使它变成全局变量
Vue.prototype.$http=http

Vue.config.productionTip = false
// 判断用户登录状态，未登录跳转到登录，登录就跳转到首页
router.beforeEach((to,from,next) => {
	//防止刷新丢失token值
	store.commit('getToken')
	//防止刷新的时候丢失标签列表
	store.commit('getMenu')
	let token =store.state.user.token
	//过滤登录页,因为去登录页就不需要token(防止死循环)
	if(!token && to.name !== 'login'){
		next({name:'login'})
	}else{
		next()
	}
})

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
  	store.commit('addMenu',router)//初始化的时候，需要把菜单添加进来
  }
}).$mount('#app')
