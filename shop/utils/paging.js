import Http from './http'
export default class Paging {
  start
  count
  request
  locker = false
  url
  moreData = true
  accumlator = []
  constructor(request, count = 10, start = 0) {
    this.count = count
    this.start = start
    this.request = request
    this.url = request.url
  }
  async getMoreData() {
    if (!this.moreData || !this._getLocker()) {
       return
    }
    const data = await this._actualGetData()
    this._releaseLocker()
    return data
  }
  _getCurrentReg() {
    let url = this.url
    const params = `start=${this.start}&count=${this.count}`
    if (url.includes('?')) {
      url += '&' + params
    } else {
      url += '?' + params
    }
    this.request.url = url
    return this.request
  }
  async _actualGetData() {
    const res = this._getCurrentReg()
    let paging = await Http.request(this._getCurrentReg())
    if (!paging) {
      return null
    }
    if (paging.total === 0) {
      return {
        empty: true,
        items: [],
        moreData: false,
        accumlator: []
      }
    }
    this.moreData = Paging._moreData(paging.total_page, paging.page)
    if (this.moreData) {
      this.start += this.count
    }
    this._accumlator(paging.items)
    return {
      empty: false,
      items: paging.items,
      moreData: this.moreData,
      accumlator: this.accumlator
    }
  }
  _accumlator(items) {
    this.accumlator = this.accumlator.concat(items)
  }
  static _moreData(totalPage, pageNum) {
    return pageNum < totalPage - 1
  }
  _getLocker() {
    if (this.locker) {
      return false
    }
    this.locker = true
    return true
  }
  _releaseLocker() {
    this.locker = false
  }
}
