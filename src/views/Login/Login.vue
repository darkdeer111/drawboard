<template>
	 <div class="main">
	    <div class="form">
	      <h2>登  录</h2>
	      <el-form :model="form"  label-width="120">
	        <el-form-item>
	          <el-input v-model="form.username" autocomplete="off" placeholder="Username"></el-input>
	        </el-form-item>
	        <el-form-item>
	          <el-input
	            v-model="form.password"
	            type="password"
	            placeholder="Password"
	          ></el-input>
	        </el-form-item>
	        <el-form-item align="center">
	          <el-button type="primary" @click="login()">登录</el-button>
	        </el-form-item>
	      </el-form>
	    </div>
	  </div>
	</div>
</template>
<script>
	
	export default {
		data() {
			return {
				form: {
					username: '',
					password: ''
				},
			}
		},
		methods: {
			login() {//去调用permission
				this.$http.post('/permission/getMenu',this.form).then(res =>{
					res=res.data
					// console.log(res)
					if(res.code === 20000){
						//清除 防止第二次登录,重复加入菜单
						this.$store.commit('clearMenu')
						//再加入
						this.$store.commit('setMenu',res.data.menu)
						//设置token
						this.$store.commit('setToken',res.data.token)
						//添加动态路由
						this.$store.commit('addMenu',this.$router);
						this.$router.push({name:'home'})//跳转到Home目录
						
					}else{
						this.$message.error(res.data.message)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.main {
  margin: 0;
  padding: 0;
  height: 100vh;
  background: url('../../assets/img/bg.jpg') no-repeat;
  background-size: cover;
  .form {
    background-color: #000;
    z-index: 1;
    font-family: Helvetica;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 350px;
    padding: 0 45px 30px 45px;
    text-align: center;
    border-radius: 10px;
    opacity: 0.7;
    h2 {
      color: #fff;
      font-size: 28px;
      font-weight: 500;
      text-align: center;
      text-transform: uppercase;
      margin: 23px;
    }
    button {
      outline: 0;
      color: #fff;
      background: none;
      font-size: 14px;
      text-transform: uppercase;
      width: 150px;
      padding: 15px;
      border: 2.5px solid #10ac84;
      border-radius: 25px;
      cursor: pointer;
      transition: 0.5s;
      transition-property: background, transform;
    }
    .options {
      color: #bbb;
      font-size: 14px;
      margin: 20px 0 0;
      a {
        text-decoration: none;
        color: #06c5cf;
      }
    }
  }
  .form button:hover,
  .form button:active,
  .form button:focus {
    background: #10ac84;
    transform: scale(1.1)
  }
}


</style>
