window.addEventListener('load', () => {
  const registerBtn = document.getElementById('web-push-register-btn');
  registerBtn?.addEventListener('click', webPushRegister);
  const unsubscribeBtn = document.getElementById('web-push-unsubscribe-btn');
  unsubscribeBtn?.addEventListener('click', webPushUnsubscribe);
})

// 중복 실행 방지
let isPushRegisterLoading = false;
let isPushUnsubscribeLoading = false;

/** 푸시 등록 */
async function webPushRegister() {
  // 서비스 워커와 푸시 매니저가 있어야 한다.
  if (!('serviceWorker' in navigator)) {
    alert('서비스 워커를 지원하지 않는 브라우저입니다');
    return;
  }

  if (!('PushManager' in window)) {
    alert('푸시 서비스를 지원하지 않는 브라우저입니다');
    return;
  }

  if (isPushRegisterLoading) return;
  isPushRegisterLoading = true;

  alert('푸시 등록 시작');

  // 서비스 워커에 스크립트 파일을 등록한다. 
  registerServiceWorker('/service-worker.js', { scope: '/' });

  if (Notification.permission === 'denied') {
    // 알림 권한 거절 상태
    alert('알림 권한이 거절 상태라서 알림 등록이 불가능 합니다');
  } else if (Notification.permission === 'granted') {
    // 알림 권한 승인 상태
    // 푸시 매니저에 구독, 서버에 구독 정보 저장
    await pushSubscribeAndServerSave();

  } else if (Notification.permission !== 'denied') {
    // 알림 권한 거절이 아닌 상태
    // 사용자에게 알림 권한 승인 요청
    const permission = await Notification.requestPermission().catch(error => {
      console.error('알림 권한 승인 요청 에러 발생!', error);
    });

    // 알림 권한이 승인된 경우
    if (permission === 'granted') {
      // 푸시 매니저에 구독, 서버에 구독 정보 저장
      await pushSubscribeAndServerSave();
    }
  }

  alert('푸시 등록 끝');
  isPushRegisterLoading = false;
}

/**
 * 서비스 워커에 스크립트 파일을 등록
 * @param {string} scriptURL 
 * @param {{scope: string}} options 
 * @returns {Promise<ServiceWorkerRegistration>}
 */
async function registerServiceWorker(scriptURL, options) {
  // url 경로와 스크립트 파일 경로를 일치 시켜야 한다. index.ejs는 '/' 이므로
  // express.static 설정으로 public 폴더가 '/' 기준으로 되어 있으니 public 폴더에 파일이 있어야 한다.
  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register 참고
  return navigator.serviceWorker.register(scriptURL, options)
    .then(registration => {
      console.log('스코프로 등록된 서비스 워커:', registration.scope);
      return registration;
    })
    .catch(error => {
      console.error('서비스 워커 등록 실패:', error);
    });
}

/**
 * 서비스 워커에 등록된 스크립트 파일을 모두 취소
 * @returns {Promise<readonly ServiceWorkerRegistration[]>}
 * https://goddaehee.tistory.com/347
 */
async function unRegisterServiceWorker() {
  return navigator.serviceWorker.getRegistrations()
    .then(registrations => {
      console.log('서비스 워커에서 스크립트 삭제');
      for (const registration of registrations) {
        registration.unregister();
      }
    })
    .catch(error => {
      console.error(error);
    })
}

/**
 * 서비스 워커 등록 객체를 리턴
 * @returns {Promise<ServiceWorkerRegistration>}
 */
async function getServiceWorkerRegistration() {
  return new Promise((resolve, reject) => {
    navigator.serviceWorker.ready.then(registration => {
      resolve(registration);
    }).catch(error => {
      reject(error);
    });
  });
}

/** 푸시 매니저에 구독, 서버에 구독 정보 저장 */
async function pushSubscribeAndServerSave() {
  // 사용자의 푸시 구독 정보를 가져오고 없으면 푸시 서비스를 구독한다.
  let pushSubscription = await getUserSubscriptionPush();
  if (!pushSubscription) {
    pushSubscription = await subscribeUserToPush();
  }

  // 사용자의 푸시 구독 정보를 서버에 저장한다.
  await sendUserSubscriptionPushToServer(pushSubscription);
}

