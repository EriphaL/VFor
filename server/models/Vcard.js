const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  //所属人物
  character: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Hero'
  }],
  //出场
  scene: {
    type: String
  },
  partZh: {
    type: String
  },
  partEn: {
    type: String
  },
  from:{
    type: String
  },
  banners:[{
    type:String
  }]
}, 
// {
//   //每生成一个title都自动的加上日期
//   timestamps: true
// }
)
//哪里需要就在哪里引用
module.exports = mongoose.model('Vcard', schema)