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
</script>
<template>
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
