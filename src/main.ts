import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
import '@/assets/styles/main.less'

async function bootstrap() {
  const app = createApp(App)
  await setupRouter(app)
  app.mount('#app')
}

bootstrap()
