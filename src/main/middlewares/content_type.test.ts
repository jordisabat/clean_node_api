import request from 'supertest'
import app from '../config/app'

describe('Content Type Middleware', () => {
  test('Should return default content type as json', async () => {
    // assert
    const url = '/test_content_type'
    // act
    app.get(url, (req, res) => {
      res.send()
    })
    // assert
    await request(app).get(url).expect('content-type', /json/)
  })

  test('Should return xml content type when forced', async () => {
    // assert
    const url = '/test_content_type_xml'
    // act
    app.get(url, (req, res) => {
      res.type('xml')
      res.send('')
    })
    // assert
    await request(app).get(url).expect('content-type', /xml/)
  })
})
