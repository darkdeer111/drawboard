// 存放用户的cookie状态
import Cookie from 'js-cookie'
export default{
	state:{
		token:''
	},
	mutations:{
		//存放token
		setToken(state,val){
			state.token=val
			Cookie.set('token',val)
		},
		//获取token
		getToken(state){
			state.token=Cookie.get('token')
		},
		//清除token值
		clearToken(state){
			state.token=''
			Cookie.remove('token')
		}
	}
}