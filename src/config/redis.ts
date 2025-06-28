import IORedis from "ioredis";
import config from "../config";

const redis = new IORedis({
  host: config.REDIS_HOST,
  port: Number(config.REDIS_PORT),
});

redis.on("connect", () => {
  console.log("✅ Connected to Redis");
});

redis.on("error", (err) => {
  console.error("❌ Redis connection error:", err);
});

export default redis;
