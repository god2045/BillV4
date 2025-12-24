<template>
  <view class="title">
    <text>欢迎使用账单记录系统！</text>
  </view>
  <view class="title">
    <text>用户：{{userName}}</text>
    <text>当前记录数：{{billCount}}</text>
  </view>
  <view class="option">
    <navigator url="/pages/addBill/index" hover-class="navigator-hover">
      <button type="primary">添加账单</button>
    </navigator>
    <navigator url="/pages/showBill/index" hover-class="navigator-hover">
      <button type="primary">查看账单</button>
    </navigator>
    <navigator url="/pages/statBill/index" hover-class="navigator-hover">
      <button type="primary">统计账单</button>
    </navigator>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        userName: 'test',
        billCount: '100'
      }
    },
    onLoad() {

    },
    methods: {
      publish() {
        uniCloud.callFunction({
          name: "fun",
          data: {
            opi: "publish",
            content: this.content,
          }
        }).then(res => {
          console.log(res)
        })
      }
    }
  }
</script>

<style>
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
  }

  .option navigator {
    margin: 30rpx;
    padding: auto 10rpx;
  }
</style>