<script>
import { merge, copy } from "@qingbing/helper";
import Cache from "@/utils/cache";
import EListTable from "@/extends/list-table.vue";
import JsonOption from "./../json/permission-interfaces";
import { getHeaderOptions, getFormOptions } from "@/api/configure/public";
import ReqPermission from "@/api/portal/permission";

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
      id: "",
      code: "",
      path: "",
      remark: "",
      sort_order: "127",
      is_public: "0",
      is_enable: "1",
      exts: "",
      operate_ip: "",
      operate_uid: "",
      created_at: "",
      updated_at: "",
    };
    return {
      query: {
        searchItems: JsonOption.searchItems,
        searchFields: {
          path: "",
          name: "",
          is_public: "",
          is_enable: "",
        },
      },
      addDialog: {
        defaultEntity: copy(defaultEntity),
        viewFields: [
          "path",
          "remark",
          "sort_order",
          "is_enable",
          "is_public",
          "exts",
        ],
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
          textFields: [
            "path",
            "remark",
            "sort_order",
            "is_enable",
            "is_public",
            "exts",
          ],
          buttons: ["cancel"],
        },
        edit: {
          formRef: "edit-dialog-form",
          title: "修改表头类型", // dialog 标题
          visible: false, // 是否打开 dialog
          entity: {}, // 当前操作实体
          rules: {}, // 规则，这个定义为数组，不用赋值
          items: {}, // 项目
          viewFields: [
            "path",
            "remark",
            "sort_order",
            "is_enable",
            "is_public",
            "exts",
          ], // 需要展示的项目
          textFields: ["path"], // 强制 view
          buttons: ["submit", "cancel"], // 默认展示按钮
          handleSubmit: this.handleEdit,
        },
      },
    };
  },
  methods: {
    // covered-level(must) 获取表头
    async getHeaders(callback) {
      const pageKey = "backend-permission-api-path";
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
      headers.operate.params = {
        buttons: [
          { operType: "view", handle: this.buttonView },
          { operType: "edit", handle: this.buttonEdit },
        ],
      };
      callback(headers);
      // 表单选项
      const items = res.formOptions;
      this.addDialog.items = copy(items);
      this.dialogs.view.items = copy(items);
      this.dialogs.edit.items = copy(items);
    },
    // covered-level(must) 获取表格数据
    getData(callback) {
      ReqPermission.apiList(merge(this.query.searchFields, this.pagination))
        .then((res) => callback(res.data))
        .catch(() => {});
    },
    // covered-level(can): 新增保存
    handleAdd(successCb, failureCb) {
      this.save(
        ReqPermission.apiAdd(this.addDialog.entity),
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
    // list-dialog 编辑执行
    handleEdit(successCb, failureCb) {
      this.save(
        ReqPermission.apiEdit(this.dialogs.edit.entity),
        successCb,
        failureCb
      );
    },
    // table-list 删除执行
    handleDelete(entity, successCb, failureCb) {
      this.operateChangeList(
        ReqPermission.apiDel(entity),
        successCb,
        failureCb
      );
    },
  },
};
</script>
