// 广告位模型

const mongoose = require('mongoose')

const schema = new mongoose.Schema({

  //名称
  name: {
    type: String
  },
  //数组字段，需要有广告图片，url（点击之后需要跳转）
  items: [{
    image: {
      type: String
    },
    url: {
      type: String
    }
  }]
})
//哪里需要就在哪里引用
module.exports = mongoose.model('Ad', schema)