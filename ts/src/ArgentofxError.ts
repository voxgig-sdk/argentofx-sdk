
import { Context } from './Context'


class ArgentofxError extends Error {

  isArgentofxError = true

  sdk = 'Argentofx'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  ArgentofxError
}

