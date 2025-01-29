<script setup lang="ts">
import { 
	ref, 
	computed,
	onBeforeMount,
	onMounted
} from 'vue';
import { useRoute }            from 'vue-router';
import { useAuthStore }        from '@/stores/Auth';
import { useBottomSheetStore } from '@/stores/BottomSheet';
import { useMusicStore }       from '@/stores/Music';
import FooterItem              from '@/components/FooterItem.vue';
import BottomSheet             from '@/components/BottomSheet.vue';
import IconMagnifyingGlass     from '@/icons/MagnifyingGlass.vue';
import IconHome                from '@/icons/Home.vue';
import IconMusicalNote         from '@/icons/MusicalNote.vue';
import IconUser                from '@/icons/User.vue';
import type { MusicModel }     from '@/models/Music';
import type { UserIntroductionModel } from '@/models/User';


const route      = useRoute();
const authStore  = useAuthStore();
const bsStore    = useBottomSheetStore();
const musicStore = useMusicStore();
const user       = computed<UserIntroductionModel>(() => authStore.user);

onBeforeMount(authStore.checkAuth);
onMounted(musicStore.getMusics);
</script>

<template>
	<Transition>
		<BottomSheet v-if="bsStore.active" />
	</Transition>

	<header class="px-4 py-8">
		<div class="relative">
			<input 
				type="text" 
				placeholder="Search" 
				class="w-full bg-gray-900/50 backdrop-blur pr-4 pl-10 py-2 rounded-xl outline-none"
			>
			<IconMagnifyingGlass class="absolute top-2 left-2 size-5 text-gray-500" />
		</div>
	</header>

	<div :class="`pb-${ bsStore.minimized ? 40 : 24 }`">
		<RouterView />
	</div>

	<footer class="fixed bottom-4 inset-x-4 flex justify-between px-8 py-3.5 bg-gray-700/50 text-gray-300 backdrop-blur rounded-2xl">
		<FooterItem to="/" :icon="IconHome" />
		<FooterItem to="/search" :icon="IconMagnifyingGlass" />
		<FooterItem to="/albums" :icon="IconMusicalNote" />
		<!-- <FooterItem to="/profile" :icon="IconUser" /> -->
	</footer>
</template>

<!-- <style scoped>
.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style> -->
