var Redis = require("ioredis");
require("dotenv").config();

const host = process.env.REDIS_URL
const port = process.env.REDIS_PORT
const password = process.env.REDIS_PASSWORD

var nodes = [{
  host,
  port
}]

var redisClient = new Redis.Cluster(nodes, {
  dnsLookup: (address, callback) => {
    console.log('====[dnsLookup]====');
    return callback(null, address);
  },
  redisOptions: {
    password,
    tls: {}
  }
})

export default redisClient
