// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allChecked:false,
    address:{},
    showBtn:true,
    cart:[],
    price:0
  },

  onClickButton(){
    let {address,cart}=this.data
    let unChecked=cart.some(item=>item.checked)
    if(!address.userName){
      wx.showToast({
        title: '还未添加收货地址哦',
        icon:'none'
      })
      return
    }else if(!cart.length){
      wx.showToast({
        title: '购物车是空的哦',
        icon:'none'
      })
      return
    }else if(!unChecked){
      wx.showToast({
        title: '还未选择要购买的商品哦',
        icon:'none'
      })
    }
    else{
      wx.navigateTo({
        url: '/pages/pay/pay?price='+this.data.price,
      })
    }
  },

  onChange(){
    let price=0;
    let cart=this.data.cart
    if(!this.data.allChecked){
      cart.forEach(item => {
        price+=item.goods_price*item.num;
        item.checked=true
      });
      price*=100
    }else{
      cart.forEach(item => {
        item.checked=false
      });
    }
    this.setData({
      allChecked:!this.data.allChecked,
      price
    })
    wx.setStorageSync('cart', cart)
    this.onShow()
  },

  handleAddress(){
    wx.getSetting({
      success:res=>{
        const scopeAddress=res.authSetting["scope.address"];
        if(scopeAddress==false){
          wx.openSetting({
            complete: (res) => {},
          })
        }
        wx.chooseAddress({
          success: (res) => {
            wx.setStorageSync('address', res);
            this.setData({showBtn:false})
          },
        })
      }
    })
  },

  handleChecked(e){
    let {cart,allChecked}=this.data
    let index=e.currentTarget.dataset.chk
    let currentGoods=cart[index];
    currentGoods.checked=!currentGoods.checked
    if(currentGoods.checked)this.setData({price:this.data.price+currentGoods.num*currentGoods.goods_price})
    else this.setData({
      price:this.data.price-currentGoods.num*currentGoods.goods_price
    })
    wx.setStorageSync('cart', cart)
    allChecked=cart.every(item=>item.checked)
    this.setData({cart,allChecked})
  },

  changeNum(e){
    let cart=this.data.cart;
    let index=e.target.dataset.index
    if(e.target.dataset.ctrl=="1"){
      cart[index].num++
    }else if(cart[index].num>1){
      cart[index].num--
    }
    wx.setStorageSync('cart', cart)
    this.onShow()
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
    let address=wx.getStorageSync('address');
    let cart=wx.getStorageSync('cart')||[];
    let price=0;
    let allChecked=cart.every(item=>item.checked)
    this.setData({address,cart})
    if(!Object.keys(this.data.address).length==0){
      this.setData({
        showBtn:false
      })
    }
    cart.forEach(item => {
      if(item.checked){
        price+=item.goods_price*item.num
      }
    });
    this.setData({price,allChecked})
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