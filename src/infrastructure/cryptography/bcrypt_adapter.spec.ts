import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt_adapter'

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return await new Promise((resolve) => resolve('hash_value'))
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    // arrange
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    // act
    await sut.encrypt('any_value')
    // assert
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a hash on success', async () => {
    // arrange
    const sut = makeSut()
    // act
    const hash = await sut.encrypt('any_value')
    // assert
    expect(hash).toBe('hash_value')
  })

  test('Should throw if bcrypt throws', async () => {
    // arrange
    const sut = makeSut()
    jest
      .spyOn(bcrypt, 'hash')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    // act
    const promise = sut.encrypt('any_value')
    // assert
    await expect(promise).rejects.toThrow()
  })
})
