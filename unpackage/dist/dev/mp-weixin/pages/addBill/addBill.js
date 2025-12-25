"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "addBill",
  setup(__props) {
    let [date, money, content] = [common_vendor.ref(formatTime()), common_vendor.ref(""), common_vendor.ref("")];
    const typeC1 = ["支出", "收入"];
    const typeC2 = [
      ["餐饮", "其他支出"],
      ["工资", "投资", "其他收入"]
    ];
    let type = common_vendor.ref([typeC1, typeC2[0]]);
    let typeIndex = common_vendor.ref([0, 0]);
    let showType = common_vendor.computed(() => type.value[0][typeIndex.value[0]] + "-" + type.value[1][typeIndex.value[1]]);
    function formatTime() {
      const now = /* @__PURE__ */ new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const formattedTime = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
      return formattedTime;
    }
    function formSubmit(e) {
      let formdata = e.detail.value;
      if (!formdata.billType || !formdata.money || !formdata.billDate) {
        common_vendor.index.__f__("log", "at pages/addBill/addBill.vue:63", "请输入必填项");
        common_vendor.index.showToast({
          title: "请输入必填项",
          icon: "error"
        });
        return;
      }
      let typeLX = type.value[0][formdata.billType[0]];
      let typeLB = type.value[1][formdata.billType[1]];
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
        common_vendor.index.__f__("log", "at pages/addBill/addBill.vue:83", res);
        common_vendor.index.showToast({
          title: "添加成功",
          icon: "success"
        });
        formReset();
      });
    }
    function formReset(e) {
      typeIndex.value = [0, 0];
      type.value = [typeC1, typeC2[0]];
      date.value = formatTime();
      money.value = content.value = "";
    }
    function typeCChange(e) {
      var data = {
        type: type.value,
        typeIndex: typeIndex.value
      };
      data.typeIndex[e.detail.column] = e.detail.value;
      switch (e.detail.column) {
        case 0:
          switch (data.typeIndex[0]) {
            case 0:
              data.type[1] = typeC2[0];
              break;
            case 1:
              data.type[1] = typeC2[1];
              break;
          }
      }
    }
    function typeChange(e) {
      common_vendor.index.__f__("log", "at pages/addBill/addBill.vue:120", showType.value);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(showType)),
        b: common_vendor.o(typeCChange),
        c: common_vendor.o(typeChange),
        d: common_vendor.unref(typeIndex),
        e: common_vendor.unref(type),
        f: common_vendor.unref(money),
        g: common_vendor.o(($event) => common_vendor.isRef(money) ? money.value = $event.detail.value : money = $event.detail.value),
        h: common_vendor.t(common_vendor.unref(date)),
        i: common_vendor.o((e) => common_vendor.isRef(date) ? date.value = e.detail.value : date = e.detail.value),
        j: common_vendor.unref(date),
        k: common_vendor.unref(content),
        l: common_vendor.o(($event) => common_vendor.isRef(content) ? content.value = $event.detail.value : content = $event.detail.value),
        m: common_vendor.o(formSubmit),
        n: common_vendor.o(formReset)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cc14e60b"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/addBill/addBill.js.map
