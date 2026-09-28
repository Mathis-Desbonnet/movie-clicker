import Admin from '@/pages/Admin.vue'
import Game from '@/pages/Game.vue'
import Leaderboard from '@/pages/Leaderboard.vue'
import { createRouter, createWebHistory } from 'vue-router'
import game from '@/store/modules/game'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Game,
    },
    {
      path: '/leaderboard',
      component: Leaderboard,
    },
    {
      path: '/admin',
      component: Admin,
    },
  ],
})

router.beforeEach((to, from) => {
  if (to.path == '/admin') {
    console.log(game.getters.admin)
    return game.getters.admin
  }
  return true
})

export default router
