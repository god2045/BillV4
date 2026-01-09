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
    let opts = common_vendor.ref({
      color: ["#91CB74", "#EE6666"],
      padding: [15, 15, 0, 5],
      enableScroll: false,
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        data: [{
          min: 0
        }]
      },
      extra: {
        column: {
          type: "group",
          width: 15,
          activeBgColor: "#000000",
          activeBgOpacity: 0.08
        }
      }
    });
    async function getBillData(startDate, endDate) {
      return await common_vendor.tr.callFunction({
        name: "fun",
        data: {
          api: "billData",
          startDate,
          endDate
        }
      });
    }
    function getWeekDay(day) {
      const weekDays = ["日", "一", "二", "三", "四", "五", "六"];
      return `星期${weekDays[day]}`;
    }
    function getLastSevenDays() {
      const days = [];
      const today = /* @__PURE__ */ new Date();
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        days.push({
          date: `${year}-${month}-${day}`,
          // 完整日期
          year,
          month,
          day,
          week: getWeekDay(date.getDay()),
          // 星期几
          timestamp: date.getTime()
          // 时间戳
        });
      }
      return days;
    }
    function generateExpenseIncomeArrays(data, dates) {
      const expenseMap = /* @__PURE__ */ new Map();
      const incomeMap = /* @__PURE__ */ new Map();
      data.forEach((item) => {
        if (item.typeLX === "支出") {
          expenseMap.set(item.date, item.total);
        } else if (item.typeLX === "收入") {
          incomeMap.set(item.date, item.total);
        }
      });
      const expenseArray = dates.map((date) => -expenseMap.get(date) || 0);
      const incomeArray = dates.map((date) => incomeMap.get(date) || 0);
      return {
        expense: expenseArray,
        income: incomeArray
      };
    }
    async function getServerData() {
      let days = getLastSevenDays();
      let date = [];
      let inData = [];
      let outData = [];
      let categories = [];
      days.map((items) => {
        categories.push(items.week);
        date.push(items.date);
      });
      const billData = await getBillData(date[0], date[6]);
      common_vendor.index.__f__("log", "at pages/statBill/statBill.vue:114", "billData的值", billData.result.data);
      const dataB = billData.result.data;
      common_vendor.index.__f__("log", "at pages/statBill/statBill.vue:116", "dataB的值", dataB);
      const inOutData = generateExpenseIncomeArrays(dataB, date);
      inData = inOutData.income;
      outData = inOutData.expense;
      common_vendor.index.__f__("log", "at pages/statBill/statBill.vue:120", inData);
      let res = {
        categories,
        series: [
          {
            name: "收入",
            data: inData
          },
          {
            name: "支出",
            data: outData
          }
        ]
      };
      chartData.value = JSON.parse(JSON.stringify(res));
    }
    common_vendor.onShow(() => {
      getServerData();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "column",
          chartData: common_vendor.unref(chartData),
          opts: common_vendor.unref(opts)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-02368a52"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/statBill/statBill.js.map
