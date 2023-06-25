// Import
import * as VueRouter from "vue-router";
// Page components
const Home = () => import('../pages/home.vue');
const Settings = () => import('../pages/settings.vue');
// Router
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/settings',
            name: 'settings',
            component: Settings,
        },
    ],
});
// Export router
export default router;
