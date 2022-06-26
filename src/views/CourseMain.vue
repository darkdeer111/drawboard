<template>
	<el-container style="height: 100%">
	  <el-aside width="auto">
		  <course-aside></course-aside>
	  </el-aside>
	  <el-container>
	    <el-header>
			<course-header></course-header>
		</el-header>
		<course-tab></course-tab>
	    <el-main>
			<router-view></router-view>
		</el-main>
	  </el-container>
	</el-container>
</template>

<script>
	import CourseAside from '../components/CourseAside.vue'
	import CourseHeader from '../components/CourseHeader.vue'
	import CourseTab from '../components/CourseTab.vue'
	export default{
		components:{
			CourseAside,
			CourseHeader,
			CourseTab
		}
	}
</script>

<style>
	.el-aside{
		background-color: #99CC33;
	}
	.el-header{
		background-color: #aaff7f;
	}
</style>
