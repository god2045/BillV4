"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "showBill",
  setup(__props) {
    let billList = common_vendor.ref();
    function formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    function getCurrentMonthRange() {
      const now = /* @__PURE__ */ new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      return {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate)
      };
    }
    function getCurrentQuarterRange() {
      const now = /* @__PURE__ */ new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      let quarterStartMonth;
      let quarterEndMonth;
      if (month >= 1 && month <= 3) {
        quarterStartMonth = 1;
        quarterEndMonth = 3;
      } else if (month >= 4 && month <= 6) {
        quarterStartMonth = 4;
        quarterEndMonth = 6;
      } else if (month >= 7 && month <= 9) {
        quarterStartMonth = 7;
        quarterEndMonth = 9;
      } else {
        quarterStartMonth = 10;
        quarterEndMonth = 12;
      }
      const startDate = new Date(year, quarterStartMonth - 1, 1);
      const endDate = new Date(year, quarterEndMonth, 0);
      return {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate)
      };
    }
    let dayDate = common_vendor.ref(formatDate(/* @__PURE__ */ new Date()));
    function dateBill(startDate, endDate) {
      common_vendor.index.__f__("log", "at pages/showBill/showBill.vue:99", startDate);
      common_vendor.index.__f__("log", "at pages/showBill/showBill.vue:100", endDate);
      common_vendor.tr.callFunction({
        name: "fun",
        data: {
          api: "showBill",
          startDate,
          endDate
        }
      }).then((res) => {
        common_vendor.index.__f__("log", "at pages/showBill/showBill.vue:109", res);
        const result = res.result;
        billList.value = result.data;
        billList.value.map((item) => item["isType"] = item.typeLX === "支出" ? "red" : "green");
      });
    }
    common_vendor.onShow(() => {
      dateBill(dayDate.value, dayDate.value);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => dateBill(common_vendor.unref(dayDate), common_vendor.unref(dayDate))),
        b: common_vendor.o(($event) => dateBill(getCurrentMonthRange().startDate, getCurrentMonthRange().endDate)),
        c: common_vendor.o(($event) => dateBill(getCurrentQuarterRange().startDate, getCurrentQuarterRange().endDate)),
        d: common_vendor.f(common_vendor.unref(billList), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.typeLX),
            b: item.isType,
            c: common_vendor.t(item.date),
            d: common_vendor.t(item.typeLB),
            e: common_vendor.t(item.content),
            f: common_vendor.t(item.money),
            g: item._id
          };
        }),
        e: common_assets._imports_0
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d6cfe255"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/showBill/showBill.js.map
