<script setup>
import { createFromIconfontCN } from '@ant-design/icons-vue'
import { useAttrs } from 'vue'

const attrs = useAttrs()

// 每次更新记得将.css改为.js
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4022287_b00mbsnpdfm.js'
})
</script>

<template>
  <IconFont :type="attrs.type" />
</template>
