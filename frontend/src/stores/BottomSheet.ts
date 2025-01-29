import { ref }             from 'vue';
import { defineStore }     from 'pinia';
import { useMusicStore }   from '@/stores/Music';
import type { MusicModel } from '@/models/Music';

export const useBottomSheetStore = defineStore('BottomSheet', () => {
	const musicStore = useMusicStore();
	const active     = ref<boolean>(false);
	const minimized  = ref<boolean>(false);
	const playing    = ref<boolean>(false);

	function open(music: MusicModel) {
		musicStore.currentMusic = music;
		active.value            = true;
		playing.value           = true;
	}

	return {
		active,
		minimized,
		playing,

		open,
	}
});