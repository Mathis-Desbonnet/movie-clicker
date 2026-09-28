<script setup>
import { watchEffect, ref, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const timeToProduce1Movie = computed(() => store.getters.timeToProduce1Movie)

watchEffect((onCleanup) => {
  if (timeToProduce1Movie.value >= 0) {
    const timer = setInterval(() => {
      store.dispatch('addAutoMovies')
    }, timeToProduce1Movie.value)
    onCleanup(() => {
      clearInterval(timer)
    })
  }
})

function onSave() {
    let name = prompt("Enter your name to save (you'll use this name to load):")
    const upgradesPrice = []
    store.getters.upgrades.forEach(upgrade => {
        upgradesPrice.push(upgrade.price)
    });
    store.commit('player/addPlayer', {
        name: name,
        movies: store.getters.movies,
        autoProduction: store.getters.autoProductionFullNumber,
        upgradesPrice: upgradesPrice,
        admin: false
      })
}

function onLoad() {
    let wantToSave = confirm("Do you want to save?")
    if (wantToSave) {
        onSave()
    }
    let foundPlayer = false
    let name = prompt("Enter the name you used to save:")
    store.getters['player/players'].forEach(player => {
        if (name == player.name) {
            store.commit('loadGame', {
                movies: player.movies,
                autoProduction: player.autoProduction,
                upgradesPrice: player.upgradesPrice,
                admin: player.admin
            })
            alert("Correctly loaded")
            foundPlayer = true
        }
    })
    if (!foundPlayer) alert("Didn't found save with name: " + name)
}
</script>
<template>
    <button @click="onSave">Save</button>
    <button @click="onLoad">Load</button>
  <p>Number of movies: {{ $store.getters.movies }}</p>
  <p>Auto Production: {{ $store.getters.autoProduction }}/s</p>
  <button @click="$store.commit('add1Movies')">Create movie</button>
  <button
    v-for="(upgrade, index) in $store.getters.upgrades"
    @click="$store.commit('upgradeAutoProduction', index)"
  >
    {{ upgrade.name }} -- {{ upgrade.value }}/s -- {{ Math.round(upgrade.price) }} movies
  </button>
  {{ timeToProduce1Movie }}
</template>
