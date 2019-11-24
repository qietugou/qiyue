import {CellStatus} from "../../core/enum"
export default class Cell {
    title
    id
    status = CellStatus.WAITING
    spec
    skuImg
    constructor(spec) {
        this.title = spec.value
        this.id = spec.value_id
        this.spec = spec
    }
    setCellStatus(status) {
        this.status = status
    }
    getCellCode() {
        return this.spec.key_id + '-' + this.spec.value_id
    }
}