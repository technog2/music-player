import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/login',
			name: 'login',
			component: () => import('@/views/Login.vue')
		},
		{
			path: '/',
			component: () => import('@/layouts/Index.vue'),
			children: [
				{
					path: '/',
					name: 'home',
					component: () => import('@/views/Home.vue')
				},
				{
					path: '/albums',
					name: 'albums',
					component: () => import('@/views/Albums.vue')
				},
				{
					path: '/search',
					name: 'search',
					component: () => import('@/views/Search.vue')
				},
			],
		},
	]
});

export default router;
