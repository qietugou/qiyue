export default class Matrix {
    m = []
    constructor(spuList){
        this.m = spuList
    }

    get rowNum() {
        return this.m.length
    }

    get colsNum() {
        return this.m[0].length
    }

    forEach(cb) {
        for (let j = 0; j < this.colsNum; j++) {
            for(let i = 0; i < this.rowNum; i++) {
                const element = this.m[i][j]
                cb(element, i, j)
            }
        }
    }
    transpose() { //矩阵转置
        const desArr = []
        for (let j = 0; j < this.colsNum; j++) {
            desArr[j] = []
            for(let i = 0; i < this.rowNum; i++) {
                desArr[j][i] = this.m[i][j]
            }
        }
        return desArr
    }
}