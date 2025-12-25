"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "showBill",
  setup(__props) {
    let billList = common_vendor.ref();
    common_vendor.onMounted(
      common_vendor.tr.callFunction({
        name: "fun",
        data: {
          api: "showBill"
        }
      }).then((res) => {
        const result = res.result;
        const detail = result.data;
        billList.value = detail;
      })
    );
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(billList), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.money),
            b: common_vendor.t(item.date),
            c: common_vendor.t(item.typeLX),
            d: common_vendor.t(item.typeLB),
            e: common_vendor.t(item.content),
            f: item._id
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d6cfe255"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/showBill/showBill.js.map
