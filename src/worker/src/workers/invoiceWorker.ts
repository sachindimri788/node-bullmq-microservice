import { Worker } from "bullmq";
import redisConnection from "./../config/redis";

export const invoiceWorker = () => {
  const worker = new Worker(
    "invoice-pdf",
    async (job) => {
      const { orderId, userEmail } = job.data;
      console.log(`🧾 Generating invoice for ${orderId} (${userEmail})`);
      await new Promise((r) => setTimeout(r, 3000));
      console.log(`✅ Invoice done for ${orderId}`);
    },
    { connection: redisConnection }
  );
  worker.on("completed", (job) => {
    console.log(`🎉 Job ${job.id} completed`);
  });

  worker.on("failed", (job, err) => {
    console.error(`❌ Job ${job?.id} failed:`, err);
  });
};
