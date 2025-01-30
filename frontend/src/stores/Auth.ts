import { ref, computed } from 'vue';
import { useRouter }     from 'vue-router';
import { defineStore }   from 'pinia';
import { jwtDecode }     from 'jwt-decode';
import { useApi }        from '../assets/ts/Api';
import type { TokenModel }            from '../models/Auth';
import type { UserIntroductionModel } from '../models/User';

export const useAuthStore = defineStore('Auth', () => {
	const router = useRouter();
	const api    = useApi();
	const token  = ref<TokenModel | null>();
	const user   = computed<UserIntroductionModel | null>(() => token.value ? jwtDecode(token.value?.accessToken) : null);

	function setToken(data: TokenModel) {
		token.value = data;

		sessionStorage.setItem('access-token',  data.accessToken);
		sessionStorage.setItem('refresh-token', data.refreshToken);
	}

	function checkToken() {
		token.value = {
			accessToken:  sessionStorage.getItem('access-token')  as string,
			refreshToken: sessionStorage.getItem('refresh-token') as string,
		}
	}

	function checkAuth() {
		if (!!sessionStorage.getItem('access-token') && !!sessionStorage.getItem('refresh-token')) {
			checkToken();
			if (user.value?.exp && user.value?.exp * 1000 < Date.now()) logout();
		}
		else logout();
	}

	async function logout() {
		await api.post('/auth/logout', {});

		token.value = null;

		sessionStorage.removeItem('access-token');
		sessionStorage.removeItem('refresh-token');

		router.push('/login');
	}

	return {
		token,
		user,

		setToken,
		checkAuth,
		logout,
	}
});