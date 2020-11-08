import { AccountModel } from '../../../domain/models/account_model'

export interface LoadAccountByEmailRepository {
  loadByEmail(email: string): Promise<AccountModel>
}
