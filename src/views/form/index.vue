<script>
import { merge, copy } from "@qingbing/helper";
import EListTable from "@/extends/list-table.vue";
import Router from "@/utils/router-helper";
import JsonOption from "./../json/form-index";
import ReqForm from "@/api/configure/form";

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
      is_open: 1,
      is_setting: "0",
      sort_order: "127",
      description: "",
    };
    return {
      query: {
        searchItems: JsonOption.searchItems,
        searchFields: {
          key: "",
          name: "",
          is_setting: "",
          is_open: "",
        },
      },
      addDialog: {
        defaultEntity: copy(defaultEntity),
        viewFields: [
          "key",
          "name",
          "is_setting",
          "is_open",
          "sort_order",
          "description",
        ],
      },
      dialogs: {
        view: {
          formRef: "view-dialog-form",
          title: "查看表单类型", // dialog 标题
          visible: false, // 是否打开 dialog
          entity: {}, // 当前操作实体
          rules: {}, // 规则，这个定义为数组，不用赋值
          items: {}, // 项目
          viewFields: [], // 需要展示的项目
          // 强制 view
          textFields: [
            "key",
            "name",
            "is_setting",
            "is_open",
            "sort_order",
            "description",
          ],
          buttons: ["cancel"],
        },
        edit: {
          formRef: "edit-dialog-form",
          title: "修改表单类型", // dialog 标题
          visible: false, // 是否打开 dialog
          entity: {}, // 当前操作实体
          rules: {}, // 规则，这个定义为数组，不用赋值
          items: {}, // 项目
          viewFields: [], // 需要展示的项目
          textFields: ["key", "is_setting"], // 强制 view
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
          {
            label: "配置表单",
            handle: this.buttonSetting,
            showProperty: "is_setting",
            showValue: 1,
          },
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
      ReqForm.formList(merge(this.query.searchFields, this.pagination))
        .then((res) => callback(res.data))
        .catch(() => {});
    },
    // covered-level(can): 新增保存
    handleAdd(successCb, failureCb) {
      this.save(ReqForm.formAdd(this.addDialog.entity), successCb, failureCb);
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
    // table-list 子选项按钮
    buttonOptions(entity) {
      Router.open(this, `/form/options/${entity.key}`, true);
    },
    // table-list 配置表单按钮
    buttonSetting(entity) {
      Router.open(this, `/form/setting/${entity.key}`, true);
    },
    // list-dialog 编辑执行
    handleEdit(successCb, failureCb) {
      this.save(
        ReqForm.formEdit(this.dialogs.edit.entity),
        successCb,
        failureCb
      );
    },
    // table-list 删除执行
    handleDelete(entity, successCb, failureCb) {
      this.operateChangeList(ReqForm.formDel(entity), successCb, failureCb);
    },
  },
};
</script>
