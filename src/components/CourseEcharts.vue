<template>
	  <!-- 为ECharts准备一个具备大小（宽高）的Dom 
		  ref添加属性元素，
	  -->
	  <div id="main" style="height:100%;" ref="echart"></div>
</template>

<script>
	//引入echarts
	import echarts from 'echarts'
	export default{
		/* 
			接收父组件的两个数据
			1、chartData （xData，series）
			2、isAxisChart （是否有坐标，如果是false 那么上面的xData就为空）
		 */
		//数据是从父组件传递过来的
		props:{
			chartData:{//从父组件传过来的值
				type:Object,
				default(){
					return{
						xData:[],
						series:[]
					}
				}
			},
			isAxisChart:{//判断，是否有坐标轴
			//默认type为true,代表默认有坐标轴
				type:Boolean,
				default:true
			}
		},
		computed:{
			options(){// 选择是坐标轴，还是没有坐标轴
				return this.isAxisChart ? this.axisOption : this.nomalOption
			},
			isCollSapse(){
				return this.$store.state.tab.isCollapse
			}
		},
		data(){
			return{
				//用来存放初始化的Echart对象
				echart:null,
				//有坐标轴、折线图、柱状图
				axisOption:{
					  legend: {
					    color:'#333' 
					   },
					  tooltip:{
						  trigger: 'axis',
					  },
					   xAxis: {
					        type: 'category',
					        data: [],
							axisLine:{
								lineStyle:{color:'#588dd5'}
							}
					    },
					    yAxis: {
					        type: 'value',
							axisLine:{
								lineStyle:{color:'#588dd5'}
							}
					    },
						color:[
						  '#2ec7c9',
						   '#b6a2de',
						   '#5ab1ef',
						   '#ffb980',
						   '#d87a80',
						   '#8d98b3',
						   '#e5cf0d',
						   '#97b552',
						   '#95706d',
						   '#dc69aa',
						   '#07a2a4',
						   '#9a7fd1',
						   '#588dd5',
						   '#f5994e',
						   '#c05050',
						   '#59678c',
						   '#c9ab00',
						   '#7eb00a',
						   '#6f5553',
						   '#c14089'
						],
					    series: [] //数据需要渲染成什么样子
				},
				//没有坐标轴： 饼图
				nomalOption:{
					 series: [],
					 tooltip:{
					 	trigger: 'item',
					 },
					 color:['#c05050','#b6a2de','#5ab1ef','#ffb980','#d87a80','#dc69aa','#c14089'],
				}
			}
		},
		//监听数据
		watch:{//数据发生变化时再去更新数据
			chartData:{
				handler:function(){
					this.initChart()
				},
				deep:true
			},
			isCollSapse(){//侦听方法，当折叠时调用resizeChart
				setTimeout(()=>{
					this.resizeChart()
				},300)
			}
		},
		methods:{
			//初始化echarts
			initChart(){
				this.initChartData()
				if(this.echart){//判断容器是否存在
			    	//存在不需要初始化，直接将配置项传递进来
					this.echart.setOption(this.options)
				}else{
					//初始化ehcarts
					this.echart = echarts.init(this.$refs.echart)
					this.echart.setOption(this.options)
				}
			},
			//处理数据
			initChartData(){
				//判断有坐标轴的数据和没有坐标轴的数据
				if(this.isAxisChart){
					this.axisOption.xAxis.data=this.chartData.xData
					this.axisOption.series = this.chartData.series
					// console.log('axis')
				}else{
					this.nomalOption.series =this.chartData.series
					// console.log('nomal')
				}
			},
			resizeChart(){//创建一个自适应的方法 调用resize
				this.echart ? this.echart.resize() : ''
			}
			
			// getEcharts(){
			// 	//$refs获取dom元素
			//   let echart =echarts.init(this.$refs.echart)// 基于准备好的dom，初始化echarts实例
			//   // 使用刚指定的配置项和数据显示图表。
			//   echart.setOption(this.option)
			// }
		},
		mounted() {//挂载完成时，添加监听窗口事件，调用resizeChart,重新渲染图表大小
			window.addEventListener('resize',this.resizeChart())
			// this.getEcharts()
		},
		destroyed() {//不用时进行销毁，不然会导致内存泄漏
			window.removeEventListener('resize',this.resizeChart())
		}
	}
</script>

<style>
</style>
