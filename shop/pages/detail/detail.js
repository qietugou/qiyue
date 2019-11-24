import Spu from "../../models/spu"
import { ShoppingWay } from "../../core/enum"

// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    spu: null,
    showRealm: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const {pid} = options
    const spu = await Spu.getDetail(pid)
    this.setData({
      spu
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onGoToHome(event) {
    wx.switchTab({
       url: '/pages/home/home',
     });   
     console.log(1)
  },
  onGoToCart(event) {
    wx.switchTab({
      url: '/pages/cart/cart',
    });
  },
  onAddToCart(event) {
    this.setData({
      showRealm: true,
      orderWay:ShoppingWay.CART
    })
  },
  onBuy(event) {
    this.setData({
      showRealm: true,
      orderWay:ShoppingWay.BUY
    })
  }
})