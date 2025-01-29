import { ref }                         from 'vue';
import { defineStore }                 from 'pinia';
import { useApi }                      from '@/assets/ts/Api';
import albumsJson                      from '@/assets/albums.json';
import type { MusicModel, AlbumModel } from '@/models/Music';

export const useMusicStore = defineStore('Music', () => {
	const api          = useApi();
	const albums       = ref<AlbumModel[]>([]);
	const musics       = ref<MusicModel[]>([]);
	const currentMusic = ref<MusicModel>();

	async function getMusics() {
		try {
			// const res = await api.get('/musics');
			// if (res.ok) albums.value = res.data;
			albums.value = albumsJson;

			setActive(0);
		} 
		catch(err) { console.error(err); }
	}

	function setActive(index?: number = 0) {
		albums.value?.map(al => al.active = false);
		albums.value[index].active = true;
		musics.value = albums.value.find(item => item.active).musics;
	}

	function goPrevious() {
		currentMusic.value = musics.value[musics.value.indexOf(currentMusic.value) - 1];
	}

	function goNext() {
		currentMusic.value = musics.value[musics.value.indexOf(currentMusic.value) + 1];
	}

	return {
		albums,
		musics,
		currentMusic,

		getMusics,
		setActive,
		goPrevious,
		goNext,
	}
});