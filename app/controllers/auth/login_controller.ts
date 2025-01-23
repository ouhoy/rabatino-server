import type {HttpContext} from '@adonisjs/core/http'
import {loginValidator} from '#validators/auth'
import User from '#models/user'

export default class LoginController {

  async show({response, auth}: HttpContext) {
    // return auth.isAuthenticated ? 'You are already logged in' : 'Auth login Page is Ready!!'
    return response.json({auth: auth.user})
  }

  async store({request, response, auth}: HttpContext) {
    const data = await request.validateUsing(loginValidator);

    const user = await User.verifyCredentials(data.email, data.password)

    await auth.use('web').login(user, data.isRememberMe)

    return response.json({auth: auth.user})
  }

}
