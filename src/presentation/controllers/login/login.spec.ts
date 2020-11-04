import { Authentication } from '../../../domain/usecases/authentication'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http_helper'
import { EmailValidator, HttpRequest } from '../signup/signup_protocols'
import { LoginController } from './login'

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
    const httpRequest = makeFakeRequest()

    // act
    await sut.handle(httpRequest)

    // assert
    expect(isValidSpy).toHaveBeenCalledWith('any_email@email.com')
  })

  test('Should return 400 if an ivalid email is provided', async () => {
    // arrange
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = makeFakeRequest()

    // act
    const httpResponse = await sut.handle(httpRequest)

    // assert
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('Should return 500 if EmailValidator throws', async () => {
    // arrange
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = makeFakeRequest()

    // act
    const httpResponse = await sut.handle(httpRequest)

    // assert
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call Authentication with correct value', async () => {
    // arrange
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    const httpRequest = makeFakeRequest()

    // act
    await sut.handle(httpRequest)

    // assert
    expect(authSpy).toHaveBeenCalledWith('any_email@email.com', 'any_password')
  })
})
