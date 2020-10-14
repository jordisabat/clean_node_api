import { MissingParamError } from '../errors/missing_param_error'
import { badRequest } from '../helpers/http_helper'
import { HttpResponse, HttpResquest } from '../protocols/http'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email_validator'
import { InvalidParamError } from '../errors/invalid_param_error'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle(httpRequest: HttpResquest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const isValid = this.emailValidator.isValid(httpRequest.body.email)

    if (!isValid) {
      return badRequest(new InvalidParamError('email'))
    }

    return {
      statusCode: 200,
      body: ''
    }
  }
}
