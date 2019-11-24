import FenceGroup from "../models/fence-group"
import Judger from "../models/judger"
import Spu from "../../models/spu"
import Cell from "../models/cell"
import Cart from "../../models/cart"

// components/realm/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu: Object,
    orderWay: String
  },
  observers: {
    spu: function (spu) {
      if (!spu) {
        return
      }
      if (Spu.isNoSpec(spu)) {
        this.processNoSpec(spu)
      } else {
        this.processHasSpec(spu)
      }
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
    noSpec: Boolean,
    isSkuIntact: Boolean,
    currentSkuCount: Cart.SKU_MIN_COUNT
  },

  /**
   * 组件的方法列表
   */
  methods: {
    processNoSpec(spu){
      this.setData({
        noSpec: true
      })
      this.bindSkuData(spu.sku_list[0])
      this.setStockStatus(spu.sku_list[0].stock, this.data.currentSkuCount)
       //只有一个sku 无规格
    },
    processHasSpec(spu){
      const fenceGroup = new FenceGroup(spu)
      fenceGroup.initFences()
      this.data.judger = new Judger(fenceGroup)
      const defaultSku = fenceGroup.getDefaultSku()
      if (defaultSku) {
        this.bindSkuData(defaultSku)
        this.setStockStatus(defaultSku.stock, this.data.currentSkuCount)
      } else {
        this.bindSpuData()
      }
      this.bindTipData()
      this.bindFenceGroupData(fenceGroup)
    },
    triggerSpecEvent() {
      this.tiggerEvent('specchage', {
        skuIntact: this.data.judger.isSkuIntact(),
        currentValue: this.data.judger.getCurrentValues(),
        missingKeys: this.data.judger.getMissingKeys(),
      })
    },
    bindTipData() {
      this.setData({
        isSkuIntact: this.data.judger.isSkuIntact(),
        currentValue: this.data.judger.getCurrentValues(),
        missingKeys: this.data.judger.getMissingKeys(),
      })
      this.triggerSpecEvent()
    },
    bindSpuData() {
      const spu = this.properties.spu
      this.setData({
        previewImg: spu.img,
        title: spu.title,
        price: spu.price,
        discount_price: spu.discount_price,
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
    bindFenceGroupData(fenceGroup) {
      this.setData({
        fences: fenceGroup.fences
      })
    },
    setStockStatus(stock, currentStock){
      this.setData({
        outStock: this.isOutOfStock(stock, currentStock)
      })
    },
    isOutOfStock(stock, currentStock) { //判断库存
        return stock < currentStock
    },
    onSelectCount(event) {
       this.data.currentSkuCount = event.detail.count
       const isSkuIntact = this.data.judger.isSkuIntact()
       if (isSkuIntact) {
           const currentSku = this.data.judger.getDeterminateSku()
           this.setStockStatus(currentSku.stock, this.data.currentSkuCount)
       }
    },
    onCellTap(event) {
      const judger = this.data.judger
      let { cell, x, y } = event.detail
      const cellObj = new Cell(cell.spec) //转成模型
      cellObj.setCellStatus(cell.status)
      judger.judger(cellObj, x, y)
      const isSkuIntact = judger.isSkuIntact()
      if (isSkuIntact) {
          const currentSku = judger.getDeterminateSku()
          this.bindSkuData(currentSku)
          this.setStockStatus(currentSku.stock, this.data.currentSkuCount)
      }
      this.bindTipData()
      this.bindFenceGroupData(judger.fenceGroup)
    }
  }
})
