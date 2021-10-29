var Redis = require("ioredis");
require("dotenv").config();

const host =  process.env.REDIS_URL
const port =  process.env.REDIS_PORT

var nodes = [{
  host,
  port
}]

var redisClient = new Redis.Cluster(nodes)

export default redisClient
