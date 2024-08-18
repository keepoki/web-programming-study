/*
  생성자 내부에서, 클래스의 인스턴스가 인스턴스화되었을 때 요소가 가질 모든 
  기능을 정의합니다. 이 경우 우리는 shadow root을 사용자 정의 요소에 부착하고, 
  몇 가지 DOM 조작을 사용하여 요소의 내부 shadow DOM 구조를 생성하는데, 
  이는 그리고서 shadow root에 부착됩니다. 그리고 마지막으로 몇 가지 CSS를 
  shadow root에 부착하여 shadow DOM을 꾸밉니다.
  https://developer.mozilla.org/ko/docs/Web/API/Web_components/Using_shadow_DOM
 */
class PopupInfo extends HTMLElement {
  constructor() {
    super();

    // shadow root를 생성
    this.attachShadow({ mode: "open" });

    // span 요소들을 생성
    const wrapper = document.createElement('span');
    wrapper.setAttribute('class', 'wrapper');

    // 요소에 텍스트 컨텐츠가 있으면 span 요소 생성
    const text = document.createElement('label');
    text.setAttribute('class', 'text');
    text.textContent = this.textContent;

    const icon = document.createElement('span');
    icon.setAttribute('class', 'icon'); // icon.className = 'icon';
    icon.setAttribute('tabindex', '0');

    const info = document.createElement('span');
    info.setAttribute('class', 'info');

    // 속성의 내용을 가져와 info span 내부에 넣는다.
    const popupText = this.getAttribute('popup-text');
    info.textContent = popupText;

    // 아이콘 속성이 없으면 기본 값을 사용하여 아이콘 이미지를 넣는다.
    let imgUrl = './img/icon-info.png';
    if (this.hasAttribute('img')) {
      imgUrl = this.getAttribute('img');
    } 

    const img = document.createElement('img');
    img.src = imgUrl;
    icon.appendChild(img);

    // shadow DOM에 외부 스타일을 적용한다.
    const linkElement = document.createElement('link');
    linkElement.setAttribute('rel', 'stylesheet');
    linkElement.setAttribute('href', 'style.css');

    // 작성한 요소를 shadow DOM에 붙인다.
    this.shadowRoot.appendChild(linkElement);
    this.shadowRoot.appendChild(text);
    this.shadowRoot.appendChild(wrapper);
    wrapper.appendChild(icon);
    wrapper.appendChild(info);
  }
}

// 새로운 요소를 정의한다.
customElements.define('popup-info', PopupInfo);