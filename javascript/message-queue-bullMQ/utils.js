const path = require('path');
const sharp = require('sharp');

const processUploadedImages = async (job) => {
  const imageFileData = Buffer.from(job.image.data, 'base64');
  
  // 파일 이름 인코딩 문제 해결
  const originalName = Buffer.from(job.image.name, 'latin1').toString('utf8');
  // 확장자명을 제외하고 이름만 남김
  const imageName = path.parse(originalName).name;

  const processImage = (size) =>
    sharp(imageFileData)
      .resize(size, size)
      .webp({ lossless: true })
      .toFile(`./public/images/${imageName}-${size}.webp`);

  sizes = [96, 128];

  let counter = 0;
  for (let i = 0; i < 10_000_000_000; i++) {
    counter++;
  }

  Promise.all(sizes.map(processImage));
}

module.exports = { processUploadedImages };
