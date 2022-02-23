<script>
// 导入包
import { merge, copy, isArray } from "@qingbing/helper";
import Cache from "@/utils/cache";
import { getRangeTime } from "@/utils/moment";
import EListTable from "@/extends/list-table.vue";
import JsonOption from "./../json/logs-operate";
import { getHeaderOptions, getFormOptions } from "@/api/configure/public";
import { getOptionForSystems } from "@/api/portal/public";
import ReqLogs from "@/api/portal/logs";

// 导入包
export default {
  extends: EListTable,
  components: {
    // 在自组件需要使用的组件，全部小写
    operate: () => import("@/components/operate"),
  },
  created() {},
  data() {
    return {
      query: {
        searchItems: JsonOption.searchItems,
        searchFields: {
          queryTime: getRangeTime(-7),
          system_code: "",
          id: "",
          trace_id: "",
          type: "",
          keyword: "",
          ip: "",
          nickname: "",
          uid: "",
          message: "",
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
      dialogs: {
        view: {
          formRef: "view-dialog-form",
          title: "查看操作日志", // dialog 标题
          visible: false, // 是否打开 dialog
          entity: {}, // 当前操作实体
          rules: {}, // 规则，这个定义为数组，不用赋值
          items: {}, // 项目
          viewFields: [], // 需要展示的项目
          // 强制 view
          textFields: ["system_code", "data"],
          buttons: ["cancel"],
        },
      },
    };
  },
  methods: {
    // covered-level(must) 获取表头
    async getHeaders(callback) {
      const pageKey = "program-logs-operate";
      const res = await Cache.get(
        `local.${pageKey}`,
        () => {
          return {
            tableHeaders: getHeaderOptions(pageKey),
            formOptions: getFormOptions(pageKey),
            systems: getOptionForSystems(),
          };
        },
        7200
      );
      // 表头item
      const headers = res.tableHeaders;
      // 操作
      headers.operate.params = {
        buttons: [{ operType: "view", handle: this.buttonView }],
      };
      callback(headers);
      // 查询条件
      this.query.searchItems.system_code.exts.options = res.systems;
      // 表单选项
      const items = res.formOptions;
      items.system_code.exts = {
        options: res.systems,
      };
      this.dialogs.view.items = copy(items);
    },
    // covered-level(must) 获取表格数据
    getData(callback) {
      ReqLogs.operateLogList(merge(this.query.searchFields, this.pagination))
        .then((res) => callback(res.data))
        .catch(() => {});
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
  },
  watch: {
    // 查询时间监听
    "query.searchFields.queryTime": {
      handler: function (val) {
        if (!isArray(val)) {
          val = getRangeTime(-7);
        }
        this.query.searchFields.start_at = val[0];
        this.query.searchFields.end_at = val[1];
      },
      immediate: true,
    },
  },
};
</script>
