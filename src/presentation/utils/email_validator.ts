import { EmailValidator } from '../protocols/email_validator'

export class EmailValidatorAdapter implements EmailValidator {
  isValid(email: string): boolean {
    return false
  }
}
