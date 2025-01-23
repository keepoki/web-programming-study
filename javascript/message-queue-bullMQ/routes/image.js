const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { Queue } = require('bullmq');
const { createBullBoard } = require("@bull-board/api");
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");
const { ExpressAdapter } = require("@bull-board/express");
const redisOptions = { host: 'localhost', port: 6379 };

const imageJobQueue = new Queue('imageJobQueue', {
  connection: redisOptions,
});

const serverAdapter = new ExpressAdapter();
const bullBoard = createBullBoard({
  queues: [new BullMQAdapter(imageJobQueue)],
  serverAdapter: serverAdapter,
});
serverAdapter.setBasePath("/image/admin");

async function addJob(job) {
  await imageJobQueue.add(job.type, job);
}

router.use('/admin', serverAdapter.getRouter());

router.get('/result', (req, res) => {
  const imgDirPath = path.join(__dirname, "../public/images");
  const imgFiles = fs.readdirSync(imgDirPath).map((image) => {
    return `/images/${image}`;
  });
  res.render("result", { imgFiles });
})

router.post('/upload', async (req, res) => {
  const { image } = req.files;

  if (!image) return res.sendStatus(400);

  await addJob({
    type: 'processUploadedImages',
    image: {
      data: Buffer.from(image.data).toString('base64'),
      name: image.name,
    }
  });

  res.redirect("/image/result");
});


module.exports = router;