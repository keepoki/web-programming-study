const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 4731;
const router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/** home page */
router.get('/', (req, res) => {
  res.render('index', { title: 'Server-Sent-Events' });
});

router.get('/subscribe/:id', (req, res) => {
  // Content-Type 'text/event-stream'을 설정해야 이벤트 스트림으로 연결됨
  const headers = {
    'Content-Type': 'text/event-stream', 
  };

  // user id 로깅
  const uui = req.params?.id;
  console.log(`SSE Connection By User Id: ${uui}`);

  let count = 0; // id로 활용
  res.writeHead(200, headers);
  res.write('event: connected\n');
  res.write('data: subscribed\n');
  res.write(`id: ${count++}\n\n`);
  
  let rand = Math.random() * 10000;

  //연결이 유지되는 동안 일정 주기마다 데이터를 전송
  setInterval(() => {
    /* 
      req.query 또는 req.params를 통해 유저의 uui를 받아 유저의 권한이나
      설정 값에 따른 분기 처리를 활용하면 좋을 것이다.
      어떠한 조건에 따라 분기 처리해야한다는 가정으로 랜덤 값으로 구현함
    */
    let data = {};
    data.time = new Date();

    rand = Math.random() * 10000;
    if (rand < 3000) {
      data.text = 'this is message';
      res.write('event: message\n'); // \n은 구분자, request query의 & 와 같은 의미
    } else if (rand < 6000) {
      data.text = 'have a good day';
      res.write('event: happy\n');
    } else {
      data.text = `If you laugh, you'll be happy`;
      res.write('event: smile\n');
    }
    
    res.write(`id: ${count++}\n`);
    res.write(`data: ${JSON.stringify(data)}`);
    // SSE에서 두 개의 개 행은 데이터의 끝마침을 의미 (세미콜론과 같은 의미)
    res.write('\n\n'); 
  }, 2000);

  // 클라이언트에서 연결을 종료한 경우 (의도적이거나 의도치 않은 경우 모두 해당)
  req.on('close', () => {
    console.log(`SSE Disconnection By User Id: ${uui}`);
  });
});

app.use('/', router);
app.listen(port, () => {
  console.log(`listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});
