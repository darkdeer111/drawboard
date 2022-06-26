<template>
	<div class="common-table">
		<el-table
			 height="90%"
		    :data="tableData"
		     style="width: 100%">
			 <!-- 第一列默认是序号-->
		    <el-table-column
		      label="序号"
		      width="85">
		      <template slot-scope="scope">
				  <!-- scope.$index 就是索引值 默认从0开始-->
		        <span style="margin-left: 10px">{{(config.page-1) *10 + scope.$index + 1}}</span>
		      </template>
		    </el-table-column>
			
			<el-table-column
			 show-overflow-tooltip
			  v-for="item in tableLabel"
			  :label="item.label"
			  >
			  <template slot-scope="scope">
				  <!-- 
					  el-table-column绑定:prop="item.prop" 可以显示表单数据
					  这里通过插槽的方式也可以，更加灵活，可以写样式
				  -->
			    <span style="margin-left: 10px">{{ scope.row[item.prop]}}</span>
			  </template>
			</el-table-column>
			<!-- 操作列 -->
			 <el-table-column label="操作">
			      <template slot-scope="scope">
			        <el-button
			          size="mini"
			          @click="handleEdit(scope.row)">编辑</el-button>
			        <el-button
			          size="mini"
			          type="danger"
			          @click="handleDelete(scope.row)">删除</el-button>
			      </template>
			  </el-table-column>
		</el-table>
		<!-- 分页组件 
		:current-page.sync="config.page" 同步父组件的页数
		@current-change="changPage" 触发事件改编页数，数据传递个父组件
		-->
		<el-pagination
		    class="pages"
		    layout="prev, pager, next"
		    :total="config.total"
			:current-page.sync="config.page"
			@current-change="changPage"
			>
		  </el-pagination>
	</div>
</template>

<script>
	export default{
		props:{//接收父组件传递过来的值
		    /* 
			   tableData：数据列表
			   tableLabel：列数据
			   config:分页相关数据：
			*/
			tableData:Array,
			tableLabel:Array,
			config:Object
		},
		methods:{
			// 分页
			changPage(page){
				// 发射事件
				this.$emit('changPage',page)
			},
			// 编辑
			handleEdit(row){
				// 发射编辑事件
				this.$emit('edit',row)
			},
			handleDelete(row){//删除用户信息
			  this.$emit('del',row)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.common-table{
		height:calc(100% - 64px) ;
		background-color: #fff;
		position: relative;
		.pages{
			position: absolute;
			bottom: 10px;
			right: 20px;
		}
	}
</style>
