// 物品模型，选择装备的数据库

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  icon: {
    //保存图标一般只是保存它的url
    type: String
  },

})
//哪里需要就在哪里引用
module.exports = mongoose.model('Item', schema)