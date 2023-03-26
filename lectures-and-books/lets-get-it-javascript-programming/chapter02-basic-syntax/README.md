# 기본 문법 배우기

자세한 내용을 알고 싶다면 아래 링크를 참조하거나 책을 구매해서 보길 바란다.
[인프런 [리뉴얼] 렛츠기릿 자바스크립트](https://www.inflearn.com/course/%EB%A0%88%EC%B8%A0%EA%B8%B0%EB%A6%BF-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8/dashboard)
[Let's Get It 자바스크립트 2장 기본 문법 배우기](https://thebook.io/080270/part01/ch02/)

- [2.1 코드 작성 규칙](#21-코드-작성-규칙)
  - [세미콜론](#세미콜론)
  - [주석](#주석)
  - [들여쓰기](#들여쓰기)
- [2.2 자료형](#22-자료형)
  - [문자열](#문자열)
    - [문자열에서 따옴표를 표현하는 방법](#문자열에서-따옴표를-표현하는-방법)
    - [여러줄 표현하는 방법](#여러줄-표현하는-방법)
    - [typeof 연산자](#typeof-연산자)
    - [문자열 합치기](#문자열-합치기)
  - [숫자](#숫자)
    - [문자열을 숫자로 바꾸는 방법](#문자열을-숫자로-바꾸는-방법)
    - [다른 10진수를 n진수로, n진수를 10진수로 변환하는 방법](#다른-10진수를-n진수로-n진수를-10진수로-변환하는-방법)
    - [10진수를 n진수로 변환하는 방법](#10진수를-n진수로-변환하는-방법)
    - [NaN 알아보기](#nan-알아보기)
    - [산술 연산자 사용하여 숫자를 계산하는 방법](#산술-연산자-사용하여-숫자를-계산하는-방법)
    - [무한 값](#무한-값)
    - [문자와 숫자 더하기](#문자와-숫자-더하기)
    - [연산자 우선순위](#연산자-우선순위)
    - [실수 계산 시 주의할 점](#실수-계산-시-주의할-점)
  - [불 값](#불-값)
    - [비교 연산자](#비교-연산자)
    - [==와 ===의 차이](#와-의-차이)
    - [논리 연산자](#논리-연산자)
  - [빈 값 사용하기](#빈-값-사용하기)
    - [undefined과 null](#undefined과-null)
- [2.3 변수](#23-변수)
  - [변수명 짓기](#변수명-짓기)
  - [변수 활용하기](#변수-활용하기)
  - [상수 만들기](#상수-만들기)
  - [var 알아보기](#var-알아보기)
- [2.4 조건문](#24-조건문)
  - [else를 사용해 두 방향으로 분기하기](#else를-사용해-두-방향으로-분기하기)
  - [else if를 사용해 여러 방향으로 분기하기](#else-if를-사용해-여러-방향으로-분기하기)
  - [중첩 if 문 사용하기](#중첩-if-문-사용하기)
  - [switch 문으로 분기하기](#switch-문으로-분기하기)
  - [조건부 연산자 사용하기](#조건부-연산자-사용하기)
- [2.5 반복문](#25-반복문)
  - [while 문으로 Hello, while! 100번 출력하기](#while-문으로-hello-while-100번-출력하기)
  - [for 문으로 반복해서 출력하기](#for-문으로-반복해서-출력하기)
  - [break 문으로 반복문 멈추기](#break-문으로-반복문-멈추기)
  - [continue 문으로 코드 실행 건너뛰기](#continue-문으로-코드-실행-건너뛰기)
  - [중첩 반복문 사용하기](#중첩-반복문-사용하기)
- [2.6 객체](#26-객체)
  - [배열](#배열)
    - [배열의 요소 개수 구하기](#배열의-요소-개수-구하기)
    - [배열에 요소 추가하기](#배열에-요소-추가하기)
    - [배열에 요소 수정하기](#배열에-요소-수정하기)
    - [배열에 요소 삭제하기](#배열에-요소-삭제하기)
    - [배열에서 요소 찾기](#배열에서-요소-찾기)
    - [배열 반복하기](#배열-반복하기)
  - [함수](#함수)
    - [return 이해하기](#return-이해하기)
    - [매개변수와 인수 사용하기](#매개변수와-인수-사용하기)
    - [다른 변수 사용하기](#다른-변수-사용하기)
  - [객체 리터럴](#객체-리터럴)
    - [객체 속성 수정하기](#객체-속성-수정하기)
    - [객체 속성 제거하기](#객체-속성-제거하기)
    - [객체 간 비교하기](#객체-간-비교하기)
    - [참조와 복사](#참조와-복사)
    - [객체 속의 객체](#객체-속의-객체)

## 2.1 코드 작성 규칙

### 세미콜론

`세미콜론(;)`은 하나의 명령이 끝났다는 의미로 사용된다. 자바스크립트에서는 세미콜론을 붙히지 않아도 상관 없지만 에러가 발생할 수 있다. 그래서 명확하게 세미콜론을 붙히는 것으로 통일하는 것이 좋다.

`console.log('Hello, world!');`

### 주석

`주석(comment)`은 코드에 관한 설명을 작성하거나 특정 코드를 임시로 실행되지 않게 할 때 사용한다. 주석은 코드에 영향이 가지 않는다.

```js
// 이것이 한 줄 주석
/* 이것은 여러 줄 주석
행복을 위하여! */
```

### 들여쓰기

자바스크립트에서는 들여쓰기가 코드 실행과 상관없다. 다만 문법의 구분을 위해 사용한다. 통일된 들여쓰기로 가독성이 좋아진다. 보통 스페이스바로 2칸 또는 4칸, 탭으로는 4칸을 사용한다.

```js
function print(string) {
  console.log(string); // 들여쓰기 2칸
}
```

## 2.2 자료형

`값(value)`은 프로그램이 조작할 수 있는 데이터를 의미한다.
`자료형(type)`은 값의 종류를 의미한다.
  
### 문자열

프로그래밍에서 하나의 글자를 `문자(character)`라고 한다.
`문자열(string)`은 문자들이 하나 이상 나열되어 있다는 의미이다. 즉, 문자들의 집합이다.
자바스크립트에서는 문자열 자료형을 사용하려면 `큰 따옴표(")`, `작은 따옴표(')`, 백틱(`) 각각의 쌍으로 묶어줘야 한다.

```js
'이것도 문자열', "이것도 문자열", `이것도 문자열`

// 따옴표는 혼합하면 에러를 발생한다. 같은 한 쌍으로 묶어줘야 한다.
'이건 에러", "이것도 에러'
```

#### 문자열에서 따옴표를 표현하는 방법

백슬러시(\)는 다음 오는 문자는 특수 문자임을 알리는 역할을 한다. 여기서는 '따옴표를 이스케이핑한다'고 표현한다.

```js
'이렇게 \'하면\' 된다.', "이렇게 '하면' 된다.", `이렇게 '하면" 된다.`
```

#### 여러줄 표현하는 방법

`\n`는 줄바꿈이라는 예약된 이스케이프 문자이다.
백틱으로 감싸진 문자열을 템플릿 리터럴이라고 한다.

```js
`백틱을 이용하면
여러 줄을 표현하기가 쉽다.`
'아니면 이렇게 \n 해주어야 한다.'
```

#### typeof 연산자

`typeof`는 어떤 자료형인지 확인할 수 있는 연산자이다.

```js
typeof '' // "string"
'' == ' ' // false, 띄어쓰기 문자열과 빈 문자열은 다르다.
```

#### 문자열 합치기

문자열 사이에 `+`연산자를 입력하면 양쪽의 문자열을 하나로 합쳐준다.

```js
'하하하' + '넌 정말 천재구나' // '하하하넌 정말 천재구나'
'띄어쓰기를 ' + '깜빡 했었구나' // '띄어쓰기를 깜빡 했었구나.'
```

### 숫자

`숫자(number)`는 따옴표로 감싸지 않고 그냥 입력하면 된다.

```js
1; 0.07; -10.02;
typeof '4'; // "string", 따옴표는 문자열!!

// 지수 표기법도 사용이 가능하다
2e5; // 2 * 100000 = 200000
2e+3; // 2 * 1000 = 2000
2e-3; // 2 / 1000 = 0.002

// 2진법, 8진법, 16진법의 표현
0b111; // 7, 0b로 시작하면 2진법이다.
0o13; // 11, 0o는 8진법이다.
0x5a; // 90, 0x는 16진법이다.
```

#### 문자열을 숫자로 바꾸는 방법

`parseInt()`는 정수형 숫자로 바꿔주는 함수이다.
`parseFloat()`는 실수형 숫자로 바꿔주는 함수이다.

```js
parseInt('4'); // 4
typeof parseInt('4'); // "number"
parseFloat('3.1'); // 3.1
```

#### 다른 10진수를 n진수로, n진수를 10진수로 변환하는 방법

```js
parseInt(11, 2) // 3, 10진법 11를 2진법으로 변환한다.
parseInt(0x2AD) // 658, 16진법 2AD를 10진법으로 변환한다.
```

#### 10진수를 n진수로 변환하는 방법

`toString()`은 숫자를 문자로 변환하는 메서드이다. 66.toString()같은 방법으로는 불가능 하지만 변수를 통해 메서드를 사용할 수 있다.

```js
const number = 67;
number.toString(2); // '1000011', 2진수의 문자열
number.toString(8); // '103', 8진수의 문자열
number.toString(16); // '43', 16진수의 문자열
parseInt(number.toString(2)); // 100011, 문자열을 숫자로 바꾸었다.
```

#### NaN 알아보기

`NaN`은 Not a Number의 약어로 숫자가 아닌 값을 의미한다.

```js
parseInt('문자열'); // NaN, 숫자로 변환할 수 없는 값은 NaN !!
typeof NaN; // "number", NaN의 자료형은 숫자형이다!
```

#### 산술 연산자 사용하여 숫자를 계산하는 방법

```js
1 + 1; // 2, 더하기표(+)
1 - 3; // -2, 빼기표(-)
2 *2; // 4, 곱하기표(*)
4 / 2; // 2, 나누기표(/)
4 % 3; // 1, 나눗셈의 나머지를 구하는 % 연산자
2 **4; // 16, 거듭 제곱하는** 연산자
```

#### 무한 값

`Infinity`는 무한을 의미하는 값이다. 자료형은 number이다.

```js
4 / 0; // Infinity
-4 / 0; // -Infinity
Infinity - 3; // Infinity
Infinity - Infinity; // NaN
0 / 0; // NaN
0 - 0; // 0
```

#### 문자와 숫자 더하기

`+`연산자를 이용해 문자열과 다른 자료형을 더하면 다른 자료형이 문자열로 바뀐 후 문자열과 더해진다. 다른 자료형으로 바뀌는 것을 `형 변환(type casting)`이라고 한다.

`-`연산자를 이용해 문자열과 다른 자료형을 빼면 다른 자료형이 숫자로 형 변환된 후 빼기를 하게 된다.

```js
'3' + 1; // '31', 문자열이다.
7 + '문자'; // '7문자'
'4' - 2; // 2, 숫자이다.
2 - '문자'; // NaN, 숫자가 아닌 문자를 숫자로 형 변환하면 NaN이된다.
```

#### 연산자 우선순위

여러 숫자들을 동시에 계산할 때 컴퓨터는 어떤 것을 먼저 계산해야하는지 모른다. 그래서 우선순위를 기준으로 계산을 하는데, 자바스크립트에서도 수학의 사칙연산 우선순위를 따른다.
거듭제곱, 곱하기, 나누기, 나머지 연산자가 더하기 빼기보다 우선순위가 높다. 그리고 소괄호로 감싸면 먼저 계산한다.

자세한 우선순위는 [MDN 연산자 우선순위](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)를 참고

#### 실수 계산 시 주의할 점

컴퓨터는 0과 1인 2진법 밖에 이해하지 못해서, 2진법으로 실수를 표현하면 무한 반복되는 실수가 있어서 근삿값으로 저장한다. 이것은 부동소수점 문제이다.

```js
0.1 + 0.2; // 0.30000000000000004
```

자바스크립트에서는 64비트의 부동소수점인 국제 IEEE 754 표준 규격의 `배 정밀도 부동 소수점(double precision floating point numbers)`을 사용한다.

자세한 내용은 [MDN - Number](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Number), [위키백과 - IEEE 754](https://ko.wikipedia.org/wiki/IEEE_754)를 참고

### 불 값

`불 값(boolean)`은 `true`와 `false`두개의 값을 표현하는 자료형이다.
숫자로 변환하면 true는 1, false는 0이다.

```js
true; // true, 참!
false; // false, 거짓!
typeof true; // "boolean"
```

#### 비교 연산자

비교 연산자를 사용하면 결과로 불 값이 나온다.
`>`는 `왼쪽 값이 오른쪽 값 보다 크다`는 의미이다.(초과)
`<`는 `왼쪽 값이 오른쪽 값 보다 작다`는 의미이다.(미만)
`>=`는 `왼쪽 값이 오른쪽 값 보다 크거나 같다`는 의미이다.(이상)
`<=`는 `왼쪽 값이 오른쪽 값 보다 작거나 같다`는 의미이다.(이하)
`==`는 `왼쪽 값과 오른쪽 값이 같다`는 의미이다.
`!=`는 `왼쪽 값과 오른쪽 값이 다르다`는 의미이다.

```js
3 > 1; // true
5 <= 5; // true
5 != 5; // false
7 == 7; // true
Infinity == Infinity; // true
NaN == NaN; // false, NaN만 유일하게 false가 나온다.
NaN != NaN; // true
true > false; // true, 숫자로 변환하면 true는 1, false는 0이다.

// 문자의 경우 UTF-16 코드의 값으로 비교한다.
'b' > 'a'; // true, b는 98, a는 97이다.
'ca' > 'cb'; // true, 문자 자릿수 가 같은 것끼리 비교한다.
'c'.charCodeAt(); // 99, charCodeAt() 메서드는 해당 문자의 UTF-16 코드를 반환한다.

'6' > 4; // true, 숫자와 비교하게 되면 숫자로 형 변환된 후 비교한다.
'a' > 5; // false, 'a'는 숫자로 형 변환하면 NaN이다.
NaN < 5; // false, NaN과는 크거나 작은 비교를 할 수 없다.
NaN >= 0; // false
```

#### ==와 ===의 차이

`==`는 값이 같은지만 비교한다.
`===`는 자료형과 값이 모두 같은지를 비교한다.

```js
'1' == 1; // true
0 == false; // true

'1' === 1; // false, 문자열과 숫자는 다른 자료형이다!
3 !== '3'; // true, 자료형이 다르기 때문에 true!
```

#### 논리 연산자

불 값은 논리식을 다룰 때 많이 사용한다.
`&&`연산자는 `그리고(AND)`라는 뜻으로 좌측 식과 우측 식의 값이 모두 true인 경우 결과적으로 true가 된다.
`||`연산자는 `또는(OR)`이라는 뜻으로 좌측 식과 우측 식의 값 하나라도 true이면 결과적으로 true가 된다.
`!`연산자는 `부정(NOT)`이라는 뜻으로 true를 false로 false를 true로 바꿔준다. 다른 자료형을 불 값으로 형 변환할 수도 있다.

```js
10 > 5 && 3 < 2; // false, true AND false = false
10 > 5 || 3 < 2; // true, true OR false = true
!true; // false

```

대부분의 값은 불 값으로 형 변환 했을 때 true가 된다. gkw
형 변환 후 false가 되는 값들을 `거짓인 값(falsy value)`이라고 하고, true가 되는 값들은 `참인 값(truthy value)`이라고 한다.

```js
!!'a'; // true, 'a' -> !!true -> !false -> true

// 거짓인 값들
!!false; // false, !!false -> !true -> false
'' == true; // false, ''는 형 변환시 false이다.
0 == true; // false, 0은 형 변환시 false이다.
!!NaN; // false
NaN == false; // false, NaN은 부정하면 true가 되지만 값이 false는 아니다.
NaN == true; // false
undefined == true; // false
null == true; // false

// !연산자의 우선순위는 비교 연산자보다 높다.
!2 < 0; // false, !2 -> false -> 0
!(5 > 1); // false, (5 > 1) -> !true -> false
```

### 빈 값 사용하기

#### undefined과 null

`undefined`은 빈 값이다. 자료형은 반환할 결괏값이 없다는 뜻이다. 기본 값이라는 특성을 가진다.
`null`은 빈 값이다. undefined와 비슷해보이지만 서로 다른 자료형이다. 사용자가 직접 지정해준 값이다.

```js
!undefined; // true, undefined는 불 값으로 형 변환시 false
undefined == false; // false
undefined == 0; // false
undefined == ''; // false

!null; // true, null은 불 값으로 형 변환시 false
null == false; // false
null == 0; // false
null == ''; // false

undefined == null; // true, 빈 값이라는 점에서는 같다.
undefined === null; // false, 하지만 자료형은 다르다.

typeof undefined; // 'undefined'
typeof null; // 'object'
```

null의 자료형이 object인 것은 자바스크립트에서 유명한 버그이다. 원래는 'null'이어야 맞는데, 언어가 만들어진 초창기 실수로 인해 object가 되었다. 지금 이것을 바꾸게 되면 기존에 typeof null 식을 사용하는 모든 곳에 영향이 가기 때문에 바꿀 수 없다고한다.
따라서 값이 null인지 확인하기 위해서는 === null을 사용해아 한다.

명확한 비교를 위해 자료형과 값을 비교하는 ===를 사용하자!!

## 2.3 변수

`변수(variable)`는 값을 저장하기 위한 메모리 공간이다. 저장한 값을 바꿀 수도 있다. 변하는 수라고 생각하면 쉽게 이해할 수 있을 것이다.

```js
let sum = 3 + 2 + 2;
sum; // 7
sum = '하하'; // '하하', 값이 바뀌었다!
```

변수를 만드는 행위를 `선언(declaration)`이라고 표현한다. `선언문`을 통해 변수를 선언할 수 있는데, 자바스크립트에서는 `let`, `const`, `var`가 있다.
`선언문 변수명 = 식;` -> `let name = 'your name';`
변수를 선언함과 동시에 값을 대입하는 행위를 `초기화(initialization)`라고한다.

```js
// 변수 선언
let number; 
number; // undefined, 초기화 하지 않으면 undefined 값을 가진다.

// 변수 초기화
let value = 123;
```

### 변수명 짓기

변수명은 말 그대로 값이 무엇인지 구분할 수 있는 별칭이다. 한글이나 한자, 유니코드까지도 변수명으로 쓸 수 있다.
변수명을 짓는 것에는 제약사항이 있다. 특수문자는 `$`와 `_`만 사용할 수 있다. 그리고  프로그래밍에서 특정한 역할을 하는 `예약어(reserved word)`는 사용할 수 없다.

```js
let 이름 = '너의 이름은?';
let 幸福 = '행복한가?';
let ದಔದ = '유니코드 칸나다 문자??';

let let = '예약어 안돼'; // error
```

### 변수 활용하기

이미 선언한 변수를 다시 선언하면 에러가 발생한다. 변수명이 겹치지 않게 주의가 필요하다.
변수를 다른 변수에 대입할 수도 있다. 변수는 중복 값을 줄일 때도 사용한다. 반복되는 문장을 변수로 바꾸면 수정이 필요할 때 한번에 수정할 수 있다.

```js
// 이미 선언한 변수를 다시 선언하면 에러가 발생한다.
let data; let data; // Uncaught SyntaxError: Identifier 'data' has already been declared

// 변수를 다른 변수에 대입할 수도 있다.
let name = 'min su';
let name2 = name;
name2; // 'min su;

// 기존 변수를 활용할 수 있다.
let number = 207;
number = number - 7; // 200

// 변수는 중복 값을 줄일 때도 사용한다.
console.log('어쩌고 저쩌고 ... 어쩌고 어쩌고...');
console.log('어쩌고 저쩌고 ... 어쩌고 어쩌고...');
console.log('어쩌고 저쩌고 ... 어쩌고 어쩌고...');
// 중복 값을 줄이고, 수정할 때 한번에 수정이 가능하다.
let longText = '어쩌고 저쩌고 ... 어쩌고 어쩌고...';
console.log(longText);
console.log(longText);
console.log(longText);
```

### 상수 만들기

`const`는 상수(constant)의 줄임말이다. 변수는 변하는 수이다. 반대로 상수는 변하지 않는 수라는 뜻이다. const를 상수의 의미로 사용하고 있지만 객체의 내부 값에는 적용이 되지 않는 경우가 있어서 변수이기도 하다.

```js
// const는 초기화를 해주지 않으면 선언되지 않는다.
const constData; // Uncaught SyntaxError: Missing initializer in const declaration

// 초기화 후 값을 수정할 수 없는 상수가 된다.
const string = '이것은 수정이 가능할까?';
string = 'hello'; // Uncaught TypeError: Assignment to constant variable.

// 재선언이 불가능하다.
const number = 120; 
const number = 33; // Uncaught SyntaxError: Identifier 'number' has already been declared
```

### var 알아보기

`var`는 변수(variable)의 줄임말이다. 예전에 많이 사용한 예약어지만, 자바스크립트의 버전이 업데이트 되면서 현재는 const와 let을 사용하여 변수를 선언하는 방식을 선호한다. var는 이해하기 어려운 특성을 가지고있다.

let과 다르게 var는 재선언이 가능하다. var로 선언하면 특별히 `변수문(variable statement)`라고 한다. var는 var를 제외한 다른 예약어를 변수명으로 사용할 수 있다.

```js
// var는 재선언이 가능하다.
var value; var value; // 실수로 변수를 다시 선언하는 문제가 발생할 수 있다.

// var를 제외한 다른 예약어를 변수명으로 사용할 수 있다.
var let = 30;
var undefined = 30;

// let, const는 예약어를 변수명으로 사용할 수 없다.
let undefined = 30; // error
const undefined = 30; // error
```

## 2.4 조건문

`조건문`은 주어진 조건에 따라 실행이 달라지게 할 때 사용하는 문법이다. 조건의 시작은 `if`로 시작된다.

```js
// 실행문이 한 줄인 경우의 형식
if (조건식) 실행문;
if (조건식)
  실행문;

// 실행문이 한 줄이상인 경우의 형식, 중괄호({})로 감싸야한다.
if (조건식) {
  실행문;
  실행문;
}

// 변수로 활용도 가능하다. 조건식이 true이면 범위 안의 코드가 실행된다.00000
let isHappy = true;
if (isHappy) {
  console.log('Happy!!');
}
```

### else를 사용해 두 방향으로 분기하기

조건문에서 `else`는 조건식이 false일 때 실행하고 싶을 때 사용한다.

```js
if (조건식)
  실행문;
else 
  실행문;

// 중괄호로 구분하는 것이 가독성이 좋아서 권장된다.
if (조건식) {
  실행문; 
} else {
  실행문;
}

if (false) {
  console.log('if');
} else {
  console.log('else'); // 'else'가 출력된다.
}
```

### else if를 사용해 여러 방향으로 분기하기

if와 else 문을 사용하여 조건이 true이거나 false일 때 처리되게 하였다. 하지만 참과 거짓으로 떨어지지 않는 조건이 있을 수 있다. 그래서 `else if`문을 사용하면 다양한 조건에 대한 처리가 가능하다.

if는 항상 처음의 조건으로만 사용할 수 있다.
else는 항상 마지막 조건으로만 사용할 수 있다.
if와 else 문과는 다르게 여러번 사용이 가능하다.

```js
if (조건식) {
  실행문;
} else if (조건식) {
  실행문;
} else {
  실행문;
}

// else를 꼭 사용하지 않아도 된다.
if (조건식) {
  실행문;
} else if (조건식) {
  실행문;
} else if (조건식) {
  실행문;
}

const fruit = 'apple';
if (fruit === 'banana') {
  console.log('banana');
} else if (fruit === 'orange') {
  console.log('orange');
} else {
  console.log(`I don't no`); // I don't no가 출력된다.
}

// 조건이 true가 되면, 그 뒤의 조건들은 확인하지 않는다.
const score = 95;
if (score >= 90) {
  console.log('S'); // 'S'가 출력된다. 
} else if (score >= 80) { // 아래 조건들은 확인하지 않는다.
  console.log('A'); 
} else if (score >= 50) {
  console.log('B');
} else {
  console.log('C');
}

```

### 중첩 if 문 사용하기

if 문도 중첩해서 사용할 수 있는데, 가독성이 떨어져서 권장하지 않는다.

```js
const first = true;
const second = false;
if (first) {
  console.log('first 통과');
  if (second) {
    console.log('second 통과');
  } else {
    console.log('second 통과 실패');
  }
} else {
  console.log('first 통과 실패');
}

// 위 코드의 중첩을 다음의 방식처럼 바꿔서 사용하자.
if (first && second) { // first와 second 모두 true
  console.log('first 통과');
  console.log('second 통과');
} else if (first) { // first만 true
  console.log('first 통과');
  console.log('second 통과 실패');
} else { // 모두 false
  console.log('first 통과 실패');
}
```

### switch 문으로 분기하기

`switch` 문은 if 문과는 다르게 참과 거짓이 아닌 조건식과 비교 조건식을 이용하여 조건에 맞는지를 확인한다. 그리고 비교 조건식이 참일 때에는 아래 조건에 있는 코드들도 실행한다.
`break` 예약어로 switch 문을 중단할 수 있다. 아래 조건에 있는 코드들을 실행하는 것을 방지할 수 있다.
`default` 예약어로 값이 일치한게 없을 때 실행하게 할 수 있다.

```js
switch (조건식) {
  case 비교 조건식:
    실행문;
}


// 위에 있는 비교 조건이 참일 때 아래 조건은 비교하지않고 코드를 실행한다.
const fruit = 'apple';
switch (fruit) {
  case 'apple':
    console.log('apple');
  case 'banana':
    console.log('banana'); // 'apple', 'banana' 둘다 출력된다.
}

// break 문을 이용해 switch 문을 중단할 수 있다.
const fruit = 'apple';
switch (fruit) {
  case 'apple':
    console.log('apple'); // 'apple'만 출력된다.
    break;
  case 'banana':
    console.log('banana'); 
}

// 값이 일치한게 없을 때 default 예약어로 실행할 수 있다.
const fruit = 'orange';
switch (fruit) {
  case 'apple':
    console.log('apple');
    break;
  case 'banana':
    console.log('banana');
    break;
  default:
    console.log(`I don't no`); // 일치하는게 없으니 I don't no를 출력한다.
}
```

### 조건부 연산자 사용하기

`조건부 연산자` 또는 `삼항 연산자`라는 것이 있다. 조건문에서 대입하는 부분을 짧게 줄이기 위해 사용한다.

```js
조건식 ? 참일 때 실행되는 식 : 거짓일 때 실행되는 식;

const value = 4 > 3 ? '4가 크다' : '3이 크다';
value; // '4가 크다', 대입 연산자의 우선순위가 가장 낮아서 식의 결과가 대입된다.

// 중첩해서 사용할 수 있다.
const value = 70;
const result = value > 50 ? value > 70 ? '70보다 크다' : '50보다 크다' : '50보다 작다';

// 소괄호 연산자로 그룹지어 가독성을 향상시키자.
const value = 70;
const result = value > 50 ? (value > 70 ? '70보다 크다' : '50보다 크다') : '50보다 작다';

// 들여쓰기로도 가동성을 향상시킬 수 있다.
const value = 70;
const result = value > 50 
  ? value > 70 
    ? '70보다 크다' 
    : '50보다 크다' 
  : '50보다 작다';
```

## 2.5 반복문

컴퓨터는 반복적인 작업을 하는데 매우 효율적이다. 반복문에 대해서 알아보자.

### while 문으로 Hello, while! 100번 출력하기

`while` 문은 조건식이 참인 동안 반복해서 실행문을 실행한다. 주의 해야할 점은 조건식이 계속 참인 경우 무한 반복 실행하여 프로그램이 멈춰버린다.

```js
while (조건식) 
  실행문;

while (조건식) {
  실행문;
  실행문;
}

// 무한 반복으로 프로그램이 멈춰버린다. 강제 종료 해야한다.
while (true) {
  console.log('헤헤 언제 멈출까'); // 계속 출력된다.
}

// 10번만 반복 시키기
let i = 1;
while (i <= 10) {
  console.log(i); // 1, 2, 3, 4, ... 10까지 출력
  i++;
}
i; // 11, 조건은 i가 10이상인데 11이 되어 while문이 종료되었다.
```

### for 문으로 반복해서 출력하기

`for` 문은 시작(식과 변수선언)과 조건식과 종료식으로 구성되어 있고 조건식이 참인 때까지 반복해서 실행문을 실행한다. 시작, 조건식, 종료식은 필수가 아닌 선택이라 생략할 수 있다.

```js
for (시작; 조건식; 종료식)
  실행문;

// 10번만 반복 시키기
for (let i = 1; i <= 10; i++) {
  console.log(i); // 1, 2, 3, 4, ... 10까지 출력
}

// while 문 처럼 무한 반복도 가능하다
for (;;) {
  console.log('run'); // 무한반복..
}
```

### break 문으로 반복문 멈추기

`break` 예약어를 이용하면 반복문을 중단할 수 있다.

```js
let i = 0;
while (true) {
  if (i > 4) break; // i가 4보다 큰 값이 되면 반복문을 빠져나온다.
  i++;
}
console.log(i); // 5
```

### continue 문으로 코드 실행 건너뛰기

`continue` 예악어를 이용하면 이후 코드는 건너뛰어 조건식을 확인한다.

```js
for (let i = 0; i < 5; ++i) {
  if (i % 2 === 0) {
    continue; // i를 2로 나눈 나머지 값이 0이면 즉, 짝수이면 건너뛴다.
  }
  console.log(i); // 1, 3만 출력한다.
}
```

### 중첩 반복문 사용하기

반복문도 조건문 처럼 중첩하여 사용할 수 있다. 다만 복잡도가 증가함으로 중첩은 최대한 적을 수록 좋다.

```js
for (let i = 1; i < 3; ++i) {
  for (let j = 1; j < 3; ++j) {
    console.log('i: ' + i + ' j: ' + j );
  }
}
/*
  i의 반복 횟수 * j의 반복 횟수만큼 출력된다.
  i: 1 j: 1
  i: 1 j: 2
  i: 2 j: 1 
  i: 2 j: 2
*/
```

## 2.6 객체

`객체(object)`의 사전적 정의는 실제 존재하는 것을 말한다. 사물과 같은 유형적인 것 뿐만 아니라 개념과 논리와 같은 무형적인 것들도 객체로 간주한다.

자바스크립트에서 `객체(object)`란 자료형 중 하나로 다양한 값을 모아둔 또다른 값이다.
객체의 종류는 `배열(array)`, `함수(function)`, `배열이나 함수가 아닌 객체`로 나눌 수 있다.

### 배열

`배열(array)`이란 데이터가 연속적으로 나열되어있는 형태의 자료구조이다.
`인덱스(index)`란 배열의 위치를 가리키는 숫자이다. 인덱스로 배열의 위치에 있는 데이터에 접근할 수 있다. 인덱스는 0부터 시작한다.
배열 내부의 값을 `요소(element)`라고 한다.

```js
const fruits = ['apple', 'banana', 'orange'];
console.log(fruits); // ['apple', 'banana', 'orange']
console.log(fruits[0]) // 'apple'
console.log(fruits[1]) // 'banana'
console.log(fruits[2]) // 'orange'
console.log(fruits[3]) // undefined

// 이차원 배열
const value = 444;
const arrays = [['a', 0], [value, 'd', 123]];
console.log(arrays); // [Array(2), Array(3)]
```

#### 배열의 요소 개수 구하기

배열뒤에 `.length`를 붙히면 요소의 개수를 구할 수 있다. 빈 값도 요소에 포함된다.

```js
const array = [1, NaN, 3, '', undefined];
console.log(array.length); // 5, 요소가 5개이다.
// length를 이용하면 마지막 요소를 찾기 수월해진다.
const lastIndex = array.length - 1; 
array[lastIndex]; // undefined
```

#### 배열에 요소 추가하기

배열을 만들고 나면 중간에 요소를 추가하기도 제거하기도 수정하기도 가능하다.
`unshift()`는 배열 맨 앞에 요소를 추가해주는 메서드이다.
`push()`는 배열 맨 뒤에 요소를 추가해주는 메서드이다.

```js
// 요소 추가
const array = [1, 2, 3];
array[3] = 40;
console.log(array); // [1, 2, 3, 4]
// 배열 맨 앞에 요소를 추가
array.unshift(0); 
console.log(array); // [0, 1, 2, 3, 40]
// 배열 맨 뒤에 요소를 추가
array.push(55); 
console.log(array); // [0, 1, 2, 3, 40, 55]
```

#### 배열에 요소 수정하기

```js
// 요소 수정
const array = [1, 2, 3];
array = [3, 4, 5]; // error, const로 선언되어 있어 재선언은 불가능하다.
array[0] = 'start'; // 요소는 변경이 가능하다.
console.log(array); // ['start', 2, 3]
```

#### 배열에 요소 삭제하기

`pop()`은 배열의 맨 뒤의 요소를 제거하는 메서드이다.
`shift()`은 배열의 맨 앞의 요소를 제거하는 메서드이다.
`splice()`는 배열의 기존 요소를 제거 또는 교체하거나 새 요소를 추가할 수 있는 메서드이다.

```js
// 요소 삭제
const array = [4, 5, 6];
// pop() 배열의 맨 뒤의 요소를 제거
array.pop(); 
console.log(array); // [4, 5]
// shift() 배열의 맨 앞의 요소를 제거
array.shift(); 
console.log(array); // [5]

// splice() 중간 요소 삭제하기
const array = [1, 2, 3, 4, 5];
array.splice(1, 2); // 1번 인덱스(2번째 요소)부터 2개를 제거한다는 뜻이다.
console.log(array); // [1, 4, 5], 2하고 3이 없어졌다.
array.splice(1); // 1번 인덱스부터 뒤에 있는 모든 요소를 제거한다는 뜻이다.
console.log(array); // [1]

// 제거와 동시에 바꾸기
const array = [5, 6, 7, 8, 9];
array.splice(0, 3, 51, 62); 
// 0번 인덱스부터 3개의 요소를 제거하고, 해당 자리에 51, 62를 채워 넣으라는 뜻이다.
console.log(array); // [51, 62, 8, 9]
```

#### 배열에서 요소 찾기

`includes()`는 배열에 특정 요소를 포함하고 있는지 판별하여 불 값으로 결과를 반환하는 메서드이다. 하나라도 포함하면 true이고 하나도 없어야 false가 된다.
`indexOf()`는 배열에 지정된 요소를 찾아 첫 번째 인덱스를 반환하고 존재하지 않으면 -1을 반환하는 메서드이다.
`lastIndexOf()`는 배열에 지정된 요소를 마지막부터 찾아 마지막 인덱스를 반환하고 존재하지 않으면 -1을 반환하는 메서드이다.

```js
// includes
const array = [5, 3, 1, 'a'];
const result = array.includes('a'); // 'a'가 배열에 있는지 확인
const result2 = array.includes(4);
console.log(result); // true, 'a'는 포함되어 있다.
console.log(result4); // false, 4는 포함되어 있지 않다.

// indexOf, lastIndexOf
const array = [5, 3, 1, 'a', 3];
const result = array.indexOf(3);
const result2 = array.lastIndexOf(3);
const result3 = array.lastIndexOf(9);
console.log(result); // 1
console.log(result2); // 4
console.log(result3); // -1
```

#### 배열 반복하기

배열은 값을 나열한 것이기 때문에 반복문과 같이 사용하는 경우가 많다.

```js
const array = ['a', 'b', 'c'];
for (let i = 0; i < array.length; ++i) {
  console.log(array[i]); // a, b, c가 차례로 출력된다.
}

// 다음 배열에서 모든 'b'를 제거하는 방법
const array = ['a', 'b', 'c', 'b', 'd', 'e', 'b'];
while (true) {
  // 'b'를 찾는다.
  const findIndex = array.indexOf('b');
  // 없으면 while문을 중단시킨다.
  if (findIndex === -1) break;
  // 있으면 splice를 해당 요소를 이용해 삭제시킨다.
  array.splice(findIndex, 1);
}
console.log(array); // ['a', 'c', 'd', 'e']
```

### 함수

`함수(function)`는 특정한 작업을 수행하는 코드를 의미한다. 특정 기능의 코드를 재사용하고 싶을 때 함수로 만들어서 사용한다.
함수는 보통 `function` 예약어를 사용하거나 `=>(화살표)` 기호를 사용한다. 화살표 기호를 사용한 함수를 `화살표 함수(array function)`이라고 한다.

이름 없는 함수를 `익명 함수(anonymous function)`라고 한다.

자바스크립트에서는 함수를 사용하는 방법이 함수 선언식과 함수 표현식이 있다.
`함수 선언식(function declaration)`은 function 키워드 뒤에 함수 이름을 넣는 방식을 말한다.
`함수 표현식(function expression)`은 상수나 변수에 대입하는 방식을 말한다.

함수를 작성한다고 코드가 실행되지 않는다. 함수를 사용하는 행위를 `호출한다(call)`고 표현한다.

```js
// 익명 함수
function() {
  실행문;
}

// 화살표 함수
() => {
  실행문;
}

// 함수 선언식
function print() {}

// 함수 표현식
const func1 = function() {};
const func2 = () => {};

// 함수 호출
function a() {
  console.log('a');
}
a(); // 호출!! 함수의 내부 코드 console.log('a')가 실행된다.
a(); // 몇번이든 호출할 수 있다.
```

#### return 이해하기

함수를 호출하면 항상 결괏 값이 나오는데 이 값을 `반환값(return value)`이라고 한다.
반환값을 직접 정할수 있다.
`return` 예약어를 함수 내부에서 사용하면 값을 반환시킬 수 있다. 다만 함수에서 1번만 사용이 가능하다.

```js
function returnFunc() {
  const returnValue = 'apple';
  return returnValue; // 값으로 사용 가능한 것은 다 리턴이 가능하다.
}
const value = returnFunc();
console.log(value); // apple
```

#### 매개변수와 인수 사용하기

함수의 `매개변수(parameter)`란 함수를 호출할 때 인수로 전달된 값을 함수 내부에서 사용할 수 있게 해주는 변수이다.
`인수(argument)`란 함수가 호출될 때 함수로 값을 전달해주는 변수를 말한다.

매개변수는 한마디로 함수로 전달한 값의 변수 이름이다. 인수는 함수 호출시 전달하는 값이다.

```js
// 여기서 fruit가 매개변수!
function print(fruit) {
  console.log(fruit); 
}
// 여기서 'banana'는 인수!
print('banana');  

// 위의 경우 매개변수 fruit에 인수로 'banana'이 들어왔다.라고 표현한다.

function sum(a, b) {
  return a + b;
}
console.log(sum(10, 22)); // 32
console.log(sum(1, 2, 3)); // 3, 3번째 인수와 대응되는 매개변수가 없어서 무시된다.
```

#### 다른 변수 사용하기

함수 안에서 변수나 상수를 선언할 수도 있다. 또한, 함수 바깥에 있는 변수를 함수 내부에서도 사용할 수 있다.

```js
const value = 2;
function func(a, b) {
  return (a + b) * value;
}
console.log(func(2, 3)); // 10
```

### 객체 리터럴

`객체 리터럴(object literal)`이란 {}를 사용하여 객체를 표현하는 것을 말한다.
객체 내부에 사용되는 데이터들을 `속성(property)`이라고 한다.
속성에 접근하는 방법은 배열처럼 대괄호 []를 사용해서 [속성]과 같이 접근하는 것과 온점(.)을 통해 접근하는 것이 있다.

```js
const 객체 = {
  속성이름: 속성값,
}

const robot = {
  level: 1,
  name: 'miki',
  attack: 3,
  defense: 2,
} // level, name, attack, defense가 속성이다.

// 객체 속성 값 사용하기
console.log(robot['level']); // 1
console.log(robot.level); // 1, 
const key = 'defense';
console.log(robot[key]); // 2, robot['defense']와 같다.

```

#### 객체 속성 수정하기

```js
const robot = {
  level: 1,
  name: 'zeni',
}
robot['level'] = 3;
robot.name = 'mini';
console.log(robot.name); // mini
```

#### 객체 속성 제거하기

delete 예약어를 사용하여 속성을 제거할 수 있다. 제거된 속성은 undefined가 된다.

```js
const robot = {
  level: 2,
  name: 'roro',
}
delete robot.level; // 제거
console.log(robot.level); // undefined
delete robot['name']; // 제거
console.log(robot); // {}, 속성이 모두 제거되어 빈 객체만 남았다.
```

자바스크립트에서 배열과 함수가 객체인 이유는 객체의 성질을 모두 다 사용할 수 있기 때문이다. 다만 함수와 배열은 주로 객체 리터럴과는 다른 목적으로 사용하기에 함수와 배열에 임의 속성을 넣는 경우는 드물다. 특성과 목적에 맞게 사용하자.

```js
function func() {}
func.n = '함수';
const array = [2];
array.level = 33;
console.log(func.n); // 함수
console.log(array); // [2, level: 33]
```

#### 객체 간 비교하기

객체는 속성이나 속성의 값이 모두 같더라도 생성할 때마다 새로운 객체가 생성된다. 따라서 같은 객체인지 비교하려면 객체의 속성끼리 1:1로 비교해야한다.

```js
{} === {}; // false
null === null; // true
undefined === undefined; // true

const a = { name: 'a'};
const a2 = { name: 'a'};
const string = 'a';
console.log(a.name === string); // true
console.log(a2.name === string); // true
console.log(a.name === a2.name); // true
```

#### 참조와 복사

`참조(reference)`란 다른 이름으로 같은 변수의 값에 접근하는 것을 말한다. 같은 메모리 주소를 가리키고 있어서 변경사항 또한 공유된다.

`복사(copy)`란 참조가 아닌 값만을 다른 변수에 저장하는 것을 말한다.

```js
// 변수 a와 b가 같은 객체를 참조하고 있다.
const a = { level: 1 };
const b = a;
a.level = 3;
console.log(b.level); // 3

// 참조가 아닌 복사(copy)
let a = 1;
let b = a; // b 변수에 a의 값을 대입하여 값의 복사가 이루어진다.
a = 'hello'
console.log(b); // 1, 참조가 아닌 복사라 a의 값을 바꿔도 변화가 없다.
```

#### 객체 속의 객체

객체 속에 객체를 중첩시켜서 만들 수 있다.

```js
const robot = {
  level: 2,
  skill: {
    jumpAttack: function () { console.log('jumpAttack!!'); },
    SpeedUpBuff: function() { console.log('SpeedUp!!'); },
  }
}

robot.skill.jumpAttack(); // jumpAttack!!
robot['skill']['SpeedUpBuff'](); // SpeedUp!!
```
