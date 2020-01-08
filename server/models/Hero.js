// 英雄模型

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  avatar: {
    //保存头像一般只是保存它的url
    type: String
  },
  banner: {
    //背景图，详情页会用到
    type: String
  },
  //称号
  title: {
    type: String
  },
  //所属分类
  categories: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category'
  }],
  //评分（复合类型。定义成对象（或者说是键值对），设置子集
  scores: {
    //难度
    difficult: {
      type: Number
    },
    //技能
    skills: {
      type: Number
    },
    //攻击
    attack: {
      type: Number
    },
    //生存能力
    survive: {
      type: Number
    },
  },
  //只要是复数，就在外面套一个数组括号
  skills: [{
    //技能名
    name: {
      type: String
    },
    //技能图标
    icon: {
      type: String
    },
    //技能详情
    description: {
      type: String
    },
    //提示
    tips: {
      type: String
    },
    //冷却
    cd: {
      type: String
    },
    cost: {
      type: String
    },
    
  }],
  //出装推荐，有两套，items1顺风，items2逆风
  items1: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Item'
  }],
  items2: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Item'
  }],
  //使用技巧
  usageTips: {
    type: String
  },
  //对抗技巧
  battleTips: {
    type: String
  },
  //团战思路
  teamTips: {
    type: String
  },
  //英雄关系
  partners: [{
    hero: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Hero'
    },
    description: {
      type: String
    }
  }]

})
//哪里需要就在哪里引用,不够智能手动添加集合名叫-es
module.exports = mongoose.model('Hero', schema,'heroes')