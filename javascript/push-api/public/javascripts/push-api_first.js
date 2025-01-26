// 서비스 워커와 푸시 매니저가 있어야 한다.
if ('serviceWorker' in navigator || 'PushManager' in window) {
  // 서비스 워커에 스크립트 파일을 등록한다.
  navigator.serviceWorker.register('/service-worker.js', { scope: '/' })
    .then(registration => {
      console.log('스코프로 등록된 서비스 워커:', registration.scope);
    })
    .catch(error => {
      console.error('서비스 워커 등록 실패:', error);
    });

  // 알림(푸시) 권한을 요청
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      console.log('알림 권한 허가 받음');

      navigator.serviceWorker.ready.then(serviceWorkerRegistration => {
        console.log('서비스 워커 준비 완료');

        // 서비스 워커 푸시 매니저를 서버에 구독 신청
        serviceWorkerRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          // 서버의 VAPID Public Key
          applicationServerKey: 'Your Server VAPID Public Key',
        })
          .then(subscription => {
            console.log('구독 푸시 성공:', subscription);

            // 서버에 클라이언트 구독 정보를 전송
            fetch('/subscribe', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(subscription),
            });
          })
          .catch(error => {
            console.error('구독 푸시 실패:', error);
          });
      });
    } else {
      console.warn('알림 권한 허가 받지 못함');
    }
  });
}