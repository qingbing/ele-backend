<script>
import { isEmpty, merge, copy } from "@qingbing/helper";
import ReqHeader from "@/api/configure/table-header";
import Router from "@/utils/router-helper";
import JsonOption from "./../json/tableHeader-options";
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
      width: "",
      fixed: "",
      default: "",
      align: "",
      is_tooltip: 0,
      is_resizable: 0,
      component: "",
      options: "",
      params: "",
      description: "",
      sort_order: "127",
      is_required: 0,
      is_default: 0,
      is_enable: 1,
      operate_ip: "",
      operate_uid: "",
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
          "field",
          "label",
          "width",
          "sort_order",
          "fixed",
          "default",
          "is_required",
          "is_default",
          "is_enable",
          "align",
          "is_tooltip",
          "is_resizable",
          "is_editable",
          "description",
          "component",
          "options",
          "params",
        ],
      },
      dialogs: {
        view: {
          formRef: "view-dialog-form",
          title: "查看表头选项", // dialog 标题
          visible: false, // 是否打开 dialog
          entity: {}, // 当前操作实体
          rules: {}, // 规则，这个定义为数组，不用赋值
          items: {}, // 项目
          viewFields: [], // 需要展示的项目
          // 强制 view
          textFields: [
            "field",
            "label",
            "width",
            "sort_order",
            "fixed",
            "default",
            "is_required",
            "is_default",
            "is_enable",
            "align",
            "is_tooltip",
            "is_resizable",
            "is_editable",
            "description",
            "component",
            "options",
            "params",
          ],
          buttons: ["cancel"],
        },
        edit: {
          formRef: "edit-dialog-form",
          title: "修改表头选项", // dialog 标题
          visible: false, // 是否打开 dialog
          entity: {}, // 当前操作实体
          rules: {}, // 规则，这个定义为数组，不用赋值
          items: {}, // 项目
          viewFields: [
            "field",
            "label",
            "width",
            "sort_order",
            "fixed",
            "default",
            "is_required",
            "is_default",
            "is_enable",
            "align",
            "is_tooltip",
            "is_resizable",
            "is_editable",
            "description",
            "component",
            "options",
            "params",
          ], // 需要展示的项目
          textFields: ["field"], // 强制 view
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
      // 获取表头详情
      ReqHeader.headerView({ key: key })
        .then((res) => {
          this.header = res.data;
          this.pageTitle = `表头选项【${this.header.key}(${this.header.name})】`;
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
      ReqHeader.headerOptionList({ key: this.$route.params.key })
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
        ReqHeader.headerOptionAdd(this.addDialog.entity),
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
      ReqHeader.headerOptionRefresh({ key: this.header.key })
        .then(() => {
          // 刷新表格
          this.reloadTable();
        })
        .catch((err) => err);
    },
    // covered-level(can): 保存单元格
    handleCellSave(callback, change, properties, params) {
      this.cellSave(
        ReqHeader.headerOptionEdit(
          merge(change, { key: this.header.key, id: properties.id })
        ),
        callback
      );
    },
    // list-dialog 编辑执行
    handleEdit(successCb, failureCb) {
      this.save(
        ReqHeader.headerOptionEdit(this.dialogs.edit.entity),
        successCb,
        failureCb
      );
    },
    // table-list 删除执行
    handleDelete(entity, successCb, failureCb) {
      this.operateChangeList(
        ReqHeader.headerOptionDel(entity),
        successCb,
        failureCb
      );
    },
    // table-list 顺序上移
    handleUp(entity, successCb, failureCb) {
      this.operateChangeList(
        ReqHeader.headerOptionUp({ key: this.header.key, id: entity.id }),
        successCb,
        failureCb
      );
    },
    // table-list 顺序下移
    handleDown(entity, successCb, failureCb) {
      this.operateChangeList(
        ReqHeader.headerOptionDown({ key: this.header.key, id: entity.id }),
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
