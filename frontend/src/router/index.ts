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
					path: '/:id',
					name: 'music',
					component: () => import('@/views/Music.vue')
				},
			],
		},
	]
});

export default router;
