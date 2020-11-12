import env from '../../../config/env'
import { DbAuthentication } from '../../../../data/usecases/authentication/db_authentication'
import { BcryptAdapter } from '../../../../infrastructure/cryptography/bcrypt_adapter/bcrypt_adapter'
import { JwtAdapter } from '../../../../infrastructure/cryptography/jwt_adapter/jwt_adapter'
import { AccountMongoRepository } from '../../../../infrastructure/db/mongodb/account/account_mongo_repository'
import { Authentication } from '../../../../domain/usecases/authentication'

export const makeDbAutentication = (): Authentication => {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecrete)
  return new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository
  )
}
