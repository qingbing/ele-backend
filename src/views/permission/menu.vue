<template>
  <div class="block">
    <p class="text-left">
      <el-button type="primary" @click="buttonAdd()"> 添加 </el-button>
    </p>
    <el-tabs
      type="border-card"
      v-model="activeTabName"
      @tab-click="handleTabChange"
    >
      <el-tab-pane
        v-for="data in treeData"
        :key="data.type"
        :label="data.label"
        :name="data.type"
      >
        <el-tree
          default-expand-all
          :node-key="props.nodeKey"
          :data="data.data"
          :props="props"
          :expand-on-click-node="false"
          :ref="data.type"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-link type="default"
                ><i class="el-icon-view" @click="buttonView(node, data)"></i
              ></el-link>
              <span> | </span>
              <el-link
                type="primary"
                v-if="data.type != 'button'"
                @click="buttonAdd(data)"
                ><i class="el-icon-folder-add"></i
              ></el-link>
              <span v-if="data.type != 'button'"> | </span>
              <el-link type="warning"
                ><i class="el-icon-edit" @click="buttonEdit(node, data)"></i
              ></el-link>
              <span> | </span>
              <el-link type="danger"
                ><i class="el-icon-delete" @click="handleDel(node, data)"></i
              ></el-link>
              <span> | </span>
              <el-link type="info"
                ><i class="el-icon-setting" @click="buttonTransfer(data)"></i
              ></el-link>
            </span>
          </span>
        </el-tree>
      </el-tab-pane>
    </el-tabs>

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
    <!-- dialog for transfer -->
    <el-dialog
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
    </el-dialog>
  </div>
</template>

