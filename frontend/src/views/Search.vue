<script setup lang="ts">
import { ref, onMounted }      from 'vue';
import { useBottomSheetStore } from '../stores/BottomSheet';
import { useMusicStore }       from '../stores/Music';
import Music                   from '../components/Music.vue';
import MenuItem                from '../components/MenuItem.vue';

const bsStore    = useBottomSheetStore();
const musicStore = useMusicStore();
</script>

<template>
	<div class="text-xl text-center">Comming soon!</div>
</template>
