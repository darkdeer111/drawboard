<template>
	<el-menu
	      :collapse="isCollapse"
	      :default-active="$route.path"
	      class="el-menu-vertical-demo"
	      background-color="#99CC33"
	      text-color="#fff"
	      active-text-color="#666ccc"
		  router
		  >
		   <el-menu-item>
			   <h2 v-show="!isCollapse">课程管理系统</h2>
			   <h2 v-show="isCollapse">六星</h2>
		   </el-menu-item>
		  <!--
		    渲染数据有两种方式：有子菜单 和  没有子菜单
			怎么把有子菜单和没有子菜单区分出来
		  -->
		  <el-menu-item 
		    :index="item.path"
			v-for="item in noChildren"
			@click="clickMenu(item)"
		  >
		    <i :class="'el-icon-'+item.icon"></i>
		    <span slot="title">{{item.label}}</span>
		  </el-menu-item>
		  
	     <el-submenu 
		    index="index"
			v-for="items in hasChildren"
		 >
	        <template slot="title">
	          <i :class="'el-icon-'+items.icon"></i>
	          <span>{{items.label}}</span>
	        </template>
	        <el-menu-item-group >
	          <el-menu-item 
			  :index="sub.path"
			  v-for="sub in items.children"
			  @click="clickMenu(sub)"
			  >
				  <i :class="'el-icon-'+sub.icon"></i>
				  <span>{{sub.label}}</span>
				  
			  </el-menu-item>
	        </el-menu-item-group>
			</el-submenu>
			
	    </el-menu>
</template>

<script>
	export default{
		computed:{
			// 通过计算属性判断一下，有子菜单和没有子菜单
			
			noChildren(){//没有子菜单
				return this.menu.filter(item => !item.children)
			  // return this.menu
			},
			hasChildren(){
				return this.menu.filter(item => item.children)
				// return this.menu
			},
			isCollapse(){
				// 这里的数据是从vuex中拿到的
				return this.$store.state.tab.isCollapse
			},
			menu(){//动态获取菜单
				return this.$store.state.tab.menu
			}
		},
		methods:{
			clickMenu(item){
				// console.log(item.name)
				//调用vuex中的selectMenu方法存储数据
				this.$store.commit('selectMenu',item)
			},
			
		},
		data(){
			return{
				menus:[
					{
					   path:'/home',
					   label:'首页',
					   name:'home',
					   icon:'s-home'
					},{
					   path:'/user',
					   label:'用户管理',
					   name:'user',
					   icon:'user-solid'
					},{
					   path:'/course',
					   label:'课程管理',
					   name:'course',
					   icon:'s-management'
					},{
					   label:'其他',
					   icon:'setting',
					   children:[
						   {
						      path:'/page1',
						      label:'页面1',
							    name:'page1',
						      icon:'s-management'
						   },
						   {
						      path:'/page2',
						      label:'页面2',
							  name:'page2',
						      icon:'s-management'
						   },
					   ]
					}
				]
			}
		}
		
	}
</script>

<style scoped>
  .el-menu{
	  border: none;
  }
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
