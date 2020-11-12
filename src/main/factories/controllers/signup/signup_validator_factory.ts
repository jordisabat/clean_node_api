import { EmailValidatorAdapter } from '../../../../infrastructure/validators/email_validator_adaptor'
import { Validation } from '../../../../presentation/protocols/validation'
import {
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidation
} from '../../../../validation/validators'
import { CompareFieldValidation } from '../../../../validation/validators/compare_fields_validation'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(
    new CompareFieldValidation('password', 'passwordConfirmation')
  )
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
