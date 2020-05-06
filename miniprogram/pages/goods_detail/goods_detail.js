// pages/goods_detail/goods_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_id:'',
    goods_detail:{},
    active:0
  },

  getData(goods_id){
    let url=`https://api-hmugo-web.itheima.net/api/public/v1/goods/detail?goods_id=${goods_id}`
    wx.cloud.callFunction({
      name:'getData',
      data:{url},
      success:res=>{
        let result=JSON.parse(res.result)
        this.setData({
          goods_detail:result.message
        })
        // console.log(this.data.goods_detail)
      }
    })
  },

  onChange(e){},

  previewImage(e){
    let index=parseInt(e.target.dataset.pics)
    let pics=this.data.goods_detail.pics.map(item=>item.pics_big)
    console.log(index)
    wx.previewImage({
      urls: pics,
      current:pics[index],
      success:res=>{
      }
    })
  },

  handleCartAdd(){
    let cart=wx.getStorageSync('cart')||[];
    let index=cart.findIndex(item=>item.goods_id==this.data.goods_detail.goods_id)
    if(index===-1){
      this.data.goods_detail.num=1;
      this.data.goods_detail.checked=false;
      cart.push(this.data.goods_detail)
    }else{
      cart[index].num++
    }
    wx.setStorageSync('cart', cart)
    wx.showToast({
      title: '加入购物车成功',
      icon:'success',
      duration:1000,
      mask:true
    })
  },

  buy(){
    console.log('buy')
  },

  toCart(){
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let goods_id=parseInt(options.goods_id)
    this.getData(goods_id)
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