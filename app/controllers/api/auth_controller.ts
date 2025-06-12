import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator, loginValidator } from '#validators/auth'
import User from '#models/user'
import { jwtGuard } from '@maximemrf/adonisjs-jwt/jwt_config'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const data = request.all()
    const payload = await registerValidator.validate(data)
    const user = await User.create(payload)

    return response.json({
      message: 'success',
      data: user,
    })
  }

  async login({ request, response, auth }: HttpContext) {
    const data = request.all()
    const payload = await loginValidator.validate(data)
    const user = await User.verifyCredentials(payload.email, payload.password)
    const token = await auth.use('jwt').generate(user)

    return response.json({
      message: 'success',
      data: {
        fullName: user.fullName,
        token: token,
      },
    })
  }
}
