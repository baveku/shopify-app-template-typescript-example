import { createApp } from 'vue'
import './style.css'
import App from '@app/App.vue'
import router from '@app/routers'

createApp(App).use(router).mount('#app')
