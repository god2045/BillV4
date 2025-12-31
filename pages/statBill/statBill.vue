<template>
  <view class="charts-box">
    <qiun-data-charts type="column" :chartData="chartData" />
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
  // let opts = ref({
  //   color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
  //   padding: [15, 15, 0, 5],
  //   enableScroll: false,
  //   legend: {},
  //   xAxis: {
  //     disableGrid: true
  //   },
  //   yAxis: {
  //     data: [{
  //       min: 0
  //     }]
  //   },
  //   extra: {
  //     column: {
  //       type: "group",
  //       width: 30,
  //       activeBgColor: "#000000",
  //       activeBgOpacity: 0.08
  //     }
  //   }
  // })

  function getBillData() {
    uniCloud.callFunction({
      name: "fun",
      data: {
        api: "billData"
      }
    }).then(res) => {
      console.log(res)
      const result = res.result
      return result.data
    }
  }

  function getServerData() {
    setTimeout(() => {
      let res = {
        categories: ["2018", "2019", "2020", "2021", "2022", "2023"],
        series: [{
            name: "目标值",
            data: [35, 36, 31, 33, 13, 34]
          },
          {
            name: "完成量",
            data: [18, 27, 21, 24, 6, 28]
          }
        ]
      };
      chartData.value = JSON.parse(JSON.stringify(res));
    }, 500);
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