import { LogErrorRepository } from '../../../../data/protocols/log_error_repository'
import { MongoHelper } from '../helpers/mongo_helper'

export class LogMongoRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}
