// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp=require('request-promise')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let url='https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata';
  const res= await rp(url);
  return res
}