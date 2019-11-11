// components/spu-preview/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: Object
  },
  observers: {
    data:function(data){
      if (!data || !data.tags) {
        return
      }
      const tags = data.tags.split('$')
      this.setData({
        tags
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    tags: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onItemTap(event){
      const pid = event.currentTarget.dataset.pid
      wx.navigateTo({
        url: `/pages/detail/detail?pid=${pid}`,
      });
    }
  }
})
