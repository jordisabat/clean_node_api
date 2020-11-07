import { AccountModel } from '../../../domain/models/account_model'
import { AuthenticationModel } from '../../../domain/usecases/authentication'
import { HashComparer } from '../../protocols/cryptography/hash_comparer'
import { TokenGenerator } from '../../protocols/cryptography/token_generator'
import { LoadAccountByEmailRepository } from '../../protocols/db/load_account_by_email_repository'
import { UpdateAccessTokenRepository } from '../../protocols/db/update_access_token_repository'
import { DbAuthentication } from './db_authentication'

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password'
})

const makeFakeAuthentication = (): AuthenticationModel => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub
  implements LoadAccountByEmailRepository {
    async load(email: string): Promise<AccountModel> {
      return await new Promise((resolve) => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeHashCompare = (): HashComparer => {
  class HashCompareStub implements HashComparer {
    async compare(value: string, hash: string): Promise<boolean> {
      return await new Promise((resolve) => resolve(true))
    }
  }
  return new HashCompareStub()
}

const makeTokenGenerator = (): TokenGenerator => {
  class TokenGeneratorStub implements TokenGenerator {
    async generate(id: string): Promise<string> {
      return await new Promise((resolve) => resolve('any_token'))
    }
  }
  return new TokenGeneratorStub()
}

const makeUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async update(id: string, token: string): Promise<void> {
      return await new Promise((resolve) => resolve())
    }
  }
  return new UpdateAccessTokenRepositoryStub()
}

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashCompareStub: HashComparer
  tokenGeneratorStub: TokenGenerator
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const hashCompareStub = makeHashCompare()
  const tokenGeneratorStub = makeTokenGenerator()
  const updateAccessTokenRepositoryStub = makeUpdateAccessTokenRepository()
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashCompareStub,
    tokenGeneratorStub,
    updateAccessTokenRepositoryStub
  )
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashCompareStub,
    tokenGeneratorStub,
    updateAccessTokenRepositoryStub
  }
}

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    // arrange
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    // act
    await sut.auth(makeFakeAuthentication())
    // assert
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    // arrange
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'load')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    // act
    const promise = sut.auth(makeFakeAuthentication())
    // assert
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadAccountByEmailRepository return null', async () => {
    // arrange
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'load')
      .mockReturnValueOnce(null)
    // act
    const accessToken = await sut.auth(makeFakeAuthentication())
    // assert
    expect(accessToken).toBeNull()
  })

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    // arrange
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    // act
    await sut.auth(makeFakeAuthentication())
    // assert
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should call HashCompare with correct values', async () => {
    // arrange
    const { sut, hashCompareStub } = makeSut()
    const compareSpy = jest.spyOn(hashCompareStub, 'compare')
    // act
    await sut.auth(makeFakeAuthentication())
    // assert
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })

  test('Should throw if HashCompare throws', async () => {
    // arrange
    const { sut, hashCompareStub } = makeSut()
    jest
      .spyOn(hashCompareStub, 'compare')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    // act
    const promise = sut.auth(makeFakeAuthentication())
    // assert
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if HashComparer return false', async () => {
    // arrange
    const { sut, hashCompareStub } = makeSut()
    jest
      .spyOn(hashCompareStub, 'compare')
      .mockReturnValueOnce(new Promise((resolve) => resolve(false)))
    // act
    const accessToken = await sut.auth(makeFakeAuthentication())
    // assert
    expect(accessToken).toBeNull()
  })

  test('Should call TokenGenerator with correct id', async () => {
    // arrange
    const { sut, tokenGeneratorStub } = makeSut()
    const generateSpy = jest.spyOn(tokenGeneratorStub, 'generate')
    // act
    await sut.auth(makeFakeAuthentication())
    // assert
    expect(generateSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if TokenGenerator throws', async () => {
    // arrange
    const { sut, tokenGeneratorStub } = makeSut()
    jest
      .spyOn(tokenGeneratorStub, 'generate')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    // act
    const promise = sut.auth(makeFakeAuthentication())
    // assert
    await expect(promise).rejects.toThrow()
  })

  test('Should return token on success', async () => {
    // arrange
    const { sut } = makeSut()
    // act
    const accessToken = await sut.auth(makeFakeAuthentication())
    // assert
    expect(accessToken).toBe('any_token')
  })

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    // arrange
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'update')
    // act
    await sut.auth(makeFakeAuthentication())
    // assert
    expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token')
  })

  test('Should throw if UpdateAccessTokenRepository throws', async () => {
    // arrange
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    jest
      .spyOn(updateAccessTokenRepositoryStub, 'update')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    // act
    const promise = sut.auth(makeFakeAuthentication())
    // assert
    await expect(promise).rejects.toThrow()
  })
})
