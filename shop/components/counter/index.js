import Cart from "../../models/cart";

// components/counter/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count: {
      type: Number,
      value: Cart.SKU_MIN_COUNT
    },
    min:{
      type: Number,
      value: Cart.SKU_MIN_COUNT
    },
    max: {
      type: Number,
      value: Cart.SKU_MAX_COUNT
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onOverStep(event) {
      const minOrMaxOut = event.detail.type
      if (minOrMaxOut == 'overflow_max') {
        wx.showToast({
          title: '超出购买最大值',
          icon: 'none',
          duration: 1500
        });  
      }
      if (minOrMaxOut == 'overflow_min') {
        wx.showToast({
          title: `最少需要购买 ${Cart.SKU_MIN_COUNT} 件`,
          icon: 'none',
          duration: 1500
        });  
      }
    }
  }
})
