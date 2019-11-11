import { config } from '../config/config'
import { promisic } from './util'
export default class Http {
  static async request({ url, data, method = 'GET' }) {
    const res = await promisic(wx.request)({
      url: `${config.apiBaseUrl}${url}`,
      data,
      method,
      header: {
       'content-type': 'application/json',
        appkey: config.appkey
      },
      dataType: 'json',
      responseType: 'text',
    })
    return res.data
  }
}
