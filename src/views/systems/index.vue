<script>
import { merge, copy } from "@qingbing/helper";
import ReqSystem from "@/api/portal/systems";
import EListTable from "@/extends/list-table.vue";
import JsonOption from "./../json/systems";

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
      code: "",
      name: "",
      uri_prefix: "",
      type: "",
      rule: "",
      ext: {},
      description: "",
      sort_order: "",
      is_enable: 1,
      is_allow_new_interface: 1,
      is_record_field: 1,
      is_open_access_log: 1,
      is_open_validate: 0,
      is_strict_validate: 0,
    };
    return {
      query: {
        searchItems: JsonOption.searchItems,
        searchFields: {
          code: "",
          name: "",
          type: "",
          is_enable: "",
          is_allow_new_interface: "",
          is_record_field: "",
          is_open_validate: "",
          is_strict_validate: "",
        },
        buttons: [
          {
            label: "查询",
            type: "primary",
            callback: this.buttonQuery,
          },
          "reset",
          {
            label: "开启编辑",
            type: "primary",
            callback: this.switchEdit,
          },
          {
            label: this.getAddButtonText(),
            type: "warning",
            callback: this.buttonAdd,
          },
        ],
      },
      addDialog: {
        defaultEntity: copy(defaultEntity),
        viewFields: [
          "code",
          "name",
          "type",
          "proxy_id",
          "sort_order",
          "uri_prefix",
          "is_enable",
          "is_allow_new_interface",
          "is_record_field",
          "is_open_validate",
          "is_strict_validate",
          "description",
          "ext",
        ],
      },
      dialogs: {
        view: {
          formRef: "view-dialog-form",
          title: "查看系统", // dialog 标题
          visible: false, // 是否打开 dialog
          entity: {}, // 当前操作实体
          rules: {}, // 规则，这个定义为数组，不用赋值
          items: {}, // 项目
          viewFields: [], // 需要展示的项目
          // 强制 view
          textFields: [
            "code",
            "name",
            "type",
            "proxy_id",
            "sort_order",
            "uri_prefix",
            "is_enable",
            "is_allow_new_interface",
            "is_record_field",
            "is_open_validate",
            "is_strict_validate",
            "description",
            "ext",
          ],
          buttons: ["cancel"],
        },
        edit: {
          formRef: "edit-dialog-form",
          title: "编辑系统", // dialog 标题
          visible: false, // 是否打开 dialog
          entity: {}, // 当前操作实体
          rules: {}, // 规则，这个定义为数组，不用赋值
          items: {}, // 项目
          viewFields: [], // 需要展示的项目
          // 强制 view
          textFields: ["code", "type", "proxy_id"],
          buttons: ["submit", "cancel"], // 默认展示按钮
          handleSubmit: this.handleEdit,
        },
      },
    };
  },
  methods: {
    // covered-level(can): 添加按钮文字
    getAddButtonText() {
      return "添加系统";
    },
    // 切换编辑表格按钮
    switchEdit() {
      if (this.tableEditConfig.editable) {
        this.query.buttons[2].label = "开启编辑";
        this.query.buttons[2].type = "primary";
        this.tableEditConfig.editable = false;
      } else {
        this.query.buttons[2].label = "关闭编辑";
        this.query.buttons[2].type = "danger";
        this.tableEditConfig.editable = true;
      }
    },
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
        ],
      };
      callback(headers);

      // 表单选项
      const items = JsonOption.formOptions;
      this.addDialog.items = copy(items);
      this.dialogs.edit.items = copy(items);
      this.dialogs.view.items = copy(items);

      // 获取item，系统
      // const promise = {
      //   options: getFormOptions("admin-system-manage"),
      //   headers: getHeaderOptions("admin-system-manage"),
      // };
      // asyncAll(promise, (res) => {
      //   const headers = res.headers;
      //   // 列表操作
      //   headers.operate.params = {
      //     buttons: [
      //       { operType: "view", handle: this.buttonView },
      //       { operType: "edit", handle: this.buttonEdit },
      //       { operType: "delete", handle: this.handleDelete },
      //     ],
      //   };
      //   callback(headers);
      //   // 表单选项
      //   const items = res.options;
      //   this.addDialog.items = copy(items);
      //   this.dialogs.edit.items = copy(items);
      //   this.dialogs.view.items = copy(items);
      // });
    },
    // covered-level(must) 获取表格数据
    getData(callback) {
      ReqSystem.systemList(merge(this.query.searchFields, this.pagination))
        .then((res) => callback(res.data))
        .catch(() => {});
    },
    // covered-level(can): 新增保存
    handleAdd(successCb, failureCb) {
      this.save(
        ReqSystem.systemAdd(this.addDialog.entity),
        successCb,
        failureCb
      );
    },
    // covered-level(can): 保存单元格
    handleCellSave(callback, change, properties, params) {
      this.cellSave(
        ReqSystem.systemEdit(merge(change, { id: properties.id })),
        callback
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
    // list-dialog 编辑执行
    handleEdit(successCb, failureCb) {
      this.save(
        ReqSystem.systemEdit(this.dialogs.edit.entity),
        successCb,
        failureCb
      );
    },
    // table-list 删除执行
    handleDelete(entity, successCb, failureCb) {
      this.operateChangeList(ReqSystem.systemDel(entity), successCb, failureCb);
    },
  },
};
</script>
