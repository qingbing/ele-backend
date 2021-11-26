<script>
// 导入包
import EListTable from "@/extends/list-table.vue";
import Router from "@/utils/router-helper";
import { getHeaderOptions } from "@/api/public";
import { merge, copy } from "@qingbing/helper";
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
    const defaultEntity = {
      key: "",
      name: "",
      is_open: 0,
      sort_order: "127",
      description: "",
    };
    return {
      query: {
        search: {
          key: "",
          name: "",
          is_open: "",
        },
        searchItems: {
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
      },
      addDailog: {
        title: "添加表头",
        items: items.header,
        defaultEntity: copy(defaultEntity),
      },
      editDailog: {
        title: "编辑表头",
        items: items.header,
        defaultEntity: copy(defaultEntity),
        textFields: ["key"],
      },
      viewDailog: {
        title: "查看表头",
        items: items.header,
        buttons: ["cancel"],
        defaultEntity: copy(defaultEntity),
      },
    };
  },
  methods: {
    getAddButtonText() {
      return "添加表头";
    },
    getHeaders(cb) {
      getHeaderOptions("program-header-category")
        .then((res) => {
          const headers = res.data;
          headers.operate.params = {
            buttons: [
              { operType: "view", handle: this.buttonView },
              { operType: "edit", handle: this.buttonEdit },
              { operType: "delete", handle: this.handleDelete },
              { label: "子选项", handle: this.buttonOptions },
            ],
          };
          cb(headers);
        })
        .catch(() => {});
    },
    getData(cb) {
      ReqHeader.headerList(merge(this.query.search, this.pagination))
        .then((res) => cb(res.data))
        .catch(() => {});
    },
    handleDelete(entity, successCb, failureCb) {
      ReqHeader.headerDel(entity)
        .then((res) => {
          successCb(res.message);
          // 刷新列表
          this.reloadTable();
        })
        .catch((res) => failureCb(res));
    },
    // 保存数据,回调函数终止提交标记
    handleAdd(successCb, failureCb) {
      const promise = ReqHeader.headerAdd(this.addDailog.entity);
      this.addOrEditSave(promise, successCb, failureCb);
    },
    // 保存数据,回调函数终止提交标记
    handleEdit(successCb, failureCb) {
      const promise = ReqHeader.headerEdit(this.editDailog.entity);
      this.addOrEditSave(promise, successCb, failureCb);
    },
    // 打开新窗口，管理表头选项
    buttonOptions(entity) {
      Router.open(this, `/table-header/options/${entity.key}`, true);
    },
  },
};
</script>
