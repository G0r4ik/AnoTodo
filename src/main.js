import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/style.css'
import App from '@/App.vue'
import AppError from '@/components/AppError.vue'
const pinia = createPinia()

const modules = import.meta.glob('./components/icons/*.vue', { eager: true })
const app = createApp(App)
for (const path in modules) {
  const componentName = path.split('/').at(-1).split('.')[0]
  app.component(`${componentName}`, modules[path].default)
}
app.component('AppError', AppError)

app.use(pinia)
app.mount('#app')
