<template>
	<!-- el-row 每一行总占24栏（列） -->
	<el-row :gutter="20" class="home">
	  <el-col :span="8">
		  <!--用户信息-->
		   <el-card shadow="hover" style="height: 290px;">
			   <!-- 用户信息-->
		        <div class="user">
					<img :src="userImg" alt="">
					<div class="userinfo">
						<p class="name">admin</p>
						<p class="role">超级管理员</p>
					</div>
				</div>
				<!-- 登录信息 -->
				<div class="login-info">
					<p>登录时间：<span>2020-11-3 21:23:00</span></p>
					<p>登录地点：<span>信息管理系统</span></p>
				</div>
		   </el-card>
			<!-- 表格信息 -->
	       <el-card shadow="hover" style="height: 500px; margin-top: 20px;">
			 <el-table
			      :data="tableData"
			      style="width: 100%">
				  <!-- v-for 遍历对象，如果传递两个参数-->
			      <el-table-column
				   v-for="(val,key) in tabLabel"
			        :prop="key"
			        :label="val"
		           >
			      </el-table-column>
			    </el-table>
		  </el-card>
	  </el-col>
	  <el-col :span="16">
		  <!-- 订单信息 -->
		  <div class="num">
		    <el-card shadow="hover" v-for="i in countData" :body-style="{display:'flex',padding:0}">
				<!-- 
					第一种方式，以字符串拼接
					:class="'el-icon-'+i.icon"
					第二种方式，ES6的语法
					:class="`el-icon-${i.icon}`"
				 -->
				<i class="icon" :style="{backgroundColor:i.color}" :class="`el-icon-${i.icon}`">
					
				</i>
				<div class="desc">
					<p class="money">￥{{i.value}}</p>
					<p class="txt">{{i.name}}</p>
				</div>
			</el-card>
		  </div>
		  <!-- 折线图-->
		  <el-card shadow="hover">
			  <my-ecaharts :chartData="echartsData.order"  style="height: 280px"></my-ecaharts>
		  </el-card>
		  <!--饼图和柱状图-->
		  <div class="graph">
			  <!-- 柱状图-->
			  <el-card shadow="hover">
			 <my-ecaharts :chartData="echartsData.user"  style="height: 260px"></my-ecaharts>
			  </el-card>
			  <!-- 饼图-->
			  <el-card shadow="hover">
			  <my-ecaharts :isAxisChart="false" :chartData="echartsData.mall"  style="height: 260px"></my-ecaharts>
			  </el-card>
		  </div>
	  </el-col>
	</el-row>
</template>

<script>
	/* 第一种引入外部scss样式 */
	// import '../../assets/scss/home.scss'
	//引入myechart组件
	import MyEcaharts from '../../components/CourseEcharts.vue'
	export default{
		components:{
			MyEcaharts
		},
		data(){
			return{
				userImg:require('../../assets/img/sixstar_logo.png'),
				countData: [ /* 订单的模拟数据*/
				    {
				        name: '今日支付订单',
				        value: 100,
				        icon: 'success',
				        color: '#2ec7c9'
				    },
				    {
				        name: '今日收藏订单',
				        value: 150,
				        icon: 'star-on',
				        color: '#ffb980'
				    },
				    {
				        name: '今日未支付订单',
				        value: 80,
				        icon: 's-goods',
				        color: '#5ab1ef'
				    },
				    {
				        name: '本月支付订单',
				        value: 210,
				        icon: 'success',
				        color: '#2ec7c9'
				    },
				    {
				        name: '本月收藏订单',
				        value: 500,
				        icon: 'star-on',
				        color: '#ffb980'
				    },
				    {
				        name: '本月未支付订单',
				        value: 300,
				        icon: 's-goods',
				        color: '#5ab1ef'
				    }
				],
				/* 定义数组接收mock数据 */
				tableData:[],
				tabLabel:{
					name: "课程",
					monthBuy: "本月购买",
					todayBuy: "今日购买",
					totalBuy: "总购买",
				},
				echartsData:{//保存echarts数据
					mall:{
						series:[]
					},
					order:{
						xData:[],
						series:[]
					},
					user:{
						xData:[],
						series:[]
					}
				}
			}
		},
		methods:{
			getTableData(){
				this.$http.get('/api/home/getData').then(res=>{
					this.tableData=res.data.body.tableData
					// console.log(res.data.body)
					res=res.data.body
					//订单折线图
					let order = res.orderData
					// console.log(order)
					//X轴数据 类目轴
					this.echartsData.order.xData = order.date
					//取出series中的name部分 ===》键名
					let keyArray =Object.keys(order.data[0]);//获取说有对象中key名，Es6中的语法
					// console.log(keyArray)
					keyArray.forEach(key => {
						this.echartsData.order.series.push({//通过map获取value的值
						   name:key,
						   data:order.data.map(item => item[key]),
						   type:'line'
						})
						
					})
					//用户 柱状图 
					this.echartsData.user.xData = res.userData.map(item => item.date)
					// console.log(this.echartsData.user.xData )
					this.echartsData.user.series.push({
						name:'新增用户',
						data:res.userData.map(item => item.new),
						type:'bar'
					})
					/* 活跃 */
					this.echartsData.user.series.push({
						name:'活跃用户',
						data:res.userData.map(item => item.active),
						type:'bar'
					})
					
					//饼图
					this.echartsData.mall.series.push({
						data:res.mallData,
						type:'pie'
					})
					
				})
			},
			getList(){
				this.$http.get('/api/home/getDatas').then(res=>{
					console.log(res)
				}).catch(err => {
					console.log(err)
				})
			}
		},
		created() {
			// this.getList()
			this.getTableData()
		}
	}
</script>

<style lang="scss">
	/* 第二种引入方式  ~ 相对位置*/
	@import '~@/assets/scss/home.scss';
</style>
