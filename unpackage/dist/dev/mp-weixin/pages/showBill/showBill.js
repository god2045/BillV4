"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "showBill",
  setup(__props) {
    let dayDate = common_vendor.ref(formatDate(/* @__PURE__ */ new Date()));
    let billList = common_vendor.ref([]);
    let status = common_vendor.ref("true");
    let selectObject = common_vendor.ref({
      startDate: dayDate,
      endDate: dayDate,
      page: -1,
      size: 10
    });
    let count = common_vendor.ref(0);
    let showNotData = common_vendor.ref(false);
    common_vendor.ref({
      startDate: "",
      endDate: "",
      page: "",
      size: ""
    });
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
    function dateBill(startDate, endDate, page = 0, size = 10) {
      const select = selectObject.value;
      const sameParams = startDate === select.startDate && endDate === select.endDate && page === select.page;
      if (!sameParams) {
        billList.value = [];
        count.value = 0;
      }
      const currentPage = sameParams ? page + 1 : page;
      selectObject.value = {
        startDate,
        endDate,
        page: currentPage,
        size
      };
      common_vendor.tr.callFunction({
        name: "fun",
        data: {
          api: "showBill",
          startDate,
          endDate,
          page: currentPage * 10,
          size
        }
      }).then((res) => {
        common_vendor.index.__f__("log", "at pages/showBill/showBill.vue:150", res);
        const result = res.result;
        count.value += result.affectedDocs;
        showNotData.value = count.value <= 0;
        status.value = !(result.data.length === 0);
        if (status.value) {
          result.data.map((item) => ({
            ...item,
            content: item.content ? `(${item.content})` : "",
            isType: item.typeLX === "支出" ? "red" : "green"
          }));
          billList.value = [...billList.value, ...result.data];
        }
      });
    }
    function scrollLower(type) {
      let select = selectObject.value;
      if (type === true) {
        dateBill(select.startDate, select.endDate, select.page, select.size);
        return;
      }
      return;
    }
    common_vendor.onShow(() => {
      dateBill(dayDate.value, dayDate.value);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => dateBill(common_vendor.unref(dayDate), common_vendor.unref(dayDate))),
        b: common_vendor.o(($event) => dateBill(getCurrentMonthRange().startDate, getCurrentMonthRange().endDate)),
        c: common_vendor.o(($event) => dateBill(getCurrentQuarterRange().startDate, getCurrentQuarterRange().endDate)),
        d: common_vendor.unref(showNotData)
      }, common_vendor.unref(showNotData) ? {} : {}, {
        e: common_vendor.f(common_vendor.unref(billList), (item, k0, i0) => {
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
        f: common_assets._imports_0,
        g: common_vendor.o(($event) => scrollLower(common_vendor.unref(status))),
        h: common_vendor.t(common_vendor.unref(selectObject).startDate),
        i: common_vendor.t(common_vendor.unref(selectObject).endDate),
        j: common_vendor.t(common_vendor.unref(count))
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d6cfe255"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/showBill/showBill.js.map
