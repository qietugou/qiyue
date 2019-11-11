// components/cell/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cell: Object,
    x: Number,
    y: Number
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
    onTap(evevt) {
      this.triggerEvent('celltap', {
          cell: this.properties.cell,
          x: evevt.currentTarget.dataset.x,
          y: evevt.currentTarget.dataset.y
      }, {
        bubbles:true, //开启冒泡
        composed:true, //开启边界
      })
    }
  }
})
