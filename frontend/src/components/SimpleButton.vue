<script setup lang="ts">
defineProps<{ 
	value:   string
	loading: boolean
}>();
</script>

<template>
	<button type="submit" class="w-full bg-rose-900 rounded-xl px-4 py-2 outline-none text-center mt-2">
		<span v-if="loading" class="loading loading-spinner"></span>
		<span v-else>{{ value }}</span>
	</button>
</template>
