const { version, name: service } = require('./package.json')

const Koa = require('koa')
const Router = require('koa-better-router')

const logger = require('koa-logger')
const { koaBody } = require('koa-body')

const { validate } = require('./lib/validation')

const application = new Koa()
const router = new Router().loadMethods()

router.get('/', (ctx, next) => {
  ctx.set('Content-Type', 'application/json')
  ctx.body = JSON.stringify({ service, version })
  return next()
})

router.post('/signup', koaBody(), (ctx, next) => {
  const schema = {
    username: ['string'],
    password: ['string']
  }

  const validation = validate(schema, ctx.request.body ?? {})

  if (validation.error) {
    ctx.response.status = 422
    ctx.body = { oops: `${validation.error.key}: ${validation.error.reason}` }
    return next()
  }

  ctx.body = { message: 'ok' }
  return next()
})

application.use(logger())
application.use(router.middleware())
application.listen(3000)
