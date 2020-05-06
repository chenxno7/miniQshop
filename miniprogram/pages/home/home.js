// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners:[],
    navIcon:[],
    floorMsg:[]
  },

  getData(url,type){
    wx.cloud.callFunction({
      name:'getData',
      data:{url},
      success:res=>{
        let result=JSON.parse(res.result)
        if(type=='banner'){
          this.setData({
            banners:result.message
          })
        }else if(type=='nav'){
          this.setData({
            navIcon:result.message
          })
        }else if(type=='floor'){
          this.setData({
            floorMsg:result.message
          })
        }
      }
    })
  },

  toDetail(e){
    console.log(e.target.dataset)
    let {url}=e.target.dataset;
    url=url.replace('main','goods_detail')
    wx.navigateTo({
      url
    })
  },

  toCate(e){
    wx.switchTab({
      url: '/pages/category/category',
    })
  },

  toList(e){
    let {url}=e.target.dataset;
    url=url.replace('?','/goods_list?')
    wx.navigateTo({
      url
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData('https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata','banner')
    this.getData('https://api-hmugo-web.itheima.net/api/public/v1/home/catitems','nav')
    this.getData('https://api-hmugo-web.itheima.net/api/public/v1/home/floordata','floor')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})