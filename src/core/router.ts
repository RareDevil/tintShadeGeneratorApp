// Import
import * as VueRouter from "vue-router";
// Page components
const Home = () => import('../pages/home.vue');
const Config = () => import('../pages/config.vue');
const Preview = () => import('../pages/preview.vue');
const Download = () => import('../pages/download.vue');
const Settings = () => import('../pages/settings.vue');

// config pages
const Config_colors = () => import('../pages/config/colors.vue');
const Config_tintshade = () => import('../pages/config/tintshade.vue');
const Config_output = () => import('../pages/config/output.vue');

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
            path: '/config',
            name: 'config',
            component: Config,
            children: [
                {
                    path: '',
                    name: 'configColors',
                    component: Config_colors,
                },
                {
                    path: 'tintshade',
                    name: 'configTintshade',
                    component: Config_tintshade,
                },
                {
                    path: 'output',
                    name: 'configOutput',
                    component: Config_output,
                },
            ]
        },
        {
            path: '/preview',
            name: 'preview',
            component: Preview,
        },
        {
            path: '/download',
            name: 'download',
            component: Download,
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
