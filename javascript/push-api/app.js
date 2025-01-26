const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const webPush = require('web-push');

const indexRouter = require('./routes/index');
const app = express();

/** 
 * npm web-push를 참고하세요
 * @see https://www.npmjs.com/package/web-push
 * VAPID Key 생성 명령어: web-push generate-vapid-keys
 */
const vapidPublicKey = 'Your VAPID Public Key';
const vapidPrivateKey = 'Your VAPID private Key';
webPush.setVapidDetails(
  'mailto:your-email@example.com',
  vapidPublicKey,
  vapidPrivateKey
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// 구독자를 담을 배열, DB 또는 Redis 같은 저장소를 이용해야 서버가 꺼질 때 데이터가 유지된다.
const subs = [];

app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  console.log('post subscription:', subscription);

  // 중복을 방자히여 구독한 클라이언트를 추가
  let isIncludes = subs.some(sub => sub.endpoint === subscription.endpoint);
  if (isIncludes === false) {
    subs.push(subscription);
  }

  res.status(201).json({});
});

app.get('/subscription', (req, res) => {
  const { endpoint } = req.query;
  const findSubscription = subs.find(sub => sub.endpoint === endpoint);
  console.log('findSubscription', findSubscription);

  let result = {
    endpoint
  };

  if (!findSubscription) {
    result = {
      message: 'not found',
    };
  }
  res.status(200).json(result);
});

app.delete('/subscription', (req, res) => {
  const subscription = req.body;
  console.log('delete subscription:', subscription);

  const findIdx = subs.findIndex(sub => sub.endpoint === subscription.endpoint);
  if (findIdx !== -1) {
    subs.splice(findIdx, 1);
  }

  res.status(204).json({});
})

app.post('/send-notification', async (req, res) => {
  console.log('send-notification, subs:', subs.length);

  // 구독한 클라이언트에게 푸시 이벤트를 전송한다.
  for (const sub of subs) {
    await webPush.sendNotification(sub, '네이버로 이동하겠습니까?').catch(err => {
        console.error(err);
        // 푸시 구독이 만료되었거나 취소한 경우(알림 차단 등) 구독 정보에서 제거한다.
        if ([404, 410].includes(err.statusCode)) {
          const index = subs.findIndex(sub => sub.endpoint === err.endpoint);
          subs.splice(index, 1);
        }
      });
  }
  res.status(200).json({});
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
