import { MissingParamError } from '../errors/missing_param_error'
import { badRequest } from '../helpers/http_helper'
import { HttpResponse, HttpResquest } from '../protocols/http'

export class SignUpController {
  handle (httpRequest: HttpResquest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    return {
      statusCode: 500,
      body: ''
    }
  }
}
