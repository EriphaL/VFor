// 文章模型

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  //职业，和分类一样做下拉选择，一个英雄可对应多个职业，所以不能完全和下拉分类做的一样,外套数组
  categories: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category'
  }],
  //称号
  title: {
    type: String
  },
  body: {
    type: String
  },
}, {
  //每生成一个title都自动的加上日期
  timestamps: true
})
//哪里需要就在哪里引用
module.exports = mongoose.model('Article', schema)