import {
  AuthenticationModel,
  HashComparer,
  Encrypter,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  Authentication
} from './db_authentication_protocols'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashCompare: HashComparer,
    private readonly Encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth(authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(
      authentication.email
    )
    if (account) {
      const isValid = await this.hashCompare.compare(
        authentication.password,
        account.password
      )
      if (isValid) {
        const accessToken = await this.Encrypter.encrypt(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(
          account.id,
          accessToken
        )
        return accessToken
      }
    }
    return null
  }
}
