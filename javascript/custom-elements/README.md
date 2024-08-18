# 사용자 정의 요소 사용하기

웹 컴포넌트 표준의 주요 기능 중 하나는 사용자 정의 페이지 기능을 제공하는 길고 중첩된 요소들의 묶음으로 만족하는 것 보다는, HTML 페이지에서 기능을 캡슐화하는 사용자 정의 요소를 생성하는 능력이다. Custom Elements API에 대해서 알아보자.

웹 document의 사용자 정의 요소의 컨트롤러는 `CustomElementRegistry` 객체이다. 이 객체는 페이지에 사용자 정의 요소를 등록할 수 있게 하고, 어떤 사용자 정의 요소가 등록되었는지 등에 대한 정보를 반환한다.

페이지에 사용자 정의 요소를 등록하는 방법은 `CustomElementRegistry.define()` 메서드를 사용하는 것이다.

`CustomElementRegistry.define(DOMString, class, Optional)`

이 메서드의 인자에 대한 설명은 아래와 같다.

- `DOMString`은 요소에 주는 이름을 나타낸다. kebab-case 스타일을 사용한다.
- `class`는 동작을 정의하는 class를 말한다.
- `Optional`은 extends 속성을 포함하는 옵션 객체인데, 이는 이 요소가 상속 받는 내장 요소가 있다면, 그 내장 요소를 명시한다.

```js
class WordCount extends HTMLParagraphElement {
  constructor() {
    // 항상 super()를 호출함으로써 시작하여 올바른 프로토타입 체인이 확립되도록 합니다.
    super();

    // 요소 기능은 여기 작성됩니다.
    ...
  }
}

customElements.define("word-count", WordCount, { extends: "p" });
```

사용자 정의 요소에 대한 예제는 `./popup-info.js`에 작성하였음

## Reference

[사용자 정의 요소 사용하기 - Web API | MDN](https://developer.mozilla.org/ko/docs/Web/API/Web_components/Using_custom_elements)
