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
        common_vendor.index.__f__("log", "at pages/showBill/index.vue:30", res);
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/showBill/index.js.map
