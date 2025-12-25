<template>
  <view class="addpage">
    <form @submit="formSubmit" @reset="formReset">
      <view class="section">
        <view class="title">类型</view>
        <picker @columnchange="typeCChange" @change="typeChange" :value="typeIndex" :range="type" mode="multiSelector"
          class="input" name='billType'>
          <view class="picker">账单类型：{{showType}}</view>
        </picker>
      </view>
      <view class="section">
        <view class="title">金额</view>
        <input type="number" class="input" maxlength="300" placeholder="请输入金额" v-model="money" name='money' />
      </view>
      <view class="section">
        <view class="title">账单时间</view>
        <picker @change="(e)=>date = e.detail.value" fields="day" :value="date" mode="date" class="input"
          name='billDate'>
          <view class="picker">账单时间：{{date}}</view>
        </picker>
      </view>
      <view class="section">
        <view class="title">备注</view>
        <input type="text" class="input" maxlength="300" placeholder="请输入备注" v-model="content" name='content' />
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
  let [date, money, content] = [ref(formatTime()), ref(''), ref('')]
  const typeC1 = ["支出", "收入"]
  const typeC2 = [
    ["餐饮", "其他支出"],
    ["工资", "投资", "其他收入"]
  ]
  let type = ref([typeC1, typeC2[0]])
  let typeIndex = ref([0, 0])
  let showType = computed(() => type.value[0][typeIndex.value[0]] + "-" + type.value[1][typeIndex.value[1]])

  function formatTime() {
    // 获取当前时间
    const now = new Date();
    // 获取各个时间部分
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // 月份从0开始，需要+1
    const day = now.getDate();
    const formattedTime = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return formattedTime
  }

  function formSubmit(e) {
    let formdata = e.detail.value
    if (!formdata.billType || !formdata.money || !formdata.billDate) {
      console.log("请输入必填项")
      uni.showToast({
        title: "请输入必填项",
        icon: "error",
      })
      return
    }
    let typeLX = type.value[0][formdata.billType[0]]
    let typeLB = type.value[1][formdata.billType[1]]
    uniCloud.callFunction({
      name: "fun",
      data: {
        api: "addBill",
        typeLX: typeLX,
        typeLB: typeLB,
        money: formdata.money,
        date: formdata.billDate,
        content: formdata.content,
      }
    }).then(res => {
      console.log(res)
      uni.showToast({
        title: "添加成功",
        icon: "success",
      })
      formReset(e)
    })
  }

  function formReset(e) {
    typeIndex.value = [0, 0]
    type.value = [typeC1, typeC2[0]]
    // showType.value = type.value[0][0] + "-" + type.value[1][0]
    date.value = formatTime()
    money.value = content.value = ''
  }

  function typeCChange(e) {
    var data = {
      type: type.value,
      typeIndex: typeIndex.value,
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
    console.log(showType.value)
    // showType.value = type.value[0][typeIndex.value[0]] + '-' + type.value[1][typeIndex.value[1]];
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