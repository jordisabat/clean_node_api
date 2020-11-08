import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt_adapter'

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return await new Promise((resolve) => resolve('any_token'))
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('any_secret_key')
}

describe('Jwt Adapter', () => {
  test('Should call sign with corrects values', async () => {
    // arrange
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    // act
    await sut.encrypt('any_id')
    // assert
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'any_secret_key')
  })

  test('Should return a token on sign success', async () => {
    // arrange
    const sut = makeSut()
    // act
    const accessToken = await sut.encrypt('any_id')
    // assert
    expect(accessToken).toBe('any_token')
  })

  test('Should throw if sign throws', async () => {
    // arrange
    const sut = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error()
    })
    // act
    const promise = sut.encrypt('any_id')
    // assert
    await expect(promise).rejects.toThrow
  })
})
