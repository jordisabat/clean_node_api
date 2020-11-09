export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27017/clean_node_api',
  port: process.env.PORT || 5050,
  jwtSecrete: process.env.JWT_SECRET || 't234KWsfd3'
}
