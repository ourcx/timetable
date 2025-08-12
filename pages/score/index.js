// pages/score/score.js
import { getScoreListRequest, getRawScoreListRequest } from '../../api/main'
Page({
  data: {
    type: 1,
    list: [],
    termIndex: 0
  },

  onLoad(options) {
    this.getList();
  },
  
  getList() {
    const that = this;
    const { type } = this.data;
    
    // 修复点4：添加加载状态
    wx.showLoading({ title: '加载中...' });
    
    const request = type === 1 
      ? getScoreListRequest() 
      : getRawScoreListRequest();
    
    request.then(res => {
      console.log("成绩获取成功:", res);
      that.setData({
        list: res.data || []  // 确保总是数组
      });
    }).catch(err => {
      console.error("成绩获取失败:", err);
    }).finally(() => {
      wx.hideLoading();
    });
  },
  
  // 修复点5：切换类型时重新获取数据
  changeScoreType(e) {
    const type = parseInt(e.currentTarget.dataset.type);
    
    this.setData({
      type: type,
      list: []  // 清空旧数据
    }, () => {
      this.getList();  // 在回调中获取新数据
    });
  },
  changeTerm(e) {
    const index = e.currentTarget.value;
    this.setData({
      termIndex: index
    })
    //切换到下一页什么的
  }
})