<script>
import { each, isArray, isUndefined, copy } from "@qingbing/helper";
import EBase from "@/extends/base.vue";
import Cache from "@/utils/cache";
import Conf from "@/conf/constant";
import { parseRealData } from "@/utils/response";
import { getFormOptions } from "@/api/configure/public";
import ReqPermission from "@/api/portal/permission";
// 导入包
export default {
  extends: EBase,
  components: {
    CButtons: () => import("@/components/formButton"),
  },
  created() {
    this.loanData();
  },
  data() {
    const treeData = {};
    each(Conf.treeMenuTypes, (label, type) => {
      treeData[type] = {
        label,
        type,
        data: [],
      };
    });
    return {
      activeTabName: "menu",
      addParentData: undefined,
      editNodeData: undefined,
      defaultEntity: {
        parent_name: "",
        parent_code: "",
        id: "",
        type: "",
        code: "",
        icon: "el-icon-menu",
        path: "",
        name: "",
        remark: "",
        sort_order: 0,
        is_public: 1,
        is_enable: 1,
        exts: "",
        operate_ip: "",
        operate_uid: "",
        created_at: "",
        updated_at: "",
      },
      props: {
        children: "children",
        label: "name",
        nodeKey: "code",
      },
      treeData,
      dialogs: {
        // add dialog
        add: {
          formRef: "add-dialog-form",
          title: "新增数据", // dialog 标题
          visible: false, // 是否打开 dialog
          entity: {}, // 当前操作实体
          rules: {}, // 规则，这个定义为对象，不用赋值
          items: {}, // 项目
          viewFields: [
            "parent_name",
            "type",
            "path",
            "name",
            "icon",
            "is_public",
            "is_enable",
            "sort_order",
            "remark",
            "exts",
          ], // 需要展示的项目
          textFields: ["parent_name"], // 强制 view
          buttons: ["submit", "cancel"], // 默认展示按钮
          handleSubmit: this.handleAdd,
          // 默认的操作实体，为新增时复制使用
          defaultEntity: {},
        },
        // edit dialog
        edit: {
          formRef: "edit-dialog-form",
          title: "编辑数据", // dialog 标题
          visible: false, // 是否打开 dialog
          entity: {}, // 当前操作实体
          rules: {}, // 规则，这个定义为对象，不用赋值
          items: {}, // 项目
          viewFields: [
            "parent_name",
            "type",
            "path",
            "name",
            "icon",
            "is_public",
            "is_enable",
            "sort_order",
            "remark",
            "exts",
          ], // 需要展示的项目
          textFields: ["parent_name", "type"], // 强制 view
          buttons: ["submit", "cancel"], // 默认展示按钮
          handleSubmit: this.handleEdit,
          // 默认的操作实体，为新增时复制使用
          defaultEntity: {},
        },
        // view dialog
        view: {
          formRef: "view-dialog-form",
          title: "查看数据", // dialog 标题
          visible: false, // 是否打开 dialog
          entity: {}, // 当前操作实体
          rules: {}, // 规则，这个定义为对象，不用赋值
          items: {}, // 项目
          viewFields: [
            "parent_name",
            "type",
            "name",
            "path",
            "icon",
            "remark",
            "sort_order",
            "is_public",
            "is_enable",
            "exts",
            "id",
            "code",
            "operate_ip",
            "operate_uid",
            "created_at",
            "updated_at",
          ], // 需要展示的项目
          textFields: [
            "type",
            "name",
            "path",
            "icon",
            "remark",
            "sort_order",
            "is_public",
            "is_enable",
            "exts",
          ], // 强制 view
          buttons: ["cancel"], // 默认展示按钮
          // 默认的操作实体，为新增时复制使用
          defaultEntity: {},
        },
      },
      transferDialog: {
        placeholder: "请输入关键字", // 搜索提示信息
        list: [], // 项目列表，页面初始化时加载一次即可
        entity: {}, // 菜单实体，需要每次打开时重新赋值
        codes: [], // 选中的项目，需要每次打开时重新赋值
        modalClose: false,
        formRef: "transfer-dialog-form",
        title: "",
        visible: false,
        buttons: ["submit", "cancel"], // 默认展示按钮
        handleSubmit: this.handleAssignApi,
      },
    };
  },
  methods: {
    // 加载数据
    async loanData() {
      // 准备树形菜单类型数据
      const pageKey = "backend-permission-menu-path";
      const res = await Cache.get(
        Cache.getPageStaticDataKey(pageKey),
        () => {
          return {
            treeMap: ReqPermission.menuTreeMap(),
            typeMap: ReqPermission.menuTypeMap(),
            formOptions: getFormOptions(pageKey),
          };
        },
        7200
      );
      each(res.treeMap, async (label, type) => {
        const resTree = await ReqPermission.menuTree({
          type,
          containButton: 1,
          onlyDisable: 0,
        });
        this.treeData[type] = {
          type,
          label,
          data: parseRealData(resTree),
        };
      });
      // 表单选项
      res.formOptions.type.exts.options = this.getMenuTypeOptions();
      this.dialogs.add.items = copy(res.formOptions);
      this.dialogs.edit.items = copy(res.formOptions);
      this.dialogs.view.items = copy(res.formOptions);
      // 准备 transfer 的接口 list
      ReqPermission.apiAllForTransfer()
        .then((res) => {
          this.transferDialog.list = res.data;
        })
        .catch((error) => console.log(error));
    },
    // 获取当前tab标签下的可选菜单类型选项
    getMenuTypeOptions() {
      return {
        [this.activeTabName]: this.treeData[this.activeTabName].label,
        button: "按钮",
      };
    },
    // tab 切换事件
    handleTabChange() {
      // 设置默认菜单类型
      this.defaultEntity.type = this.activeTabName;
      // 设置tab标签下的可选菜单类型
      const menuTypeOptions = this.getMenuTypeOptions();
      this.dialogs.add.items.type.exts.options = menuTypeOptions;
      this.dialogs.edit.items.type.exts.options = menuTypeOptions;
      this.dialogs.view.items.type.exts.options = menuTypeOptions;
    },
    // button 添加事件
    buttonAdd(data) {
      // 设置 add dialog 表单数据
      this.dialogs.add.entity = copy(this.defaultEntity);
      if (data) {
        this.dialogs.add.entity.parent_code = data.code;
        this.dialogs.add.entity.parent_name = data.name;
      } else {
        this.dialogs.add.entity.parent_code = "";
        this.dialogs.add.entity.parent_name = "- 顶级菜单 -";
      }
      // 显示弹出
      this.openDialog(this.dialogs.add);
      // 设置新增时的父节点
      this.addParentData = data;
    },
    // button 修改事件
    buttonEdit(node, data) {
      if (isArray(node.parent.data)) {
        data.parent_name = "- 顶级菜单 -";
        data.parent_code = "";
      } else {
        data.parent_name = node.parent.data.name;
        data.parent_code = node.parent.data.code;
      }
      // 设置 edit dialog 表单数据
      this.dialogs.edit.entity = copy(data);
      // 显示弹出
      this.openDialog(this.dialogs.edit);
      // 设置编辑时的节点
      this.editNodeData = data;
    },
    // button 查看事件
    buttonView(node, data) {
      if (isArray(node.parent.data)) {
        data.parent_name = "- 顶级菜单 -";
        data.parent_code = "";
      } else {
        data.parent_name = node.parent.data.name;
        data.parent_code = node.parent.data.code;
      }
      // 设置 view dialog 表单数据
      this.dialogs.view.entity = copy(data);
      // 显示弹出
      this.openDialog(this.dialogs.view);
    },
    // button 打开接口分配穿梭
    buttonTransfer(data) {
      this.transferDialog.title = `分配接口(${data.name})`;
      this.transferDialog.entity = copy(data);
      ReqPermission.getAssignedApiPath({
        code: data.code,
      })
        .then((res) => {
          this.transferDialog.codes = res.data;
          // 显示弹出
          this.openDialog(this.transferDialog);
        })
        .catch((err) => console.log(err));
    },
    // 添加处理函数
    handleAdd(successCb, failureCb) {
      ReqPermission.menuAdd(this.dialogs.add.entity)
        .then((res) => {
          successCb(res.message);
          // 以下为操作 page-tree
          let children;
          if (!this.addParentData) {
            // 添加一级菜单
            children = this.treeData[this.activeTabName].data;
          } else if (!isUndefined(this.addParentData)) {
            // 添加多级菜单
            this.$set(this.addParentData, "children", []);
            children = this.addParentData.children;
          }
          children.push(res.data);
          // 关闭 dialog
          this.closeDialog();
        })
        .catch((res) => failureCb(res.message));
    },
    // 编辑处理函数
    handleEdit(successCb, failureCb) {
      ReqPermission.menuEdit(this.dialogs.edit.entity)
        .then((res) => {
          successCb(res.message);
          // 关闭 dialog
          this.closeDialog();
          // 以下为操作 page-tree
          each(res.data, (v, k) => {
            this.editNodeData[k] = v;
          });
        })
        .catch((res) => failureCb(res.message));
    },
    // 删除处理函数
    handleDel(node, data) {
      ReqPermission.menuDel(data)
        .then((res) => {
          this.successTip(res.message);
          // 以下为操作 page-tree
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex((d) => d.code === data.code);
          children.splice(index, 1);
        })
        .catch((res) => {
          this.errorTip(res.message);
        });
    },
    // transfer 过滤搜索
    handleFilterNode(query, item) {
      return item.label.indexOf(query) > -1;
    },
    // transfer 确定保存处理
    handleAssignApi() {
      ReqPermission.assignApiPath({
        code: this.transferDialog.entity.code,
        api_codes: this.transferDialog.codes,
      })
        .then((res) => {
          this.successTip(res.message);
          this.closeDialog();
        })
        .catch((res) => {
          this.errorTip(res.message);
        });
    },
  },
};
</script>

<style>
.custom-tree-node {
  display: inline-block;
  line-height: 30px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.el-transfer-panel {
  width: 360px;
}
</style>
