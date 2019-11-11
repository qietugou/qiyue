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
            fences.push(fenceObj)
        })
        this.fences = fences
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