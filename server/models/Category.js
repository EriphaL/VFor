const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  path: {
    type: String,
  },
  //parent不是string类型，ref指它关联的模型，
  parent: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Category",
  },
});

// 子分类
schema.virtual("children", {
  localField: "_id",
  foreignField: "parent",
  justOne: false,
  ref: "Category",
});

schema.virtual("newsList", {
  localField: "_id",
  foreignField: "categories", //外键
  justOne: false,
  ref: "Article",
});

schema.virtual("heroList", {
  localField: "_id",
  foreignField: "categories", //外键
  justOne: false,
  ref: "Hero",
});

//哪里需要就在哪里引用
module.exports = mongoose.model("Category", schema);
