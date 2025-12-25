"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "showBill",
  setup(__props) {
    let billList1 = common_vendor.ref(billData());
    common_vendor.ref([
      {
        id: "11",
        name: "yi"
      },
      {
        id: "22",
        name: "er"
      },
      {
        id: "33",
        name: "san"
      },
      {
        id: "44",
        name: "si"
      }
    ]);
    function billData() {
      common_vendor.tr.callFunction({
        name: "fun",
        data: {
          api: "showBill"
        }
      }).then((res) => {
        const result = res.result;
        const detail = result.data;
        common_vendor.index.__f__("log", "at pages/showBill/showBill.vue:43", detail);
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(billList1))
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/showBill/showBill.js.map
