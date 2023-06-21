<script setup>
import { ref, computed, inject, watch } from "vue";
import NavSubMenu from "./NavSubMenu.vue";
import { useRouter, useRoute } from "vue-router";
import { treeToListDeep } from "../helpers";

const router = useRouter();
const route = useRoute();

const menuList = inject("menuList");
const leftSidebarLoading = inject("leftSidebarLoading");

//  打开的key值对应菜单的path值
const openKeys = ref([]);
//  所在menu的keys，这里只能所在一个即selectedKeys[0]
const selectedKeys = ref([]);

// 平摊的数据
const menuListFlatten = computed(() => {
  return treeToListDeep(menuList);
});

/**
 * 根据url路径展开菜单，高亮菜单menu
 */
watch(
  () => route.path,
  () => {
    // 防止情况：没找到current就会跳转到404界面，但高亮没有去除。
    selectedKeys.value[0] = "";
    openKeys.value = [];

    const current = findCurrent(route.path);
    if (current) {
      selectedKeys.value[0] = current.path;
      openKeys.value = current.allPath.slice(0, -1);
    }
  },
  { immediate: true }
);

function findCurrent(currentPath) {
  // 对edit做特殊处理
  const newCurrentPath = currentPath.replace(/\/edit/, "");
  return menuListFlatten.value.find((item) => item.path === newCurrentPath);
}

/**
 * 用户点击菜单切换到路由
 */
function toRouter() {
  if (selectedKeys.value[0]) {
    router.push(selectedKeys.value[0]);
  }
}
</script>

<template>
  <div>
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      class="nav_menu"
      mode="inline"
      @select="toRouter"
    >
      <a-spin :spinning="leftSidebarLoading.value">
        <NavSubMenu :menuList="menuList" />
      </a-spin>
    </a-menu>
  </div>
</template>

<style scoped>
.nav_menu {
  /* -1px防止vw转换的时候出现滚动条 */
  /* width: calc(100% - 1px); */
}
</style>
