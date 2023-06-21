/**
 * 菜单数组=>平摊数组
 *
 * @param {Array} menuList
 */
function treeToListDeep(menuList) {
  // 返回数据
  const result = [];
  // 收集path，标记层级
  const allPath = [];
  // 当前层级
  let level = 0;
  // 递归函数
  loop(menuList);
  function loop(list) {
    list.forEach((item) => {
      level++;
      allPath[level - 1] = item.path;
      if (item.children) {
        loop(item.children);
      } else {
        result.push({ ...item, allPath: allPath.slice(0, level) });
      }
      level--;
    });
  }
  return result;
}

export { treeToListDeep };
