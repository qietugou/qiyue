import Theme from '../../models/theme'
import Banner from '../../models/banner'
import Category from '../../models/category'
import Activity from '../../models/activity'
import SpuPaging from '../../models/spu-paging'
// pages/home/home.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    themeA: null,
    themeE: null,
    bannerB: null,
    themeF: null,
    themeH: null,
    grid: [],
    ActivityD: null,
    themeESpu: [],
    bannerG: null,
    spuPaging: null,
    loadingType: 'loading'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initAllData()
    this.initBottomSpuList()
  },
  async initAllData() {
    const theme = new Theme()
    await theme.getThemes()
    const themeA = theme.getHomeLocationA()
    const themeE = theme.getHomeLocationE()
    const themeF = theme.getHomeLocationF()
    const themeH = theme.getHomeLocationH()
    let themeESpu = []
    if (themeE.online) {
      const data = await Theme.getHomeLocationSpu()
      if (data && data.spu_list) {
        themeESpu = data.spu_list.slice(0, 8)
      }
    }
    const bannerB = await Banner.getHomeLocationB()
    const bannerG = await Banner.getHomeLocationG()
    const grid = await Category.getHomeLocationC()
    const ActivityD = await Activity.getHomeLocationD()

    this.setData({
      themeA,
      bannerB,
      bannerG,
      themeE,
      themeF,
      themeH,
      grid,
      ActivityD,
      themeESpu,
    })
  },
  async initBottomSpuList() {
    this.spuPaging = SpuPaging.getLatestPaging()
    const data = await this.spuPaging.getMoreData()
    if (!data) {
      return
    }
    wx.lin.renderWaterFlow(data.items)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
    const data = await this.spuPaging.getMoreData()
    if (!data) {
      return
    }

    if (!data.moreData) {
      console.log(11111)
      this.setData({
        loadingType: 'end'
      })
    }
    wx.lin.renderWaterFlow(data.items)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { }
})
