import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async loginView({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  async registerView({ view }: HttpContext) {
    return view.render('pages/auth/register')
  }
}
