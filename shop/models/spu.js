import Http from '../utils/http'

export default class Spu {

  static async getDetail(id) {
    return await Http.request({
      url: `spu/id/${id}/detail`
    })
  }
}
