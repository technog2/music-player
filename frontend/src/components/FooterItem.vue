<script setup lang="ts">
import { useRoute } from 'vue-router';

defineProps<{
	to:   string
	icon: any
}>();

const route = useRoute();
</script>

<template>
	<RouterLink :to="to" class="flex flex-col items-center justify-center gap-1">
		<Component :is="icon" class="size-5" />
		<span v-if="route.path === to" class="block size-2 rounded-full bg-rose-700"></span>
	</RouterLink>
</template>
