<script>
// 导入包
import EListTable from "@/extends/list-table.vue";
import Router from "@/utils/router-helper";
import { getHeaderOptions } from "@/api/public";
import { merge, copy } from "@qingbing/helper";
import ReqForm from "@/api/form";
import items from "./../json/form";

// 导入包
export default {
  extends: EListTable,
  components: {
    // 在自组件需要使用的组件，全部小写
    operate: () => import("@/components/operate"),
  },
  data() {
    const defaultEntity = {
      key: "",
      name: "",
      is_enable: 0,
      is_open: 1,
      is_setting: "0",
      sort_order: "127",
      description: "",
    };
    return {
      query: {
        search: {
          key: "",
          name: "",
          is_enable: "",
          is_open: "",
          is_setting: "",
        },
        searchItems: {
          key: {
            input_type: "input-text",
            label: "表单标识",
          },
          name: {
            input_type: "input-text",
            label: "表单名称",
          },
          is_enable: { dataType: "enable", label: "启用状态" },
          is_open: { dataType: "yesNo", label: "是否公开" },
          is_setting: { dataType: "yesNo", label: "配置表单" },
        },
      },
      addDailog: {
        title: "添加表单",
        items: items.category,
        defaultEntity: copy(defaultEntity),
      },
      editDailog: {
        title: "编辑表单",
        items: items.category,
        defaultEntity: copy(defaultEntity),
        textFields: ["key", "is_setting"],
      },
      viewDailog: {
        title: "查看表单",
        items: items.category,
        buttons: ["cancel"],
        defaultEntity: copy(defaultEntity),
      },
    };
  },
  methods: {
    getAddButtonText() {
      return "添加表单";
    },
    getHeaders(cb) {
      getHeaderOptions("program-form-category")
        .then((res) => {
          const headers = res.data;
          headers.operate.params = {
            buttons: [
              { operType: "view", handle: this.buttonView },
              { operType: "edit", handle: this.buttonEdit },
              { operType: "delete", handle: this.handleDelete },
              { label: "子选项", handle: this.buttonOptions },
              {
                label: "配置表单",
                handle: this.buttonSetting,
                showProperty: "is_setting",
                showValue: 1,
              },
            ],
          };
          cb(headers);
        })
        .catch(() => {});
    },
    getData(cb) {
      ReqForm.formList(merge(this.query.search, this.pagination))
        .then((res) => cb(res.data))
        .catch(() => {});
    },
    handleDelete(entity, successCb, failureCb) {
      ReqForm.formDel(entity)
        .then((res) => {
          successCb(res.message);
          // 刷新列表
          this.reloadTable();
        })
        .catch((res) => failureCb(res));
    },
    // 保存数据,回调函数终止提交标记
    handleAdd(successCb, failureCb) {
      const promise = ReqForm.formAdd(this.addDailog.entity);
      this.addOrEditSave(promise, successCb, failureCb);
    },
    // 保存数据,回调函数终止提交标记
    handleEdit(successCb, failureCb) {
      const promise = ReqForm.formEdit(this.editDailog.entity);
      this.addOrEditSave(promise, successCb, failureCb);
    },
    // 打开新窗口，管理表单选项
    buttonOptions(entity) {
      Router.open(this, `/form/options/${entity.key}`, true);
    },
    // 打开新窗口，管理表单选项
    buttonSetting(entity) {
      Router.open(this, `/form/setting/${entity.key}`, true);
    },
  },
};
</script>
