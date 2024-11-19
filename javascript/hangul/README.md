# 한글에서 초성, 중성, 종성 구하기

[한글 음절 - 위키백과, 우리 모두의 백과사전](https://ko.wikipedia.org/wiki/%ED%95%9C%EA%B8%80_%EC%9D%8C%EC%A0%88)
[한글 인코딩의 이해 1편: 한글 인코딩의 역사와 유니코드](https://d2.naver.com/helloworld/19187)
[한글 인코딩의 이해 2편: 유니코드와 Java를 이용한 한글 처리](https://d2.naver.com/helloworld/76650)

현대 한글에서 표현할 수 있는 모든 글자는 모두 11,172 글자이다.

- 초성: `ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ` (19개)
- 중성: `ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ` (21개)
- 종성: `ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ` (27개) - 종성이 없는 경우도 있음

위의 초성, 중성, 종성을 조합해서 만들 수 있는 글자 수는 다음과 같다.
`19 × 21 × ( 27 + 1 ) = 11172`

왜 종성에 대한 값 1을 더하는 것인가? → '종성'이 없는 경우를 포함 시키기 때문이다.

## 한글의 유니코드 살펴보기

`'가'(0xAC00)`로 시작해서 `'힣'(0xDCAF)`까지 11,172 글자로 구성 되어 있다.
`U+AC00`은 '가'의 유니코드 값이다. 16진수 `0xAC00`는 10진수로 `44032`이다.
`U+D7A3`은 '힣'의 유니코드 값이다. 16진수 `0xD7A3`는 10진수로 `55203`이다.
`55203 - 44032 = 11171`로 0번째를 포함한다면 글자 수와 같다.

호기심으로 '힣'의 유니코드에 1을 더한 값을 확인해 봤는데 알 수 없는 글자가 나왔다.
`String.fromCharCode(0xD7A4); // '힤'`

한글 문자의 유니코드 코드 값을 구하는 계산법은 다음과 같다.
`(초성 * 21 * 28) + (중성 * 28) + 종성 + U+AC00`

```tsx
// 위의 계산식을 이용해 '개'를 만들어보자
const geaCode = (0 * 21 * 28) + (1 * 28) + 0xAC00; // 44060
String.fromCharCode(geaCode); // '개'

// '맛'은? (21 * 28 = 588)
const mahtCode = (6 * 588) + (0 * 28) + 19 + 0xAC00; // 47579
String.fromCharCode(mahtCode);
```

한글 초성, 중성, 종성을 조합하여 한글에 대한 유니코드 값을 구할 수 있었다. 그렇다면 반대로 유니코드 값으로 초성, 중성, 종성을 구할 수 있지 않을까?

## 초성, 중성, 종성 구하기

```tsx
/**
 * 한글 한글자에 대한 초성, 중성, 종성을 반환하는 함수
 * @param {string} oneLetter 한글자
 * @returns { { choSeong:string, jungSeong:string, jongSeong:string } | undefined }
 */
function separateOneLetterHangul(oneLetter) {
  const startHangulCharCode = '가'.charCodeAt(); // 44032
  const endHangulCharCode = '힣'.charCodeAt(); // 55203
  const charCode = oneLetter.charCodeAt(0);
  
  // 인수의 문자 코드 값이 한글 코드의 범위를 벗어나는 경우에 대한 예외처리
  if (charCode < startHangulCharCode || charCode > endHangulCharCode) {
    return undefined;
  }
  
  // 초성, 19개
  const choSeongList = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
  // 중성, 21개
  const jungSeongList = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ' ];
  // 종성, 없는 경우 포함 28개
  const jongSeongList = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']; 
  
  // 반대로 0xAC00을 빼서, 한글 표현 범위에 해당하는 0 ~ 11711로 만든다.
  const hangulCode = charCode - startHangulCharCode;
  // 인덱스는 0부터 이므로 정수 내림을 해주어야 한다.
  const choSeongIndex = Math.floor(hangulCode / (jungSeongList.length * jongSeongList.length));
  const jungSeongIndex = Math.floor(hangulCode / jongSeongList.length) % 21;
  const jongSeongIndex = hangulCode % jongSeongList.length;

  return {
    choSeong: choSeongList[choSeongIndex],
    jungSeong: jungSeongList[jungSeongIndex],
    jongSeong: jongSeongList[jongSeongIndex],
  }
}

console.log(separateOneLetterHangul('가')); // { choSeong: 'ㄱ', jungSeong: 'ㅏ', jongSeong: '' }
console.log(separateOneLetterHangul('힣')); // { choSeong: 'ㅎ', jungSeong: 'ㅣ', jongSeong: 'ㅎ' }
console.log(separateOneLetterHangul('뷁')); // { choSeong: 'ㅂ', jungSeong: 'ㅞ', jongSeong: 'ㄺ' }
console.log(separateOneLetterHangul('김밥')); // { choSeong: 'ㄱ', jungSeong: 'ㅣ', jongSeong: 'ㅁ' }
```

한글 코드의 유효 범위에 해당하는지 확인하고 예외 상황에서는 `undefined`를 리턴한다. 그리고 각각의 인덱스 값을 구해 초성, 중성, 종성을 리턴 해주는 함수를 완성하였다.

이대로 끝내기는 아쉬우니 한글 문자열에 대한 처리를 추가해보자.

```tsx
/**
 * 한글 문자열을 초성, 중성, 종성으로 나눈 값들을 반환하는 함수
 * @param {string} hangul
 * @returns { string[] | undefined }
 */
function separateHangul(hangul) {
  if (!hangul) {
    return undefined;
  }

  const result = [];
  for (const onLetter of hangul) {
    const separatedOnLetter = separateOneLetterHangul(onLetter);
    if (separatedOnLetter) {
      // string을 구조분해 할당하면 빈 값('')은 배열에 포함되지 않는다. 즉 종성이 없는 경우에는 추가되지 않음
      result.push(...separatedOnLetter.choSeong, ...separatedOnLetter.jungSeong, ...separatedOnLetter.jongSeong);
    }
  }
  return result;
}

console.log(separateHangul('김밥')); // [ 'ㄱ', 'ㅣ', 'ㅁ', 'ㅂ', 'ㅏ', 'ㅂ' ]
console.log(separateHangul('월급 좋아').join('')); // ㅇㅝㄹㄱㅡㅂㅈㅗㅎㅇㅏ
console.log(separateHangul('행복하세요').join('')); // ㅎㅐㅇㅂㅗㄱㅎㅏㅅㅔㅇㅛ
```
