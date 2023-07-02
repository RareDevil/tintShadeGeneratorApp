// Theme stuff 
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
// Icons
import 'material-symbols';
import 'material-icons/iconfont/material-icons.css';
import 'primeicons/primeicons.css';
// custom styles
import './style.scss';

import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Tooltip from 'primevue/tooltip';
import BadgeDirective from 'primevue/badgedirective';
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from "./core/router.ts";

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App);
app.use(router);
app.use(PrimeVue);
app.directive('tooltip', Tooltip);
app.directive('badge', BadgeDirective);
app.use(pinia);
// This should always be the last line
app.mount('#app').$nextTick(() => postMessage({ payload: 'removeLoading' }, '*'))
