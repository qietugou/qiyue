import Paging from '../utils/paging'

export default class SpuPaging {
  static locationD = 'a-2'
  static getLatestPaging() {
    return new Paging(
      {
        url: `spu/latest`
      },
      9
    )
  }
}
