import { LoginController } from '../../../../presentation/controllers/login/login_controller'
import { Controller } from '../../../../presentation/protocols'
import { makeLoginValidation } from './login_validation_factory'
import { makeDbAutentication } from '../../usecases/authentication/dbAuthentication_factory'
import { makeLogControllerDecorator } from '../../decorators/log_controller_decorator_factory'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(
    makeDbAutentication(),
    makeLoginValidation()
  )
  return makeLogControllerDecorator(controller)
}
