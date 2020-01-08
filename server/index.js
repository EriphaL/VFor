const express = require('express')
const expressStatic = require("express-static")

const app = express()

app.set('secret','dsffffffffffffffz')

//中间件引用
app.use(require('cors')())
app.use(express.json())

//声明uploads下的文件都是静态文件,指uploads所有文件可以通过/uploads访问。uploads中放的就是图片的二进制文件
//有错，注释掉也能在上传图片时获取它url地址
// require('/uploads', express.static(__dirname + '/uploads'))
app.use('/uploads', expressStatic(__dirname + '/uploads'))

//连接数据库，引用plugins中的单独数据库文件
require('./plugins/db')(app)

//引用后台管理页面中的路由
require('./routes/admin')(app)

//引用web端页面中的路由
require('./routes/web')(app)


//添加模型

app.listen(3006,() => {
  console.log('http://localhost:3006')
})