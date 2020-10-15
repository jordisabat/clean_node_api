import { EmailValidatorAdapter } from './email_validator'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true
  }
}))

describe('EmailValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    // arrange
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const invalidEmail = 'invalid_email@mail.com'
    // act
    const isValid = sut.isValid(invalidEmail)

    // assert
    expect(isValid).toBe(false)
  })
  test('Should return false if validator returns false', () => {
    // arrange
    const sut = new EmailValidatorAdapter()
    const validEmail = 'valid_email@mail.com'
    // act
    const isValid = sut.isValid(validEmail)

    // assert
    expect(isValid).toBe(true)
  })
})
