import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { registerValidator } from '#validators/auth'

export default class RegisterController {

  async show({response}:HttpContext) {
    return response.ok("Auth register Page is Ready!!")
  }
  async store({request,response, auth}:HttpContext) {

    const data = await request.validateUsing(registerValidator)

    // const data = request.only(['fullName', 'email', 'password',])
    //
    // const validateData = await registerValidator.validate(data)

    const user = await User.create(data)

    const authUser =  await auth.use('web').login(user)

    return response.json( {authUser, user: user.serialize})
  }

}
