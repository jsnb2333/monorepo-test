<script setup>
import { Title } from '../Title';
const props = defineProps({
  title: String,
  padding: {
    type: String,
    default: '15px 15px 15px 15px',
  },
});
</script>

<template>
  <Title class="content_title" v-if="props.title">{{ props.title }}</Title>
  <div class="content_main">
    <div class="content_slot" :style="{ padding: padding }">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.content_title {
  padding: 0 15px;
}
.content_main {
  padding: 15px 15px;
  background-color: #f4f6f9;
}
.content_slot {
  background-color: #fff;
}
</style>
