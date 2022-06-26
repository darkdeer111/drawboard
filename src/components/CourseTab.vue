<template>
	<div class="tags">
		<el-tag
		  :effect="$route.name === tag.name ? 'dark' : 'plain'"
		  type="success"
		  :key="tag.name"
		  v-for=" (tag,index) in tags"
		  :closable="tag.name !== 'home'"
		  :disable-transitions="false"
		  @close="handleClose(tag,index)"
		  @click="clickTags(tag)"
		  >
		  {{tag.label}}
		</el-tag>
	</div>
</template>

<script>
	  import {mapState,mapMutations} from 'vuex'
	  export default {
		computed:{
			...mapState({
				//获取vuex中的tabsList数据
				tags:state =>state.tab.tabsList
			})
		},
	    methods: {
		  ...mapMutations({
			  close:'closeTab'
		  }),
	      handleClose(tag,index) {
			  let tagslength =this.tags.length -1
	        this.close(tag);
			 // console.log(index)
			//如果关闭的不是当前的路由，不进行跳转
			if(tag.name !==this.$route.name){
				return
			}
			//如果关闭的是最右边的路由的话，往最左边调
			if(index === tagslength){
				this.$router.push({name:this.tags[index -1].name})
			}else{//否则往右边跳转
				this.$router.push({name:this.tags[index].name})
			}
			
	      },
		  clickTags(item){
			  //跳转路由
			  this.$router.push({name:item.name})
		  }
	
	    }
	  }
</script>

<style lang="scss">
	.tags{
		padding: 20px;
	}
</style>
<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>