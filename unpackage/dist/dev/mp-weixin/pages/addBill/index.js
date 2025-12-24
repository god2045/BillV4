"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      date: "",
      type: [
        ["支出", "收入"],
        ["餐饮", "其他支出"]
      ],
      typeIndex: [0, 0],
      showType: "支出-餐饮"
    };
  },
  onLoad() {
  },
  methods: {
    formSubmit: function(e) {
      var formdata = e.detail.value;
      var typeLX = this.type[0][formdata.billType[0]];
      var typeLB = this.type[1][formdata.billType[1]];
      common_vendor.index.__f__("log", "at pages/addBill/index.vue:56", typeLB, typeLX);
      common_vendor.index.__f__("log", "at pages/addBill/index.vue:57", formdata);
      common_vendor.tr.callFunction({
        name: "fun",
        data: {
          api: "addBill",
          typeLX,
          typeLB,
          money: formdata.money,
          date: formdata.billDate,
          content: formdata.content
        }
      }).then((res) => {
        common_vendor.index.__f__("log", "at pages/addBill/index.vue:69", res);
      });
    },
    formReset: function(e) {
      this.showType = "";
      this.date = "";
    },
    dateChange: function(e) {
      this.date = e.detail.value;
    },
    typeCChange: function(e) {
      var data = {
        type: this.type,
        typeIndex: this.typeIndex
      };
      data.typeIndex[e.detail.column] = e.detail.value;
      switch (e.detail.column) {
        case 0:
          switch (data.typeIndex[0]) {
            case 0:
              data.type[1] = ["餐饮", "其他支出"];
              common_vendor.index.__f__("log", "at pages/addBill/index.vue:93", data.type);
              break;
            case 1:
              data.type[1] = ["工资", "投资", "其他收入"];
              common_vendor.index.__f__("log", "at pages/addBill/index.vue:97", data.type);
              break;
          }
      }
      common_vendor.index.__f__("log", "at pages/addBill/index.vue:101", data.type);
    },
    typeChange: function(e) {
      this.showType = this.type[0][this.typeIndex[0]] + "-" + this.type[1][this.typeIndex[1]];
    },
    publish() {
      common_vendor.tr.callFunction({
        name: "fun",
        data: {
          opi: "publish",
          content: this.content
        }
      }).then((res) => {
        common_vendor.index.__f__("log", "at pages/addBill/index.vue:116", res);
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.showType),
    b: common_vendor.o((...args) => $options.typeCChange && $options.typeCChange(...args)),
    c: common_vendor.o((...args) => $options.typeChange && $options.typeChange(...args)),
    d: $data.typeIndex,
    e: $data.type,
    f: common_vendor.t($data.date),
    g: common_vendor.o((...args) => $options.dateChange && $options.dateChange(...args)),
    h: $data.date,
    i: common_vendor.o((...args) => $options.formSubmit && $options.formSubmit(...args)),
    j: common_vendor.o((...args) => $options.formReset && $options.formReset(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/addBill/index.js.map
