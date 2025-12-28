"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "addBill",
  setup(__props) {
    const typeC1 = ["支出", "收入"];
    const typeC2 = [
      ["餐饮", "其他支出"],
      ["工资", "投资", "其他收入"]
    ];
    let billObject = common_vendor.ref({
      type: [typeC1, typeC2[0]],
      typeIndex: [0, 0],
      money: "",
      date: formatTime(),
      content: ""
    });
    let showType = common_vendor.computed(() => billObject.value.type[0][billObject.value.typeIndex[0]] + "-" + billObject.value.type[1][billObject.value.typeIndex[1]]);
    function formatTime() {
      const now = /* @__PURE__ */ new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const day = now.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    function formSubmit(e) {
      const {
        billType: [LX, LB],
        money,
        billDate,
        content
      } = e.detail.value;
      const typeLX = billObject.value.type[0][LX];
      const typeLB = billObject.value.type[1][LB];
      if (!typeLX || !money || !billDate) {
        return common_vendor.index.showToast({
          title: "请输入必填项",
          icon: "none"
        });
      }
      billObject.value;
      const isExpense = typeLX === "支出";
      common_vendor.tr.callFunction({
        name: "fun",
        data: {
          api: "addBill",
          typeLX,
          typeLB,
          money: isExpense ? `-${money}` : money,
          date: billDate,
          content
        }
      }).then(() => {
        common_vendor.index.showToast({
          title: "添加成功",
          icon: "success"
        });
        formReset();
      });
    }
    function formReset(e) {
      billObject.value = {
        typeIndex: [0, 0],
        date: formatTime(),
        type: [typeC1, typeC2[0]],
        money: "",
        content: ""
      };
    }
    function typeCChange(e) {
      const {
        column: col,
        value: val
      } = e.detail;
      billObject.value.typeIndex[col] = val;
      if (col === 0) {
        billObject.value.type[1] = typeC2[val];
        billObject.value.typeIndex[1] = 0;
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(showType)),
        b: common_vendor.o(typeCChange),
        c: common_vendor.unref(billObject).typeIndex,
        d: common_vendor.unref(billObject).type,
        e: common_vendor.unref(billObject).money,
        f: common_vendor.o(($event) => common_vendor.unref(billObject).money = $event.detail.value),
        g: common_vendor.t(common_vendor.unref(billObject).date),
        h: common_vendor.o((e) => common_vendor.unref(billObject).date = e.detail.value),
        i: common_vendor.unref(billObject).date,
        j: common_vendor.unref(billObject).content,
        k: common_vendor.o(($event) => common_vendor.unref(billObject).content = $event.detail.value),
        l: common_vendor.o(formSubmit),
        m: common_vendor.o(formReset)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cc14e60b"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/addBill/addBill.js.map
