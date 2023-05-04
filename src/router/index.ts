import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Login',
        meta: {
            title: '登录',
            keepAlive: true,
            requireAuth: false,
        },
        component: () => import('../pages/login.vue'),
    },
    {
        path: '/JD',
        name: 'JD',
        meta: {
            title: '京东监控',
            keepAlive: true,
            requireAuth: true,
        },
        component: () => import('../pages/JD.vue'),
    },
    {
        path: '/TM',
        name: 'TM',
        meta: {
            title: '天猫监控',
            keepAlive: true,
            requireAuth: true,
        },
        component: () => import('../pages/TM.vue'),
    },
    {
        path: '/detail',
        name: 'Detail',
        props: (route) => ({ query: route.query.id }),
        meta: {
            title: '详情',
            keepAlive: true,
            requireAuth: false,
        },
        component: () => import('../pages/Detail.vue'),
    },
    {
        path: '/manager/user',
        name: 'UserManager',
        meta: {
            title: '用户管理',
            keepAlive: true,
            requireAuth: false,
        },
        component: () => import('../pages/UserManager.vue'),
    },
    {
        path: '/manager/task',
        name: 'TaskManager',
        meta: {
            title: '任务管理',
            keepAlive: true,
            requireAuth: false,
        },
        component: () => import('../pages/TaskManager.vue'),
    },
    {
        path: '/craw',
        name: 'Craw',
        meta: {
            title: '爬虫数据',
            keepAlive: true,
            requireAuth: false,
        },
        component: () => import('../pages/CrawView.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
