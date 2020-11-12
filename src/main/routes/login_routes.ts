import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express_route_adapter'
import { makeLoginController } from '../factories/controllers/login/login_controller_factory'
import { makeSignUpController } from '../factories/controllers/signup/signup_controller_factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
