<script>
// 导入包
import EListTable from "@/extends/list-table.vue";
import {
  getHeaderOptions,
  getFormOptions,
  getOptionInterfaceSystems,
  getOptionInterfaceTypes,
} from "@/api/pub";
import {
  merge,
  copy,
  isEmpty,
  asyncAll,
  isArray,
  toJson,
} from "@qingbing/helper";
import { getRangeTime } from "@/utils/moment";
import ReqInterfaces from "@/api/interfaces";
import Labels from "@/conf/labels";

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
      uri_path: "",
      alias: "",
      name: "",
      type: "",
      is_operate: 0,
      description: "",
      record_field_type: 0,
      access_log_type: 0,
      validate_type: 0,
      strict_validate_type: 0,
      is_open_route_log: 0,
      route_log_message: "",
      route_log_key_fields: "",
      is_open_mocking: 0,
      is_use_custom_mock: 0,
      mock_response: null,
      created_at: "",
      updated_at: "",
      optionCount: "",
    };
    const withSystemConfig = ["随系统", "强制开启", "强制关闭"];
    return {
      // 缓存系统的接口分类
      systemsTypes: {},
      tableEditConfig: {
        editable: false,
        saveHandle: this.cellSave,
      },
      query: {
        search: {
          queryTime: getRangeTime(-7),
          id: "",
          system_alias: "",
          type: "",
          name: "",
          uri_path: "",
          is_operate: "",
          is_open_route_log: "",
          is_open_mocking: "",
          is_use_custom_mock: "",
          record_field_type: "",
          access_log_type: "",
          validate_type: "",
          strict_validate_type: "",
          start_at: "",
          end_at: "",
        },
        searchItems: {
          queryTime: {
            input_type: "date-picker",
            label: "接口创建时间",
            exts: {
              type: "datetimerange",
              clearable: false,
            },
          },
          id: {
            input_type: "input-text",
            label: "接口ID",
          },
          system_alias: {
            input_type: "input-select",
            label: "所属系统",
            exts: {
              changeCallback: this.querySystemChange,
              clearable: true,
              options: {},
            },
          },
          type: {
            input_type: "input-select",
            label: "接口分类",
            exts: {
              clearable: true,
              options: {},
            },
          },
          name: {
            input_type: "input-text",
            label: "接口名称",
          },
          uri_path: {
            input_type: "input-text",
            label: "接口path",
          },
          is_operate: {
            input_type: "input-select",
            label: "是否操作类",
            exts: {
              clearable: true,
              options: Labels.yesNo,
            },
          },
          record_field_type: {
            input_type: "input-select",
            label: "字段记录",
            exts: {
              clearable: true,
              options: withSystemConfig,
            },
          },
          access_log_type: {
            input_type: "input-select",
            label: "日志记录",
            exts: {
              clearable: true,
              options: withSystemConfig,
            },
          },
          validate_type: {
            input_type: "input-select",
            label: "校验方式",
            exts: {
              clearable: true,
              options: withSystemConfig,
            },
          },
          strict_validate_type: {
            input_type: "input-select",
            label: "严格校验",
            exts: {
              clearable: true,
              options: withSystemConfig,
            },
          },
          is_open_route_log: {
            input_type: "input-select",
            label: "开启路由日志",
            exts: {
              clearable: true,
              options: Labels.yesNo,
            },
          },
          is_open_mocking: {
            input_type: "input-select",
            label: "开启mock",
            exts: {
              clearable: true,
              options: Labels.yesNo,
            },
          },
          is_use_custom_mock: {
            input_type: "input-select",
            label: "自定义mock",
            exts: {
              clearable: true,
              options: Labels.yesNo,
            },
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
        ],
      },
      editDailog: {
        title: "编辑接口信息",
        defaultEntity: copy(defaultEntity),
        viewFields: [
          "system_alias",
          "uri_path",
          "type",
          "name",
          "is_operate",
          "description",
          "record_field_type",
          "access_log_type",
          "validate_type",
          "strict_validate_type",
          "is_open_route_log",
          "route_log_message",
          "route_log_key_fields",
          "is_open_mocking",
          "is_use_custom_mock",
          "mock_response",
        ],
        textFields: ["system_alias", "uri_path"],
      },
      viewDailog: {
        title: "查看接口信息",
        buttons: ["cancel"],
        defaultEntity: copy(defaultEntity),
      },
    };
  },
  watch: {
    // 查询时间监听
    "query.search.queryTime": {
      handler: function (val) {
        if (!isArray(val)) {
          val = getRangeTime(-7);
        }
        this.query.search.start_at = val[0];
        this.query.search.end_at = val[1];
      },
      immediate: true,
    },
  },
  methods: {
    // 列数据渲染前可修改列数据
    beforeRender(item, idx) {
      item.mocking_response = toJson(item.mocking_response);
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
    // 改变筛选系统时，级联改变接口分类
    querySystemChange() {
      this.query.search.type = "";
      if (isEmpty(this.query.search.system_alias)) {
        this.query.searchItems.type.exts.options = {};
      } else {
        getOptionInterfaceTypes(this.query.search.system_alias)
          .then((res) => {
            this.query.searchItems.type.exts.options = res.data;
          })
          .catch((err) => err);
      }
    },
    getHeaders(cb) {
      // 获取item，系统
      const promise = {
        systems: getOptionInterfaceSystems(),
        options: getFormOptions("program-interface-manage"),
        headers: getHeaderOptions("program-interface-manage"),
      };
      asyncAll(promise, (res) => {
        const headers = res.headers;
        // 系统
        headers.system_alias.options = res.systems;
        // 列表操作
        headers.operate.params = {
          buttons: [
            { operType: "view", handle: this.buttonView },
            { operType: "edit", handle: this.buttonEdit },
            { operType: "delete", handle: this.handleDelete },
          ],
        };
        cb(headers);
        // 查询条件
        this.query.searchItems.system_alias.exts.options = res.systems;
        // 表单选项
        const items = res.options;
        items.system_alias.exts = {
          options: res.systems,
        };
        this.editDailog.items = copy(items);
        this.viewDailog.items = copy(items);
      });
    },
    getData(cb) {
      ReqInterfaces.interfaceList(merge(this.query.search, this.pagination))
        .then((res) => cb(res.data))
        .catch(() => {});
    },
    _openDailogForm(entity, callback) {
      if (this.systemsTypes[entity.system_alias]) {
        callback(this.systemsTypes[entity.system_alias]);
      } else {
        getOptionInterfaceTypes(entity.system_alias)
          .then((res) => {
            this.systemsTypes[entity.system_alias] = res.data;
            callback(this.systemsTypes[entity.system_alias]);
          })
          .catch((err) => err);
      }
    },
    // 编辑按钮
    buttonEdit(entity) {
      this._openDailogForm(entity, (interfaceTypeOptions) => {
        this.editDailog.items.type.exts = {
          options: interfaceTypeOptions,
        };
        // 设置 editDailog 表单数据
        this.editDailog.entity = copy(entity);
        // 打开 dailog
        this.openDialog("editDailog");
      });
    },
    // 查看按钮
    buttonView(entity) {
      this._openDailogForm(entity, (interfaceTypeOptions) => {
        this.viewDailog.items.type.exts = {
          options: interfaceTypeOptions,
        };
        // 设置 viewDailog 表单数据
        this.viewDailog.entity = copy(entity);
        // 打开 dailog
        this.openDialog("viewDailog");
      });
    },
    // 保存单元格
    cellSave(cb, change, properties, params) {
      ReqInterfaces.interfaceEdit(merge(change, { id: properties.id }))
        .then(() => {
          cb(true);
          this.reloadTable();
        })
        .catch(() => cb(false));
    },
    handleDelete(entity, successCb, failureCb) {
      ReqInterfaces.interfaceDel(entity)
        .then((res) => {
          successCb(res.message);
          // 刷新列表
          this.reloadTable();
        })
        .catch((res) => failureCb(res));
    },
    // 保存数据,回调函数终止提交标记
    handleEdit(successCb, failureCb) {
      const promise = ReqInterfaces.interfaceEdit(this.editDailog.entity);
      this.addOrEditSave(promise, successCb, failureCb);
    },
  },
};
</script>
