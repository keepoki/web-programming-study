# 대소문자 문자열 바꾸기 성능 비교(charCodeAt, toUpperCase)

- [charCodeAt, fromCharCode 메서드 활용](#charcodeat-fromcharcode-메서드-활용)
- [정확히 영문 대소문자만 바꾸는 charCodeAt, fromCharCode 메서드 활용](#정확히-영문-대소문자만-바꾸는-charcodeat-fromcharcode-메서드-활용)
- [toUpperCase, toLowerCase 메서드 활용](#touppercase-tolowercase-메서드-활용)
- [결론](#결론)

프로그래머스에서 '대소문자를 바꿔서 출력하기' 문제를 풀면서 `charCodeAt`메서드와 `toUpperCase`메서드 둘 중 어떤 것을 활용하는 방법이 성능이 좋을까 궁금해서 실험하게 되었다.

`"aBcDeFgHiJkLmNoPqRsTuVwXyZ"` 문자열을 `"AbCdEfGhIjKlMnOpQrStUvWxYz"`으로 바꿔서 출력하는 기능이다.

## charCodeAt, fromCharCode 메서드 활용

```js
const str = "aBcDeFgHiJkLmNoPqRsTuVwXyZ"
let inputStr = '';
for (let i = 0; i < 100000; ++i) {
  inputStr += str;
}

console.time('시간 측정');

const A = 65, a = 97;
const diff = a - A;
let outputStr = '';
let code = null;
for (let i = 0; i < inputStr.length; ++i) {
  code = inputStr[i].charCodeAt();
  if (code >= 97) {
    outputStr += String.fromCharCode(code - diff);
  } else {
    outputStr += String.fromCharCode(code + diff);
  }
}

console.timeEnd('시간 측정');
```

시간 측정: 281.433ms
시간 측정: 279.357ms
시간 측정: 278.56ms
시간 측정: 282.279ms

**평균 280ms** 시간이 걸렸다. 다만, 대소문자 문자열로만 구성되었다는 가정하에 원하는 대로 대소문자가 변경되겠지만, 다른 문자열이 있는 경우 원하는 결과가 나오지 않을 수 있다.

## 정확히 영문 대소문자만 바꾸는 charCodeAt, fromCharCode 메서드 활용

그렇다면 대소문자만 바꾸는 방식으로 바꿔서 테스트해 보자.

```js
const str = "aBcDeFgHiJkLmNoPqRsTuVwXyZ"
let inputStr = '';
for (let i = 0; i < 100000; ++i) {
  inputStr += str;
}

console.time('시간 측정');

const A = 65, Z = 90, a = 97, z = 122;
const diff = a - A;
let outputStr = '';
let code = null;
for (let i = 0; i < inputStr.length; ++i) {
  code = inputStr[i].charCodeAt();
  if (code >= a && code <= z) {
    outputStr += String.fromCharCode(code - diff);
  } else if (code >= A && code <= Z) {
    outputStr += String.fromCharCode(code + diff);
  }
}

console.timeEnd('시간 측정');
```

시간 측정: 290.831ms
시간 측정: 285.483ms
시간 측정: 287.108ms
시간 측정: 276.129ms

**평균 285ms** 시간이 걸렸다. 생각보다 조건이 늘어난다고 성능에 크게 영향을 끼치지는 못하나 보다.

## toUpperCase, toLowerCase 메서드 활용

```js
const str = "aBcDeFgHiJkLmNoPqRsTuVwXyZ"
let inputStr = '';
for (let i = 0; i < 100000; ++i) {
  inputStr += str;
}

console.time('시간 측정');

let outputStr = '';
for (let i = 0; i < inputStr.length; ++i) {
  if (inputStr[i] === inputStr[i].toUpperCase()) {
    outputStr += inputStr[i].toLowerCase();
  } else {
    outputStr += inputStr[i].toUpperCase();
  }
}

console.timeEnd('시간 측정');
```

시간 측정: 620.778ms
시간 측정: 602.107ms
시간 측정: 599.404ms
시간 측정: 634.812ms

**평균 613ms** 시간이 걸렸다.

## 결론

1. 성능은 `charCodeAt`, `fromCharCode` 메서드를 사용하는 것이 2배 이상 빠르다.
2. 가독성은 `toUpperCase`, `toLowerCase` 메서드가 더 좋다.

대소문자 문자열을 모두 찾아서 바꿔야 하는 상황에서 성능이 필요하다면 `charCodeAt`, `fromCharCode` 메서드를 사용하고 아니라면 가독성을 위해 `toUpperCase`, `toLowerCase` 메서드를 사용할 것 같다.
