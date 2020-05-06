// pages/user/user.js
const db=wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    logined:false,
    userInfo:{}
  },

  login(e){
    // console.log(e.detail)
    let {userInfo}=e.detail;
    wx.setStorageSync('userInfo', userInfo)
    this.setData({userInfo})
    wx.login({
      success: (res) => {
        let {code}=res
        wx.cloud.callFunction({
          name:'getUserInfo',
          data:{code},
          success:res=>{
            console.log(res)
            let loginInfo=JSON.parse(res.result)
            wx.setStorageSync('loginInfo', loginInfo)
            this.setData({logined:true})
            db.collection('users').where({
              openid:loginInfo.openid
            }).get({
              success:res=>{
                if(res.data.length==0){
                  db.collection('users').add({
                    data:loginInfo,
                    success:res=>{
                      console.log(res)
                    }
                  })
                }
                console.log(res)
              }
            })
          }
        })
      },
    })
  },

  handleAddress(){
    wx.chooseAddress({
      complete: (res) => {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let userInfo=wx.getStorageSync('userInfo');
    if(!userInfo==undefined){
      this.setData({logined:true})
    }
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