import { getCourseListRequest } from '../../api/main'

const courseCacheKey = 'course'
const courseColorKey = 'courseColor'
// pages/course/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nowWeek: 1,
    totalWeek: 20,
    courseList: [],
    showSwitchWeek: false,
    weekDayCount: 7,
    weekIndexText: ['一', '二', '三', '四', '五', '六', '日'],
    startDate: '2023/02/20',
    nowMonth: 2,
    colorList: [
      '#3E5F44',
      '#EB5E28',
      '#93DA97',
      '#5E936C',
      '#FF9B2F',
      '#932F67',
      '#065084',
      '#DCC5B2',
      '#CFFFE2',
      '#0D5EA6',
      '#C83F12',
      '#687FE5',
      '#FFDCDC',
      '#FFD586'
    ],
    courseColor: {}
  },
  onLoad (option) {
    const { windowWidth } = wx.getSystemInfoSync()
    this.setData({
      windowWidth
    })
    this.getWeekDates()
    this.getNowWeek()
    this.getData()
  },
  switchWeek (e) {
    const week = e.currentTarget.dataset.week
    this.setData({
      nowWeek: week,
      showSwitchWeek: false
    })
    this.switchWeekFn(week)
  },
  selectWeek () {
    this.setData({
      showSwitchWeek: true
    })
  },
  hideSwitchWeek () {
    this.setData({
      showSwitchWeek: false
    })
  },
  // 切换周数
  switchWeekFn (week) {
    this.setData({
      nowWeek: week
    })
    this.getWeekDates()
  },

  getWeekDates () {
    const startDate = new Date(this.data.startDate)
    const addTime = (this.data.nowWeek - 1) * 7 * 24 * 60 * 60 * 1000
    const firstDate = startDate.getTime() + addTime
    const { month } = this.getDateObject(new Date(firstDate))
    const weekDates = []
    //第几周加起始的时间戳
    for (let i = 0; i < this.data.weekDayCount; i++) {
      const date = new Date(firstDate + i * 24 * 60 * 60 * 1000)
      const { year, month, day } = this.getDateObject(date)
      weekDates.push(day)
    }
    //第几天,转化为时间
    this.setData({
      nowMonth: month,
      weekCalendar: weekDates
    })
  },
  getDateObject (date = new Date()) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return { year, month, day }
  },
  getNowWeek () {
    const nowDate = new Date().getTime()
    const startDate = new Date(2020, 1, 1).getTime()
    const time = nowDate - startDate
    const week = Math.floor(time / (1000 * 60 * 60 * 24 * 7)) + 1
    this.setData({
      week
    })
    this.getWeekDates()
  },
  getData () {
    const that = this
    const cache = wx.getStorageSync(courseCacheKey)
    const courseColor = wx.getStorageSync(courseColorKey)
    if (cache) {
      that.setData({
        courseList: cache,
      })
      if(!courseColor){
        this.buildCourseColor()
      }else{
        this.setData({
          courseColor: courseColor
        })
      }
      return
    }
    this.update()
  },

  update () {
    const that = this
    getCourseListRequest().then(res => {
      that.setData({
        courseList: res.data
      })
      this.buildCourseColor()
      wx.setStorageSync(courseCacheKey, res.data)
    })
  },
  swiperSwitchWeek (event) {
    const index = event.detail.current
    this.switchWeekFn(index + 1)
  },
  buildCourseColor() {
    const courseColor = {}
    let colorIndex = 0
    this.data.courseList.map(item => {
      if (courseColor[item.name] === undefined) {
        courseColor[item.name] = this.data.colorList[colorIndex]
        colorIndex++
      }
    })
    wx.setStorageSync(courseColorKey, courseColor)
    this.setData({
      courseColor
    })
  },
})
