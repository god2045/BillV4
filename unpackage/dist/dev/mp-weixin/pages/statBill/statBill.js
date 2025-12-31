"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_qiun_data_charts2 = common_vendor.resolveComponent("qiun-data-charts");
  _easycom_qiun_data_charts2();
}
const _easycom_qiun_data_charts = () => "../../uni_modules/qiun-data-charts(uni_modules)/components/qiun-data-charts/qiun-data-charts.js";
if (!Math) {
  _easycom_qiun_data_charts();
}
const _sfc_main = {
  __name: "statBill",
  setup(__props) {
    let chartData = common_vendor.ref({});
    common_vendor.onShow(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "column",
          chartData: common_vendor.unref(chartData),
          collection: "message",
          field: "money",
          where: false,
          groupby: "typeLX",
          ["group-field"]: "count(*) as _id"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-02368a52"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/statBill/statBill.js.map
