<script lang="jsx">
import { isVNode } from 'vue';
export default {
  props: {
    but: {
      type: Array,
      default: () => ['renovate', 'add'],
    },
  },
  emits: ['add', 'renovate'],
  setup(props, { emit }) {
    const componentsMap = {
      renovate: renovateBut,
      add: addBut,
    };

    function addBut() {
      return (
        <a-button onClick={add} type='primary'>
          新增
        </a-button>
      );
    }
    function renovateBut() {
      return <a-button onClick={renovate}>刷新</a-button>;
    }

    function add() {
      emit('add');
    }
    function renovate() {
      emit('renovate');
    }
    return () => (
      <div class='table-buttons'>
        <a-space>
          {props.but.map((item) => {
            if (isVNode(item)) {
              return item;
            } else {
              if (!componentsMap[item]) {
                console.error(
                  `${item}在componentsMap映射中不存在请到TableButtons组件中维护`,
                );
                return null;
              } else {
                return componentsMap[item]();
              }
            }
          })}
        </a-space>
      </div>
    );
  },
};
</script>

<style scoped>
.table-buttons {
  margin: 8px 0;
  padding: 0 12px;
}
</style>
