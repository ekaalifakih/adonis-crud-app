import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class JwtMiddleware {
  /**
   * The URL to redirect to, when authentication fails
   */
  async handle(ctx: HttpContext, next: NextFn) {
    await ctx.auth.authenticate()

    return next()
  }
}
