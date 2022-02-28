<script>
import { merge, copy } from "@qingbing/helper";
import Cache from "@/utils/cache";
import EListTable from "@/extends/list-table.vue";
import JsonOption from "./../json/replace";
import { getHeaderOptions, getFormOptions } from "@/api/configure/public";
import ReqReplaceSetting from "@/api/configure/replace-setting";

// 导入包
export default {
  extends: EListTable,
  components: {
    // 在自组件需要使用的组件，全部小写
    operate: () => import("@/components/operate"),
  },
  created() {},
  data() {
    let isSuper = !!this.$store.getters.userInfo.is_super;
    const defaultEntity = {
      code: "",
      name: "",
      description: "",
      template: "",
      content: "",
      sort_order: "1",
      is_open: "0",
      replace_fields: "",
    };
    const buttons = [
      {
        label: "查询",
        type: "primary",
        callback: this.buttonQuery,
      },
      "reset",
    ];
    const searchItems = JsonOption.searchItems;
    const searchFields = {
      code: "",
      name: "",
      is_open: "",
    };
    let viewDialogButtons = {
      code: "code",
      name: "name",
      is_open: "is_open",
      sort_order: "sort_order",
      description: "description",
      template: "template",
      content: "content",
      replace_fields: "replace_fields",
    };
    if (isSuper) {
      // 超管有添加按钮
      buttons.push({
        label: this.getAddButtonText(),
        type: "warning",
        callback: this.buttonAdd,
      });
    } else {
      delete searchItems.is_open;
      delete searchFields.is_open;
      delete viewDialogButtons.code;
      delete viewDialogButtons.is_open;
      delete viewDialogButtons.sort_order;
      delete viewDialogButtons.template;
    }
    viewDialogButtons = Object.values(viewDialogButtons);
    return {
      data: {
        isSuper,
      },
      query: {
        searchItems,
        searchFields,
        buttons,
      },
      addDialog: {
        defaultEntity: copy(defaultEntity),
        viewFields: [
          "code",
          "name",
          "is_open",
          "sort_order",
          "description",
          "template",
          "replace_fields",
        ],
      },
      dialogs: {
        view: {
          formRef: "view-dialog-form",
          title: "查看模版详情", // dialog 标题
          visible: false, // 是否打开 dialog
          entity: {}, // 当前操作实体
          rules: {}, // 规则，这个定义为数组，不用赋值
          items: {}, // 项目
          viewFields: viewDialogButtons, // 需要展示的项目
          // 强制 view
          textFields: [
            "code",
            "name",
            "is_open",
            "sort_order",
            "description",
            "template",
            "content",
            "replace_fields",
          ],
          buttons: ["cancel"],
        },
        edit: {
          formRef: "edit-dialog-form",
          title: "编辑模版信息", // dialog 标题
          visible: false, // 是否打开 dialog
          entity: {}, // 当前操作实体
          rules: {}, // 规则，这个定义为数组，不用赋值
          items: {}, // 项目
          viewFields: viewDialogButtons, // 需要展示的项目
          // 强制 view
          textFields: [],
          buttons: ["submit", "cancel"], // 默认展示按钮
          handleSubmit: this.handleEdit,
        },
        contentEdit: {
          formRef: "edit-content-dialog-form",
          title: "编辑模版内容", // dialog 标题
          visible: false, // 是否打开 dialog
          entity: {}, // 当前操作实体
          rules: {}, // 规则，这个定义为数组，不用赋值
          items: {}, // 项目
          viewFields: ["name", "description", "content", "replace_fields"], // 需要展示的项目
          // 强制 view
          textFields: ["name", "description", "replace_fields"],
          buttons: ["submit", "cancel"], // 默认展示按钮
          handleSubmit: this.handleContentEdit,
        },
      },
    };
  },
  methods: {
    // covered-level(can): 添加按钮文字
    getAddButtonText() {
      return "添加模版";
    },
    // covered-level(must) 获取表头
    async getHeaders(callback) {
      const pageKey = "backend-replace-setting";
      const res = await Cache.get(
        Cache.getPageStaticDataKey(pageKey),
        () => {
          return {
            tableHeaders: getHeaderOptions(pageKey),
            formOptions: getFormOptions(pageKey),
          };
        },
        7200
      );
      // 表头item
      const headers = res.tableHeaders;
      // 操作
      const listButtons = [{ operType: "view", handle: this.buttonView }];
      if (this.isSuper) {
        // 超管展示编辑
        listButtons.push({ operType: "edit", handle: this.buttonEdit });
      } else {
        // 非超管不展示 code、is_open
        delete headers.code;
        delete headers.is_open;
      }
      listButtons.push({
        label: "设置模版",
        type: "warning",
        handle: this.buttonContentEdit,
      });
      listButtons.push({
        label: "恢复模板",
        type: "danger",
        handle: this.handleSetDefault,
      });
      headers.operate.params = {
        buttons: listButtons,
      };
      callback(headers);
      // 表单选项
      const items = res.formOptions;
      this.addDialog.items = copy(items);
      this.dialogs.view.items = copy(items);
      this.dialogs.edit.items = copy(items);
      this.dialogs.contentEdit.items = copy(items);
    },
    // covered-level(must) 获取表格数据
    getData(callback) {
      ReqReplaceSetting.list(merge(this.query.searchFields, this.pagination))
        .then((res) => callback(res.data))
        .catch(() => {});
    },
    // covered-level(can): 新增保存
    handleAdd(successCb, failureCb) {
      this.save(
        ReqReplaceSetting.add(this.addDialog.entity),
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
    // table-list 编辑内容按钮
    buttonContentEdit(entity) {
      // 设置 viewDialog 表单数据
      this.dialogs.contentEdit.entity = copy(entity);
      this.openDialog(this.dialogs.contentEdit);
    },
    // list-dialog 编辑执行
    handleEdit(successCb, failureCb) {
      this.save(
        ReqReplaceSetting.edit(this.dialogs.edit.entity),
        successCb,
        failureCb
      );
    },
    // list-dialog 编辑内容执行
    handleContentEdit(successCb, failureCb) {
      this.save(
        ReqReplaceSetting.saveContent(this.dialogs.contentEdit.entity),
        successCb,
        failureCb
      );
    },
    // table-list 恢复默认模版
    handleSetDefault(entity, successCb, failureCb) {
      this.operateChangeList(
        ReqReplaceSetting.setDefault(entity),
        successCb,
        failureCb
      );
    },
  },
};
</script>
