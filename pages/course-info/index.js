// pages/course-info/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoRef: [
      {
        key: 'rawWeeks',
        title: '周数'
      },
      {
        key: 'rawSection',
        title: '节数'
      },
      {
        key: 'address',
        title: '地址'
      },
      {
        key: 'teacher',
        title: '老师'
      },
      {
        key: 'credit',
        title: '学分'
      },
      {
        key: 'category',
        title: '类型'
      },
      {
        key: 'method',
        title: '考查'
      }
    ]
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let info = options.info||''
    if(info===''){
      wx.showToast({
        title: '课程不存在',
        icon: 'none'
      })
      setTimeout(()=>{
        wx.navigateBack()
      },1000)
      return 
    }
    info = JSON.parse(info)
    this.setData({
      info
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})