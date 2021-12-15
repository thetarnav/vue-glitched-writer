import { createApp } from 'vue'
import Dev from './serve.vue'
import './style.scss'

const app = createApp(Dev)
app.mount('#app')
