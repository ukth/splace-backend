/*require("dotenv").config();
import { RedisPubSub } from 'graphql-redis-subscriptions';

const pubsub = new RedisPubSub({
  connection: {
    host: process.env.REDIS_URL,
    port: process.env.REDIS_PORT,
    retry_strategy: options => Math.max(options.attempt * 100, 3000),
  },
});

export default pubsub;*/

import { PubSub } from "apollo-server-express";

const pubsub = new PubSub();

export default pubsub;