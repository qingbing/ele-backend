<script>
import { isEmpty, merge, copy } from "@qingbing/helper";
import ReqForm from "@/api/configure/form";
import Router from "@/utils/router-helper";
import JsonOption from "./../json/form-options";
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
    this.init(this.$route.params.key);
    const defaultEntity = {
      id: "",
      key: this.$route.params.key,
      field: "",
      label: "",
      input_type: "",
      is_enable: 1,
      is_required: 0,
      required_msg: "",
      sort_order: "127",
      default: "",
      description: "",
      rules: "",
      exts: "",
      created_at: "",
      updated_at: "",
    };
    return {
      pagination: undefined, // 取消分页
      query: {
        buttons: [
          {
            label: this.getAddButtonText(),
            type: "warning",
            callback: this.buttonAdd,
          },
          {
            label: "刷新排序",
            type: "primary",
            callback: this.handleRefresh,
          },
          {
            label: "开启编辑",
            type: "primary",
            callback: this.switchEdit,
          },
          {
            label: "关闭页面",
            type: "danger",
            callback: this.buttonCloseWindow,
          },
        ],
      },
      addDialog: {
        defaultEntity: copy(defaultEntity),
        viewFields: [
          "key",
          "field",
          "label",
          "input_type",
          "is_enable",
          "is_required",
          "required_msg",
          "sort_order",
          "default",
          "description",
          "rules",
          "exts",
        ],
      },
      dialogs: {
        view: {
          formRef: "view-dialog-form",
          title: "查看表单选项", // dialog 标题
          visible: false, // 是否打开 dialog
          entity: {}, // 当前操作实体
          rules: {}, // 规则，这个定义为数组，不用赋值
          items: {}, // 项目
          viewFields: [], // 需要展示的项目
          // 强制 view
          textFields: [
            "field",
            "label",
            "input_type",
            "is_enable",
            "is_required",
            "required_msg",
            "sort_order",
            "default",
            "description",
            "rules",
            "exts",
          ],
          buttons: ["cancel"],
        },
        edit: {
          formRef: "edit-dialog-form",
          title: "修改表单选项", // dialog 标题
          visible: false, // 是否打开 dialog
          entity: {}, // 当前操作实体
          rules: {}, // 规则，这个定义为数组，不用赋值
          items: {}, // 项目
          viewFields: [
            "field",
            "label",
            "input_type",
            "is_enable",
            "is_required",
            "required_msg",
            "sort_order",
            "default",
            "description",
            "rules",
            "exts",
          ], // 需要展示的项目
          textFields: ["field", "input_type"], // 强制 view
          buttons: ["submit", "cancel"], // 默认展示按钮
          handleSubmit: this.handleEdit,
        },
      },
    };
  },
  methods: {
    init(key) {
      if (isEmpty(key)) {
        Router.error404(this);
        return;
      }
      // 获取表单详情
      ReqForm.formView({ key: key })
        .then((res) => {
          this.form = res.data;
          this.pageTitle = `表单选项【${this.form.key}(${this.form.name})】`;
        })
        .catch(() => Router.error404(this));
    },
    // covered-level(can): 添加按钮文字
    getAddButtonText() {
      return "添加选项";
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
          { label: "上移", handle: this.handleUp },
          { label: "下移", handle: this.handleDown },
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
      ReqForm.formOptionList({ key: this.$route.params.key })
        .then((res) => callback(res.data))
        .catch(() => {});
    },
    // 关闭页面
    buttonCloseWindow() {
      Router.closeWin();
    },
    // covered-level(can): 新增保存
    handleAdd(successCb, failureCb) {
      this.save(
        ReqForm.formOptionAdd(this.addDialog.entity),
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
    handleRefresh() {
      ReqForm.formOptionRefresh({ key: this.form.key })
        .then(() => {
          // 刷新表格
          this.reloadTable();
        })
        .catch((err) => err);
    },
    // covered-level(can): 保存单元格
    handleCellSave(callback, change, properties, params) {
      this.cellSave(
        ReqForm.formOptionEdit(
          merge(change, { key: this.form.key, id: properties.id })
        ),
        callback
      );
    },
    // list-dialog 编辑执行
    handleEdit(successCb, failureCb) {
      this.save(
        ReqForm.formOptionEdit(this.dialogs.edit.entity),
        successCb,
        failureCb
      );
    },
    // table-list 删除执行
    handleDelete(entity, successCb, failureCb) {
      this.operateChangeList(
        ReqForm.formOptionDel(entity),
        successCb,
        failureCb
      );
    },
    // table-list 顺序上移
    handleUp(entity, successCb, failureCb) {
      this.operateChangeList(
        ReqForm.formOptionUp({ key: this.form.key, id: entity.id }),
        successCb,
        failureCb
      );
    },
    // table-list 顺序下移
    handleDown(entity, successCb, failureCb) {
      this.operateChangeList(
        ReqForm.formOptionDown({ key: this.form.key, id: entity.id }),
        successCb,
        failureCb
      );
    },
  },
  watch: {
    $route: function (to, from) {
      if (to.params.key != from.params.key) {
        this.init(to.params.key); // 重新初始化数据
        this.reloadTable();
      }
    },
  },
};
</script>
