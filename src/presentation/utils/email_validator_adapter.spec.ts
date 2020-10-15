import { EmailValidatorAdapter } from './email_validator_adaptor'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('EmailValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    // arrange
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const invalidEmail = 'invalid_email@mail.com'
    // act
    const isValid = sut.isValid(invalidEmail)

    // assert
    expect(isValid).toBe(false)
  })
  test('Should return false if validator returns false', () => {
    // arrange
    const sut = makeSut()
    const validEmail = 'valid_email@mail.com'
    // act
    const isValid = sut.isValid(validEmail)

    // assert
    expect(isValid).toBe(true)
  })
  test('Should call validator with correct email', () => {
    // arrange
    const sut = makeSut()
    const anyEmail = 'any_email@mail.com'
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    // act
    sut.isValid(anyEmail)

    // assert
    expect(isEmailSpy).toHaveBeenCalledWith(anyEmail)
  })
})
