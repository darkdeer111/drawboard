import Mock from 'mockjs'
import homeApi from './home.js'
import userApi from './user.js'
// 引入权限管理的mock数据
import permissionApi from './permission.js'
//拦截的是/api/home/getData
Mock.mock('/api/home/getData', 'get',homeApi.getHomeData)

// 配置拦截用户相关的URL
//拦截的是 /api/user/getUserData
Mock.mock(/\/user\/getUserData/,'get',userApi.getUserList)
// 修改用户
Mock.mock(/\/user\/updUserInfo/,'post',userApi.updateUser)
// 增加用户   createUser
Mock.mock(/\/user\/addUserInfo/,'post',userApi.createUser)
// 删除用户 deleteUser
Mock.mock(/\/user\/delUserInfo/,'get',userApi.deleteUser)

// 权限管理
Mock.mock(/\/permission\/getMenu/,'post',permissionApi.getMenu)