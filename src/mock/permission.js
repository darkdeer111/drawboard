import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body);
    console.log(JSON.parse(config.body));
	if(username === ''){
		return{
			code: -222,
			data: {
			message: '用户名不能为空'
		 }
		}
	}
	if(password === ''){
		return{
			code: -666,
			data: {
			message: '密码不能为空'
		 }
		}
	}
    // 先判断用户是否存在
    if (username === 'admin' || username === 'xiaoxiao') {
      // 判断账号和密码是否对应
      if (username === 'admin' && password === '123456') {
        return {
          code: 20000,
          data: {
            menu: [
              {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
              },{
                path: '/user',
                name: 'user',
                label: '用户管理页',
                icon: 'user',
                url: 'UserManage/UserManage'
              },{
                path: '/course',
                name: 'course',
                label: '课程管理页',
                icon: 'notebook-1',
                url: 'CourseManage/CourseManage'
              },
              {
                label: '其他',
                icon: 'location',
                children: [
                  {
                    path: '/page1',
                    name: 'page1',
                    label: '页面1',
                    icon: 'notebook-1',
                    url: 'Other/page1'
                  },
                  {
                    path: '/page2',
                    name: 'page2',
                    label: '页面2',
                    icon: 'notebook-1',
                    url: 'Other/page2'
                  }
                ]
              }
            ],
			// data中获取token值
			token:Mock.Random.guid(),
            message: '获取成功',
			
          }
        }
      } else if (username === 'xiaoxiao' && password === '123456') {
        return {
          code: 20000,
          data: {
            menu: [
              {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
              },{
                path: '/course',
                name: 'course',
                label: '课程管理页',
                icon: 'notebook-1',
                url: 'CourseManage/CourseManage'
              }
            ],
			// data中获取token值
			token:Mock.Random.guid(),
            message: '获取成功'
          }
        }
      } else {
        return {
          code: -999,
          data: {
            message: '密码错误'
          }
        }
      }
    } else {
      return {
        code: -666,
        data: {
          message: '用户不存在'
        }
      }
    }
  }
}
