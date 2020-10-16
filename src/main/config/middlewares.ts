import { Express } from 'express'
import { bodyParser } from '../middlewares/body_parser'
import { contentType } from '../middlewares/content_type'
import { cors } from '../middlewares/cors'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}
