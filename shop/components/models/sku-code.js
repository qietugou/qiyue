import { combination } from "../../utils/util"

export default class SukCode {
    code 
    spuId
    totalSegments = []
    constructor(code) {
        this.code = code
        this._splitToSegments()
    }
    _splitToSegments() {
      const [spuId, spec] = this.code.split('$')
      this.spuId = spuId //spu id
      const specCodeArray = spec.split('#')
      
      const length = specCodeArray.length
      // 选1 选 2 选3
      for (let i = 1; i <= length; i++) {
          const segments = combination(specCodeArray, i)
          const newSegments = segments.map(segs => {
            return segs.join('#')
          })
          this.totalSegments = this.totalSegments.concat(newSegments)
      }
    }
}