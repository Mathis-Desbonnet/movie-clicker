export default {
  namespaced: true,
  state: {
    playerSave: [
      {
        name: 'admin',
        movies: 0,
        autoProduction: 0,
        upgradesPrice: [20, 100],
        admin: true,
      },
    ],
  },
  mutations: {
    addPlayer(state, newPlayer) {
      let playerFound = false
      state.playerSave.forEach((player) => {
        if (player.name == newPlayer.name) {
          player.movies = newPlayer.movies
          player.autoProduction = newPlayer.autoProduction
          player.upgradesPrice = newPlayer.upgradesPrice
          playerFound = true
          return
        }
      })
      if (!playerFound) {
        state.playerSave.push(newPlayer)
      }
    },
    deletePlayer(state, playerNameToDelete) {
      let indexToDelete = -1
      for (let i = 0; i < state.playerSave.length; i++) {
        if (state.playerSave[i].name == playerNameToDelete) {
          indexToDelete = i
        }
      }
      if (indexToDelete != -1) {
        state.playerSave.splice(indexToDelete, 1)
      }
    },
  },
  getters: {
    players: (state) => state.playerSave,
  },
}
