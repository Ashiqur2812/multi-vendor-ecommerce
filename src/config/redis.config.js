const { createClient } = require("redis");
const config = require("./config");

const redisClient = createClient({
  username: config.REDIS_USERNAME,
  password: config.REDIS_PASSWORD,
  socket: {
    host: config.REDIS_HOST,
    port: Number(config.REDIS_PORT),
  },
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("Redis Connected");
  }
};

module.exports = { redisClient, connectRedis };
