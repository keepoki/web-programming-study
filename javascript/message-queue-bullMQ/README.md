# Message Queue in bullMQ

메시지 큐를 이용하여 FIFO 순서에 맞게 작업이 이루어질 수 있도록 설계하는 것을 목표로 하였습니다.
기본적인 사용법을 다뤄 간단한 프로세스로 구성되어 있습니다.

아래 사이트를 참고하였습니다.
<https://docs.bullmq.io/>
<https://yozm.wishket.com/magazine/detail/2599/>
<https://www.digitalocean.com/community/tutorials/how-to-handle-asynchronous-tasks-with-node-js-and-bullmq>

## 실행을 위한 준비 작업

1. Redis 설치 및 실행 <https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/>
2. npm install로 의존성 모듈 설치
3. npm start로 백엔드 실행
4. npm run worker로 bullMQ worker을 실행

### 페이지 설명

- `localhost:3737`: 이미지를 업로드하는 Form 페이지
- `localhost:3737/image/result`: 업로드 된 이미지들을 확인하는 페이지
- `localhost:3737/image/admin`: bullMQ 작업 상태를 확인할 수 있는 페이지
