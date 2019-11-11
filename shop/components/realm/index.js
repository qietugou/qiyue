import FenceGroup from "../models/fence-group"
import Judger from "../models/judger"

// components/realm/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu: Object,
    judger: Object
  },
  observers: {
    spu: function (spu) {
      if (!spu) {
        return
      }
      const fenceGroup = new FenceGroup(spu)
      fenceGroup.initFences()
      this.data.judger = new Judger(fenceGroup)
      this.bindInitData(fenceGroup)
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    fences: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindInitData(fenceGroup) {
      console.log(fenceGroup.fences)
      this.setData({
        fences: fenceGroup.fences
      })
    },
    onCellTap(event) {
      const judger = this.data.judger
      judger.judger( event.detail)
      this.setData({
        fences: judger.fenceGroup.fences
      })
    }
  }
})
