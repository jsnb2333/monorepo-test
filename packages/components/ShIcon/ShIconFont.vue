<script lang="jsx">
import { createFromIconfontCN } from '@ant-design/icons-vue';

// 每次更新记得将.css改为.js
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4022287_b00mbsnpdfm.js',
});

export default {
  setup() {
    return () => <IconFont />;
  },
};
</script>
