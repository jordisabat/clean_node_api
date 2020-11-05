import { MissingParamError } from '../../errors'
import {
  badRequest,
  ok,
  serverError,
  unauthorized
} from '../../helpers/http/http_helper'
import { LoginController } from './login'
import { HttpRequest, Authentication, Validation } from './login_protocols'

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth(email: string, password: string): Promise<string> {
      return await new Promise((resolve) => resolve('token'))
    }
  }
  return new AuthenticationStub()
}

const makeValidaton = (): Validation => {
  class ValidatorStub implements Validation {
    validate(input: any): Error {
      return null
    }
  }
  return new ValidatorStub()
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@email.com',
    password: 'any_password'
  }
})

interface SutTypes {
  sut: LoginController
  authenticationStub: Authentication
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const authenticationStub = makeAuthentication()
  const validationStub = makeValidaton()
  const sut = new LoginController(authenticationStub, validationStub)
  return {
    sut,
    authenticationStub,
    validationStub
  }
}

describe('Login Controller', () => {
  test('Should call Authentication with correct value', async () => {
    // arrange
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')

    // act
    await sut.handle(makeFakeRequest())

    // assert
    expect(authSpy).toHaveBeenCalledWith('any_email@email.com', 'any_password')
  })

  test('Should return 401 if invalid credentials are provided', async () => {
    // arrange
    const { sut, authenticationStub } = makeSut()
    jest
      .spyOn(authenticationStub, 'auth')
      .mockReturnValueOnce(new Promise((resolve) => resolve(null)))

    // act
    const httpResponse = await sut.handle(makeFakeRequest())

    // assert
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should return 500 if Authentication throws', async () => {
    // arrange
    const { sut, authenticationStub } = makeSut()
    jest
      .spyOn(authenticationStub, 'auth')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )

    // act
    const httpResponse = await sut.handle(makeFakeRequest())

    // assert
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if valid credentials are provided', async () => {
    // arrange
    const { sut } = makeSut()

    // act
    const httpResponse = await sut.handle(makeFakeRequest())

    // assert
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token' }))
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    // arrange
    const { sut, validationStub } = makeSut()
    const anyError = new MissingParamError('any_error')
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(anyError)

    // act
    const httpResponse = await sut.handle(makeFakeRequest())

    // assert
    expect(httpResponse).toEqual(badRequest(anyError))
  })
})
