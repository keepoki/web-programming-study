/** @type {HTMLSelectElement | null} */
let videoListEle = null;
/** @type {HTMLVideoElement | null} */
let videoEle = null;

window.addEventListener('load', () => {
  videoListEle = document.getElementById('video-list');
  videoEle = document.getElementById('stream');
  loadVideoList();
});


async function loadVideoList() {
  try {
    if (videoListEle == null) return;

    const response = await fetch('/video/list', {
      method: 'GET',
    })
    /** @type {{filename: string, filepath: string}[]} */
    const videoList = await response.json();
    
    for (const video of videoList) {
      const newOption = document.createElement('option');
      newOption.text = video.filename;
      newOption.value = video.filepath;
      videoListEle.appendChild(newOption);
    }

  } catch (error) {
    console.error(error);
  }
}

async function handleClickVideoStream() {
  try {
    const selectedFilepath = videoListEle.selectedOptions[0].value;
    if (!selectedFilepath || selectedFilepath === 'placeholder') {
      return;
    }
    // 스트림 방식으로 데이터를 가져와서 일정 부분 전송이 끝나면 재생 가능
    // 재생 시간 조작하면 다시 데이터를 요청하고 가져옴
    videoEle.src = `http://localhost:3123/video/stream/load/${selectedFilepath}`;

  } catch (error) {
    console.error(error);
  }
}

async function handleClickNotControlStream() {
  try {
    const selectedFilepath = videoListEle.selectedOptions[0].value;
    if (!selectedFilepath || selectedFilepath === 'placeholder') {
      return;
    }
    // 실시간으로 재생하면서 데이터를 나누어 받는 방식, 시간 조작이 불가능
    videoEle.src = `http://localhost:3123/video/stream/live/${selectedFilepath}`;
  } catch (error) {
    console.error(error);
  }
}