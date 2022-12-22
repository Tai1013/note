import 'normalize.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import { createApp } from 'vue'
import App from './App.vue'
import ElementIcon from './plugin/element-icon'

const app = createApp(App)
app.use(ElementIcon)
app.mount('#app')
