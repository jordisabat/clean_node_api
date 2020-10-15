import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt_adapter'

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return await new Promise((resolve) => resolve('hash_value'))
  }
}))

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    // arrange
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    // act
    await sut.encrypt('any_value')
    // assert
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a hash on success', async () => {
    // arrange
    const salt = 12
    const sut = new BcryptAdapter(salt)
    // act
    const hash = await sut.encrypt('any_value')
    // assert
    expect(hash).toBe('hash_value')
  })
})
