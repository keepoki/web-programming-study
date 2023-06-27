# JavaScript 배열 중복 제거하는 방법


- [(forEach, reduce, for), includes](#foreach-reduce-for-includes)
  - [forEach, includes](#foreach-includes)
  - [reduce, (includes, indexOf)](#reduce-includes-indexof)
  - [(for, for of), includes](#for-for-of-includes)
- [filter, indexOf](#filter-indexof)
- [Object.keys, reduce](#objectkeys-reduce)
- [Set, 구조 분해 할당](#set-구조-분해-할당)
- [결론](#결론)

테스트할 때 사용할 변수를 맨 위에 선언하고, 약 20번의 실행 결과를 측정하였다.
컴퓨터 상태에 따라 결과가 상이할 수 있어서 정확하지는 않다.

```js
const strArr = '0123456789'.repeat(5000000).split('');
let uniqueArray = [], startTime, endTime;
```

## \(forEach, reduce, for), includes

요소 하나에 중복되지 않은 배열 전체를 조회(uniqueArray.includes) 하면서 중복 데이터를 제거한다.

### forEach, includes

```js
strArr.forEach((val) => !uniqueArray.includes(val) && uniqueArray.push(val));
// 979 ~ 1080ms, 평균 1030ms

// if문 비교
strArr.forEach((val) => {
  if(!uniqueArray.includes(val)) {
    uniqueArray.push(val);
  }
})
// 966 ~ 1045ms, 평균 1006ms
// if 조건문이 AND 조건보다 속도가 미세하게 빠르다.
```

### reduce, (includes, indexOf)

```js
uniqueArray = strArr.reduce((acc, val) => !acc.includes(val) ? acc.push(val) && acc : acc, []);
// 995 ~ 1102ms, 평균 1049ms

// indexOf 메서드 비교
uniqueArray = strArr.reduce((acc, val, idx) => acc.indexOf(val) === -1 ? acc.push(val) && acc : acc, []);
// 1069 ~ 1127ms, 평균 1098ms
// includes 메서드가 indexOf 메서드보다 속도가 미세하게 빠르다.
```

### (for, for of), includes

```js
for (let i = 0; i < strArr.length; ++i) {
  !uniqueArray.includes(strArr[i]) && uniqueArray.push(strArr[i]);
}
// 652 ~ 679ms, 평균 666ms

// for of 문 비교
for (const val of strArr) {
  !uniqueArray.includes(val) && uniqueArray.push(val);
}
// 1199 ~ 1258ms, 평균 1229ms
// for 문이 for of 문보다 속도가 많이 빠르다.
```

## filter, indexOf

요소 하나에 자신의 배열 전체를 조회(indexOf) 하면서 중복 데이터를 제거한다.

```js
uniqueArray = strArr.filter((val, idx) => strArr.indexOf(val) === idx);
// 1128 ~ 1187ms, 평균 1158ms
```

## Object.keys, reduce

키값이 중복되지 않는 규칙을 이용해서 중복 데이터를 제거한다.

```js
uniqueArray = Object.keys(strArr.reduce((acc, val) => {
  acc[val] = null;
  return acc;
},{}));
// 890 ~ 955ms, 평균 923ms
```

## Set, 구조 분해 할당

Set 객체를 이용해서 중복 데이터를 제거한다.

```js
uniqueArray = [...new Set(strArr)];
// 388 ~ 425ms, 평균 407ms
```

## 결론

Set 쓰자
