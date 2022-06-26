import Cookie from 'js-cookie'
export default{
	state: { //存放共享数据
		//当前菜单
		currentMenu:null,
		isCollapse:false,
		menu:[],//存储动态菜单
		//定义数组，存放左侧菜单
		tabsList:[
			{
			   path:'/home',
			   label:'首页',
			   name:'home',
			   icon:'s-home'
			}
		],
	},
	mutations: {//存放方法
		setMenu(state,val){//设置菜单
			//向vuex中的menu添加
			state.menu=val
			//向cookie添加
			Cookie.set('menu',JSON.stringify(val))//将对象转换成json字符串
		},
		clearMenu(state){//退出登陆的时候，需要清除cookie
		    state.menu=[]
			Cookie.remove('menu');
		},
		addMenu(state,router){//添加菜单
			if(!Cookie.get('menu')){
				return
			}
			//取出cookie中的数据 给vuex中的menu
			let menu = JSON.parse(Cookie.get('menu'))//转换为对象
			state.menu=menu
			//添加动态路由 主路由是CourseMain.vue
			let currentMenu=[
				{
					path:'/',
					component:() => import(`@/views/CourseMian.vue`),
					children:[]
				}
			]
			//如果是一级菜单，那么菜单名称肯定有路由，如果是二级菜单那么一级菜单肯定没有路由，二级菜单有
			menu.forEach(item => {
				if(item.children){
					item.children = item.children.map(item => {
						item.component=() => import(`@/views/${item.url}`)//${}获取变量，Es6的写法
						return item
					})
					currentMenu[0].children.push(...item.children)//...将children展开
				}else{
					item.component = () => import(`@/views/${item.url}`)
					currentMenu[0].children.push(item)
				}
			});
			console.log(currentMenu);
			router.addRoutes(currentMenu)
		},
		selectMenu(state,val){
			//面包屑、tag选项标签
			if(val.name === 'home'){
				state.currentMenu = null
			}else{
				state.currentMenu=val
				//如果等于 -1 那么就说明数组中不存在这个对象，那么就直接插入，否则就什么都不做
				let result = state.tabsList.findIndex(item => item.name === val.name) 
				result === -1 ? state.tabsList.push(val) : ''
			}
			Cookie.set('tabsList',JSON.stringify(state.tabsList))
			// val.name === 'home' ? (state.currentMenu=null) : (state.currentMenu=val)
		},
		closeTab(state,val){
			let result = state.tabsList.findIndex(item => item.name === val.name) 
			state.tabsList.splice(result,1)
			Cookie.set('tabsList',JSON.stringify(state.tabsList))
		},
		//获取标签
		getMenu(state){
			if(Cookie.get('tabsList')){
				let tabsList=JSON.parse(Cookie.get('tabsList'))
				state.tabsList=tabsList
			}
		},
		collapseMenu(state){//操控是否折叠菜单
			state.isCollapse=!state.isCollapse
		}
	},
	actions: {//异步改变
	},
}