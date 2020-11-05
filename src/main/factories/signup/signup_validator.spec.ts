import {
  EmailValidator,
  Validation
} from '../../../presentation/controllers/signup/signup_protocols'
import { CompareFieldValidation } from '../../../presentation/helpers/validators/compare_fields_validation'
import { EmailValidation } from '../../../presentation/helpers/validators/email_validation'
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required_field_validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation_composite'
import { makeSignUpValidation } from './signup_validator'

jest.mock('../../../presentation/helpers/validators/validation_composite.ts')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    // arrange
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(
      new CompareFieldValidation('password', 'passwordConfirmation')
    )
    validations.push(new EmailValidation('email', makeEmailValidator()))
    // act
    makeSignUpValidation()
    // assert
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
