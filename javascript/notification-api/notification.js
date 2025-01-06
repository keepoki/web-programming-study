{
  if ('Notification' in window) {
    // Notifications are supported
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        // User granted permission
      } else if (permission === 'denied') {
        console.warn('Notification permission denied');
      } else if (permission === 'default') {
        console.warn('Notification permission prompt dismissed');
      }
    });

    if (Notification.permission === 'granted') {
      const notification = new Notification('알림입니다😊', {
          body: '행복한 하루 되세요!',
      });

      notification.onclick = () => {
        console.log('클릭');
      }

      notification.addEventListener('close', () => {
        console.log('알림창 닫음');
      })
    }
  } else {
    console.error('Notifications are not supported in this browser');
  }
}