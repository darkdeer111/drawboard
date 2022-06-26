<template>
	<el-form ref="form" :inline="inline" :model="form" label-width="100px">
		<!-- 标签显示名称 -->
	  <el-form-item v-for="item in formLabel" :key="item.model" :label="item.label">
		  <!-- 根据type来显示什么样的标签 -->
	    <el-input 
		v-model="form[item.model]"
		:placeholder="'请输入'+item.label"
		 v-if="item.type === 'input'"
		>
		</el-input>
		<!-- 下拉框 -->
		 <el-select v-model="form[item.model]" v-if="item.type === 'select' "  placeholder="请选择">
			  <!-- 如果是select或CheckBox、radio 还需要选择信息-->
		      <el-option 
		    	  v-for="op in item.opts"
			     :label="op.label" :key="op.value" :value="op.value">
			  </el-option>
		 </el-select>
		 <!-- switch-->
		  <el-switch v-model="form[item.model]"v-if="item.type === 'switch'"></el-switch>
		 <!-- 日期选择器-->
		 <el-date-picker 
		 type="date"
		 placeholder="选择日期" 
		 v-model="form[item.model]"
		  v-if="item.type === 'date'" 
		  value-format="yyyy-MM-dd"
		  tyle="width: 100%;">
		 </el-date-picker>
	  </el-form-item>
	  <!-- 留一个插槽，看看需要什么内容插入-->
	  <el-form-item><slot></slot></el-form-item>
	</el-form>
</template>

<script>
	export default{
		props:{//接收父组件传递过来的值
		    /*
				form:表单数据
				formLabel：数据标签
				inline:是否是行内表单域
			*/
			form:Object,
			formLabel:Array,
		    inline:Boolean
		}
	}
</script>

<style>
</style>
