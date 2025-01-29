<script setup lang="ts">
import { useRouter }     from 'vue-router';
import { useMusicStore } from '@/stores/Music';
import Album             from '@/components/Album.vue';

const router     = useRouter();
const musicStore = useMusicStore();

function click(index: number) {
	musicStore.setActive(index);
	router.push('/');
}
</script>

<template>
	<div class="grid grid-cols-2 gap-3 mx-4 pb-4">
		<Album 
			v-for="album, index in musicStore.albums" 
			:key="album.id"
			:title="album.title"
			:active="album.active" 
			@click="click(index)"
		/>
	</div>
</template>
