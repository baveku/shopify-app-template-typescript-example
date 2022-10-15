import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import { HomePage, SettingsPage } from '@pages'
const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/Home' },
  { path: '/home', name: 'Home', component: HomePage },
  { path: '/settings', name: 'Settings', component: SettingsPage },
]
const router = createRouter({
  routes: routes,
  history: createWebHashHistory(),
})
export default router
