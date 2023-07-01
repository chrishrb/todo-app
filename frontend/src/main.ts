import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from './router'
import i18n from './i18n'

import './assets/style.css'
import 'preline';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
  })

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(vuetify)
app.use(router)

app.mount('#app')
