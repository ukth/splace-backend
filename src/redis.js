var redis = require("redis")
require("dotenv").config();


const host =  process.env.REDIS_URL
const port =  process.env.REDIS_PORT

var redisClient = redis.createClient(port, host)

export default redisClient = redis.createClient(port, host)