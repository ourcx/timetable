// pages/login/index.js
import { loginRequest } from '../../api/main'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    stuId: '',
    password: '',
    check: true //是否记住账号
  },
  onLoad (options) {},

  initAccount () {
    const accountCache = wx.getStorageSync('account')
    if (accountCache) {
      this.setData({
        ...accountCache
      })
    } else {
      wx.removeStorageSync('account')
    }
  },

  login () {
    const that = this
    const postData = {
      stuId: this.data.stuId,
      password: this.data.password
    }
    wx.showLoading({
      title: '登录中...'
    })
    //这里有一个指向的问题
    loginRequest(postData)
      .then(res => {
        wx.hideLoading()
        if (res.code == -1) {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
          return
        }
        wx.setStorageSync('token', res.data.cookie),
          that.setData({
            token: res.data.cookie
          })
        //这样来给token
        wx.showToast({
          title: `${res.msg},登录`,
          icon: 'success'
        })
        setTimeout(() => {
          wx.redirectTo({
            url: '/pages/index/index'
          })
        }, 1500)
        if (that.data.check) {
          wx.setStorageSync('account', postData)
        } else {
          wx.removeStorageSync('account')
        }
      })
      .catch(err => {
        wx.showToast({
          title: `${err.data.msg}`,
          icon: 'fail'
        })
      })
  },
  switchStatus () {
    this.setData({
      check: !this.data.check
    })
  }
})
