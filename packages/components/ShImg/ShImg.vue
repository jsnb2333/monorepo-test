<script setup>
import { computed } from 'vue';

const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  base: {
    type: String,
    default: import.meta.env.VITE_ROOT_PATH,
  },
});

const imgSrc = computed(() => {
  return props.base + props.src;
});
</script>

<template>
  <img v-if="imgSrc !== props.base" :src="imgSrc" />
</template>
