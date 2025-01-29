<script setup lang="ts">
defineProps<{ 
	title:  string
	active: boolean
}>();
</script>

<template>
	<span class="w-full aspect-square flex items-center justify-center px-2.5 py-1.5 rounded-2xl bg-gradient-to-br from-[#2c2785] to-[#4e2a9e]">{{ title }}</span>
</template>
