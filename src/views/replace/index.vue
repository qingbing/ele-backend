<script>
// 导入包
import EListTable from "@/extends/list-table.vue";
import { getHeaderOptions, getFormOptions } from "@/api/pub";
import Labels from "@/conf/labels";
import { merge, copy, asyncAll } from "@qingbing/helper";
import ReqReplaceSetting from "@/api/replace-setting";

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
      tableEditConfig: {
        editable: false,
      },
      query: {
        search: {
          code: "",
          name: "",
          is_open: "",
        },
        searchItems: {
          code: {
            input_type: "input-text",
            label: "标识码",
          },
          name: {
            input_type: "input-text",
            label: "配置名称",
          },
          is_open: {
            input_type: "input-select",
            label: "是否开放",
            exts: {
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
        ],
      },
      editDailog: {
        title: "编辑替换模版",
        viewFields: [
          "code",
          "name",
          "is_open",
          "sort_order",
          "description",
          "replace_fields",
          "content",
        ],
        textFields: ["code", "name"],
      },
      viewDailog: {
        title: "替换模版详情",
        buttons: ["cancel"],
      },
    };
  },
  methods: {
    getHeaders(cb) {
      // 获取item
      const promise = {
        options: getFormOptions("program-replace-setting"),
        headers: getHeaderOptions("program-replace-setting"),
      };
      asyncAll(promise, (res) => {
        const headers = res.headers;
        // 列表操作
        headers.operate.params = {
          buttons: [
            { operType: "view", handle: this.buttonView },
            { operType: "edit", handle: this.buttonEdit },
          ],
        };
        cb(headers);
        // 表单选项
        const items = res.options;
        this.editDailog.items = copy(items);
        this.viewDailog.items = copy(items);
      });
    },
    getData(cb) {
      ReqReplaceSetting.replaceSettingList(
        merge(this.query.search, this.pagination)
      )
        .then((res) => cb(res.data))
        .catch(() => {});
    },
    // 保存数据,回调函数终止提交标记
    handleEdit(successCb, failureCb) {
      const promise = ReqReplaceSetting.replaceSettingEdit(
        this.editDailog.entity
      );
      this.addOrEditSave(promise, successCb, failureCb);
    },
  },
};
</script>
