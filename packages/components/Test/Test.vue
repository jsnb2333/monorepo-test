<script setup>
import { ref } from 'vue';

const count = ref(1);

function addCount() {
  count.value++;
}
</script>

<template>
  <button @click="addCount">test{{ count }}</button>
</template>

<style scoped></style>
