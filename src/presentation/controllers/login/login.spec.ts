import { InvalidParamError, MissingParamError } from '../../errors'
import {
  badRequest,
  ok,
  serverError,
  unauthorized
} from '../../helpers/http_helper'
import { LoginController } from './login'
import { HttpRequest, EmailValidator, Authentication } from './login_protocols'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth(email: string, password: string): Promise<string> {
      return await new Promise((resolve) => resolve('token'))
    }
  }
  return new AuthenticationStub()
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@email.com',
    password: 'any_password'
  }
})

interface SutTypes {
  sut: LoginController
  emailValidatorStub: EmailValidator
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const authenticationStub = makeAuthentication()
  const sut = new LoginController(emailValidatorStub, authenticationStub)
  return {
    sut,
    emailValidatorStub,
    authenticationStub
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

  test('Should call EmailValidator with correct email', async () => {
    // arrange
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    // act
    await sut.handle(makeFakeRequest())

    // assert
    expect(isValidSpy).toHaveBeenCalledWith('any_email@email.com')
  })

  test('Should return 400 if an ivalid email is provided', async () => {
    // arrange
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    // act
    const httpResponse = await sut.handle(makeFakeRequest())

    // assert
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('Should return 500 if EmailValidator throws', async () => {
    // arrange
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    // act
    const httpResponse = await sut.handle(makeFakeRequest())

    // assert
    expect(httpResponse).toEqual(serverError(new Error()))
  })

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
})
