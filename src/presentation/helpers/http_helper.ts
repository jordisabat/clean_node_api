import { HttpResponse } from '../protocols/http'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverRequest = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: error
})
