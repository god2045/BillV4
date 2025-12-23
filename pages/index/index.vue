<template>
  <view class="content">
    <input type="text" class="input" v-model="content" placeholder="留言" />
    <button type="primary" @click="publish()" size="mini">发布</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        content: ''
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
  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    margin: 50rpx;
  }

  .input {
    border-bottom: 1px solid #ccc;
    height: 100rpx;
    padding: 6px;
    width: 100%;
  }

  .content>button {
    margin: 10rpx;
  }

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }
</style>