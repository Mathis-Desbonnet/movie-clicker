import { createStore } from 'vuex'

export default createStore({
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
  },
  actions: {
    async addAutoMovies({ commit }) {
      commit('add1Movies')
    },
  },
  getters: {
    movies: (state) => Math.round(state.movies),
    autoProduction: (state) => state.autoProduction.toFixed(2),
    upgrades: (state) => state.upgrades,
    timeToProduce1Movie: (state) => {
      if (state.autoProduction == 0) return -1
      return 1000 / state.autoProduction
    },
  },
})
