// Theme stuff 
import 'primevue/resources/themes/arya-blue/theme.css';
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
import BadgeDirective from 'primevue/badgedirective';

import router from "./core/router.ts";

const app = createApp(App);
app.use(router);
app.use(PrimeVue);
app.directive('badge', BadgeDirective);
// This should always be the last line
app.mount('#app').$nextTick(() => postMessage({ payload: 'removeLoading' }, '*'))
