"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      content: ""
    };
  },
  onLoad() {
  },
  methods: {
    publish() {
      common_vendor.tr.callFunction({
        name: "fun",
        data: {
          opi: "publish",
          content: this.content
        }
      }).then((res) => {
        common_vendor.index.__f__("log", "at pages/index/index.vue:27", res);
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.content,
    b: common_vendor.o(($event) => $data.content = $event.detail.value),
    c: common_vendor.o(($event) => $options.publish())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
