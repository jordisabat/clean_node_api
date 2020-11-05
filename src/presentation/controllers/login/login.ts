import {
  serverError,
  unauthorized,
  ok,
  badRequest
} from '../../helpers/http_helper'
import { Validation } from '../signup/signup_protocols'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Authentication
} from './login_protocols'

export class LoginController implements Controller {
  private readonly authentication: Authentication
  private readonly validation: Validation

  constructor(authentication: Authentication, validation: Validation) {
    this.authentication = authentication
    this.validation = validation
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      // const requiredFields = ['email', 'password']
      // for (const field of requiredFields) {
      //   if (!httpRequest.body[field]) {
      //     return badRequest(new MissingParamError(field))
      //   }
      // }
      const { email, password } = httpRequest.body
      // const isValid = this.emailValidator.isValid(email)
      // if (!isValid) {
      //   return badRequest(new InvalidParamError('email'))
      // }
      const auth = await this.authentication.auth(email, password)
      if (!auth) {
        return unauthorized()
      }
      return ok({ accessToken: 'any_token' })
    } catch (error) {
      return serverError(error)
    }
  }
}
