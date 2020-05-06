// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey:0,
    sideLists:[],
    contentLists:[]
  },

  getSide(){
    let url='https://api-hmugo-web.itheima.net/api/public/v1/categories'
    wx.cloud.callFunction({
      name:'getData',
      data:{url},
      success:res=>{
        let result=JSON.parse(res.result)
        this.setData({
          sideLists:result.message,
          contentLists:result.message[0].children
        })
        // console.log(this.data.sideLists)
      }
    })
  },

  changeContent(e){
    this.setData({
      contentLists:this.data.sideLists[e.detail].children
    })
    console.log(this.data.sideLists[e.detail].children)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSide()
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