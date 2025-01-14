import fs from 'node:fs'

import Koa from 'koa'
import Router from 'koa-better-router'
import logger from 'koa-logger'
import { koaBody } from 'koa-body'

import { validate } from './lib/validation.js'
const pkg = JSON.parse(fs.readFileSync('./package.json'))
const { version, name: service } = pkg

const application = new Koa()
const router = new Router().loadMethods()

router.get('/', (ctx, next) => {
  ctx.body = { service, version }
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
