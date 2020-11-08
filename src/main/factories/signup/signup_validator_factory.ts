import { Validation } from '../../../presentation/controllers/signup/signup_controller_protocols'
import {
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidation
} from '../../../presentation/helpers/validators'
import { CompareFieldValidation } from '../../../presentation/helpers/validators/compare_fields_validation'
import { EmailValidatorAdapter } from '../../adapters/validators/email_validator_adaptor'

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
