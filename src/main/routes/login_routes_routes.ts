import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express_route_adapter'
import { makeSignUpController } from '../factories/signup/signup_factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
}
