<script setup>
import { useAttrs } from 'vue';
import { InfoCircleOutlined } from '@ant-design/icons-vue';

const props = defineProps({
  title: String,
  tooltipProps: Object,
});

const attrs = useAttrs();
</script>

<template>
  <a-popover v-if="props.title" v-bind="props.tooltipProps">
    <template #content>
      <span style="white-space: pre-line">
        {{ props.title }}
      </span>
    </template>
    <InfoCircleOutlined
      class="tooltip_info"
      style="font-size: 13px"
      v-bind="attrs"
    />
  </a-popover>
  <InfoCircleOutlined
    v-else
    class="info"
    style="font-size: 13px"
    v-bind="attrs"
  />
</template>

<style scoped lang="less">
.tooltip_info {
  margin-left: 5px;
  cursor: pointer;
  color: #2296d1;
  &:hover {
    color: #222;
  }
}
.info {
  margin-left: 5px;
  color: #000;
}
</style>
