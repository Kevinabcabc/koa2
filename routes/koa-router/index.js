const Router = require('@koa/router');

const router = new Router();

const userRouter = require('./users');

router
  .get('/api', async (ctx, next) => {
    // 重定向
    ctx.redirect('/api2')

  })
  // 监听url命名路由的param
  .param('id3', (id, ctx, next) => {
    console.log(1, id);
  })
  .get('btn', '/btn/:id3', (ctx, next) => {
    ctx.body = 'btn';
  })
  .get('/api2', async (ctx, next) => {
    let r = router.url('btn', {id3: 99}, {query: {color: 'red'}});
    console.log(r);
    ctx.body = 'api2';
    ctx.redirect(r)
  })
  .post('/api', async (ctx, next) => {
    ctx.body = 'post';
  })
  .put('/api', async (ctx, next) => {
    ctx.body = 'put';
  })
  .delete('/api', async (ctx, next) => {
    ctx.body = 'delete';
  })
  .patch('/api', async (ctx, next) => {
    ctx.body = 'patch';
  })
  .get('/:id', async (ctx, next) => {
    let res =  await next();
    ctx.body = ctx.params;
    console.log(1, res);
  }, async (ctx, next) => {
    return '?'
  })
  //多个前缀
  .use(['/users', '/admins'], userRouter.routes(), userRouter.allowedMethods());

module.exports = router;
