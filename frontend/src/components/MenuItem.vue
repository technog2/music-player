<script setup lang="ts">
defineProps<{ 
	title:  string
	active: boolean
}>();
</script>

<template>
	<span 
		class="w-full px-2.5 py-1.5 rounded-lg whitespace-nowrap" 
		:class="{ 'bg-gradient-to-br from-[#2c2785] to-[#4e2a9e]': active }"
	>{{ title }}</span>
</template>
