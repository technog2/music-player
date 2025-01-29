import IconHome                    from '@/icons/Home.vue';
import IconUser                    from '@/icons/User.vue';
import IconSettings                from '@/icons/Settings.vue';
import IconPostsCarouselHorizontal from '@/icons/PostsCarouselHorizontal.vue';
import IconChart                   from '@/icons/Chart.vue';

interface DrawerItem {
	name: string
	path: string
	icon: any
}

const drawerItems: DrawerItem[] = [
	{
		name: 'داشبورد',
		path: '/',
		icon: IconHome,
	},
	{
		name: 'پروفایل',
		path: '/profile',
		icon: IconUser,
	},
	{
		name: 'تنظیمات',
		path: '/settings',
		icon: IconSettings,
	},
	{
		name: 'پست ها',
		path: '/posts',
		icon: IconPostsCarouselHorizontal,
	},
	{
		name: 'آمار',
		path: '/stats',
		icon: IconChart,
	},
]

export default drawerItems;