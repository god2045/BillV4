<template>
  <view class="charts-box">
    <qiun-data-charts type="column" :chartData="chartData" :opts="opts" />
  </view>
</template>

<script setup>
  import {
    ref
  } from 'vue';
  import {
    onShow
  } from '@dcloudio/uni-app';
  let chartData = ref({})
  let opts = ref({
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
  })

  async function getBillData(startDate, endDate) {
    return await uniCloud.callFunction({
      name: "fun",
      data: {
        api: "billData",
        startDate,
        endDate
      }
    })
  }

  function getWeekDay(day) {
    const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
    return `星期${weekDays[day]}`;
  }

  function getLastSevenDays() {
    const days = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要+1
      const day = String(date.getDate()).padStart(2, '0');

      days.push({
        date: `${year}-${month}-${day}`, // 完整日期
        year: year,
        month: month,
        day: day,
        week: getWeekDay(date.getDay()), // 星期几
        timestamp: date.getTime() // 时间戳
      });
    }

    return days;
  }

  function generateExpenseIncomeArrays(data, dates) {
    // 创建支出和收入的Map
    const expenseMap = new Map();
    const incomeMap = new Map();

    // 分类存储数据
    data.forEach(item => {
      if (item.typeLX === '支出') {
        expenseMap.set(item.date, item.total);
      } else if (item.typeLX === '收入') {
        incomeMap.set(item.date, item.total);
      }
    });

    // 生成数组
    const expenseArray = dates.map(date => -expenseMap.get(date) || 0);
    const incomeArray = dates.map(date => incomeMap.get(date) || 0);

    return {
      expense: expenseArray,
      income: incomeArray
    };
  }

  async function getServerData() {
    let days = getLastSevenDays()
    let date = []
    let inData = []
    let outData = []
    let categories = []
    days.map((items) => {
      categories.push(items.week)
      date.push(items.date)
    })

    const billData = await getBillData(date[0], date[6])
    console.log("billData的值", billData.result.data)
    const dataB = billData.result.data
    console.log("dataB的值", dataB)
    const inOutData = generateExpenseIncomeArrays(dataB, date)
    inData = inOutData.income
    outData = inOutData.expense
    console.log(inData)

    let res = {
      categories,
      series: [{
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
  onShow(() => {
    getServerData()
  })
</script>

<style lang="scss" scoped>
  .charts-box {
    width: 100%;
    height: 300px;
  }
</style>