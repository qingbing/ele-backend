<template>
  <div class="block">
    <!-- query-from -->
    <el-form
      class="query-form"
      :inline="true"
      :model="query.searchFields"
      :ref="query.formRef"
    >
      <c-query-form
        :query="query.searchFields"
        :items="query.searchItems"
      ></c-query-form>
      <el-form-item>
        <c-buttons
          :refForm="query.formRef"
          :buttons="query.buttons"
        ></c-buttons>
      </el-form-item>
    </el-form>
    <!-- list-table -->
    <c-table
      ref="pageTable"
      :getHeaders="getHeaders"
      :getTableData="getData"
      :pagination="pagination"
    ></c-table>

    <!-- other-dialog -->
    <el-dialog
      v-for="(dialogData, key) in dialogs"
      width="600px"
      :key="key"
      :title="dialogData.title"
      :visible.sync="dialogData.visible"
      append-to-body
    >
      <el-form
        label-width="100px"
        label-position="right"
        style="width: 500px"
        :rules="dialogData.rules"
        :model="dialogData.entity"
        :ref="dialogData.formRef ? dialogData.formRef : key"
      >
        <element-form
          :formData="dialogData.entity"
          :items="dialogData.items"
          :rules="dialogData.rules"
          :viewFields="dialogData.viewFields"
          :textFields="dialogData.textFields"
        ></element-form>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- dialog 操作按钮 -->
        <c-buttons
          :refForm="dialogData.formRef ? dialogData.formRef : key"
          :buttons="dialogData.buttons"
          :submitCallback="dialogData.handleSubmit"
          :cancelCallback="handleCancel"
        ></c-buttons>
      </div>
    </el-dialog>
    <!-- dialog for tree -->
    <!-- <el-dialog
      width="960px"
      :close-on-click-modal="transferDialog.modalClose"
      :title="transferDialog.title"
      :visible.sync="transferDialog.visible"
      append-to-body
    >
      <el-form
        width="960px"
        :model="transferDialog.entity"
        :ref="transferDialog.formRef"
      >
        <el-transfer
          v-model="transferDialog.codes"
          filterable
          :data="transferDialog.list"
          :filter-method="handleFilterNode"
          :filter-placeholder="transferDialog.placeholder"
        >
        </el-transfer>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <c-buttons
          :refForm="transferDialog.formRef"
          :buttons="transferDialog.buttons"
          :submitCallback="transferDialog.handleSubmit"
          :cancelCallback="handleCancel"
        ></c-buttons>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import { merge, copy } from "@qingbing/helper";
