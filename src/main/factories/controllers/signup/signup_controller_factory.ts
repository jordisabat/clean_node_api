import { SignUpController } from '../../../../presentation/controllers/signup/signup_controller'
import { Controller } from '../../../../presentation/protocols'
import { makeSignUpValidation } from './signup_validator_factory'
import { makeDbAutentication } from '../../usecases/authentication/dbAuthentication_factory'
import { makeDbAddAccount } from '../../usecases/add_account/dbAddAccount_factory'
import { makeLogControllerDecorator } from '../../decorators/log_controller_decorator_factory'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(
    makeDbAddAccount(),
    makeSignUpValidation(),
    makeDbAutentication()
  )
  return makeLogControllerDecorator(controller)
}
