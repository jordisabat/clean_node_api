import { LogErrorRepository } from '../../data/protocols/log_error_repository'
import { AccountModel } from '../../domain/models/account_model'
import { ok, serverError } from '../../presentation/helpers/http/http_helper'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      return await new Promise((resolve) => resolve(ok(makeFakeAccount())))
    }
  }
  return new ControllerStub()
}
// adicionando log de error: min 15:30
const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError(stack: string): Promise<void> {
      return await new Promise((resolve) => resolve())
    }
  }
  return new LogErrorRepositoryStub()
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeFakeServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

const makeStub = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)

  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}

describe('LogControllerDecorator', () => {
  test('Should call controller handler', async () => {
    // arrange
    const { sut, controllerStub } = makeStub()
    const httpRequest = makeFakeRequest()
    const handleSpy = jest.spyOn(controllerStub, 'handle')

    // act
    await sut.handle(httpRequest)
    // assert
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return the same result of the controller', async () => {
    // arrange
    const { sut } = makeStub()
    const httpRequest = makeFakeRequest()

    // act
    const httpResponse = await sut.handle(httpRequest)
    // assert
    expect(httpResponse).toEqual(ok(makeFakeAccount()))
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    // arrange
    const { sut, controllerStub, logErrorRepositoryStub } = makeStub()
    const error = makeFakeServerError()
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
    jest
      .spyOn(controllerStub, 'handle')
      .mockReturnValueOnce(new Promise((resolve) => resolve(error)))
    const httpRequest = makeFakeRequest()

    // act
    await sut.handle(httpRequest)

    // assert
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
