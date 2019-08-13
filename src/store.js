import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    isAutnenticated: false,  // 是否认证
    user: {},  // 存储用户信息
    isCollapse: false, // 折叠左侧导航
    operation_error: [], // 保存最近对数据的操作记录(用于恢复数据)
  },
  getters: {
    isAutnenticated: state => state.isAutnenticated,
    user: state => state.user,
    isCollapse: state =>  state.isCollapse,
    operation_error: state => state.operation_error,
  },

  mutations: {
    set_isAutnenticated: (state, isAutnenticated) => {
      state.isAutnenticated = isAutnenticated;
    },
    set_user: (state, user) => {
      if(user){
        state.user = user;
      }else{
        state.user = {};
      }
    },
    set_isCollapse: (state) => {
      state.isCollapse = !state.isCollapse;
    },
    set_operation_error: (state, data) => {
      state.operation_error.push(data)
    },
  },

  actions: {
    setIsAutnenticated: ({commit}, isAutnenticated) => {
      commit("set_isAutnenticated", isAutnenticated);
    },
    setUser: ({commit}, User) => {
      commit("set_user", User);
    },
    removeCurrentState: ({commit},) => {
      commit("set_isAutnenticated", false);
      commit("set_user", null);
    }
  }
})
