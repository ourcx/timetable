// pages/course/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    courseList: [
      {
        name: 'c语言',
        week: 2,
        section: 1,
        sectionCount: 1,
        address: '理科南302',
        color: '#FF0000'
      },
      {
        name: '高等数学',
        week: 3,
        section: 3,
        sectionCount: 2,
        address: '文清楼215',
        color: '#00FF00'
      },
      {
        name: '大学英语',
        week: 4,
        section: 1,
        sectionCount: 2,
        address: '文新楼101',
        color: '#0000FF'
      },
      {
        name: '数据结构',
        week: 5,
        section: 5,
        sectionCount: 1,
        address: '计算机楼306',
        color: '#FFFF00'
      },
      {
        name: '操作系统',
        week: 6,
        section: 7,
        sectionCount: 2,
        address: '理科北楼410',
        color: '#FF00FF'
      },
      {
        name: '计算机网络',
        week: 7,
        section: 9,
        sectionCount: 1,
        address: '工程南楼208',
        color: '#00FFFF'
      }
    ]
  },
  onLoad(option){
    const {windowWidth}=wx.getSystemInfoSync()
    this.setData({
      windowWidth,
    })
  }
})
