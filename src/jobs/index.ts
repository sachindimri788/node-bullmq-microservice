import { Queue } from "bullmq";
import redis from "../config/redis";

export const invoiceQueue = new Queue("invoice-pdf", {
  connection: redis,
});
