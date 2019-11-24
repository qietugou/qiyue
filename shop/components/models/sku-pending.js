import Cell from "./cell"
import Joiner from "../../utils/joiner"

export default class SkuPending {
    pending = []
    size
    constructor(size) {
        this.size = size
    }
    init(sku) {
        sku.specs.forEach((s, index )=> {
            const cell = new Cell(s)
            this.insertCell(cell, index)
        })
    }
    isIntact() {
        for (let i = 0; i < this.size; i++) {
            if (this._isEmptyPart(i)) {
                return false
            }
        }
        return true
    }
    getCurrentSpecValues() {
        const values = this.pending.map(cell => {
            return cell ? cell.spec.value : null
        })
        return values
    }
    getMissingSpecKeys() {
        const keysIndex = []
        for (let i = 0; i < this.size; i++) {
            if (!this.pending[i]) {
                keysIndex.push(i)
            }
        }
        return keysIndex
    }

    getSkuCode() {
        const joiner = new Joiner('#')
        this.pending.forEach(cell => {
            const cellCode = cell.getCellCode()
            joiner.join(cellCode)
        })
        return joiner.getStr()
    }
    _isEmptyPart(index) {
       return !this.pending[index];
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