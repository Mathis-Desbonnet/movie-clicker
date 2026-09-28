import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import game from './store/modules/game.js'

const app = createApp(App)

app.use(game)
app.use(router)
app.mount('#app')
