require("dotenv").config();
import { RedisPubSub } from 'graphql-redis-subscriptions';

export default new RedisPubSub({
  connection: {
    host: process.env.REDIS_URL,
    port: process.env.REDIS_PORT,
    retry_strategy: options => Math.max(options.attempt * 100, 3000),
  },
});