<script>
import EForm from "@/extends/form.vue";
import Router from "@/utils/router-helper";
import { isEmpty, uniqid, merge, asyncAll } from "@qingbing/helper";
import ReqForm from "@/api/configure/form";
import { getFormOptions } from "@/api/configure/public";

export default {
  extends: EForm,
  data() {
    this.init(this.$route.params.key);
    return {
      category: {},
      buttons: [
        "submit",
        "reset",
        {
          label: "关闭页面",
          type: "danger",
          callback: this.buttonCloseWindow,
        },
      ], // 默认展示按钮
    };
  },
  methods: {
    init(key) {
      if (isEmpty(key)) {
        Router.error404(this);
        return;
      }
      const promises = {
        category: ReqForm.formView({ key }), // 获取表单详情
        formOptions: getFormOptions(key), // 获取配置表单界面选项信息
        formSeting: ReqForm.formSettingGet({ key }), // 获取配置表单值
      };
      // 对于多个后台接口，采用异步加载尽量降低界面的渲染耗时
      asyncAll(promises, (res) => {
        if (!res.category.is_setting) {
          this.$message.error("非配置表单不能进入该界面");
          return;
        }
        this.category = res.category;
        // 设置标题
        this.pageTitle = `配置表单【${this.category.key}(${this.category.name})】`;
        // 设置表单选项
        this.items = res.formOptions;
        // 设置表单数据
        this.entity = res.formSeting;
        // 重新设置 key 而强制重新渲染页面
        this.uniqueKey = uniqid();
      });
    },
    // 保存结果
    handleSave(successCb, failureCb) {
      ReqForm.formSettingSave(
        merge(this.entity, {
          key: this.category.key,
        })
      )
        .then((res) => successCb(res.msg))
        .catch((err) => failureCb(err.msg));
    },
  },
  watch: {
    $route: function (to, from) {
      if (to.params.key != from.params.key) {
        this.init(to.params.key); // 重新初始化数据
      }
    },
  },
};
</script>
