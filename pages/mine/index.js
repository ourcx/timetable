const app = getApp()
const defaultAvatarUrl =
  'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    nickName: '未登录'||app.globalData.userInfo.nickName,
    theme: wx.getSystemInfoSync().theme
  },

  onChooseAvatar (e) {
    const { avatarUrl } = e.detail

    this.setData({
      avatarUrl
    })
    app.globalData.userInfo.avatarUrl = avatarUrl
  },
  formSubmit (e) {
    app.globalData.userInfo.nickName = e.detail.value.nickname
    wx.switchTab({
      url: '/pages/home/index'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    wx.onThemeChange(result => {
      this.setData({
        theme: result.theme
      })
    })
  }
})
