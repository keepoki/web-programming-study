const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const { Worker } = require('worker_threads');
let port = 4949;
let worker = null;

// 워커 스레드 생성
worker = new Worker(path.join(__dirname, 'worker.js'));

worker.on('message', (value) => {
  console.log('워커 스레드에서 메세지가 도착했습니다.', value);
});
worker.on('exit', (value) => {
  console.log('워커 스레드를 종료합니다.');
});

// 파일 쓰기에 사용될 문자열 데이터 설정
let content = '';
for (let i = 0; i < 10000000; ++i) {
  content += 'ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅅ, ㅇ, ㅈ, ㅊ, ㅋ, ㅌ, ㅍ, ㅎ,';
}

app.get('/', (req, res) => {
  const rand = Math.random() * 1000000;
  res.send('Hello World!\n' + Math.ceil(rand));
});

app.get('/for', (req, res) => {
  _forLoop();
  res.send('for end');
  // 위의 모든 작업이 끝난 뒤 제어권을 반환
});

app.get('/file/write', (req, res) => {
  _writeFile();
  res.send('write file end');
  // 위의 모든 작업이 끝난 뒤 제어권을 반환
});

// 워커 스레드에게 파일 쓰기 요청을 위한 라우터
app.get('/worker/file/write', (req, res) => {
  _requestWorkerWriteFile();
  // 워커 스레드에게 요청하고 바로 응답한다.
  res.send('worker thread write file start');
})

app.listen(port, () => {
  console.log('listening on port ' + port);
});

const _forLoop = () => {
  // for문 블록킹으로 인해 다른 요청도 응답 지연이 발생한다.
  console.log('for start');
  for (let i = 0; i < 9000000000;) {
    ++i;
  }
  console.log('for end');
}

const _writeFile = () => {
  console.log('write file start');
  // 파일 쓰기 블록킹으로 인해 다른 요청도 응답 지연이 발생한다.
  fs.writeFileSync('test.ff', content, err => {
    if (err) console.error(err);
  })
  console.log('write file end');
}

// 워커 스레드에게 파일 쓰기를 요청 메세지를 전송한다.
const _requestWorkerWriteFile = () => {
  worker.postMessage({ request: 'write file start', content });
}