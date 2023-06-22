<script setup>
import Logo from './Logo.vue';
import Nav from './Nav.vue';
</script>

<template>
  <div class="sidebar-content">
    <div class="logo">
      <Logo class="logo-icon" />
    </div>
    <Nav class="nav" />
  </div>
</template>

<style scoped lang="less">
.sidebar-content {
  display: flex;
  flex-direction: column;
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  background-color: #f5f7fa;
  .logo-icon {
    width: 160px;
    :deep(svg) {
      width: 100%;
    }
  }
}
.nav {
  flex: 1;
  overflow-y: auto;

  // a-sub-menu 未选中时样式
  :deep(.ant-menu-inline .children) {
    background-color: #f2f6fc;
  }
  :deep(.ant-menu-submenu-title) {
    background-color: #fff;
  }
  // a-sub-menu 基础样式
  :deep(.ant-menu-submenu-title) {
    margin: 0;
    height: 56px;
    .ant-menu-submenu-arrow {
      color: #606266 !important;
    }
    .ant-menu-title-content {
      .sub-menu-text {
        font-size: 14px;
        font-weight: bold;
        color: #606266;
      }
    }
  }
  // a-sub-menu 基础样式
  :deep(.ant-menu-item-only-child) {
    margin: 0;
    height: 50px;
  }
  // a-sub-menu 被选到的样式
  :deep(.ant-menu-submenu-selected > .ant-menu-submenu-title) {
    background-color: #ccdaeb;
    .ant-menu-title-content {
      .sub-menu-text {
        color: #2963ae;
      }
    }
  }
  // a-sub-menu 的 hover
  :deep(.ant-menu-submenu-title:hover) {
    // background-color: #ffffff00;
  }

  // a-menu-item 基础样式
  :deep(.ant-menu-item) {
    .ant-menu-title-content {
      .menu-item-text {
        font-size: 12px;
        font-weight: bold;
        color: #606266;
      }
    }
    &::after {
      // border-right-color: #2963ae;
      border-right-color: #ffffff00;
    }
  }
  // a-menu-item 被选到的样式
  :deep(.ant-menu-item-selected) {
    // background-color: #ccdaeb;
    background-color: #ffffff00;
    &::after {
      // border-right-color: #2963ae;
      border-right-color: #ffffff00;
    }
    .ant-menu-title-content {
      .menu-item-text {
        color: #2963ae;
      }
    }
  }
  // a-menu-item 的 hover
  :deep(.ant-menu-item:hover) {
    background-color: #ffffff00;
  }
  :deep(.ant-menu-item:hover .ant-menu-title-content) {
    .menu-item-text {
      color: #2963ae;
    }
  }
  :deep(.children.ant-menu-item:hover) {
    background-color: #f2f6fc;
  }
  :deep(.ant-menu-item:focus-visible) {
    box-shadow: none;
  }

  // 禁用时的样式
  :deep(.ant-menu-item-disabled) {
    background-color: #ccc !important;
    :deep(span) {
      color: #606266;
    }
  }
}
</style>
