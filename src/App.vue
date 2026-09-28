<script setup>
import Game from './pages/Game.vue'
</script>

<template>
  <nav>
    <RouterLink to="/">Game</RouterLink>
    <RouterLink to="/leaderboard">Leaderboard</RouterLink>
    <RouterLink to="/admin">Admin</RouterLink>
  </nav>
  <RouterView />
</template>

<style scoped></style>
