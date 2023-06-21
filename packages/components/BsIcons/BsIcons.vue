<script setup>
import { SolutionOutlined, DownloadOutlined, SendOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  healthDefault: Object,
  showIcons: {
    type: Array,
    default: () => ['openWindow', 'downloadUrlFile', 'clipboardText']
  }
})

/**
 * js对象序列化json对象
 *
 * @return json字符串
 */
function jsonString() {
  if (props.healthDefault) {
    try {
      return JSON.stringify(props.healthDefault, null, 2)
    } catch {
      message.error(t('bsIcons.message.jsonError'))
    }
  } else {
    message.error(t('bsIcons.message.error'))
  }
}

/**
 * 生成blob文件，
 *
 * @return 然会url
 */
function createUrl() {
  try {
    const jsonStr = jsonString()
    if (jsonStr) {
      const blob = new Blob([jsonStr])
      return URL.createObjectURL(blob)
    }
  } catch {
    message.error(t('bsIcons.message.createObjectURLError'))
  }
}

/**
 * 剪切板
 */
function clipboardText() {
  const jsonStr = jsonString()
  if (jsonStr) {
    navigator.clipboard
      .writeText(jsonStr)
      .then(() => {
        message.success(t('bsIcons.message.clipboardTextSuccess'))
      })
      .catch(() => {
        message.error(t('bsIcons.message.clipboardTextError'))
      })
  }
}

/**
 * 打开新窗口
 */
function openWindow() {
  const url = createUrl()
  if (url) {
    window.open(url)
    URL.revokeObjectURL(url)
  }
}

/**
 * 下载文件
 */
function downloadUrlFile() {
  const url = createUrl()
  if (url) {
    let link = document.createElement('a')
    link.download = 'health-check.json'
    link.href = url
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
}
</script>

<template>
  <div class="icon-box">
    <div class="icon" v-if="props.showIcons.includes('openWindow')">
      <a-tooltip color="#fff" placement="bottom">
        <template #title>
          <span class="icon_overlay-text">{{ t('bsIcons.openWindow') }}</span></template
        >
        <SendOutlined class="i" @click="openWindow" />
      </a-tooltip>
    </div>
    <div class="icon" v-if="props.showIcons.includes('downloadUrlFile')">
      <a-tooltip color="#fff" placement="bottom">
        <template #title>
          <span class="icon_overlay-text">{{ t('bsIcons.downloadUrlFile') }}</span></template
        >
        <DownloadOutlined class="i" @click="downloadUrlFile" />
      </a-tooltip>
    </div>
    <div class="icon" v-if="props.showIcons.includes('clipboardText')">
      <a-tooltip color="#fff" placement="bottom">
        <template #title>
          <span class="icon_overlay-text">{{ t('bsIcons.clipboardText') }}</span></template
        >
        <SolutionOutlined class="i" @click="clipboardText" />
      </a-tooltip>
    </div>
  </div>
</template>

<style scoped lang="less">
.icon-box {
  display: flex;
  .icon {
    margin-left: 7px;
    cursor: pointer;
    &:hover {
      color: #333;
    }
    .i {
      height: 15px;
      width: 15px;
      :deep(svg) {
        height: 100%;
        width: 100%;
      }
    }
  }
}
.icon_overlay-text {
  color: #222;
}
</style>
