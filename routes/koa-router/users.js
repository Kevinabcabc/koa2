const Router = require('@koa/router');

const router = new Router({
  // prefix: '/abc',
});

async function getData(ctx) {
  return new Promise((resolve, reject) => {
    let data = []
    ctx.req.on('data', (trunk) => {
      data.push(trunk);
    })
  
    ctx.req.on('end', () => {
      resolve(data.join())
    });
  })

}

router.post('/signin', async (ctx, next) => {
  const result = await getData(ctx);
  const params = new URLSearchParams(result);
  ctx.body = params.get('username')
});

router.get('/signup', async (ctx, next) => {
  ctx.body = 'signup'
});

router.get('/list', async (ctx, next) => {
  let data = ctx.request.query;
  let dataString = ctx.request.querystring;
  ctx.body = dataString
});

module.exports = router;

