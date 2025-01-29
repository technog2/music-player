<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useApi }              from '@/assets/ts/Api';
import _musics                 from '@/assets/ts/Musics';
import { useBottomSheetStore } from '@/stores/BottomSheet';
import Music                   from '@/components/Music.vue';
import MenuItem                from '@/components/MenuItem.vue';
import type { MusicModel, AlbumModel } from '@/models/Music';

const api     = useApi();
const bsStore = useBottomSheetStore();
const albums  = ref<AlbumModel[]>([]);
const musics  = ref<MusicModel[]>([]);

onMounted(async () => {
	await getMusics();
});

async function getMusics() {
	try {
		// const res = await api.get('/musics');
		// if (res.ok) albums.value = await res.data;
		albums.value = _musics;

		setActive(0);
	} 
	catch(err) { console.error(err); }
}

function setActive(index: number) {
	albums.value?.map(al => al.active = false);
	albums.value[index].active = true;
	musics.value = albums.value.find(item => item.active).musics;
}
</script>

<template>
	<div class="flex items-center gap-3 mx-4 pb-2 overflow-x-scroll">
		<MenuItem 
			v-for="album, index in albums" 
			:key="album.id"
			:title="album.title"
			:active="album.active" 
			@click="setActive(index)"
		/>
	</div>

	<div class="px-2">
		<Music 
			v-for="music in musics" 
			:key="music.id"
			:music="music" 
			@click="mu => bsStore.open(mu)"
		/>
	</div>
</template>
