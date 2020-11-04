import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http_helper'
import { LoginController } from './login'

interface SutTypes {
  sut: LoginController
}

const makeSut = (): SutTypes => {
  const sut = new LoginController()
  return {
    sut
  }
}

describe('Login Controller', () => {
  test('Should return 400 if no email is provided', async () => {
    // arrange
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    // act
    const httpResponse = await sut.handle(httpRequest)

    // assert
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no password is provided', async () => {
    // arrange
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@email.com'
      }
    }
    // act
    const httpResponse = await sut.handle(httpRequest)

    // assert
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })
})
