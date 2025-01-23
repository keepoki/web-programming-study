const { Worker } = require('bullmq');
const { processUploadedImages } = require('./utils');

const workerHandler = async (job) => {
  console.log('starting job:', job.name);
  processUploadedImages(job.data);
  console.log('finished job:', job.name);
  return job;
}

const workerOptions = {
  connection: {
    host: "localhost",
    port: 6379,
  },
};

const worker = new Worker('imageJobQueue', workerHandler, workerOptions);

worker.on('completed', job => {
  console.log(`${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
  console.log(`${job.id} has failed with ${err.message}`);
  // 작업이 끝난 뒤 해당 에러 메시지가 발생하는데, (34 has failed with Maximum call stack size exceeded)
  // 작업은 또 제대로 수행하였음
});

console.log('Worker started!');


