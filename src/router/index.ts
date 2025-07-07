import { createRouter, createWebHashHistory } from "vue-router"
import { routes } from "./routes"
import type { App } from 'vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_URL),
  routes
})

export async function setupRouter(app: App) {
  app.use(router)
  await router.isReady()
}