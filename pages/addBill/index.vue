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
        <input type="number" class="input" maxlength="300" placeholder="请输入金额" name='money' />
      </view>
      <view class="section">
        <view class="title">账单时间</view>
        <picker @change="dateChange" fields="day" :value="date" mode="date" class="input" name='billDate'>
          <view class="picker">账单时间：{{date}}</view>
        </picker>
      </view>
      <view class="section">
        <view class="title">备注</view>
        <input type="text" class="input" maxlength="300" placeholder="请输入备注" name='content' />
      </view>
      <view class="area">
        <button style="margin: 30rpx 0" type="primary" form-type="submit">提交</button>
        <button style="margin: 30rpx 0" type="warn" form-type="reset">重置</button>
      </view>
    </form>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        date: "",
        type: [
          ["支出", "收入"],
          ["餐饮", "其他支出"],
        ],
        typeIndex: [0, 0],
        showType: "支出" + "-" + "餐饮"
      }
    },

    onLoad() {

    },
    methods: {

      formSubmit: function(e) {
        var formdata = e.detail.value
        var typeLX = this.type[0][formdata.billType[0]]
        var typeLB = this.type[1][formdata.billType[1]]
        console.log(typeLB, typeLX)
        console.log(formdata)
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
        })
      },

      formReset: function(e) {
        this.showType = ''
        this.date = ''
      },

      dateChange: function(e) {
        this.date = e.detail.value
      },

      typeCChange: function(e) {
        var data = {
          type: this.type,
          typeIndex: this.typeIndex,
        };
        data.typeIndex[e.detail.column] = e.detail.value;
        switch (e.detail.column) {
          case 0:
            switch (data.typeIndex[0]) {
              case 0:
                data.type[1] = ["餐饮", "其他支出"];
                console.log(data.type);
                break;
              case 1:
                data.type[1] = ["工资", "投资", "其他收入"];
                console.log(data.type);
                break;
            }
        }
        console.log(data.type);
      },

      typeChange: function(e) {
        this.showType = this.type[0][this.typeIndex[0]] + '-' + this.type[1][this.typeIndex[1]];
      },

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
    padding: 20rpx 0;
    width: 100%;
  }

  .mg {
    margin: 30rpx 0;
  }

  .area {
    margin: 100rpx auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
</style>