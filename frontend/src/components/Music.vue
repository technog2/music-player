<script setup lang="ts">
import IconUser      from '@/icons/User.vue';
import IconHeart     from '@/icons/Heart.vue';
import IconHeartFill from '@/icons/HeartFill.vue';
import type { MusicModel } from '../models/Music';

defineProps<{ 
	music: MusicModel
}>();

const emit = defineEmits(['click']);
</script>

<template>
	<div class="flex justify-between items-center gap-4 m-4 mb-0">
		<div @click="emit('click', music)" class="flex justify-start items-center gap-4">
			<img 
				:src="music.poster" 
				:alt="music.title" 
				loading="lazy"
				class="size-14 rounded-xl object-cover" 
			>
			<div class="">
				<span class="font-bold text-white">{{ music.title }}</span>
				<div class="flex items-center gap-2 text-sm text-gray-400 mt-1">
					<IconUser class="size-3" />
					{{ music.artist }}
				</div>
			</div>
		</div>

		<button @click="music.isLiked = !music.isLiked" class="">
			<IconHeartFill v-if="music.isLiked" class="text-rose-500" />
			<IconHeart v-else />
		</button>
	</div>
</template>
