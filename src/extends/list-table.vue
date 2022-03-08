<template>
  <div>
    <!-- page-title -->
    <h4 class="page-title" v-if="pageTitle">{{ pageTitle }}</h4>
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
      :beforeRender="beforeRender"
      :pagination="pagination"
      :editConfig="tableEditConfig"
    ></c-table>
    <!-- add dialog -->
    <el-dialog
      width="600px"
      :title="addDialog.title"
      :visible.sync="addDialog.visible"
      append-to-body
    >
      <el-form
        label-width="100px"
        label-position="right"
        style="width: 500px"
        :rules="addDialog.rules"
        :model="addDialog.entity"
        :ref="addDialog.formRef"
      >
        <element-form
          :formData="addDialog.entity"
          :items="addDialog.items"
          :rules="addDialog.rules"
          :viewFields="addDialog.viewFields"
          :textFields="addDialog.textFields"
        ></element-form>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- dialog 操作按钮 -->
        <c-buttons
          :refForm="addDialog.formRef"
          :buttons="addDialog.buttons"
          :submitCallback="handleAdd"
          :cancelCallback="handleCancel"
        ></c-buttons>
      </div>
    </el-dialog>
    <!-- other-dialog -->
    <el-dialog
      v-for="(dialogData, key) in dialogs"
      :key="key"
      width="600px"
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
          :cancelCallback="
            dialogData.handleCancel ? dialogData.handleCancel : handleCancel
          "
        ></c-buttons>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入包
import EBase from "./base";
import Helper from "@/utils/helper";
import { copy } from "@qingbing/helper";

// 导出
export default {
  extends: EBase,
  components: {
    CTable: () => import("@qingbing/element-table"),
    CQueryForm: () => import("@/components/queryForm"),
    CButtons: () => import("@/components/formButton"),
  },
  data() {
    return {
      /**
       * page-title
       */
      pageTitle: "",
      /**
       * query-form
       */
      query: {
        formRef: "query-form",
        searchFields: {}, // 默认参数
        searchItems: {}, // 项目
        buttons: [
          {
            label: "查询",
            type: "primary",
            callback: this.buttonQuery,
          },
          "reset", // 使用vue默认的表单重置
          {
            label: this.getAddButtonText(),
            type: "warning",
            callback: this.buttonAdd,
          },
        ],
      },
      /**
       * list-table
       */
      // 编辑表格配置
      tableEditConfig: {
        editable: false, // 是否编辑表格[true:是; false:否]
        saveHandle: this.handleCellSave, // 保存编辑表格内容
      },
      // 操作的 dialog
      addDialog: {
        formRef: "add-dialog-form",
        title: "新增数据", // dialog 标题
        visible: false, // 是否打开 dialog
        entity: {}, // 当前操作实体
        rules: {}, // 规则，这个定义为对象，不用赋值
        items: {}, // 项目
        viewFields: [], // 需要展示的项目
        textFields: [], // 强制 view
        buttons: ["submit", "reset", "cancel"], // 默认展示按钮
        // 默认的操作实体，为新增时复制使用
        defaultEntity: {},
      },
      // other dialog - 如果页面需要其它dialog，需要重载该属性，该属性为键值对象
      // 对象内容参考上面的 addDialog，针对列表，请勿直接使用reset，默认reset达不到想要的效果，只能自行写方法实现
      dialogs: {},
      // covered-level(can): 列数据渲染前可修改列数据
      beforeRender: null,
    };
  },
  methods: {
    // 关闭 dialog
    handleCancel() {
      this.closeDialog(); // 继承./base
    },
    // 添加或修改的最终提交
    save(promise, successCb, failureCb) {
      promise
        .then((res) => {
          successCb(res.message);
          // 关闭 dialog
          this.closeDialog();
          // 刷新列表
          this.reloadTable();
        })
        .catch((res) => failureCb(res.message));
    },
    // 编辑表单的最终提交
    cellSave(promise, callback) {
      promise
        .then(() => {
          callback(true);
          this.reloadTable();
        })
        .catch(() => callback(false));
    },
    // 操作按钮影响列表
    operateChangeList(promise, successCb, failureCb) {
      promise
        .then((res) => {
          successCb(res.message);
          // 刷新列表
          this.reloadTable();
        })
        .catch((res) => failureCb(res));
    },
    /**
     * query-form
     */
    // covered-level(can): 添加按钮文字
    getAddButtonText() {
      return "添加";
    },
    // covered-level(no): 新增按钮
    buttonAdd() {
      // 设置 addDialog 表单数据
      this.addDialog.entity = copy(this.addDialog.defaultEntity);
      // 打开 dialog
      this.openDialog("addDialog");
    },
    /**
     * list-table
     */
    // covered-level(no): 重新加载表格
    reloadTable() {
      Helper.reloadTable(this, "pageTable");
    },
    // covered-level(no): 页面查询按钮
    buttonQuery() {
      this.reloadTable();
    },
    // covered-level(must) 获取表头
    getHeaders(callback) {
      // callback(headers);
    },
    // covered-level(must) 获取表格数据
    getData(callback) {
      // callback(data);
    },
    // covered-level(can): 新增保存
    handleAdd(successCb, failureCb) {
      console.log("需要页面重载的方法:handleAdd", successCb, failureCb);
    },
    // covered-level(can): 保存单元格
    handleCellSave(callback, change, properties, params) {
      console.log(
        "需要页面重载的方法:handleCellSave",
        callback,
        change,
        properties,
        params
      );
    },
  },
};
</script>

<style scoped>
.page-title {
  text-align: left;
  margin: 10px;
  font-weight: normal;
  height: 40px;
  line-height: 30px;
  padding: 5px 10px;
  font-size: 14px;
  border-left: 3px solid #31c17b;
}
</style>
