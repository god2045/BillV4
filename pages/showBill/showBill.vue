<template>
  <view class="title">
    <view class="card">
      <view v-for="item in billList" :key="item._id" class="bList">
        <img class="icard" src="../../static/logo.png" />
        <view class="icard">
          <view class="icard-type" style="height: 61.9rpx;">{{item.typeLX}}</view>
          <view class="icard-date">{{item.date}}</view>
        </view>
        <view class="icard " style="border-left: 1.77rpx solid rgba(0, 208, 158, 1);
            border-right: 1.77rpx solid rgba(0, 208, 158, 1);">
          <text class="icard-b">{{item.typeLB}}</text>
        </view>
        <view class="icard ">
          <text class="icard-money">{{item.money}}</text>
        </view>
      </view>
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

  onShow(
    uniCloud.callFunction({
      name: "fun",
      data: {
        api: "showBill"
      }
    }).then(res => {
      const result = res.result
      const detail = result.data
      billList.value = detail
    })
  )
</script>

<style lang="scss" scoped>
  .title {
    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      background-color: rgba(241, 255, 243, 1);

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
            font-size: 26.16rpx;
            font-weight: 500;
            letter-spacing: 0rpx;
            line-height: 36.63rpx;
            color: rgba(5, 34, 36, 1);
            text-align: left;
            vertical-align: middle;
          }

          .icard-b {

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


      }
    }
  }
</style>