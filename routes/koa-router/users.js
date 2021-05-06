const Router = require('@koa/router');

const router = new Router({
  prefix: '/abc',
});

router.get('/signin', async (ctx, next) => {
  ctx.body = 'signin'
});

router.get('/signup', async (ctx, next) => {
  ctx.body = 'signup'
});

module.exports = router;

