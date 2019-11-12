import Cell from "./cell"

export default class SkuPending {
    pending = []

    constructor() {

    }
    init(sku) {
        sku.specs.forEach((s, index )=> {
            const cell = new Cell(s)
            this.insertCell(cell, index)
        })
    }

    insertCell(cell, x) {
        this.pending[x] = cell
    }
    removeCell(x) {
        this.pending[x] = null
    }
    findSelectdCell(x) {
        return this.pending[x]
    }
    isSelected(cell, x) {
        const pendingCell = this.pending[x]
        if (!pendingCell) {
            return false
        }
        return cell.id === pendingCell.id
    }
}