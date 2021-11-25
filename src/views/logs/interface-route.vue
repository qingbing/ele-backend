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
  asyncAll,
  isArray,
  isEmpty,
  toJson,
} from "@qingbing/helper";
import { getRangeTime } from "@/utils/moment";
import ReqLogs from "@/api/logs";
import Labels from "../../conf/labels";

// 导入包
export default {
  extends: EListTable,
  components: {
    // 在自组件需要使用的组件，全部小写
    operate: () => import("@/components/operate"),
  },
  data() {
    return {
      query: {
        search: {
          queryTime: getRangeTime(-87),
          system_alias: "",
          interface_type: "",
          interface_id: "",
          method: "",
          id: "",
          trace_id: "",
          keyword: "",
          ip: "",
          uid: "",
          is_operate: "",
          is_intercept: "",
          is_success: "",
          message: "",
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
          system_alias: {
            input_type: "input-select",
            label: "所属系统",
            exts: {
              changeCallback: this.querySystemChange,
              clearable: true,
              options: {},
            },
          },
          interface_type: {
            input_type: "input-select",
            label: "接口分类",
            exts: {
              clearable: true,
              options: {},
            },
          },
          interface_id: {
            input_type: "input-text",
            label: "接口ID",
          },
          method: {
            input_type: "input-select",
            label: "接口分类",
            exts: {
              clearable: true,
              options: {
                post: "POST",
                get: "GET",
                put: "PUT",
              },
            },
          },
          id: {
            input_type: "input-text",
            label: "日志ID",
          },
          trace_id: {
            input_type: "input-text",
            label: "Trace-ID",
          },
          keyword: {
            input_type: "input-text",
            label: "关键字",
          },
          ip: {
            input_type: "input-text",
            label: "访问IP",
          },
          uid: {
            input_type: "input-text",
            label: "UID",
          },
          is_operate: {
            input_type: "input-select",
            label: "是否操作类",
            exts: {
              clearable: true,
              options: Labels.yesNo,
            },
          },
          is_intercept: {
            input_type: "input-select",
            label: "是否中断",
            exts: {
              clearable: true,
              options: Labels.yesNo,
            },
          },
          is_success: {
            input_type: "input-select",
            label: "是否成功",
            exts: {
              clearable: true,
              options: Labels.yesNo,
            },
          },
          message: {
            input_type: "input-text",
            label: "日志消息",
          },
        },
        buttons: [
          {
            label: "查询",
            type: "primary",
            callback: this.buttonQuery,
          },
          "reset",
        ],
      },
      viewDailog: {
        title: "查看操作日志",
        buttons: ["cancel"],
        defaultEntity: {},
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
      item.exts = toJson(item.exts);
      item.input = toJson(item.input);
      item.output = toJson(item.output);
    },
    // 改变筛选系统时，级联改变路由类型
    querySystemChange() {
      this.query.search.interface_type = "";
      this.query.searchItems.interface_type.exts.options = {};
      if (!isEmpty(this.query.search.system_alias)) {
        getOptionInterfaceTypes(this.query.search.system_alias)
          .then((res) => {
            this.query.searchItems.interface_type.exts.options = res.data;
          })
          .catch((err) => err);
      }
    },
    getHeaders(cb) {
      // 获取item，系统
      const promise = {
        systems: getOptionInterfaceSystems(),
        interfaceTypes: getOptionInterfaceTypes(),
        options: getFormOptions("program-logs-interface-route"),
        headers: getHeaderOptions("program-logs-interface-route"),
      };
      asyncAll(promise, (res) => {
        const headers = res.headers;
        // 系统
        headers.system_alias.options = res.systems;
        headers.type.options = res.interfaceTypes;
        // 列表操作
        headers.operate.params = {
          buttons: [{ operType: "view", handle: this.buttonView }],
        };
        cb(headers);
        // 查询条件
        this.query.searchItems.system_alias.exts.options = res.systems;
        // 表单选项
        const items = res.options;
        items.system_alias.exts = {
          options: res.systems,
        };
        items.type.exts = {
          options: res.interfaceTypes,
        };
        this.viewDailog.items = copy(items);
      });
    },
    getData(cb) {
      ReqLogs.interfaceRouteList(merge(this.query.search, this.pagination))
        .then((res) => cb(res.data))
        .catch(() => {});
    },
  },
};
</script>
