<template>
  <div>
    <!-- query from -->
    <el-form :inline="true" class="query-form" :model="query" ref="query">
      <c-query-form :query="query" :items="queryItems"></c-query-form>
      <el-form-item>
        <el-button type="primary" @click="buttonQuery">查询</el-button>
        <el-button @click="resetForm('query')">重置</el-button>
        <el-button type="warning" @click="buttonAdd">添加表头</el-button>
      </el-form-item>
    </el-form>
    <!-- list table -->
    <c-table
      :getHeaders="getHeaders"
      :getTableData="getData"
      :beforeRender="beforeRender"
      :pagination="pagination"
      ref="pageTable"
    ></c-table>
    <!-- add + edit -->
    <el-dialog
      :title="operDailog.title"
      :visible.sync="operDailog.visible"
      width="600px"
      append-to-body
    >
      <el-form
        :rules="operDailog.rules"
        :model="operDailog.entity"
        ref="operForm"
        label-width="100px"
        label-position="right"
        style="width: 500px"
      >
        <element-form
          :formData="operDailog.entity"
          :items="operDailog.items"
          :rules="operDailog.rules"
          :viewFields="operDailog.viewFields"
          :textFields="operDailog.textFields"
        ></element-form>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- dailog 操作按钮 -->
        <c-buttons
          refForm="operForm"
          :buttons="operDailog.buttons"
          :submitCallback="handleSave"
          :cancelCallback="handleCancel"
        ></c-buttons>
      </div>
    </el-dialog>
    <!-- view -->
    <el-dialog
      :title="viewDailog.title"
      :visible.sync="viewDailog.visible"
      width="600px"
      append-to-body
    >
      <el-form
        :rules="viewDailog.rules"
        :model="viewDailog.entity"
        ref="viewForm"
        label-width="100px"
        label-position="right"
        style="width: 500px"
      >
        <element-form
          :formData="viewDailog.entity"
          :items="viewDailog.items"
          :rules="viewDailog.rules"
          :viewFields="viewDailog.viewFields"
          :textFields="viewDailog.textFields"
          :isForm="false"
        ></element-form>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- dailog 操作按钮 -->
        <c-buttons
          refForm="viewForm"
          :buttons="viewDailog.buttons"
          :cancelCallback="handleCancel"
        ></c-buttons>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入包
import EPage from "@/extends/page.vue";
import { copy, merge } from "@qingbing/helper";
import items from "../json/header";

// 导入包
export default {
  extends: EPage,
  components: {
    CTable: () => import("@qingbing/element-table"),
    CQueryForm: () => import("@/components/queryForm"),
    CButtons: () => import("./../../components/formButton"),
    // 在自组件需要使用的组件，全部小写
    operate: () => import("./../../components/operate"),
  },
  data() {
    return {
      operType: "add",
      query: {
        key: "",
        name: "",
        is_open: "",
      },
      queryItems: {
        key: {
          input_type: "input-text",
          label: "表头标识",
        },
        name: {
          input_type: "input-text",
          label: "表头名称",
        },
        is_open: { dataType: "yesNo", label: "是否公开" },
      },
      operDailog: {
        title: "",
        visible: false,
        entity: {},
        rules: {},
        items: items.header,
        viewFields: [],
        textFields: [],
        buttons: ["submit", "cancel"],
        defaultEntity: {
          key: "",
          name: "",
          is_open: 0,
          sort_order: "023",
          description: "",
        },
      },
      viewDailog: {
        title: "查看表头",
        visible: false,
        entity: {},
        rules: {},
        items: items.header,
        viewFields: [],
        textFields: [],
        buttons: ["cancel"],
        defaultEntity: {
          key: "",
          name: "",
          is_open: 0,
          sort_order: "023",
          description: "",
        },
      },
      beforeRender(item, idx) {},
    };
  },
  mounted() {
    this.operDailog.entity = copy(this.operDailog.defaultEntity);
  },
  methods: {
    buttonQuery() {
      this.$refs["pageTable"].refreshTable();
    },
    getHeaders(cb) {
      cb([
        { name: "_idx", label: "序号", fixed: "left" },
        { name: "date", label: "日期", width: "100", default: "0000-00-00" },
        { name: "name", label: "姓名", width: "150" },
        { name: "age", label: "年龄", width: "50" },
        { name: "sex", label: "性别", width: "50", align: "left" },
        {
          name: "operate",
          label: "操作",
          component: "operate",
          params: {
            buttons: [
              { operType: "view", handle: this.buttonView },
              { operType: "edit", handle: this.buttonEdit },
              { operType: "delete", handle: this.handleDelete },
            ],
          },
        },
      ]);
    },
    getData(cb) {
      this.ajaxMethod(
        "/header/list",
        merge(this.query, this.pagination),
        "post",
        (res) => {
          cb(res);
        }
      );
    },
    // 判断是否添加操作
    isAdd() {
      return "add" === this.operType;
    },
    buttonAdd() {
      this.operType = "add";
      // 设置 operDailog 表单数据
      this.operDailog.entity = copy(this.operDailog.defaultEntity);
      this.operDailog.title = "添加表头";
      // 打开 dailog
      this.openDialog("operDailog");
    },
    buttonEdit(entity) {
      this.operType = "edit";
      // 设置 operDailog 表单数据
      this.operDailog.entity = copy(entity);
      this.operDailog.title = "编辑表头";
      // 打开 dailog
      this.openDialog("operDailog");
    },
    buttonView(entity) {
      this.operType = "view";
      // 设置 operDailog 表单数据
      this.viewDailog.entity = copy(entity);
      // 打开 dailog
      this.openDialog("viewDailog");
    },
    // 关闭 dailog
    handleCancel() {
      this.operType = "";
      // 关闭 dailog
      this.closeDialog();
    },
    handleDelete(entity, successCb, failureCb) {
      console.log(entity);
      console.log(this);
      // successCb();
      failureCb();
    },
    // 保存数据,回调函数终止提交标记
    handleSave(cb) {
      console.log(this.operDailog.entity);
      cb();
    },
  },
};
</script>
