import { AccountModel } from '../../domain/models/account_model'

export interface LoadAccountByEmailRepository {
  load(email: string): Promise<AccountModel>
}
