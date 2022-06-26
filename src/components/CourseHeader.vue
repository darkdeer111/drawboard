<template>
	<header>
		<div class="l-content">
			<el-button icon="el-icon-menu" @click="collapseMenu" size="small" circle></el-button>
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item :to="current.path" v-if="current">
			  {{current.label}}
			  <!-- {{current}} -->
			  </el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="r-content">
			  <el-dropdown trigger="click">
			      <span class="el-dropdown-link">
			        <img :src="userImg" alt="" class="user_img">
			      </span>
			      <el-dropdown-menu slot="dropdown">
			        <el-dropdown-item icon="el-icon-plus">个人中心</el-dropdown-item>
					
					<!-- 
						注意：
					    el-dropdown-item没有提供点击事件，我们需要添加.navtive触发元生事件
					    
					 -->
					
			        <el-dropdown-item icon="el-icon-circle-plus" @click.native="loginOut">
						退出</el-dropdown-item>
			      </el-dropdown-menu>
			    </el-dropdown>
		</div>
	</header>
</template>

<script>
	// 辅助函数mapState
	import {mapState,mapMutations} from 'vuex'
	export default{
		computed:{
			...mapState({
				current:state => state.tab.currentMenu
			})
		},
		data(){
			return{
				userImg:require('../assets/img/sixstar_logo.png')
			}
		},
		methods:{
			// ...mapMutations({
			// 	'collapseMenu'
			// })
			collapseMenu(){
				this.$store.commit('collapseMenu')
			},
			loginOut(){
				this.$store.commit('clearMenu')//清除菜单
				this.$store.commit('clearToken')//清除菜单
				location.reload()//重启加载（刷新浏览器）
				
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	header {
		display: flex;
		height: 100%;
		/* 垂直居中对齐 */
		align-items: center;
		justify-content: space-between;
		.el-button{
			margin:20px;
		}
		.l-content{
			display: flex;
			align-items: center;
		}
		.r-content{
			.user_img{
				width: 45px;
				height: 45px;
				border-radius: 50%;
			}
		}
	}

</style>
<style lang="scss">
	.el-breadcrumb__item{
		.el-breadcrumb__inner{
			color:#fffff;
		}
	}
	.el-breadcrumb__item:last-child .el-breadcrumb__inner{
		color:#000000;
	}
	
</style>
