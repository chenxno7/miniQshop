// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp=require('request-promise')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let {url}=event
  const res=await rp(url)
  return res
}