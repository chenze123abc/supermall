import Vuex from 'vuex'
import Vue from 'vue'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

//1、安装插件
Vue.use(Vuex)

//2、创建Store对象
const store =new Vuex.Store({
    state:{
        cartList:[],
    },
    mutations,
    actions,
    getters
})
//3、挂载vue实例上面

export default store