/**
 * 서비스 워커 푸시 매니저에서 유저 푸시 구독 정보를 반환
 * @returns {Promise<PushSubscription || null}
 */
async function getUserSubscriptionPush() {
  return getServiceWorkerRegistration().then(registration => {
    return registration.pushManager.getSubscription()
      .then(pushSubscription => pushSubscription)
      .catch(error => console.error(error));
  });
}

/**
 * 서비스 워커 푸시 매니저에 유저 푸시 구독
 * @returns {Promise<PushSubscription>}
 */
async function subscribeUserToPush() {
  return getServiceWorkerRegistration().then(registration => {
    return registration.pushManager.subscribe({
      userVisibleOnly: true,
      // 서버의 VAPID Public Key
      applicationServerKey: 'Your Server VAPID Public Key',
    })
      .then(pushSubscription => {
        // alert('서비스 워커 푸시 매니저에 유저 푸시 구독 성공 ' + JSON.stringify(pushSubscription.endpoint));
        console.log('서비스 워커 푸시 매니저에 유저 푸시 구독 성공', pushSubscription);
        return pushSubscription;
      })
      .catch(err => console.error(err));
  })
}

/** 사용자 구독 푸시 정보를 서버에 보낸다. 서버에서 중복된 데이터라면 저장하지 않는다. */
async function sendUserSubscriptionPushToServer(subscription) {
  try {
    if (!subscription) return;
    console.log('postServerWebPushSubscribe', subscription);

    const response = await fetch('/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription),
    });

    const responseData = await response.json();
    console.log('서버에 클라이언트 푸시 매니저 구독 정보 처리 성공, response:', responseData);
    return responseData;
  } catch (error) {
    console.error('서버에 클라이언트 푸시 매니저 구독 정보 처리 실패!', error);
  }
}

/** 사용자 구독 푸시 정보 삭제 요청을 서버에 보낸다. */
async function sendUserPushUnsubscribeToServer(subscription) {
  try {
    if (!subscription) return;
    console.log('deleteServerWebPushSubscription', subscription);
    const response = await fetch('/subscription', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription)
    });
    console.log('서버에서 푸시 매니저 구독 정보 삭제 성공');
    return true;
  } catch (error) {
    console.error('서버에서 푸시 매니저 구독 정보 삭제 실패!', error);
  }
}

/** 사용자 구독 푸시 정보를 서버에서 가져온다. */
async function getUserSubscriptionPushInServer(subscription) {
  return new Promise((resolve, reject) => {
    try {
      const queryString = new URLSearchParams({ endpoint: subscription.endpoint }).toString();
      fetch(`/subscription?${queryString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(err => reject(err));

    } catch (error) {
      reject(error);
    }
  })
}

/** 푸시 구독 취소 */
async function webPushUnsubscribe() {
  // 서비스 워커와 푸시 매니저가 있어야 한다.
  if (!('serviceWorker' in navigator)) {
    alert('서비스 워커를 지원하지 않는 브라우저입니다');
    return;
  }

  if (!('PushManager' in window)) {
    alert('푸시 서비스를 지원하지 않는 브라우저입니다');
    return;
  }

  if (isPushUnsubscribeLoading) return;
  isPushRegisterLoading = true;

  // 서비스 워커 푸시 매니저에 등록되어 있는 유저 구독 정보를 가져온다.
  const subscription = await getUserSubscriptionPush();
  
  // 등록 되어있다면 취소한다.
  if (subscription) {
    subscription.unsubscribe();
    alert('푸시 서비스 구독이 해제되었습니다!');
  } else {
    alert('푸시 서비스 구독이 되어 있지 않습니다');
  }
  
  // 서버에 푸시 매니저 구독 정보 삭제 요청
  await sendUserPushUnsubscribeToServer(subscription);

  isPushRegisterLoading = false;
} 