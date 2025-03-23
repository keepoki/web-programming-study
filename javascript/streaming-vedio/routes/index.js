const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Video Streaming' });
});

router.get('/video/list', (req, res, next) => {
  try {
    const videoList = fs.readdirSync('videos');
    const result = [];
    for (let i = 0; i < videoList.length; i++) {
      result.push({
        filename: path.basename(videoList[i], path.extname(videoList[i])),
        filepath: videoList[i],
      });
    }
    
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
  }
});

/**
 * 스트림으로 데이터를 나누어 보내고 전송이 끝나면 해당 영상을 재생할 수 있고
 * 버퍼링이 없음
 */
router.get('/video/stream/load/:params', (req, res, next) => {
  try {
    const { params: selectedFilepath } = req.params;
    const filepath = `videos/${selectedFilepath}`;
    const stat = fs.statSync(filepath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (!range) {
      const header = {
        'Content-Type': 'video/mp4',
        'Content-Length': fileSize,
      }
      res.writeHead(200, header);
      // res.end();
      fs.createReadStream(filepath).pipe(res);
    } else {
      const CHUNK_SIZE = 1024 * 1024;

      // range 헤더 파싱
      const parts = range.replace(/bytes=/, "").split("-");
      // 재생 구간 설정
      const start = parseInt(parts[0], 10);
      const _end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const end = Math.min(_end, start + CHUNK_SIZE - 1);

      const header = {
        'Content-Type': 'video/mp4',
        'Accept-Ranges': 'bytes',
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Content-Length': end - start + 1,
      }
      res.writeHead(206, header);
      const readStream = fs.createReadStream(filepath, { start, end });
      readStream.pipe(res);
    }
  } catch (error) {
    console.error(error);
  }
});

/**
 * 버퍼 만큼 쪼개서 기록하여 바로 재생 된다.로드가 버퍼만큼 쪼개서 재생시간이 추가
 * 되는 방식이다. 다만, 영상 시간 조작이 불가능해서 재생 또는 일시정지만 가능하다.
 */
router.get('/video/stream/live/:params', (req, res, next) => {
  try {
    const { params: selectedFilepath } = req.params;
    const filepath = `videos/${selectedFilepath}`;
    const stat = fs.statSync(filepath);
    const fileSize = stat.size;
    const range = req.headers.range;
    const CHUNK_SIZE = 1024 * 1024;
    
    if (!range) {
      res.status(500);
    } else {
      // range 헤더 파싱
      const parts = range.replace(/bytes=/, "").split("-");
      // 재생 구간 설정
      const start = parseInt(parts[0], 10);
      const _end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const end = Math.min(_end, start + CHUNK_SIZE - 1);

      const stream = fs.createReadStream(filepath, { start, _end });
      let count = 0;
      stream.on('data', (data) => {
        count++;
        console.log(data);
        res.write(data);
      });

      stream.on('end', () => {
        console.log('end streaming');
        res.end();
      })

      stream.on('error', (err) => {
        console.log(err);
        res.end('500 Internal Server ' + err);
      })
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
