import env from '../../config/env'
import { DbAuthentication } from '../../../data/usecases/authentication/db_authentication'
import { BcryptAdapter } from '../../../infrastructure/cryptography/bcrypt_adapter/bcrypt_adapter'
import { JwtAdapter } from '../../../infrastructure/cryptography/jwt_adapter/jwt_adapter'
import { AccountMongoRepository } from '../../../infrastructure/db/mongodb/account/account_mongo_repository'
import { LogMongoRepository } from '../../../infrastructure/db/mongodb/log/log_mongo_repository'
import { LoginController } from '../../../presentation/controllers/login/login_controller'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log_controller_decorator'
import { makeLoginValidation } from './login_validation_factory'

export const makeLoginController = (): Controller => {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecrete)
  const dbAuthentication = new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository
  )
  const loginController = new LoginController(
    dbAuthentication,
    makeLoginValidation()
  )
  const logMongoRepository = new LogMongoRepository()

  return new LogControllerDecorator(loginController, logMongoRepository)
}
