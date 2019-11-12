import FenceGroup from "../models/fence-group"
import Judger from "../models/judger"
import Spu from "../../models/spu"

// components/realm/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu: Object,
  },
  observers: {
    spu: function (spu) {
      if (!spu) {
        return
      }
      if (Spu.isNoSpec(spu)) {
        this.setData({
          noSpec: true
        })
        this.bindSkuData(spu.sku_list[0])
        return //只有一个sku 无规格
      }
      const fenceGroup = new FenceGroup(spu)
      fenceGroup.initFences()
      this.data.judger = new Judger(fenceGroup)
      const defaultSku = fenceGroup.getDefaultSku()
      if (defaultSku) {
        this.bindSkuData(defaultSku)
      } else {
        this.bindSpuData()
      }
      this.bindInitData(fenceGroup)
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    fences: [],
    judger: Object,
    previewImg: String,
    title: String,
    price: Number,
    discount_price: Number,
    stock: Number,
    noSpec: Boolean
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindSpuData() {
      const spu = this.properties.spu
      this.setData({
        previewImg: spu.img,
        title: spu.title,
        price: spu.price,
        discount_price: spu.discount_price
      })
    },
    bindSkuData(sku) {
      this.setData({
        previewImg: sku.img,
        title: sku.title,
        price: sku.price,
        discount_price: sku.discount_price,
        stock: sku.stock
      })
    },
    bindInitData(fenceGroup) {
      this.setData({
        fences: fenceGroup.fences
      })
    },
    onCellTap(event) {
      const judger = this.data.judger
      const { cell, x, y } = event.detail
      judger.judger(cell, x, y)
      this.setData({
        fences: judger.fenceGroup.fences
      })
    }
  }
})
