import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as VueSkeletonLoader from 'skeleton-loader-vue';

import App from './App.vue'
import router from './router'
import 'primeicons/primeicons.css'
import "@steveyuowo/vue-hot-toast/vue-hot-toast.css";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('vue-skeleton-loader', VueSkeletonLoader);

app.mount('#app')
