import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	//进行路由跳转配置
	 //  {
		// path: '/',
		// // name: 'miansss',
		// component: () => import ('../views/CourseMian.vue'),
		// children:[
		// 	{
		// 		path:'',
		// 		redirect:'/home'
		// 	},
		// 	{
		// 		path:'/home',
		// 		name:'home',
		// 		component: () => import ('../views/Home/Home.vue'),
		// 	},
		// 	{
		// 		path:'/user',
		// 		name:'user',
		// 		component: () => import ('../views/UserManage/UserManage.vue'),
		// 	},
		// 	{
		// 		path:'/course',
		// 		name:'course',
		// 		component: () => import ('../views/CourseManage/CourseManage.vue'),
		// 	},{
		// 		path:'/page1',
		// 		name:'page1',
		// 		component: () => import ('../views/Other/page1.vue'),
		// 	},{
		// 		path:'/page2',
		// 		name:'page2',
		// 		component: () => import ('../views/Other/page2.vue'),
		// 	}
		// ]
		
	 //  },
	  //由于是动态路由，所以在permission配置了，就不需要配置静态的
	  //登录路由组件
	  {
		 path:'/login',
		 name:'login',
		 component: () => import ('../views/Login/Login.vue'),
	  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
