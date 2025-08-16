const { getNowWeek } = require('../../utils/util')

// index.js
const defaultAvatarUrl =
  'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    navList: [
      {
        title: '课表',
        icon: '/pubilc/容器.png',
        path: '/pages/course/index'
      },
      {
        title: '成绩',
        icon: '/pubilc/容器 1.png',
        path: '/pages/score/index'
      },
      {
        title: '考勤',
        icon: '/pubilc/容器 2.png',
        path: '/pages/attendance/index'
      },
      {
        title: '校历',
        icon: '/pubilc/容器 3.png',
        path: '/pages/calendar/index'
      }
    ],
    startDate: '2023/02/20',
    totalWeek: 20,
    todayCourseList: []
  },
  onLoad () {
    this.getTodayCourseList()
  },
  nav (e) {
    const index = e.currentTarget.dataset.index
    const path = this.data.navList[index].path
    wx.navigateTo({
      url: path,
      fail: () => {
        wx.switchTab({
          url: path
        })
      }
    })
  },
  getTodayCourseList () {
    const todayWeek = new Date().getDay()
    const todayWeeks = getNowWeek(this.data.startDate, this.data.totalWeek)
    const courseList = wx.getStorageSync('course')
    wx.setStorageSync('todayWeeks', todayWeeks)
    const todayCourseList = courseList.filter(item => {
      return item.week == todayWeek && item.weeks.indexOf(todayWeeks) > -1
    })
    todayCourseList.sort((a, b) => {
      return a.section - b.section
    })
    this.setData({
      todayWeek,
      todayWeeks,
      todayCourseList
    })
  }
})
