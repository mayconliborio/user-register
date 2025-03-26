import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import router from './router';
import '@assets/styles/_theme.scss';
import { vMaska } from "maska/vue"
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App);

app.use(router);
app.use(pinia)

app.directive('maska', vMaska);

app.mount('#app');