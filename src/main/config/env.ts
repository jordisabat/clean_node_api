export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clean_node_api',
  port: process.env.PORT || 5050,
  jwtSecrete: process.env.JWT_SECRET || 't234KWsfd3'
}
