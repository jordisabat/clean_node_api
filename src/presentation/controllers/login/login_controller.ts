import {
  serverError,
  unauthorized,
  ok,
  badRequest
} from '../../helpers/http/http_helper'
import { Validation } from '../signup/signup_controller_protocols'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Authentication
} from './login_controller_protocols'

export class LoginController implements Controller {
  constructor(
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body
      const accessToken = await this.authentication.auth({ email, password })
      if (!accessToken) {
        return unauthorized()
      }
      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
