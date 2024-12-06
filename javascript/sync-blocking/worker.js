const { parentPort } = require('worker_threads');
const fs = require('fs');

// 워커 스레드
parentPort.on('message', (value) => {
  console.log('메인 스레드에서 메세지가 도착했습니다.', value.request);
  if (value?.request === 'write file start') {
    // 메인 스레드에 메세지를 보낸다.
    parentPort.postMessage('worker thread write file start');

    console.log('WORKER START'); // 

    // 파일 쓰기에 사용될 문자열 데이터 설정
    const content = value.content;
    if (content) {
      // 파일 쓰기 블록킹으로 인해 다른 요청도 응답 지연이 발생한다.
      fs.writeFileSync('worker_test.ff', content, err => {
        if (err) console.error(err);
      });
    }

    console.log('WORKER END');
    
    parentPort.postMessage('worker thread write file end');

    // WORKER START와 WORKER END에 대한 console.log 메서드는 파일 쓰기가 끝난 뒤에 한번에 호출되고 있다.
    // 따라서 제대로 된 시작과 종료을 알리기 위해 메인 스레드에 시작과 종료 메세지를 보낸다.
    /*
      -- console log --
      워커 스레드에서 메세지가 도착했습니다. worker thread write file start
      워커 스레드에서 메세지가 도착했습니다. worker thread write file end
      WORKER START
      WORKER END
    */
  }
});