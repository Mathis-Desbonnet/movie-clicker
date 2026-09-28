<script setup>
</script>

<template>
    <h1>Leaderboard</h1>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Cookies</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="player in $store.getters['player/players']">
                <td>{{ player.name }}</td>
                <td>{{ player.movies }}</td>
                <td><button @click="$store.commit('player/deletePlayer', player.name)">Delete save</button></td>
            </tr>
        </tbody>
    </table>
</template>