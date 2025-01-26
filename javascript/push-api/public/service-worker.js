// 푸시 이벤트 수신 이벤트 핸들러
self.addEventListener('push', event => {
  console.log('푸시 이벤트 수신:', event);

  const options = {
    body: event.data.text(),
    actions: [
      {
        action: 'yes',
        type: 'button',
        title: '👍 Yes',
      },
      {
        action: 'no',
        type: 'button',
        title: '👎 No',
      },
    ],
  };

  event.waitUntil(self.registration.showNotification('브라우저 이동', options));
});

// 알림(푸시) 창 클릭 이벤트 핸들러
self.addEventListener('notificationclick', event => {
  event.notification.close();
  console.log('Notification clicked:', event.notification);
  const action = event.action;

  // push에서 정의한 action 값을 확인해서 처리
  if (action === 'yes') {
    event.waitUntil(
      clients
        .matchAll({
          type: "window",
        })
        .then(function (clientList) {
          for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            // 현재 URL이 "/"이고 "focus" 메소드를 가지고 있다면 해당 클라이언트에 포커스
            if (client.url == "/" && "focus" in client) return client.focus();
          }
          // 만약 클라이언트가 없다면 새 창 열기
          if (clients.openWindow) return clients.openWindow("https://www.naver.com");
        }),
    );
  }
});