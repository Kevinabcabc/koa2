const Koa = require('koa');
const app = new Koa();
const logger = require('./middleware/logger-async');

// app.use(logger);
// app.use((context, next) => {
//   context.body = 'hello world';
//   // console.log(1, context);
// });


require('./routes/index');
// app.listen(3333)