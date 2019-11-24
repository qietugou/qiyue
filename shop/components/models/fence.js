import Cell from "./cell"

export default class Fence {
    cells = []
    specs
    title
    id
    constructor(specs) {
        this.specs = specs
        this.title = specs[0].key
        this.id = specs[0].key_id
    }
    init() {
        this._initCells()
    }
    _initCells() {
        this.specs.forEach((s) => {
            const existed = this.cells.some(c => {  //去重
                return c.id == s.value_id
            })
            if (existed) {
                return
            }
            const cell = new Cell(s);
            this.cells.push(cell)
        })
    }
    setFenceSketch(skuList) {
        this.cells.forEach(c => {
            this._setCellSkuImgCell(c, skuList)
        })
    }
    _setCellSkuImgCell(cell, skuList) {
        const specCode = cell.getCellCode()
        const matchedSku = skuList.find(s => s.code.includes(specCode))
        if (matchedSku) {
            cell.skuImg = matchedSku.img
        }
    }
    pushValueTitle(title) {
        this.valueTitles.push(title)
    }
}