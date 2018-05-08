const fetch = require('../../utils/fetch.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: {},
    shops: [],
    page: 0,
    limit: 20,
    hasmore: true,
    flag: true,
    input: '',
    keywords: ''
  },

  loadmore() {
    if (!this.data.hasmore) return;
    if (!this.data.flag) return;        //设置flag来判断上啦加载时该页数据是否请求成功，解决在某一页请求的途中，多次上拉加载，导致后面的几页也会向服务器发送请求
    this.setData({
      flag: false
    })
    this.data.page++;
    return fetch(`categories/${this.data.category.cat}/shops`,this.data.keywords?{_page: this.data.page, _limit: this.data.limit,q:this.data.keywords}:{_page: this.data.page, _limit: this.data.limit}).then(res=>{
      // console.log(res)
      const totalcount = parseInt(res.header['X-Total-Count']);   //请求的数据总数量
      // console.log(totalcount)
      const hasmore = this.data.page * this.data.limit < totalcount;  
      this.setData({
        shops: this.data.shops.concat(res.data),
        hasmore: hasmore,
        flag: true
      })
    })       
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.setData({
      category: options
    })
    this.loadmore()
    // loadmore()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
     wx.setNavigationBarTitle({title: this.data.category.title});    //分类页面标题改变
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      page: 0,
      shops: [],
      hasmore: true
    })
    this.loadmore().then(()=>{
      wx.stopPullDownRefresh()             //下拉加载 当请求成功后就立马停止下拉的显示
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(111)
    this.loadmore()
  },

  search(e){                     //将用户输入与数据进行绑定
    console.log(e.detail.value)
    this.setData({
      input: e.detail.value
    })
  },
  searchkeywords(){
    this.setData({
      page: 0,
      shops: [],
      hasmore: true,
      keywords: this.data.input          //点击时获取到用户输入的关键字
    })
    this.loadmore()
  }
})