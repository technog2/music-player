<script setup lang="ts">
import { ref, onMounted }      from 'vue';
import { useBottomSheetStore } from '@/stores/BottomSheet';
import { useMusicStore }       from '@/stores/Music';
import Music                   from '@/components/Music.vue';
import MenuItem                from '@/components/MenuItem.vue';

const bsStore    = useBottomSheetStore();
const musicStore = useMusicStore();

// onMounted(async () => {
// 	// for (let i = 1; i < 10; i++) {
// 	// 	musics.value.push({
// 	// 		id:      'music_' + i,
// 	// 		title:   'Music ' + i,
// 	// 		artist:  i % 3 !== 0 ? 'Hiboky' : 'Feild',
// 	// 		poster:  `/src/assets/images/img-${i}.jpg`,
// 	// 		src:     '/src/assets/musics/Frozen.mp3',
// 	// 		isLiked: i % 3 === 0,
// 	// 	});
// 	// }

// 	await musicStore.getMusics()
// });
</script>

<template>
	<div class="flex items-center gap-3 mx-4 pb-4 overflow-x-scroll">
		<MenuItem 
			v-for="album, index in musicStore.albums" 
			:key="album.id"
			:title="album.title"
			:active="album.active" 
			@click="musicStore.setActive(index)"
		/>
	</div>

	<div class="px-2">
		<Music 
			v-for="music in musicStore.musics" 
			:key="music.id"
			:music="music" 
			@click="mu => bsStore.open(mu)"
		/>
	</div>
</template>
