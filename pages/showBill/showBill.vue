<template>
  <view class="title">
    <view class="card">
      <view v-for="item in billList" :key="item._id" class="bList">
        <view class="icard">{{item.money}}</view>
        <view class="icard">{{item.date}}</view>
        <view class="icard">{{item.typeLX}}</view>
        <view class="icard">{{item.typeLB}}</view>
        <view class="icard">{{item.content}}</view>
        <view class="icard"></view>
      </view>
    </view>
  </view>

</template>

<script setup>
  import {
    onMounted,
    ref
  } from 'vue';
  let billList = ref()

  onMounted(
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

      .bList {
        margin: 20rpx;
        border: 1px solid #ccc;
        width: 80vw;
        background-color: deepskyblue;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-around;
        flex-wrap: wrap;

        .icard {
          width: 40%;
          padding: 5rpx 10rpx;
          border-bottom: 1px solid #666;
        }
      }
    }
  }
</style>