import { DbAddAccount } from './db_add_account'

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    // arrange
    class EncryptedStub {
      async encrypt(value: string): Promise<string> {
        return await new Promise((resolve) => resolve('hashed_value'))
      }
    }
    const encryptedStub = new EncryptedStub()
    const sut = new DbAddAccount(encryptedStub)
    const encryptSpy = jest.spyOn(encryptedStub, 'encrypt')
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
