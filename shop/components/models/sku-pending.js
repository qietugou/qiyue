export default class SkuPending {
    pending = []

    constructor() {

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