<template>
  <view class="title">
    <view class="card">
      <view>{{billList1}}</view>
      <!-- <view>{{item.data.typeLB}}</view> -->
    </view>
  </view>

</template>

<script setup>
  import {
    ref
  } from 'vue';
  let billList1 = ref(billData())
  let billList = ref([{
      id: "11",
      name: "yi"
    },
    {
      id: "22",
      name: "er"
    },
    {
      id: "33",
      name: "san"
    },
    {
      id: "44",
      name: "si"
    },
  ])

  function billData() {
    uniCloud.callFunction({
      name: "fun",
      data: {
        api: "showBill"
      }
    }).then(res => {
      const result = res.result
      const detail = result.data
      console.log(detail)
    })
  }
</script>

<style lang="scss" scoped>

</style>