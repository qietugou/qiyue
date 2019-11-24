import Matrix from "./matrix"
import Fence from "./fence"

export default class FenceGroup {
    spu
    fences = [] //已经组装成功的数据
    skuList = []
    constructor(spu) {
        this.skuList = spu.sku_list
        this.spu = spu
    }
    getSku(code) {
        const spuCode = this.spu.id + '$' + code
        const sku = this.skuList.find(s => s.code == spuCode)
        return sku ? sku : null
    }
    getDefaultSku() {
        const defaultSkuId = this.spu.default_sku_id
        if (!defaultSkuId) {
            return 
        }
        return this.skuList.find(s => s.id === defaultSkuId)
    }
    setCellStatusById(cellId, status) {
        this.eachCell((cell) => {
            if (cellId === cell.id) {
                cell.status = status
            }
        })
    }

    setCellStatusByXY(x,y, status) {
        this.fences[x].cells[y].status = status 
    }
    initFences1() {
        const matrix = this._createMatrix(this.skuList)
        const fences = []
        let currentJ = -1;
        matrix.forEach((element, i, j) => {
            if (currentJ !== j) {
                currentJ = j
                fences[currentJ] = this._createFence(element)
            }
            fences[currentJ].pushValueTitle(element.value)
        })
        return fences
    }
    initFences() {
        const matrix = this._createMatrix(this.skuList)
        const fences = []
        const transposData = matrix.transpose()
        transposData.forEach((fence) => {
            const fenceObj = this._createFence(fence);
            fenceObj.init()
            if (this._hasSktchFence() && this._isSketchFence(fenceObj.id)) {
                fenceObj.setFenceSketch(this.skuList)
            }
            fences.push(fenceObj)
        })
        this.fences = fences
    }
    // 是否有可视规格
    _hasSktchFence() {
        return this.spu.sketch_spec_id ? true : false;
    }
    _isSketchFence(fenceId) { // 判断是否是可视规格
        return this.spu.sketch_spec_id == fenceId
    }
    eachCell(cb) {
        for(let i = 0; i < this.fences.length; i++) {
            for(let j = 0; j < this.fences[i].cells.length; j++) {
                cb(this.fences[i].cells[j], i, j)    
            }
        }
    }
    _createFence(element) {
        return new Fence(element)
    }
    _createMatrix(skuList) {
        const m = []
        skuList.forEach(sku => {
            m.push(sku.specs)
        })
        return new Matrix(m)
    }
}