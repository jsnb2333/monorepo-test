<script setup>
import {
  CaretDownOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";

const props = defineProps(['username'])

const emits = defineEmits(["logout"]);

function handleLogout() {
  emits("logout");
}
</script>

<template>
  <div class="header">
    <div class="header-text">易策 EASY DETEC — 网络安全自服务平台</div>
    <div class="header-right">
      <slot></slot>
      <a-dropdown>
        <a class="user-link" @click.prevent>
          <a-space :size="2.5">
            <UserOutlined class="user-but" />
            <span>{{ props.username }}</span>
            <CaretDownOutlined />
          </a-space>
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item @click="handleLogout">
              <LogoutOutlined />
              退出登录</a-menu-item
            >
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<style scoped lang="less">
.header {
  height: 80px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  .header-text {
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 45px;

    font-size: 22px;
    font-weight: bold;
    color: #c0c4cc;
  }
  .header-right {
    height: 100%;
    display: flex;
    align-items: center;
    margin-right: 32px;
  }
  .user-link {
    font-size: 14px;
    height: 26px;
    display: flex;
    align-items: center;
  }
  .user-but {
    font-size: 26px;
    color: #2963ae;
    margin-right: 5px;
  }
  .message-but {
    margin-right: 64px;
    font-size: 16px;
    color: #2963ae;
  }
}
</style>
