<template>
  <view class="title">
    <text>欢迎使用账单记录系统！</text>
  </view>
  <view class="title">
    <text>用户：{{userName}}</text>
    <text>当前记录数：{{billCount}}</text>
  </view>
  <view class="option">
    <navigator class="navigator" url="/pages/addBill/addBill" hover-class="navigator-hover">
      <button type="primary">添加账单</button>
    </navigator>
    <navigator class="navigator" url="/pages/showBill/showBill" hover-class="navigator-hover">
      <button type="primary">查看账单</button>
    </navigator>
    <navigator class="navigator" url="/pages/statBill/statBill" hover-class="navigator-hover">
      <button type="primary">统计账单</button>
    </navigator>
  </view>
</template>

<script setup>
  import {
    ref
  } from 'vue';
  let userName = ref("test")
  let billCount = ref("100")
</script>

<style lang="scss" scoped>
  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 50rpx;
    height: 200rpx;
    background-color: aliceblue;
  }

  .title>text {
    font-family: system-ui;
    font-size: 1.2rem;
  }

  .option {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;

    .navigator-hover {
      background-color: aliceblue;
    }
  }

  .option {
    .navigator {
      margin: 30rpx;
      padding: auto 10rpx;
    }

  }
</style>