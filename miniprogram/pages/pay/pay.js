// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    lists:[],
    price:0
  },

  handleAddress(){},

  handlePay(){
    wx.navigateTo({
      url: '/pages/getInfo/getInfo',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({price:options.price})
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
    let address=wx.getStorageSync('address')
    let cart=wx.getStorageSync('cart')
    let lists=[];
    cart.forEach(item => {
      if(item.checked){
        lists.push(item)
      }
    });
    this.setData({address,lists})
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