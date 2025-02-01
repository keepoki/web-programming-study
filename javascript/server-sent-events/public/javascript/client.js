window.addEventListener('load', () => {
  /** @type {EventSource} */
  let eventSource = null;
  const clientId = Math.floor(Math.random() * 1000000 + 1);

  // 화면에 리스트를 보여주기 위한 HTML Element 추가
  const bodyElement = document.querySelector('body');
  const eventList = document.createElement('list');
  bodyElement.appendChild(eventList);

  /** @type {HTMLButtonElement} */
  const connectBtn = document.querySelector('.btn-connect');
  
  // Connect 버튼 클릭 시 호출
  connectBtn.onclick = () => {
    // 첫 번째 매개변수에, 서버 요청 URL을 입력, 바로 연결을 시도한다.
    eventSource = new EventSource(`/subscribe/${clientId}`, { withCredentials: false });
    
    // 서버에 SSE 최초 연결 시 호출되는 콜백 함수
    eventSource.onopen = (e) => {
      const newElement = document.createElement('li');
      console.log(e);
      newElement.textContent = `open connection`;
      eventList.appendChild(newElement);
    };

    // 이벤트 공통으로 동작하는 함수
    const event = (e) => {
      const data = JSON.parse(e.data);
      console.log(data);
      const newElement = document.createElement('li');
      newElement.style.whiteSpace = 'pre-wrap';
      newElement.textContent = `time: ${new Date(data.time)}\n\tid: ${e.id}, type: ${e.type}, text: ${data.text}`;
      eventList.appendChild(newElement);
    }

    // 서버에서 event: message에 해당하는 이벤트 콜백 함수
    eventSource.onmessage = event;
    // 서버에서 event: happy에 해당하는 이벤트 콜백 함수
    eventSource.addEventListener('happy', event);
    // 서버에서 event: smile에 해당하는 이벤트 콜백 함수
    eventSource.addEventListener('smile', event);

    // 에러 발생시 호출되는 콜백 함수
    eventSource.onerror = (e) => {
      if (e.eventPhase === EventSource.CLOSED) {
        eventSource.close();
      }
      if (e.target.readyState == EventSource.CLOSED) {
        const newElement = document.createElement('li');
        newElement.textContent = 'disconnected';
        eventList.appendChild(newElement);
      } else if (e.target.readyState == EventSource.CONNECTING) {
        const newElement = document.createElement('li');
        newElement.textContent = 'connecting...';
        eventList.appendChild(newElement);
      }
    };
  }

  /** @type {HTMLButtonElement} */
  const disconnectBtn = document.querySelector('.btn-disconnect');
  // Disconnect 버튼 클릭 시 호출
  disconnectBtn.onclick = () => {
    if (eventSource?.readyState === eventSource.CLOSED) return;
    
    eventSource?.close();
    const newElement = document.createElement('li');
    newElement.textContent = `close connection`;
    eventList.appendChild(newElement);
  }
});
