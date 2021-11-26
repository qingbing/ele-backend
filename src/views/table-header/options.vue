<script>
// 导入包
import EListTable from "@/extends/list-table.vue";
import { isEmpty, merge, copy } from "@qingbing/helper";
import { getHeaderOptions } from "@/api/public";
import Router from "@/utils/router-helper";
import ReqHeader from "@/api/header";
import items from "./../json/header";

// 导入包
export default {
  extends: EListTable,
  components: {
    // 在自组件需要使用的组件，全部小写
    operate: () => import("@/components/operate"),
  },
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
      header: {},
      headerOptions: [],
      pagination: undefined, // 取消分页
      tableEditConfig: {
        editable: true,
        saveHandle: this.cellSave,
      },
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
            callback: this.buttonRefresh,
          },
          {
            label: "关闭页面",
            type: "danger",
            callback: this.buttonCloseWindow,
          },
        ],
      },
      addDailog: {
        title: "添加表头选项",
        visible: false,
        entity: {},
        rules: {},
        items: items.headerOptions,
        viewFields: [
          "field",
          "label",
          "sort_order",
          "width",
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
        textFields: [],
        buttons: ["submit", "cancel"],
        defaultEntity: copy(defaultEntity),
      },
      editDailog: {
        title: "编辑表头选项",
        visible: false,
        entity: {},
        rules: {},
        items: items.headerOptions,
        viewFields: [
          "field",
          "label",
          "sort_order",
          "width",
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
        textFields: ["field"],
        buttons: ["submit", "cancel"],
        defaultEntity: copy(defaultEntity),
      },
      viewDailog: {
        title: "查看表头选项",
        visible: false,
        entity: {},
        rules: {},
        items: items.headerOptions,
        viewFields: [],
        textFields: [],
        buttons: ["cancel"],
        defaultEntity: copy(defaultEntity),
      },
    };
  },
  methods: {
    // 添加按钮文字
    getAddButtonText() {
      return "添加表头选项";
    },
    init(headerKey) {
      if (isEmpty(headerKey)) {
        Router.error404(this);
        return;
      }
      // 获取表头详情
      ReqHeader.headerView({ key: headerKey })
        .then((res) => {
          this.header = res.data;
          this.pageTitle = `表头选项【${this.header.key}(${this.header.name})】`;
        })
        .catch(() => Router.error404(this));
    },
    getHeaders(cb) {
      getHeaderOptions("program-header-options")
        .then((res) => {
          const headers = res.data;
          headers.operate.params = {
            buttons: [
              { operType: "view", handle: this.buttonView },
              { operType: "edit", handle: this.buttonEdit },
              { operType: "delete", handle: this.handleDelete },
              { label: "上移", handle: this.handleUp },
              { label: "下移", handle: this.handleDown },
            ],
          };
          cb(headers);
        })
        .catch(() => {});
    },
    getData(cb) {
      ReqHeader.headerOptionList({ key: this.$route.params.key })
        .then((res) => cb(res.data))
        .catch(() => {});
    },
    buttonRefresh() {
      ReqHeader.headerOptionRefresh({ key: this.header.key })
        .then(() => {
          // 刷新表格
          this.reloadTable();
        })
        .catch((err) => err);
    },
    buttonCloseWindow() {
      Router.closeWin();
    },
    buttonAdd() {
      // 设置 addDailog 表单数据
      this.addDailog.entity = copy(this.addDailog.defaultEntity);
      this.addDailog.title = `添加表头${this.header.name}选项`;
      // 打开 dailog
      this.openDialog("addDailog");
    },
    buttonEdit(entity) {
      // 设置 editDailog 表单数据
      this.editDailog.entity = copy(entity);
      this.editDailog.title = `编辑表头${this.header.name}选项`;
      // 打开 dailog
      this.openDialog("editDailog");
    },
    buttonView(entity) {
      // 设置 viewDailog 表单数据
      this.viewDailog.entity = copy(entity);
      // 打开 dailog
      this.openDialog("viewDailog");
    },
    // 表格编辑的保存
    cellSave(cb, change, properties) {
      ReqHeader.headerOptionEdit(
        merge(change, { id: properties.id, key: this.header.key })
      )
        .then(() => {
          cb(true);
          this.reloadTable();
        })
        .catch(() => cb(false));
    },
    // 保存数据,回调函数终止提交标记
    handleAdd(successCb, failureCb) {
      const promise = ReqHeader.headerOptionAdd(this.addDailog.entity);
      this.addOrEditSave(promise, successCb, failureCb);
    },
    // 保存数据,回调函数终止提交标记
    handleEdit(successCb, failureCb) {
      const promise = ReqHeader.headerOptionEdit(this.editDailog.entity);
      this.addOrEditSave(promise, successCb, failureCb);
    },
    handleDelete(entity, successCb, failureCb) {
      ReqHeader.headerOptionDel({ id: entity.id })
        .then((res) => {
          successCb(res.message);
          // 刷新列表
          this.reloadTable();
        })
        .catch((res) => failureCb(res));
    },
    // 顺序上移
    handleUp(entity, successCb, failureCb) {
      ReqHeader.headerOptionUp({ id: entity.id })
        .then((res) => {
          successCb(res.message);
          // 刷新列表
          this.reloadTable();
        })
        .catch((res) => failureCb(res));
    },
    // 顺序下移
    handleDown(entity, successCb, failureCb) {
      ReqHeader.headerOptionDown({ id: entity.id })
        .then((res) => {
          successCb(res.message);
          // 刷新列表
          this.reloadTable();
        })
        .catch((res) => failureCb(res));
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
