<script setup>
import { AIconFont } from "../../../index";

const props = defineProps({
  menuList: {
    type: Array,
  },
  isChildren: {
    type: Boolean,
  },
});
</script>

<script>
export default {
  name: "NavSubMenu",
};
</script>

<template>
  <template v-for="subMenu of props.menuList" :key="subMenu.path">
    <a-sub-menu
      v-if="subMenu.children && subMenu.children.length > 0"
      :key="subMenu.path"
    >
      <template #icon>
        <AIconFont v-if="subMenu.icon" :type="subMenu.icon" />
      </template>
      <template #title>
        <a-tooltip placement="right">
          <template #title>
            {{ subMenu.title }}
          </template>
          <span class="sub-menu-text">
            {{ subMenu.title }}
          </span>
        </a-tooltip>
      </template>

      <NavSubMenu :menuList="subMenu.children" isChildren />
    </a-sub-menu>

    <template v-else>
      <a-menu-item
        :class="{ children: props.isChildren }"
        :key="subMenu.path"
        :disabled="subMenu.disabled"
      >
        <a-tooltip placement="right">
          <template #title>
            {{ subMenu.title }}
          </template>
          <span class="menu-item-text">
            {{ props.isChildren ? "- " + subMenu.title : subMenu.title }}
          </span>
        </a-tooltip>
      </a-menu-item>
    </template>
  </template>
</template>

<style scoped lang="less"></style>
