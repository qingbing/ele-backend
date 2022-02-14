<script>
import { merge, copy } from "@qingbing/helper";
import ReqHeader from "@/api/configure/header";
import Router from "@/utils/router-helper";
import JsonOption from "./../json/tableHeader-index";
import EListTable from "@/extends/list-table.vue";

// 导入包
export default {
  extends: EListTable,
  components: {
    // 在自组件需要使用的组件，全部小写
    operate: () => import("@/components/operate"),
  },
  created() {},
  data() {
    const defaultEntity = {
      key: "",
      name: "",
      is_open: 0,
      sort_order: "127",
      description: "",
    };
    return {
      query: {
        searchItems: JsonOption.searchItems,
        searchFields: {
          key: "",
          name: "",
          is_open: "",
        },
      },
      addDialog: {
        defaultEntity: copy(defaultEntity),
        viewFields: ["key", "name", "description", "sort_order", "is_open"],
      },
      dialogs: {
        view: {
          formRef: "view-dialog-form",
          title: "查看表头类型", // dialog 标题
          visible: false, // 是否打开 dialog
          entity: {}, // 当前操作实体
          rules: {}, // 规则，这个定义为数组，不用赋值
          items: {}, // 项目
          viewFields: [], // 需要展示的项目
          // 强制 view
          textFields: ["key", "name", "description", "sort_order", "is_open"],
          buttons: ["cancel"],
        },
        edit: {
          formRef: "edit-dialog-form",
          title: "修改表头类型", // dialog 标题
          visible: false, // 是否打开 dialog
          entity: {}, // 当前操作实体
          rules: {}, // 规则，这个定义为数组，不用赋值
          items: {}, // 项目
          viewFields: [], // 需要展示的项目
          textFields: [], // 强制 view
          buttons: ["submit", "cancel"], // 默认展示按钮
          handleSubmit: this.handleEdit,
        },
      },
    };
  },
  methods: {
    // covered-level(must) 获取表头
    getHeaders(callback) {
      // 表头item
      const headers = JsonOption.tableHeaders;
      // 操作
      headers.operate.params = {
        buttons: [
          { operType: "view", handle: this.buttonView },
          { operType: "edit", handle: this.buttonEdit },
          { operType: "delete", handle: this.handleDelete },
          { label: "子选项", handle: this.buttonOptions },
        ],
      };
      callback(headers);

      // 表单选项
      const items = JsonOption.formOptions;
      this.addDialog.items = copy(items);
      this.dialogs.edit.items = copy(items);
      this.dialogs.view.items = copy(items);
    },
    // covered-level(must) 获取表格数据
    getData(callback) {
      ReqHeader.headerList(merge(this.query.searchFields, this.pagination))
        .then((res) => callback(res.data))
        .catch(() => {});
    },
    // covered-level(can): 新增保存
    handleAdd(successCb, failureCb) {
      this.save(
        ReqHeader.headerAdd(this.addDialog.entity),
        successCb,
        failureCb
      );
    },
    /**
     * list-operate
     */
    // table-list 查看按钮
    buttonView(entity) {
      // 设置 viewDialog 表单数据
      this.dialogs.view.entity = copy(entity);
      // 打开 dialog
      this.openDialog(this.dialogs.view);
    },
    // table-list 编辑按钮
    buttonEdit(entity) {
      // 设置 viewDialog 表单数据
      this.dialogs.edit.entity = copy(entity);
      this.openDialog(this.dialogs.edit);
    },
    // 子选项按钮
    buttonOptions(entity) {
      Router.open(this, `/table-header/options/${entity.key}`, true);
    },
    // list-dialog 编辑执行
    handleEdit(successCb, failureCb) {
      this.save(
        ReqHeader.headerEdit(this.dialogs.edit.entity),
        successCb,
        failureCb
      );
    },
    // table-list 删除执行
    handleDelete(entity, successCb, failureCb) {
      this.operateChangeList(ReqHeader.headerDel(entity), successCb, failureCb);
    },
  },
};
</script>
