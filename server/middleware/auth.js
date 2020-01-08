module.exports = options => {
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const AdminUser = require('../models/AdminUser')

  //封装中间件-登陆校验中间件,增强可用性，加options可以被配置
  return async (req, res, next) => {
    //在前端拿到token，后端解密
    //提取前端传的bearer xxxxxxx token数据，pop表示弹出最后的，即token
    const token = String(req.headers.authorization || '').split(' ').pop()
    //考虑到token为空不能用verify的情况，加一个断言
    assert(token, 401, '请提供 jwt token')
    const {
      id
    } = jwt.verify(token, req.app.get('secret'))
    assert(id, 401, '无效的 jwt token')
    //挂载上去供后续使用
    req.user = await AdminUser.findById(id)
    //req.user在cmd中取到{ _id: 5dd62be97249785048c5ca55, username: 'q', __v: 0 }
    console.log(req.user)
    //如果req.user不存在，报401错误，提示
    assert(req.user, 401, '请先登录')
    await next()
  }

}