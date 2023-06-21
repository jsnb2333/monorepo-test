<script setup>
import { provide } from "vue";

import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
import BaseContent from "./components/BaseContent.vue";

const props = defineProps({
  menuList: {
    type: Array,
  },
  leftSidebarLoading: {
    type: Object,
    default: () => ({
      value: false,
    }),
  },
  username: {
    type: String,
    default: {
      value: "",
    },
  },
});
const emits = defineEmits(["logout"]);

provide("menuList", props.menuList);
provide("leftSidebarLoading", props.leftSidebarLoading);

function handleLogout() {
  emits("logout");
}
</script>

<template>
  <div class="BaseLayout">
    <div class="left-sidebar">
      <Sidebar class="sidebar" />
    </div>
    <div class="right-main">
      <Header @logout="handleLogout" :username="props.username">
        <slot name="headerDefault"></slot>
      </Header>
      <div class="bottom-Content">
        <BaseContent />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.BaseLayout {
  height: 100vh;
  display: flex;
  .left-sidebar {
    position: relative;
    width: 200px;
    height: 100%;
    background-color: #fff;
    .sidebar {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .right-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    // 开启BFC防止flex挤压，并非开启滚动
    overflow: auto;
    .bottom-Content {
      flex: 1;
      overflow-y: auto;
    }
  }
}
</style>
