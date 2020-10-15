import { Encrypter } from '../protocols/encrypter'
import { DbAddAccount } from './db_add_account'

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
}

const makeSut = (): SutTypes => {
  class EncryptedStub {
    async encrypt(value: string): Promise<string> {
      return await new Promise((resolve) => resolve('hashed_password'))
    }
  }
  const encrypterStub = new EncryptedStub()
  const sut = new DbAddAccount(encrypterStub)
  return {
    sut,
    encrypterStub: encrypterStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    // arrange
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    // act
    await sut.add(accountData)

    // assert
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
