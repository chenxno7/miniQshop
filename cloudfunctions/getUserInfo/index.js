// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let url=`https://api.weixin.qq.com/sns/jscode2session?appid=wx5591f2f0e9956652&secret=3693c967d53b2c18ab32feb8a564e1bd&js_code=${event.code}&grant_type=authorization_code`;
  const res=await rp(url);
  return res
}