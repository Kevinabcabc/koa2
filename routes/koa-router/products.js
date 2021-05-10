const Router = require('@koa/router');

const router = new Router({
  // prefix: '/abc',
});


router.get('/list', async (ctx, next) => {
  ctx.body = 'products list'
});


router.post('/add', async (ctx, next) => {
  await ctx.render('succ', {
    code: 200,
    msg: JSON.stringify(ctx.request.body)
  })
  // ctx.body = ctx.request.body;
});


module.exports = router;

