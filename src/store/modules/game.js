import { createStore } from 'vuex'
import player from './player'

export default createStore({
  modules: { player },
  state: {
    movies: 0,
    autoProduction: 0,
    upgrades: [
      {
        name: 'Video Editor',
        value: 0.1,
        price: 20,
      },
      {
        name: 'Sound Designer / Mixer',
        value: 1,
        price: 100,
      },
    ],
    admin: false,
  },
  mutations: {
    add1Movies(state) {
      state.movies++
    },
    addMovies(state, numberToAdd) {
      state.movies += numberToAdd
    },
    addAutoProduction(state) {
      state.movies += state.autoProduction
    },
    upgradeAutoProduction(state, indexOfUpgrade) {
      if (state.upgrades[indexOfUpgrade].price > state.movies) return
      state.autoProduction += state.upgrades[indexOfUpgrade].value
      state.movies -= state.upgrades[indexOfUpgrade].price
      state.upgrades[indexOfUpgrade].price *= 1.15
    },
    loadGame(state, data) {
      state.movies = data.movies
      state.autoProduction = data.autoProduction
      for (let i = 0; i < data.upgradesPrice.length; i++) {
        state.upgrades[i].price = data.upgradesPrice[i]
      }
      state.admin = data.admin
      console.log(data)
    },
  },
  actions: {
    async addAutoMovies({ commit }) {
      commit('add1Movies')
    },
  },
  getters: {
    movies: (state) => Math.round(state.movies),
    autoProductionFullNumber: (state) => state.autoProduction,
    autoProduction: (state) => state.autoProduction.toFixed(2),
    upgrades: (state) => state.upgrades,
    timeToProduce1Movie: (state) => {
      if (state.autoProduction == 0) return -1
      return 1000 / state.autoProduction
    },
    admin: (state) => state.admin,
  },
})
