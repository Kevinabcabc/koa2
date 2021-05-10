const Koa = require('koa');
const bodyParser = require('koa-bodyparser')
const static = require("koa-static")
const views = require('koa-views')
const cors = require('koa2-cors')
const app = new Koa();
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')

// 链接数据库一定放在koa前面
mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://127.0.0.1/tenggouwa', {useNewUrlParser: true, useUnifiedTopology: true})
// 获取数据库表对应的js对象所在的路径
const models_path = path.join(__dirname, './models')
// 已递归的形式，读取models文件夹下的js模型文件，并require
var walk = function(modelPath) {
    fs
        .readdirSync(modelPath)
        .forEach(function(file) {
        var filePath = path.join(modelPath, '/' + file)
        var stat = fs.statSync(filePath)
        if (stat.isFile()) {
            if (/(.*)\.(js|coffee)/.test(file)) {
                require(filePath)
            }
        } else if (stat.isDirectory()) {
            walk(filePath)
        }
    })
}

walk(models_path)

app.use(cors())
app.use(bodyParser());
app.use(static("./public", {
  index: 'app.html'
}));
app.use(views('./views', {
  map: {
    html: 'underscore'
  }
  // extension: 'ejs',
}))

// logger 中间件
const logger = require('./middleware/logger-async');
// 自定义路由
// require('./routes/index');

const router = require("./routes/koa-router/index");

// app.use(logger);
// app.use((context, next) => {
//   context.body = 'hello world';
//   // console.log(1, context);
// });

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3333)