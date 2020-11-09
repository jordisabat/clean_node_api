import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express_route_adapter'
import { makeLoginController } from '../factories/login/login_factory'
import { makeSignUpController } from '../factories/signup/signup_factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
