import {CellStatus} from "../../core/enum"
export default class Cell {
    title
    id
    status = CellStatus.WAITING
    spec
    constructor(spec) {
        this.title = spec.value
        this.id = spec.value_id
        this.spec = spec
    }
    getCellCode() {
        return this.spec.key_id + '-' + this.spec.value_id
    }
}