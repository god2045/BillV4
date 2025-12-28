<template>
  <view class="title">
    <view class="card">
      <view class="card-select">
        <button type="primary" @click="dateBill(dayDate,dayDate)">今日</button>
        <button type="primary"
          @click="dateBill(getCurrentMonthRange().startDate,getCurrentMonthRange().endDate)">本月</button>
        <button type="primary"
          @click="dateBill(getCurrentQuarterRange().startDate,getCurrentQuarterRange().endDate)">本季度</button>
      </view>
      <scroll-view class="sview" scroll-y="true">
        <view v-for="item in billList" :key="item._id" class="bList">
          <img class="icard" src="../../static/logo.png" />
          <view class="icard">
            <view class="icard-type" :style="{color:item.isType}">{{item.typeLX}}</view>
            <view class="icard-date">{{item.date}}</view>
          </view>
          <view class="icard line">
            <text class="icard-b">{{item.typeLB}}({{item.content}})</text>
          </view>
          <view class="icard ">
            <text class="icard-money">{{item.money}}</text>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>

</template>

<script setup>
  import {
    onMounted,
    ref
  } from 'vue';
  import {
    onShow
  } from '@dcloudio/uni-app'
  let billList = ref()

  function formatDate(date) {
    // const now = new Date()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function getCurrentMonthRange() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // 月份从0开始，所以要+1
    const startDate = new Date(year, month - 1, 1);
    // 获取下个月的第一天，然后减一天得到本月最后一天
    const endDate = new Date(year, month, 0);
    return {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate)
    };
  }

  function getCurrentQuarterRange() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // 月份从0开始，所以要+1
    // 计算季度
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
    // 季度开始日期
    const startDate = new Date(year, quarterStartMonth - 1, 1);
    // 季度结束日期（下个季度的第一天减一天）
    const endDate = new Date(year, quarterEndMonth, 0);
    return {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate)
    };
  }



  let dayDate = ref(formatDate(new Date()))

  // function dateSelect()

  function dateBill(startDate, endDate) {
    console.log(startDate)
    console.log(endDate)
    uniCloud.callFunction({
      name: "fun",
      data: {
        api: "showBill",
        startDate,
        endDate
      }
    }).then(res => {
      console.log(res)
      const result = res.result
      billList.value = result.data
      billList.value.map(item => item['isType'] = item.typeLX === '支出' ? 'red' : 'green')
    })
  }

  onShow(() => {
    dateBill(dayDate.value, dayDate.value)
  })
</script>

<style lang="scss" scoped>
  .title {
    background-color: rgba(241, 255, 243, 1);
    height: 100vh;

    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;

      .card-select {
        display: flex;
        justify-content: space-between;
        width: 92%;
        margin-top: 10%;
      }

      .sview {
        height: 75vh;
        margin-top: 30rpx;
        width: 80vw;
        border: 1.77rpx solid rgba(0, 98, 144, 1.0);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }

      .bList {
        margin: 21rpx;
        // border: 1px solid #ccc;
        width: 624rpx;
        height: 92.44rpx;

        display: flex;
        align-items: center;

        .icard {
          width: 20%;
          // height: 61.9rpx;
          height: 100%;
          padding: 5rpx 10rpx;
          display: flex;
          flex-direction: column;
          justify-content: center;

          .icard-date {
            font-size: 20.93rpx;
            font-weight: 600;
            letter-spacing: 0rpx;
            line-height: 29.3rpx;
            color: rgba(0, 104, 255, 1);
            text-align: left;
            vertical-align: middle;
            font-family: "Poppins", sans-serif;
          }

          .icard-type {
            height: 61.9rpx;
            font-size: 26.16rpx;
            font-weight: 500;
            letter-spacing: 0rpx;
            line-height: 36.63rpx;
            color: rgba(5, 34, 36, 1);
            text-align: left;
            vertical-align: middle;
          }

          .icard-b {
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            /* 显示行数 */
            overflow: hidden;
            text-overflow: ellipsis;
            overflow: hidden;
            font-size: 22.67rpx;
            font-weight: 300;
            letter-spacing: 0rpx;
            line-height: 26.16rpx;
            color: rgba(5, 34, 36, 1);
            text-align: center;
            vertical-align: middle;
          }

          .icard-money {
            font-size: 26.16rpx;
            font-weight: 500;
            letter-spacing: 0rpx;
            line-height: 92.44rpx;
            color: rgba(5, 34, 36, 1);
            text-align: center;
            vertical-align: middle;
          }
        }

        .line {
          border-left: 1.77rpx solid rgba(0, 208, 158, 1);
          border-right: 1.77rpx solid rgba(0, 208, 158, 1);
        }


      }
    }
  }
</style>