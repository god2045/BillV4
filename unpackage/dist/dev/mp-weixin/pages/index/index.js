"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let userName = common_vendor.ref("test");
    let billCount = common_vendor.ref("100");
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(userName)),
        b: common_vendor.t(common_vendor.unref(billCount))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
