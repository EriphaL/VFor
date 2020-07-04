module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const AdminUser = require('../../models/AdminUser')
  //登陆校验中间件
  const auth = require('../../middleware/auth')
  const router = express.Router({
    //表示合并url参数，不写的话接口内获取不到参数。父级的参数给router里面的所有的接口调用
    mergeParams: true
  })
  // const Category = require('../../models/')
  // AdminUser.insertMany([{
  //   username:"admin",
  //   password:"123456"
  // }])

  //创建分类接口
  router.post('/', async (req, res) => {

    //要想使用必须在server/index.js里面引用中间件
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  //编辑分类接口
  router.put('/:id', async (req, res) => {
    //findByIdAndUpdate接收两个参数
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  //删除分类接口
  router.delete('/:id', async (req, res) => {
    //findByIdAndUpdate接收两个参数
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })



  //分类列表接口
  router.get('/',  async (req, res) => {
    //本来不加populate的话list页面上级分类显示的是id而不是名称，
    //所以需要用populate关联 取出什么东西。指需要parent的name。所以要把parent变成一个对象
    //并不是所有地方都要查parent，需要通过条件选择，用set-options变成数据。
    let queryOptions = {}
    //判断，如果模型的名称等于Category，就加上用来取东西的populate
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    // const items = await req.Model.find().populate('parent').limit(10)
    const items = await req.Model.find().setOptions(queryOptions).limit(100)
    res.send(items)
  })
  //获取详情页接口
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  //：resource 动态函数来匹配categories之类的任意字符。动态模型，然后全局加一个中间件，统一的进行处理
  app.use('/admin/api/rest/:resource',  async (req, res, next) => {
    //把小写的复数名称转换成大写的单数名称
    const modelName = require('inflection').classify(req.params.resource)
    // return res.send(modelName) ===打印出Category，找到相应的模型
    //表示给请求对象挂载Model属性。当前就表示所有的Category换成req.Model
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)

  //先定义一个静态文件托管，用于图片传值


  //----物品图片上传路由,express本身是获取不到上传的数据，所以需要一个中间件upload.single('file')专门用来处理上传数据。
  const multer = require('multer')
  //dest指目标地址是哪里,/../../退两级，__dirname表示当前文件所在的地址
  const upload = multer({
    dest: __dirname + '/../../uploads'
  })
  //可以在前端控制台中看form-data的名字是什么，这边是file
  app.post('/admin/api/upload',  upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3006/uploads/${file.filename}`
    res.send(file)
  })

  //登录的路由
  app.post('/admin/api/login', async (req, res) => {
    //解构比较方便一点
    const {
      username,
      password
    } = req.body
    //1.根据用户名找用户
    // const AdminUser = require('../../models/AdminUser')在上面定义
    const user = await AdminUser.findOne({
      //因为数据库中找的键是username（第一个），上面那个变量名也是username（下面的第二个），就可以写成简写形式
      // username:username
      username
    }).select('+password')
    //下面内容可以直接用断言替换
    // //如果用户不存在
    // if (!user) {
    //   //错误状态码返回信息最好是全局捕获，放在admin/http.js中做弹窗返回提示信息
    //   return res.status(422).send({
    //     message: '用户不存在'
    //   })
    // }
    assert(user, 422, '用户不存在')

    //2.校验密码
    //因为在模型中定义了select:false所以这边user.password默认是取不到的.所以在findOne函数中加上('+password')
    const isValid = require('bcrypt').compareSync(password, user.password)
    // if (!isValid) {
    //   return res.status(422).send({
    //     message: '密码错误'
    //   })
    // }
    assert(isValid, 422, '密码错误')

    //3.返回token，需要用到jsonwebtoken jwt这个模块
    // const jwt = require('jsonwebtoken')
    const token = jwt.sign({
      id: user._id
    }, app.get('secret'))

    res.send({
      token
    })
    // res.send({token})


  })


  // router.get('/admin/city', async (req, res) => {
  //   const model = await req.Model.findById(req.params.id)
  //   res.send(model)
  // })



  //子路由router挂载
  app.use('/admin/api', router)

  app.use(async (err, req, res, next) => {
    // console.log(err)
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}