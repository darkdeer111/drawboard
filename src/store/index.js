import Vue from 'vue'
import Vuex from 'vuex'
//引入tab.js
import tab from './tab.js'
import user from './user.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
	  tab,
	  user
  }
})
