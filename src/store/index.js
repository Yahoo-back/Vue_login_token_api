import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import Axios from 'axios'

const axios = Axios.create();

Vue.use(Vuex)

const state = {
  mode: 'login',
  list: [],
  token: localStorage.getItem('token') ? localStorage.getItem('token') : ''
 };

  
 const mutations = {
   //存储token
  $_setToken(state,value) {
    state.token = value;
    localStorage.setItem('token',value)
  },
  //退出登录删除token
  $_removeStorage(state,value) {
    // state.token = '';
    localStorage.removeItem('token')

  },
  setMode: (state, data) => {
  state.mode = data
  },
  setList: (state, data) => {
  state.list = data
  }
 };
  
//  const actions = {
//   // 获取权限列表
//   getPermission({commit}) {
//   return new Promise((resolve, reject) => {
//    axios({
//    url: '/admin/permission' + sessionStorage.getItem('userId'),
//    methods: 'get',
//    headers: {
//     token: sessionStorage.getItem('token'),
//     userId: sessionStorage.getItem('userId')
//    }
//    }).then((res) => {
//    // 存储权限列表
//    console.log(res.data)
//    console.log(res.data.data)
//    commit('setList', res.data);
//    resolve(res.data)
//    }).catch(() => {
//    reject()
//    })
//   })
//   }
//  };

const store = new Vuex.Store({
  state,
  mutations,
  // actions,
  modules: {
    app,
    user
  },
  getters
})

export default store
