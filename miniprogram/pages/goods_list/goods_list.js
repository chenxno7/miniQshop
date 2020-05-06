// pages/goods_list/goods_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query:'',
    pagenum:1,
    pagesize:'',
    cid:'',
    params:{},
    goods_list:[],
    active:0
  },

  getData(){
    // console.log(this.data.pagenum)
    let url=`https://api-hmugo-web.itheima.net/api/public/v1/goods/search?query=${this.data.query}&cid=${this.data.cid}&pagenum=${this.data.pagenum}$pagesize=${this.data.pagesize}`;
    // console.log(url)
    wx.cloud.callFunction({
      name:"getData",
      data:{url},
      success:res=>{
        let result=JSON.parse(res.result)
        this.setData({
          goods_list:this.data.goods_list.concat(result.message.goods
        )})
        // console.log(this.data.goods_list)
      },
      fail:res=>{
        // console.log(res)
      }
    })
  },

  onChange(e){
    // console.log(e)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let params={}
    let that=this
    for(let key in options){
      if(options[key]){
        params[key]=options[key]
      }
    }
    (async function(){
      await that.setData(params)
      await that.setData({params})
      that.getData()
    })()
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
    (async ()=>{
      await this.setData({
        pagenum:1,
        pagesize:'',
        goods_list:[]
      });
      await this.getData()
    })()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    (async ()=>{
      await this.setData({
        pagenum:++this.data.pagenum
      });
      await this.getData()
    })()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})