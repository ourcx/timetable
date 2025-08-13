const app = getApp()
export default function createRequest (options) {
  return new Promise((resolve, reject) => {
    const token = wx.getStorageSync('token')
    // if (options.needLogin !== false && !token) {
    //   wx.showToast({
    //     title: '请先登录',
    //     icon: 'none'
    //   })
    //   setTimeout(() => {
    //     wx.navigateTo({
    //       url: '/pages/login/index'
    //     })
    //   }, 1500)
    //   return
    // }
    const baseUrl =  app.getConfig("baseUrl")
    const url = baseUrl + options.url
    const header = { token }
    let showLoading = false
    if (options.showLoading === true) {
      showLoading = true
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
    }
    //没有登录的时候的请求拦截
    wx.request({
      url,
      method: options.method || 'GET',
      data: options.data || {},
      header,
      timeout: options.timeout || 20000,
      success (res) {
        res = res.data
        console.log('res', res.code)
        switch (res.code) {
          //正常信息，返回去
          case 0:
            return resolve(res)
          //异常信息
          case -1:
            wx.showToast({
              title: res.msg,
              icon: 'none'
            })
            break
          //登录失效
          case 403:
            wx.showToast({
              title: '登录已经失效，请重新登录',
              icon: 'none'
            })
            setTimeout(() => {
              wx.redirectTo({
                url: '/pages/login/index'
              })
            }, 1000)
            break
          default:
            wx.showToast({
              title: '请求失败，请稍后重试111',
              icon: 'none'
            })
            break
        }
      },
      fail (err) {
        wx.showToast({
          title: '请求失败，请稍后重试sss',
          icon: 'none'
        })
      },
      complete (res) {
        if (showLoading) {
          wx.hideLoading()
        }
        //一定会去执行的那部分
      }
    })
  })
}
