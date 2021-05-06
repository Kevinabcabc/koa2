const Koa = require('koa');
const app = new Koa();
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