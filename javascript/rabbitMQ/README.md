# RabbitMQ를 node에서 실행해보기

windows 환경에서 실행해봤습니다.

1. rabbitMQ 설치 <https://www.rabbitmq.com/docs/download>
2. rabbitMQ Server 실행 (PowerShell, 관리자 권한)
`net star RabbitMQ`
3. 포트 확인
`netstat -ano | findstr 5672`
4. (필요시) 웹 UI 관리자 페이지 활성화
`rabbitmq-plugins enable rabbitmq_management`
5. (필요시) 브라우저 접속하고 로그인 (ID: guest, PW: guest)
<http://localhost:15672>
6. RabbitMQ 실행 상태 확인
`rabbitmqctl status`
7. 컨슈머 실행
`node consumer.js`
8. 프로듀서 실행
`node producer.js`

## 접속이 안된다면 다음을 확인하세요

방화벽 설정(PowerShell, 관리자 권한):
`New-NetFirewallRule -DisplayName "Allow RabbitMQ 5672" -Direction Inbound -LocalPort 5672 -Protocol TCP -Action Allow`


`Error: read ECONNRESET` 에러:
램 최대 사용치를 8192 이상으로 설정이 필수

```js
const conn = await amqp.connect({
  protocol: 'amqp',
  hostname: 'localhost',
  port: 5672,
  username: 'guest',
  password: 'guest',
  frameMax: 8192  // ✅ 최소 8192 이상
});
```
