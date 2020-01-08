module.exports = app => {
  const router = require('express').Router()
  // 通过mongoose引用
  const mongoose = require('mongoose')
  const extend = require('extend')
  // const Article = require('../../models/Article')
  // const Category = require('../../models/Category')
  const Article = mongoose.model('Article')
  const Category = mongoose.model('Category')
  const Hero = mongoose.model('Hero')


  //新闻导入数据
  router.get('/news/init', async (req, res) => {
    const parent = await Category.findOne({
      name: '新闻资讯'
    })
    //cats只找新闻资讯下的子分类
    const cats = await Category.find().where({
      parent: parent
    }).lean()
    const newsTitles = ["Black Future '88", "Sigma Theory: Global Cold War", "Farmer's Dynasty", "黑色規則：西格瑪", "Football Manager 2020", "PLAYERUNKNOWN'S BATTLEGROUNDS", "Human: Fall Flat", "Rise of the Tomb Raider™", "Halo: The Master Chief Collection", "Shadow of the Tomb Raider: Definitive Edition", "Monster Hunter World: Iceborne", "Age of Empires II: Definitive Edition", "SD GUNDAM G GENERATION CROSS RAYS", "Football Manager 2020", "Total War: THREE KINGDOMS", "Battle Realms (+ Winter of the Wolf)", "SD GUNDAM G GENERATION CROSS RAYS", "妄想破绽 Broken Delusion", "Lumberjack's Dynasty", "Drawkanoid", "Knuckle Sandwich", "Tools Up!", "Halo: The Master Chief Collection", "Everreach: Project Eden", "Day of Dragons", "Human: Fall Flat", "Rise of the Tomb Raider™", "Total War: THREE KINGDOMS", "Gears 5", "Overcooked! 2", "Warhammer: Vermintide 2", "Divinity: Original Sin 2 - Definitive Edition", "Oxygen Not Included", "Atelier Lulua ~The Scion of Arland~ / ルルアのアトリエ ～アーランドの錬金術士４～", "Tom Clancy's Rainbow Six® Siege"]
    // 经过转换可以return 一个对象数组，newsList数组中存放 "title": "Black Future '88"，这样的若干条数据
    const newsList = newsTitles.map(title => {
      //表示从cats中复制一份出来，乱序。并不影响cats数组本身
      const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
      return {
        //随机搞一个分类,切片2个分类
        categories: randomCats.slice(0, 2),
        title: title
      }
    })
    //清空现有数据
    await Article.deleteMany({})
    //插入数据
    await Article.insertMany(newsList)
    res.send(newsList)
  })

  //新闻列表接口，与前端交互
  router.get('/news/list', async (req, res) => {
    // 聚合查询
    const parent = await Category.findOne({
      name: '新闻资讯'
    })
    // mongodb的aggregate可以通过一次查询执行好几次查询，聚合参数叫做聚合管道
    const cats = await Category.aggregate([{
        // 第一个parent表示字段，第二个是上面查出来的上级分类
        $match: {
          parent: parent._id
        }
      },
      {
        //做外连接，from表示关联哪个表（集合），集合名和模型名是对应的，集合名默认是其模型名小写复数形式Article-articles
        //as重命名
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'categories',
          as: 'newsList'
        }
      },
      {
        // 改newsList字段，本来是用来添加字段
        $addFields: {
          newsList: {
            // 使每个newsList只要5条数据
            $slice: ['$newsList', 5]
          }
        }
      }

    ])

    // 只要id,调用热门的时候，title对应的类别不应该是热门而是各自所属分类如公告、新闻。所以要加populate
    // populate查出其所对应的的分类，若有多个分类，则只需要第一个分类的name就行
    const subCats = cats.map(v => v._id)
    //unshift向数组开头添加元素
    cats.unshift({
      name: '热门',
      newsList: await Article.find().where({
        categories: {
          $in: subCats
        }
      }).populate('categories').limit(5).lean()
    })

    // 新定义一个categoryName存放所属类别
    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName = cat.name === '热门' ? news.categories[0].name : cat.name
        return news
      })
      return cat
    })
    res.send(cats)
  })


  //导入英雄数据
  router.get('/heroes/init', async (req, res) => {
    const raw = [{
      "name": "D.Va",
      "avatar": "https://overwatch.nosdn.127.net/1/assets/img/pages/heroes/list/dva.png",
      "group": "TANK"
    }, {
      "name": "奥丽莎",
      "avatar": "https://overwatch.nosdn.127.net/1/assets/img/pages/heroes/list/orisa.png",
      "group": "TANK"
    }, {
      "name": "莱因哈特",
      "avatar": "https://overwatch.nosdn.127.net/1/assets/img/pages/heroes/list/reinhardt.png",
      "group": "TANK"
    }, {
      "name": "路霸",
      "avatar": "https://overwatch.nosdn.127.net/1/assets/img/pages/heroes/list/roadhog.png",
      "group": "TANK"
    }, {
      "name": "温斯顿",
      "avatar": "https://overwatch.nosdn.127.net/1/assets/img/pages/heroes/list/winston.png",
      "group": "TANK"
    }, {
      "name": "查莉娅",
      "avatar": "https://overwatch.nosdn.127.net/1/assets/img/pages/heroes/list/zarya.png",
      "group": "TANK"
    }, {
      "name": "破坏球",
      "avatar": "https://overwatch.nosdn.127.net/2/heroes/wrecking-ball/hero-select-portrait.png",
      "group": "TANK"
    }, {
      "name": "巴蒂斯特",
      "avatar": "https://overwatch.nosdn.127.net/2/heroes/Baptiste/hero-select-portrait.png",
      "group": "SUPPORT"
    }, {
      "name": "“西格玛”",
      "avatar": "https://overwatch.nosdn.127.net/2/heroes/Sigma/hero-select-portrait.png",
      "group": "TANK"
    }, {
      "name": "艾什",
      "avatar": "https://overwatch.nosdn.127.net/2/heroes/Hero29/hero-select-portrait-dn24u.png",
      "group": "DAMAGE"
    }, {
      "name": "堡垒",
      "avatar": "https://overwatch.nosdn.127.net/1/assets/img/pages/heroes/list/bastion.png",
      "group": "DAMAGE"
    }, {
      "name": "末日铁拳",
      "avatar": "https://overwatch.nosdn.127.net/1/assets/img/pages/heroes/list/doomfist.png",
      "group": "DAMAGE"
    }, {
      "name": "源氏",
      "avatar": "https://overwatch.nosdn.127.net/1/assets/img/pages/heroes/list/genji.png",
      "group": "DAMAGE"
    }, {
      "name": "半藏",
      "avatar": "https://overwatch.nosdn.127.net/1/assets/img/pages/heroes/list/hanzo.png",
      "group": "DAMAGE"
    }, {
      "name": "狂鼠",
      "avatar": "https://overwatch.nosdn.127.net/1/assets/img/pages/heroes/list/junkrat.png",
      "group": "DAMAGE"
    }, {
      "name": "麦克雷",
      "avatar": "https://overwatch.nosdn.127.net/1/assets/img/pages/heroes/list/mccree.png",
      "group": "DAMAGE"
    }, {
      "name": "美",
      "avatar": "https://overwatch.nosdn.127.net/1/assets/img/pages/heroes/list/mei.png",
      "group": "DAMAGE"
    }, {
      "name": "法老之鹰",
      "avatar": "https://overwatch.nosdn.127.net/1/assets/img/pages/heroes/list/pharah.png",
      "group": "DAMAGE"
    }, {
      "name": "死神",
      "avatar": "https://overwatch.nosdn.127.net/1/assets/img/pages/heroes/list/reaper.png",
      "group": "DAMAGE"
    }, {
      "name": "士兵：76",
      "avatar": "https://overwatch.nosdn.127.net/1/assets/img/pages/heroes/list/soldier-76.png",
      "group": "DAMAGE"
    }, {
      "name": "黑影",
      "avatar": "https://overwatch.nosdn.127.net/1/assets/img/pages/heroes/list/sombra.png",
      "group": "DAMAGE"
    }, {
      "name": "“秩序之光”",
      "avatar": "https://overwatch.nosdn.127.net/1/assets/img/pages/heroes/list/symmetra.png",
      "group": "DAMAGE"
    }, {
      "name": "托比昂",
      "avatar": "https://overwatch.nosdn.127.net/1/assets/img/pages/heroes/list/torbjorn.png",
      "group": "DAMAGE"
    }, {
      "name": "猎空",
      "avatar": "https://overwatch.nosdn.127.net/1/assets/img/pages/heroes/list/tracer.png",
      "group": "DAMAGE"
    }, {
      "name": "黑百合",
      "avatar": "https://overwatch.nosdn.127.net/1/assets/img/pages/heroes/list/widowmaker.png",
      "group": "DAMAGE"
    }, {
      "name": "安娜",
      "avatar": "https://overwatch.nosdn.127.net/1/assets/img/pages/heroes/list/ana.png",
      "group": "SUPPORT"
    }, {
      "name": "布丽吉塔",
      "avatar": "https://overwatch.nosdn.127.net/1/assets/img/pages/heroes/list/brigitte.png",
      "group": "SUPPORT"
    }, {
      "name": "卢西奥",
      "avatar": "https://overwatch.nosdn.127.net/1/assets/img/pages/heroes/list/lucio.png",
      "group": "SUPPORT"
    }, {
      "name": "“天使”",
      "avatar": "https://overwatch.nosdn.127.net/1/assets/img/pages/heroes/list/mercy.png",
      "group": "SUPPORT"
    }, {
      "name": "莫伊拉",
      "avatar": "https://overwatch.nosdn.127.net/1/assets/img/pages/heroes/list/moira.png",
      "group": "SUPPORT"
    }, {
      "name": "禅雅塔",
      "avatar": "https://overwatch.nosdn.127.net/1/assets/img/pages/heroes/list/zenyatta.png",
      "group": "SUPPORT"
    }]
    const temp = [{
      "position": "热门",
      "group": "ALL"
    }, {
      "position": "重装",
      "group": "TANK"
    }, {
      "position": "输出",
      "group": "DAMAGE"
    }, {
      "position": "支援",
      "group": "SUPPORT"
    }]
    //拷贝30组数据，extend用完了就没有。
    for (let index = 0; index < 29; index++) {
      temp.unshift({
        "position": "重装",
        "group": "TANK"
      }, {
        "position": "输出",
        "group": "DAMAGE"
      }, {
        "position": "支援",
        "group": "SUPPORT"
      })

    }
    const parent = await Category.findOne({
      name: '英雄'
    })
    //获取英雄下的分类，即
    const heroPosition = await Category.find().where({
      parent: parent
    }).lean()
    // res.send(heroPosition)
    //舍弃没有被匹配到的temp
    const e = extend(true, raw, temp).slice(0, 31)
    // res.send(e)
    // res.send(heroPosition)
    const heroList = e.map(title => {
      const currentPosition = heroPosition
      title.categories = heroPosition.filter(el => {
        return (el.name === title.position)
      })
      return {
        name: title.name,
        avatar: title.avatar,
        title: title.position,
        categories: title.categories,
        _id: _id
      }
    })
    await Hero.deleteMany({})
    //插入数据
    await Hero.insertMany(heroList)
    res.send(heroList)
  })

  //英雄列表接口，与前端交互
  router.get('/heroes/list', async (req, res) => {
    // 聚合查询
    const parent = await Category.findOne({
      name: '英雄'
    })
    // mongodb的aggregate可以通过一次查询执行好几次查询，聚合参数叫做聚合管道
    const cats = await Category.aggregate([{ //条件查询，类似于sql where
        //在Category里找parent字段等于上面查出来的parent._id
        $match: {
          parent: parent._id
        }
      },
      {
        //做外连接，from表示关联哪个表（集合），集合名和模型名是对应的，集合名默认是其模型名小写复数形式Article-articles
        //as重命名
        $lookup: {
          from: 'heroes',
          localField: '_id',
          foreignField: 'categories',
          as: 'heroList'
        }
      }
    ])
    // 只要id,调用热门的时候，title对应的类别不应该是热门而是各自所属分类如公告、新闻。所以要加populate
    // populate查出其所对应的的分类，若有多个分类，则只需要第一个分类的name就行
    const subCats = cats.map(v => v._id)
    //unshift向数组开头添加元素
    cats.unshift({
      name: '热门',
      heroList: await Hero.find().where({
        categories: {
          $in: subCats
        }
      }).limit(10).lean()
    })

    res.send(cats)

  })

  //文章详情接口
  router.get('/articles/:id', async (req, res) => {
    // lean(),使之成为一个纯粹的json对象
    const data = await Article.findById(req.params.id).lean()
    data.related = await Article.find().where({
      categories: {
        $in: data.categories
      }
    }).limit(2)
    res.send(data)
  })

  //英雄详情接口,populate只有是有且仅有关联的才能用：
  // items2: [{
  // type: mongoose.SchemaTypes.ObjectId,
  //   ref: 'Item'
  // }],
  // categories本来是数组，只显示id，用populate('categories')可以把分类的完整数据调出来,使之变成对象。
  // partners里面只有hero才是关联，所以要partners.hero才能用
  router.get('/heroes/:id', async (req, res) => {
    const data = await Hero
      .findById(req.params.id)
      .populate('categories items1 items2 partners.hero')
      .lean()

    res.send(data)
  })

  app.use('/web/api', router)
}