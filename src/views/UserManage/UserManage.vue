<template>
	<div class="manage">
		<!-- 对话框 
		   visible： 操控是否显示当前对话框
		-->
		
		<el-dialog :title="userType === 'add' ? '添加用户' : '更新用户'" :visible.sync="isShow">
		  <common-form :formLabel="userFormLabel" :form="userForm" ref="form"></common-form>
		  
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="isShow = false">取 消</el-button>
		    <el-button type="primary" @click="submitUserInfo">确 定</el-button>
		  </div>
		</el-dialog>
		<div class="manage-header">
			<el-button type="primary" @click="addUser">新增</el-button>
			<common-form inline :formLabel="formLabel" :form="searchForm">
				<!-- 插槽插入的按钮 -->
				<el-button type="primary" @click="getUserList(searchForm.keyword)">搜索</el-button>
			</common-form>
		</div>
		<common-table 
		:tableLabel="tableLabel" 
		:tableData="tableData" 
		:config="config"
		@changPage="getUserList()"
		@edit="editUser"
		@del="delUser"
		>
		</common-table>
	</div>
</template>

<script>
	import CommonForm from '../../components/CommonForm.vue'
	import CommonTable from '../../components/CommonTable.vue'
	export default{
		components:{
			CommonForm,
			CommonTable
		},
		data(){
			return{
				tableData:[],//表格数据
				tableLabel:[//列参数
					{
						prop:'name',
						label:'姓名'
					},{
						prop:'age',
						label:'年龄'
					},{
						prop:'sexLabel',
						label:'性别'
					},{
						prop:'birth',
						label:'出生日期'
					},{
						prop:'addr',
						label:'地址'
					}
					
				],
				config:{
					page:1,
					total:20
				},
				searchForm:{
					keyword:''
				},
				formLabel:[
					{
						model:'keyword',
						label:'',
						type:'input'
					}
				],
				isShow:false,//是否显示对话框
				userType:'add',
				userFormLabel:[//表单标签数据
					{
						model:'name',
						label:'姓名',
						type:'input'
					},{
						model:'age',
						label:'年龄',
						type:'input'
					},{
						model:'sex',
						label:'性别',
						type:'select',
						opts:[
							{
								label:'女',
								value:0
							},{
								label:'男',
								value:1
							}
						]
					},{
						model:'birth',
						label:'出生日期',
						type:'date'
					},{
						model:'addr',
						label:'地址',
						type:'input'
					}
				],
				userForm:{//表单数据
					name:'',
					age:'',
					sex:'',
					birth:'',
					addr:''
				}
				
			}
		},//data---end
		methods:{
			getUserList(name=""){//获取用户数据
			    // 搜索时,页码要设置为1，才能正确返回数据，因为数据是从第一页开始返回的
			    name ? (this.config.page=1) : ''
				this.$http.get('/api/user/getUserData',{
					params:{
						page:this.config.page,
						name
					}
				}).then(res =>{
					// console.log(res)
					this.tableData=res.data.list.map(item=>{
						item.sexLabel = item.sex === 0 ? '女' : '男'
						return item
					})
					console.log(res.data)
					this.config.total= res.data.count
				})
			},
			// 编辑用户信息
			editUser(row){	
				this.isShow=true
				this.userType='edit'
				// 将当前获取到的数据传递给userForm这个对象
				// 进行拷贝row这个对象
				var new_row={...row}
				this.userForm=new_row
				console.log(row)
			},
			// 添加用户信息
			addUser(){
				this.userType='add'
				this.userForm={}
				this.isShow=true
			},
			submitUserInfo(){
				/* 
					由于添加用户和修改用户信息共用的是同一个对话框
					操作前需要先判断，是添加做的提交还是修改做的提交
				 */
				if(this.userType === 'edit'){//如果是修改
					console.log('修改用户',this.userForm)
					this.$confirm('您确定要保存修改的用户信息吗?, 是否继续?', '提示', {
						  confirmButtonText: '确定',
						  cancelButtonText: '取消',
						  type: 'warning'
						}).then(() => {
						  this.$http.post('/user/updUserInfo',this.userForm).then(res =>{
							this.$message({
								type: 'success',
								message: '更新成功!'
							});
						  	this.isShow= false
						  	this.getUserList()
						  })
						  
						}).catch(() => {
						  this.$message({
							type: 'info',
							message: '已取消修改用户信息'
						  });          
						});
		
				}else if(this.userType ===  'add'){
					this.$confirm('您确定要添加该用户吗?, 是否继续?', '提示', {
						  confirmButtonText: '确定',
						  cancelButtonText: '取消',
						  type: 'warning'
						}).then(() => {
						  this.$http.post('/user/addUserInfo',this.userForm).then(res =>{
							this.$message({
								type: 'success',
								message: '添加成功!'
							});
						  	this.isShow= false
						  	this.getUserList()
						  })
						  
						}).catch(() => {
						  this.$message({
							type: 'info',
							message: '添加失败'
						  });          
						});
				}
			},
			//删除用户信息
			delUser(row){
				this.$confirm('您确定要删除该用户吗?, 是否继续?', '提示', {
					  confirmButtonText: '确定',
					  cancelButtonText: '取消',
					  type: 'warning'
					}).then(()=> {
						let id = row.id
					  this.$http.get('/user/delUserInfo',{
						  params:{
							  id
						  }
					  }).then(res =>{
			            console.log(id)
						this.$message({
							type: 'success',
							message: '成功删除!'
						});
					  	this.isShow= false
					  	this.getUserList()
					  })
					}).catch(() => {
					  this.$message({
						type: 'info',
						message: '删除失败'
					  });          
					});
				
			}
		},
		mounted() {
			this.getUserList()
		}
	}
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/common.scss'
</style>
