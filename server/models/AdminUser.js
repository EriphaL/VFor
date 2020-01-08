// 广告位模型

const mongoose = require('mongoose')

const schema = new mongoose.Schema({

  //用户名
  username: {
    type: String
  },
  //密码
  password: {
    type: String,
    //保证在编辑界面不会被显示出来，防止去二次散列
    select:false,
    set(val){
      //在这边做散列
      return require('bcrypt').hashSync(val,10)
    }
  },
})
//哪里需要就在哪里引用
module.exports = mongoose.model('AdminUser', schema)