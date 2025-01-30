<script setup lang="ts">
import { 
	ref, 
	computed, 
	watch, 
	onMounted 
} from 'vue';
import { useBottomSheetStore } from '@/stores/BottomSheet';
import { useMusicStore }       from '@/stores/Music';
import IconUser                from '@/icons/User.vue';
import IconHeart               from '@/icons/Heart.vue';
import IconHeartFill           from '@/icons/HeartFill.vue';
import IconPlay                from '@/icons/Play.vue';
import IconPause               from '@/icons/Pause.vue';
import IconForward             from '@/icons/Forward.vue';
import IconBackward            from '@/icons/Backward.vue';
import IconChevronDown         from '@/icons/ChevronDown.vue';
import IconX                   from '@/icons/X.vue';
import IconArrowPath           from '@/icons/ArrowPath.vue';
import IconBars2               from '@/icons/Bars2.vue';
import type { MusicModel }     from '@/models/Music';

const bsStore     = useBottomSheetStore();
const musicStore  = useMusicStore();
const audio       = ref<HTMLDocument>(null);
const currentTime = ref<number>(0);
const volume      = ref<number>(0.5);
const loop        = ref<boolean>(false);
const progress    = computed<number>(() => (currentTime.value / audio.value?.duration) * 100 || 0);

watch(progress, (p: number) => 
	// p === 100 && bsStore.playing = false
	{ if (p === 100) bsStore.playing = false }
);

onMounted(() => 
	audio.value.addEventListener('timeupdate', e => 
		currentTime.value = audio.value?.currentTime
	)
);

function playPause() {
	bsStore.playing = !bsStore.playing;
	audio.value[bsStore.playing ? 'play' : 'pause']();
}

function toggleBs(type: string) {
	bsStore[type] = !bsStore[type];
}

function toMin(num: number) {
	num = Math.floor(num);

	let min:     number = Math.floor(num / 60);
	let sec:     number = num - (min * 60);
	let minutes: string = min / 10 < 1 ? `0${min}` : min; 
	let seconds: string = sec / 10 < 1 ? `0${sec}` : sec;

	return `${minutes}:${seconds}`;
}
</script>

<template>
	<div>
		<audio 
			ref="audio" 
			:src="musicStore.currentMusic?.src" 
			preload
			autoplay 
			:loop="loop" 
		></audio>

		<div 
			v-if="bsStore.minimized" 
			class="fixed bottom-[5.5rem] inset-x-4 flex justify-between px-4 py-3 bg-rose-900/75 text-gray-300 backdrop-blur rounded-2xl"
		>
			<div class="flex items-center gap-4">
				<!-- play pause icon -->
				<button @click="playPause" class="bg-white rounded-full p-2 text-black">
					<IconPause v-if="bsStore.playing" class="size-[18px]" />
					<IconPlay v-else class="size-[18px]" />
				</button>

				<!-- music title -->
				<div @click="toggleBs('minimized')">
					<div class="text-white">{{ musicStore.currentMusic?.title }}</div>
					<div class="text-gray-400 text-sm">
						<span class="">{{ toMin(currentTime) }}</span> - 
						<span class="">{{ toMin(audio?.duration) }}</span>
					</div>
				</div>
			</div>

			<!-- close button -->
			<button @click="toggleBs('active')"><IconX /></button>
		</div>

		<div v-else class="fixed bottom-0 inset-x-0 z-10">
			<span class="absolute -top-2.5 left-1/2 -translate-x-1/2 w-12 border-2 border-gray-100 rounded-full"></span>
			<div class="bg-gray-700/90 backdrop-blur rounded-t-3xl h-[97vh] px-4 pb-8 overflow-y-scroll">
				<!-- minimize button -->
				<button @click="toggleBs('minimized')" class="mx-6 mt-2 mb-1 float-right">
					<IconChevronDown />
				</button>

				<!-- poster -->
				<img 
					:src="musicStore.currentMusic?.poster" 
					:alt="musicStore.currentMusic?.title" 
					loading="lazy"
					class="w-full aspect-square object-cover rounded-3xl"
				>

				<!-- title -->
				<div class="text-center my-4">
					<div class="text-2xl text-white">{{ musicStore.currentMusic?.title }}</div>
					<span class="text-gray-300">{{ musicStore.currentMusic?.artist }}</span>
				</div>

				<!-- play controls -->
				<div>
					<!-- controls -->
					<div class="flex items-center justify-between gap-8 mt-12 mb-6">
						<button 
							@click="loop = !loop" 
							:class="{ 'bg-white/75 text-gray-700': loop }"
							class="p-2 rounded-full"
						><IconArrowPath /></button>

						<div class="flex items-center justify-center gap-5">
							<button 
								@click="musicStore.goPrevious" 
								:disabled="musicStore.musics.indexOf(musicStore.currentMusic) === 0"
								class="disabled:opacity-50"
							><IconBackward /></button>
							<button @click="playPause" class="bg-white rounded-full p-4 text-black">
								<IconPause v-if="bsStore.playing" />
								<IconPlay v-else />
							</button>
							<button 
								@click="musicStore.goNext" 
								:disabled="musicStore.musics.indexOf(musicStore.currentMusic) === musicStore.musics.length - 1"
								class="disabled:opacity-50"
							><IconForward /></button>
						</div>

						<div class="p-2"><IconBars2 /></div>

						<!-- <input 
							type="range" 
							min="0" 
							max="1" 
							step="0.01" 
							v-model="volume" 
							@input="audio.volume = volume"
						> -->
					</div>

					<!-- progress -->
					<div class="">
						<div class="relative p-0.5 w-full">
							<input 
								type="range" 
								v-model="currentTime" 
								@input="audio.currentTime = currentTime"
								:min="0" 
								:max="audio?.duration" 
								:step="0.01" 
								:style="`background: linear-gradient(to right, #f3f4f6 ${progress}%, #6b7280 ${progress}%)`"
								class="w-full appearance-none h-1 rounded-full 
									[&::-webkit-slider-thumb]:appearance-none 
									[&::-webkit-slider-thumb]:size-1.5 
									[&::-webkit-slider-thumb]:rounded-full 
									[&::-webkit-slider-thumb]:bg-white 
									[&::-webkit-slider-thumb]:
									[&::-webkit-slider-thumb]:shadow-[0_0_0_6px_rgba(255,255,255,.5)]
								" 
							>
						</div>
						<div class="flex justify-between mt-1">
							<span class="">{{ toMin(currentTime) }}</span>
							<span class="">{{ toMin(audio?.duration) }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
