import { EmailValidation } from '../../../presentation/helpers/validators/email_validation'
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required_field_validation'
import { Validation } from '../../../presentation/protocols/validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation_composite'
import { EmailValidatorAdapter } from '../../../utils/email_validator_adaptor'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
