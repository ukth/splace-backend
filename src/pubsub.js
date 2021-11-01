require("dotenv").config();
import { RedisPubSub } from 'graphql-redis-subscriptions';
var Redis = require("ioredis");

const host = process.env.REDIS_URL
const port = process.env.REDIS_PORT
const password = process.env.REDIS_PASSWORD

var nodes = [{
  host,
  port
}]

var cluster = new Redis.Cluster(nodes, {
  dnsLookup: (address, callback) => {
    console.log('====[dnsLookup]====');
    return callback(null, address);
  },
  redisOptions: {
    tls: true,
    password
	},
  clusterRetryStrategy: (times) => {
    const ms = Math.min(100 * times, 2000);
    console.log(`Cluster retry #${times}: Will wait ${ms} ms`);
    return ms;
  }
})

const pubsub = new RedisPubSub({
  publisher: cluster,
  subscriber: cluster
});

export default pubsub;