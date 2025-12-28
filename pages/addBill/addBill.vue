<template>
  <view class="addpage">
    <form @submit="formSubmit" @reset="formReset">
      <view class="section">
        <view class="title">类型</view>
        <picker @columnchange="typeCChange" :value="billObject.typeIndex" :range="billObject.type" mode="multiSelector"
          class="input" name='billType'>
          <view class="picker">账单类型：{{showType}}</view>
        </picker>
      </view>
      <view class="section">
        <view class="title">金额</view>
        <input type="number" class="input" maxlength="300" placeholder="请输入金额" v-model="billObject.money"
          name='money' />
      </view>
      <view class="section">
        <view class="title">账单时间</view>
        <picker @change="(e)=>billObject.date = e.detail.value" fields="day" :value="billObject.date" mode="date"
          class="input" name='billDate'>
          <view class="picker">账单时间：{{billObject.date}}</view>
        </picker>
      </view>
      <view class="section">
        <view class="title">备注</view>
        <input type="text" class="input" maxlength="300" placeholder="请输入备注" v-model="billObject.content"
          name='content' />
      </view>
      <view class="area">
        <button class="btn" type="warn" formType="reset">重置</button>
        <button class="btn" type="primary" formType="submit">提交</button>
      </view>
    </form>
  </view>
</template>

<script setup>
  import {
    ref,
    computed
  } from 'vue'
  const typeC1 = ["支出", "收入"]
  const typeC2 = [
    ["餐饮", "其他支出"],
    ["工资", "投资", "其他收入"]
  ]
  let billObject = ref({
    type: [typeC1, typeC2[0]],
    typeIndex: [0, 0],
    money: '',
    date: formatTime(),
    content: '',
  })
  let showType = computed(() => billObject.value.type[0][billObject.value.typeIndex[0]] + "-" + billObject.value.type[1]
    [billObject.value.typeIndex[1]])

  function formatTime() {
    const now = new Date()
    const year = now.getFullYear()
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    const day = now.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  function formSubmit(e) {
    const {
      billType: [LX, LB],
      money,
      billDate,
      content
    } = e.detail.value
    const typeLX = billObject.value.type[0][LX]
    const typeLB = billObject.value.type[1][LB]
    if (!typeLX || !money || !billDate) {
      return uni.showToast({
        title: "请输入必填项",
        icon: "none"
      })
    }

    const {
      type
    } = billObject.value
    const isExpense = typeLX === "支出"
    uniCloud.callFunction({
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
      uni.showToast({
        title: "添加成功",
        icon: "success"
      })
      formReset(e)
    })
  }

  function formReset(e) {
    billObject.value = {
      typeIndex: [0, 0],
      date: formatTime(),
      type: [typeC1, typeC2[0]],
      money: '',
      content: '',
    }
  }

  function typeCChange(e) {
    const {
      column: col,
      value: val
    } = e.detail
    billObject.value.typeIndex[col] = val
    if (col === 0) {
      billObject.value.type[1] = typeC2[val]
      billObject.value.typeIndex[1] = 0
    }
  }
</script>

<style lang="scss" scoped>
  .addpage {
    margin: 40rpx;
  }

  .section {
    margin: 40rpx 0 80rpx;
  }

  .title {
    font-size: 36rpx;
  }

  .input {
    margin: 30rpx 0;
    border-bottom: 1px solid #666;
    padding: 20rpx 10rpx;
    width: 100%;
  }

  .mg {
    margin: 30rpx 0;
  }

  .area {
    margin: 10rpx auto;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;

    .btn {
      margin: 30rpx 0
    }
  }
</style>