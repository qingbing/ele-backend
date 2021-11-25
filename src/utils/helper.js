import { dump } from "@qingbing/helper";

// 刷新 table 表格，需要表格上指定 ref
function reloadTable($vm, ref) {
  if ($vm.$refs[ref]) {
    $vm.$refs[ref].refreshTable();
  } else {
    dump.error(`不存在的表${ref}`);
  }
}

// 导出
export default {
  // 刷新 table 表格，需要表格上指定 ref
  reloadTable,
};
