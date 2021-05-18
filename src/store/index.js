import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings
  },
  state: {
    loginUser: {
      id: "",
      name: "",
      age: "",
      username: "",
      password: "",
      type: "",
      gender: "",
      birthYear: "",
      status: "",
    }
  },
  mutations: {
    changeLoginUser(state, user) {
      state.loginUser.id = user.id
      state.loginUser.name = user.name
      state.loginUser.age = user.age
      state.loginUser.username = user.username
      state.loginUser.password = user.password
      state.loginUser.type = user.type
      state.loginUser.gender = user.gender
      state.loginUser.birthYear = user.birthYear
      state.loginUser.status = user.status
    }
  },
  getters
})

export default store
