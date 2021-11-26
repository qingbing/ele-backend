<script>
// 导入包
import EListTable from "@/extends/list-table.vue";
import { getHeaderOptions, getFormOptions } from "@/api/public";
import Labels from "@/conf/labels";
import { merge, copy, asyncAll } from "@qingbing/helper";
import ReqInterfaces from "@/api/interfaces";

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
      system_alias: "",
      system_name: "",
      uri_prefix: "",
      rule: "",
      ext: {},
      description: "",
      sort_order: "",
      is_enable: 1,
      is_allow_new_interface: 1,
      is_record_field: 1,
      is_open_access_log: 1,
      is_open_validate: 0,
      is_strict_validate: 0,
    };
    return {
      tableEditConfig: {
        editable: false,
        saveHandle: this.cellSave,
      },
      query: {
        search: {
          system_alias: "",
          is_enable: "",
          is_allow_new_interface: "",
          is_record_field: "",
          is_open_access_log: "",
          is_open_validate: "",
          is_strict_validate: "",
          system_name: "",
        },
        searchItems: {
          system_alias: {
            input_type: "input-text",
            label: "系统别名",
          },
          is_enable: {
            input_type: "input-select",
            label: "启用状态",
            exts: {
              options: Labels.enable,
            },
          },
          is_allow_new_interface: {
            input_type: "input-select",
            label: "接受新接口",
            exts: {
              options: Labels.yesNo,
            },
          },
          is_record_field: {
            input_type: "input-select",
            label: "记录新字段",
            exts: {
              options: Labels.yesNo,
            },
          },
          is_open_access_log: {
            input_type: "input-select",
            label: "访问日志",
            exts: {
              options: Labels.enable,
            },
          },
          is_open_validate: {
            input_type: "input-select",
            label: "接口校验",
            exts: {
              options: Labels.enable,
            },
          },
          is_strict_validate: {
            input_type: "input-select",
            label: "严格校验",
            exts: {
              options: Labels.enable,
            },
          },
          system_name: {
            input_type: "input-text",
            label: "系统名称",
          },
        },
        buttons: [
          {
            label: "查询",
            type: "primary",
            callback: this.buttonQuery,
          },
          "reset",
          {
            label: "开启编辑",
            type: "primary",
            callback: this.switchEdit,
          },
          {
            label: this.getAddButtonText(),
            type: "warning",
            callback: this.buttonAdd,
          },
        ],
      },
      addDailog: {
        title: "添加系统",
        defaultEntity: copy(defaultEntity),
        viewFields: [
          "rule",
          "system_alias",
          "system_name",
          "sort_order",
          "uri_prefix",
          "is_enable",
          "is_allow_new_interface",
          "is_record_field",
          "is_open_access_log",
          "is_open_validate",
          "is_strict_validate",
          "description",
          "ext",
        ],
      },
      editDailog: {
        title: "编辑系统",
        defaultEntity: copy(defaultEntity),
        viewFields: [
          "rule",
          "system_alias",
          "system_name",
          "sort_order",
          "uri_prefix",
          "is_enable",
          "is_allow_new_interface",
          "is_record_field",
          "is_open_access_log",
          "is_open_validate",
          "is_strict_validate",
          "description",
          "ext",
        ],
        textFields: ["rule", "system_alias"],
      },
      viewDailog: {
        title: "系统详情",
        buttons: ["cancel"],
        defaultEntity: copy(defaultEntity),
      },
    };
  },
  methods: {
    getAddButtonText() {
      return "添加系统";
    },
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
    getHeaders(cb) {
      // 获取item，系统
      const promise = {
        options: getFormOptions("program-interface-system-manage"),
        headers: getHeaderOptions("program-interface-system-manage"),
      };
      asyncAll(promise, (res) => {
        const headers = res.headers;
        // 列表操作
        headers.operate.params = {
          buttons: [
            { operType: "view", handle: this.buttonView },
            { operType: "edit", handle: this.buttonEdit },
            //{ operType: "delete", handle: this.handleDelete },
          ],
        };
        cb(headers);
        // 表单选项
        const items = res.options;
        this.addDailog.items = copy(items);
        this.editDailog.items = copy(items);
        this.viewDailog.items = copy(items);
      });
    },
    getData(cb) {
      ReqInterfaces.interfaceSystemList(
        merge(this.query.search, this.pagination)
      )
        .then((res) => cb(res.data))
        .catch(() => {});
    },
    handleDelete(entity, successCb, failureCb) {
      ReqInterfaces.interfaceSystemDel(entity)
        .then((res) => {
          successCb(res.message);
          // 刷新列表
          this.reloadTable();
        })
        .catch((res) => failureCb(res));
    },
    // 保存数据,回调函数终止提交标记
    handleAdd(successCb, failureCb) {
      const promise = ReqInterfaces.interfaceSystemAdd(this.addDailog.entity);
      this.addOrEditSave(promise, successCb, failureCb);
    },
    // 保存数据,回调函数终止提交标记
    handleEdit(successCb, failureCb) {
      const promise = ReqInterfaces.interfaceSystemEdit(this.editDailog.entity);
      this.addOrEditSave(promise, successCb, failureCb);
    },
    // 保存单元格
    cellSave(cb, change, properties, params) {
      ReqInterfaces.interfaceSystemEdit(merge(change, { id: properties.id }))
        .then(() => {
          cb(true);
          this.reloadTable();
        })
        .catch(() => cb(false));
    },
  },
};
</script>
