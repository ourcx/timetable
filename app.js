// app.js
import localConfigs from './config'

App({
  onLaunch () {
     wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
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
    if (!localConfigs[key]) {
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
