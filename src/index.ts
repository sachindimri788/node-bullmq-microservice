import express from "express";
import redis from "./config/redis";
import { invoiceQueue } from "./jobs";
import config from "./config";

// ✅ Importing the worker registers it and starts listening for jobs
// Since it's in the same process, the worker runs alongside the Express server
// import './worker';

const app = express();
const port = config.APP_PORT;

redis.ping();

app.get("/", async (req, res) => {
  const orderId = `order-${Date.now()}`;
  const userEmail = "test@example.com";

  await invoiceQueue.add("generate-invoice", {
    orderId,
    userEmail,
  });

  res.send(`Job added to generate invoice for ${orderId}`);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
