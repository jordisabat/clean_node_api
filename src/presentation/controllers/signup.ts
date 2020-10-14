import { MissingParamError } from '../errors/missing_param_error'
import { HttpResponse, HttpResquest } from '../protocols/http'

export class SignUpController {
  handle (httpRequest: HttpResquest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email')
      }
    }
    return {
      statusCode: 500,
      body: ''
    }
  }
}
