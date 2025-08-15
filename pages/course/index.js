

// pages/course/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nowWeek:1,
    totalWeek:20,
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
    ],
    showSwitchWeek: true,
    weekDayCount:7,
    weekIndexText:['一','二','三','四','五','六','日' ],
    startDate: '2023/02/20',
    nowMonth: 2,
  },
  onLoad(option){
    const {windowWidth}=wx.getSystemInfoSync()
    this.setData({
      windowWidth,
    })
    this.getWeekDates()
    this.getNowWeek()
  },
  switchWeek(e){
    const week = e.currentTarget.dataset.week
    this.setData({
      nowWeek: week,
      showSwitchWeek: false,
    })
    this.switchWeekFn(week)
  },
  selectWeek(){
    this.setData({
      showSwitchWeek: true,
    })
  },
  hideSwitchWeek(){
    this.setData({
      showSwitchWeek: false,
    })
  },
    // 切换周数
  switchWeekFn(week) {
    this.setData({
      nowWeek: week
    })
    this.getWeekDates()
  },

  getWeekDates(){
    const startDate = new Date(this.data.startDate)
    const addTime = (this.data.nowWeek-1)*7*24*60*60*1000
    const firstDate = startDate.getTime()+addTime
    const {month} = this.getDateObject(new Date(firstDate))
    const weekDates = []
    //第几周加起始的时间戳
    for (let i = 0; i < this.data.weekDayCount; i++) {
      const date = new Date(firstDate+i*24*60*60*1000)
      const {year,month,day} = this.getDateObject(date)
      weekDates.push(day)
    }
    //第几天,转化为时间
    this.setData({
      nowMonth:month,
      weekCalendar:weekDates
    })
  },
  getDateObject(date=new Date()){
    const year = date.getFullYear()
    const month = date.getMonth()+1
    const day = date.getDate()
    return {year,month,day}
  },
  getNowWeek(){
    const nowDate = new Date().getTime()
    const startDate = new Date(2020,1,1).getTime()
    const time = nowDate - startDate
    const week = Math.floor(time/(1000*60*60*24*7))+1 
    this.setData({
      week
    })
    this.getWeekDates()
  }
})

