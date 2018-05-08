const fetch = require('../../utils/fetch.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop: {},
    title: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.title
    })
    fetch(`shops/${options.item}`).then(res=>{
      console.log(res)
      this.setData({
        shop: res.data,
      })
    })
  },
  onReady: function () {
     wx.setNavigationBarTitle({title: this.data.title});    //分类页面标题改变
  },
  preview(e){
    // console.log(e)
    var data = e.currentTarget.dataset
    // console.log(data)
    wx.previewImage({
      current: data.current,
      urls: data.urls
    })
  }
})