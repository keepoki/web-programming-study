{
  /*
    https://developer.mozilla.org/ko/docs/Web/API/structuredClone
    structuredClone() 전역 함수
    2022년 3월에 업데이트 된 깊은 복사를 지원하는 전역 함수이다.

    일반적으로 깊은 복사를 위해 JSON.stringify()를 통해 문자열로 변환하고
    JSON.parse()를 통해 다시 객체화시키는 방식을 많이 사용한다.
    또는 lodash 라이브러리의 cloneDeep() 메서드를 사용한다.

    https://www.measurethat.net/Benchmarks/Show/31851/0/jsonstringify-vs-structuredclone-7-kb-json
    위 사이트의 벤치마크 결과 2배 이상의 성능 차이를 확인할 수 있었다.

    전역 객체의 window의 멤버 함수이므로, 브라우저에서만 사용할 수 있다.
    즉, 백엔드로 주로 사용하는 Nodejs 런타임에서는 사용할 수 없다.
  */

  const origin = {
    "id": 0,
    "name": "Elijah",
    "city": "Austin",
    "age": 78,
    "friends": [
      {
        "name": "Michelle",
        "hobbies": [
          "Watching Sports",
          "Reading",
          "Skiing & Snowboarding"
        ]
      },
      {
        "name": "Robert",
        "hobbies": [
          "Traveling",
          "Video Games"
        ]
      }
    ]
  }

  const clone = structuredClone(origin);
  console.log(clone);
}