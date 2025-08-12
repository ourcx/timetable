// app.js
import localConfigs from './config'

App({
  onLaunch () {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  },

  //获得配置
  getConfig (key = '') {
    if (key === '') {
      return localConfigs
    }
    if (key in localConfigs) {
      console.warn(`${key}config 不存在`)
      return undefined
    }
    //区分环境
    if (
      typeof localConfigs[key] !== null &&
      typeof localConfigs[key] === 'object'
    ) {
      const env = this.getConfig('env')
      //当前环境类型
      return localConfigs[key][env]
    }
    return localConfigs[key]
  }
})