import EBase from "@/extends/base.vue";
import Helper from "@/utils/helper";
import Cache from "@/utils/cache";
import JsonOption from "./../json/permission-role";
import { getHeaderOptions, getFormOptions } from "@/api/configure/public";
import ReqPermission from "@/api/portal/permission";
// 导入包
export default {
  extends: EBase,
  components: {
    CTable: () => import("@qingbing/element-table"),
    CQueryForm: () => import("@/components/queryForm"),
    CButtons: () => import("@/components/formButton"),
    operate: () => import("@/components/operate"),
  },
  data() {
    return {
      /**
       * query-form
       */
      query: {
        formRef: "query-form",
        searchFields: JsonOption.searchFields, // 默认参数
        searchItems: JsonOption.searchItems, // 项目
        buttons: [
          {
            label: "查询",
            type: "primary",
            callback: this.buttonQuery,
          },
          "reset", // 使用vue默认的表单重置
          {
            label: "添加",
            type: "warning",
            callback: this.buttonAdd,
          },
        ],
      },
      // 默认的操作实体，为新增时复制使用
      defaultEntity: {
        name: "",
        code: "",
        remark: "",
        sort_order: "127",
        is_enable: "1",
      },
      dialogs: {
        // add dialog
        add: {
          formRef: "add-dialog-form",
          title: "新增数据", // dialog 标题
          visible: false, // 是否打开 dialog
          entity: {}, // 当前操作实体
          rules: {}, // 规则，这个定义为对象，不用赋值
          items: {}, // 项目
          viewFields: ["name", "remark", "sort_order", "is_enable"], // 需要展示的项目
          textFields: ["parent_name"], // 强制 view
          buttons: ["submit", "cancel"], // 默认展示按钮
          handleSubmit: this.handleAdd,
        },
        // edit dialog
        edit: {
          formRef: "edit-dialog-form",
          title: "编辑数据", // dialog 标题
          visible: false, // 是否打开 dialog
          entity: {}, // 当前操作实体
          rules: {}, // 规则，这个定义为对象，不用赋值
          items: {}, // 项目
          viewFields: ["name", "remark", "sort_order", "is_enable"], // 需要展示的项目
          textFields: [], // 强制 view
          buttons: ["submit", "cancel"], // 默认展示按钮
          handleSubmit: this.handleEdit,
        },
        // view dialog
        view: {
          formRef: "view-dialog-form",
          title: "查看数据", // dialog 标题
          visible: false, // 是否打开 dialog
          entity: {}, // 当前操作实体
          rules: {}, // 规则，这个定义为对象，不用赋值
          items: {}, // 项目
          viewFields: [], // 需要展示的项目
          textFields: ["name", "remark", "sort_order", "is_enable"], // 强制 view
          buttons: ["cancel"], // 默认展示按钮
          // 默认的操作实体，为新增时复制使用
        },
      },
    };
  },
  methods: {
    // 页面查询按钮
    buttonQuery() {
      this.reloadTable();
    },
    /**
     * list-table
     */
    // 重新加载表格
    reloadTable() {
      Helper.reloadTable(this, "pageTable");
    },
    // 获取表头
    async getHeaders(callback) {
      const pageKey = "backend-permission-role";
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
          { operType: "delete", handle: this.handleDelete },
          { label: "分配菜单", handle: this.buttonAssignMenu },
        ],
      };
      callback(headers);
      // 表单选项
      const items = res.formOptions;
      this.dialogs.add.items = copy(items);
      this.dialogs.view.items = copy(items);
      this.dialogs.edit.items = copy(items);
    },
    // 查询数据
    getData(callback) {
      ReqPermission.roleList(merge(this.query.searchFields, this.pagination))
        .then((res) => callback(res.data))
        .catch(() => {});
    },
    /**
     * buttons
     */
    // 添加按钮
    buttonAdd() {
      // 设置 add dialog 表单数据
      this.dialogs.add.entity = copy(this.defaultEntity);
      // 打开 add dialog
      this.openDialog(this.dialogs.add);
    },
    // table-list 编辑按钮
    buttonEdit(entity) {
      // 设置 viewDialog 表单数据
      this.dialogs.edit.entity = copy(entity);
      this.openDialog(this.dialogs.edit);
    },
    // table-list 查看按钮
    buttonView(entity) {
      // 设置 view dialog 表单数据
      this.dialogs.view.entity = copy(entity);
      // 打开 dialog
      this.openDialog(this.dialogs.view);
    },
    // table-list 分配菜单权限按钮
    buttonAssignMenu(entity) {
      console.log("buttonAssignMenu ====> ", entity);
    },
    /**
     * handle
     */
    // covered-level(can): 新增保存
    handleAdd(successCb, failureCb) {
      ReqPermission.roleAdd(this.dialogs.add.entity)
        .then((res) => {
          successCb(res.message);
          // 关闭 dialog
          this.closeDialog();
          // 刷新列表
          this.reloadTable();
        })
        .catch((res) => failureCb(res.message));
    },
    // list-table 编辑执行
    handleEdit(successCb, failureCb) {
      ReqPermission.roleEdit(this.dialogs.edit.entity)
        .then((res) => {
          successCb(res.message);
          // 关闭 dialog
          this.closeDialog();
          // 刷新列表
          this.reloadTable();
        })
        .catch((res) => failureCb(res.message));
    },
    // list-table 编辑删除
    handleDelete(entity, successCb, failureCb) {
      ReqPermission.roleDel(entity)
        .then((res) => {
          successCb(res.message);
          // 刷新列表
          this.reloadTable();
        })
        .catch((res) => failureCb(res));
    },
  },
};
</script>

