import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt_adapter'

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
})
