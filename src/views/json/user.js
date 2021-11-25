// 导入
import labels from "./../../conf/labels";
// 用户字段
export default {
  uid: {
    input_type: "view-text",
    field: "uid",
    default: "",
    label: "UID",
  },
  nickname: {
    input_type: "input-text",
    field: "nickname",
    default: "",
    label: "昵称",
    rules: [{ type: "required" }],
  },
  real_name: {
    input_type: "input-text",
    field: "real_name",
    default: "",
    label: "姓名",
  },
  sex: {
    input_type: "input-select",
    field: "sex",
    default: "",
    label: "性别",
    exts: {
      options: labels.sex,
    },
  },
  email: {
    input_type: "input-text",
    field: "email",
    default: "",
    label: "邮箱",
    rules: [{ type: "email" }],
  },
  mobile: {
    input_type: "input-text",
    field: "mobile",
    default: "",
    label: "手机号",
    rules: [{ type: "mobile" }],
  },
  phone: {
    input_type: "input-text",
    field: "mobile",
    default: "",
    label: "座机号",
    rules: [{ type: "phone" }],
  },
  qq: {
    input_type: "input-text",
    field: "qq",
    default: "",
    label: "QQ",
    rules: [{ type: "qq" }],
  },
  id_card: {
    input_type: "input-text",
    field: "id_card",
    default: "",
    label: "身份证",
    rules: [{ type: "idCard" }],
  },
  birthday: {
    input_type: "date-picker",
    field: "birthday",
    default: "",
    label: "生日",
    exts: {
      type: "date",
    },
  },
  address: {
    input_type: "input-text",
    field: "address",
    default: "",
    label: "地址",
    rules: [{ type: "string" }],
  },
  zip_code: {
    input_type: "input-text",
    field: "zip_code",
    default: "",
    label: "邮编",
    rules: [{ type: "zipcode" }],
  },
  is_enable: {
    input_type: "input-select",
    field: "is_enable",
    default: "",
    label: "启用状态",
    exts: {
      options: labels.enable,
    },
  },
  is_super: {
    input_type: "input-select",
    field: "is_super",
    default: "",
    label: "是否超管",
    exts: {
      options: labels.yesNo,
    },
  },
  refer_uid: {
    input_type: "view-text",
    field: "refer_uid",
    default: "",
    label: "引荐人ID",
  },
  expire_ip: {
    input_type: "input-area",
    field: "expire_ip",
    default: "",
    label: "登录IP白名单",
    exts: {
      clearable: true, // 可清空
    },
  },
  expire_begin_at: {
    input_type: "date-picker",
    field: "expire_begin_at",
    default: "",
    label: "生效日期",
    exts: {
      type: "date",
    },
  },
  expire_end_at: {
    input_type: "date-picker",
    field: "expire_end_at",
    default: "",
    label: "失效日期",
    exts: {
      type: "date",
    },
  },
  login_times: {
    input_type: "view-text",
    field: "login_times",
    default: "",
    label: "登录次数",
  },
  last_login_ip: {
    input_type: "view-text",
    field: "last_login_ip",
    default: "",
    label: "上次登录IP",
  },
  last_login_at: {
    input_type: "view-text",
    field: "last_login_at",
    default: "",
    label: "上次登录时间",
  },
  register_ip: {
    input_type: "view-text",
    field: "register_ip",
    default: "",
    label: "注册IP",
  },
  register_at: {
    input_type: "view-text",
    field: "register_at",
    default: "",
    label: "注册时间",
  },
  updated_at: {
    input_type: "view-text",
    field: "updated_at",
    default: "",
    label: "更新时间",
  },
  avatar: {
    input_type: "ele-uploader",
    field: "avatar",
    default: "",
    label: "头像",
    exts: {
      action: "https://jsonplaceholder.typicode.com/posts/", //上传URL，必填
      // 上传前检查
      beforeUpload: function (file, uploader) {
        console.log(file);
        uploader.data.token = "11111";
        const isJPG = file.type === "image/jpeg";
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error("上传头像图片只能是 JPG 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        return isJPG && isLt2M;
      },
      // 上传成功后处理
      // succCallback(res, file, uploader) {
      //   console.log(res)
      //   console.log(file)

      //   return true;
      // },
      uplaodName: "file", // 上传的文件字段名
      autoUpload: true, // 是否在选取文件后立即进行上传
      headers: {}, // 文件头
      data: {}, // 上传时附带的参数
      withCredentials: true, // 支持发送 cookie 凭证信息
      accept: "image/png, image/jpeg", // 接受上传的文件类型
    },
    rules: [{ type: "required" }],
  },
};
