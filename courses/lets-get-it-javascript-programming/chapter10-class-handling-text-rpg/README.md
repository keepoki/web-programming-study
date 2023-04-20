# 10장 클래스 다루기_텍스트 RPG

이 장에서는 텍스트 RPG를 만들면서 클래스 문법을 배운다. 주인공과 몬스터, 보스, 레벨업도 하는 게임이다.

- [10.1 순서도 그리기](#101-순서도-그리기)
- [10.2 주인공과 몬스터 만들기](#102-주인공과-몬스터-만들기)
  - [제로초의 조언](#제로초의-조언)
  - [1분 퀴즈 1번 문제는](#1분-퀴즈-1번-문제는)
- [10.3 서로 공격하기](#103-서로-공격하기)
- [10.4 클래스로 재구성하기](#104-클래스로-재구성하기)
  - [제로초의 조언](#제로초의-조언-1)
  - [1분 퀴즈 2번 문제](#1분-퀴즈-2번-문제)
- [10.5 전투 결과 구현하기](#105-전투-결과-구현하기)
  - [1분 퀴즈 3번 문제](#1분-퀴즈-3번-문제)
- [마무리 요약](#마무리-요약)
  - [window](#window)
  - [this](#this)
  - [참조, 깊은 복사, 얕은 복사](#참조-깊은-복사-얕은-복사)
  - [클래스](#클래스)
  - [클래스 상속](#클래스-상속)
- [Self Check 기타 기능 구현하기](#self-check-기타-기능-구현하기)
  - [소스코드](#소스코드)
  - [결과](#결과)

## 10.1 순서도 그리기

게임에는 크게 두 가지 모드가 있다. 모험, 휴식, 종료 중에서 선택하는 일반 모드와 모험을 떠나 적을 만나면 전투를 벌이는 전투 모드이다. 전투 모드에서는 적을 공격하거나 체력을 회복하거나 도망간다.

<img src='./images/10-1-1.jpg' alt='그림 10-1 텍스트 RPG 순서도' width='480px' />

<img src='./images/10-1-2.jpg' alt='그림 10-1 텍스트 RPG 순서도' width='380px' />

지금까지 만든 게임 중에 순서도가 가장 복잡하다. 일반 모드와 전투 모드, 두 가지 경우를 순서도로 만들었기 때문이다. 먼저 첫 화면을 만들어 사용자에게 주인공 이름을 입력받아 캐릭터를 만들어보자.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>텍스트 RPG</title>
</head>
<body>
  <form id="start-screen">
    <input id="name-input" placeholder="주인공 이름을 입력하세요!" />
    <button id="start">시작</button>
  </form>
  <div id="screen">
    <div id="hero-stat">
      <span id="hero-name"></span>
      <span id="hero-level"></span>
      <span id="hero-hp"></span>
      <span id="hero-xp"></span>
      <span id="hero-att"></span>
    </div>
    <form id="game-menu" style="display: none;">
      <div id="menu-1">1.모험</div>
      <div id="menu-2">2.휴식</div>
      <div id="menu-3">3.종료</div>
      <input id="menu-input" />
      <button id="menu-button">입력</button>
    </form>
    <form id="battle-menu" style="display: none;">
      <div id="battle-1">1.공격</div>
      <div id="battle-2">2.회복</div>
      <div id="battle-3">3.도망</div>
      <input id="battle-input" />
      <button id="battle-button">입력</button>
    </form>
    <div id="message"></div>
    <div id="monster-stat">
      <span id="monster-name"></span>
      <span id="monster-hp"></span>
      <span id="monster-att"></span>
    </div>
  </div>
  <script>
  </script>
  </body>
</html>
```

![그림 10-2 초기 화면](./images/10-2.png)

사용자가 주인공 이름을 입력하고 시작 버튼을 클릭하면 초기 화면을 일반 메뉴 화면으로 전환한다.

```html
<script>
  const $startScreen = document.querySelector('#start-screen');
  const $gameMenu = document.querySelector('#game-menu');
  const $battleMenu = document.querySelector('#battle-menu');
  const $heroName = document.querySelector('#hero-name');

  $startScreen.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = event.target['name-input'].value;
    $startScreen.style.display = 'none';
    $gameMenu.style.display = 'block';
    $heroName.textContent = name;
  });
</script>
```

간단히 style 속성을 조작해 화면을 전환한다. 초기 화면을 숨기고(display: none) 일반 메뉴 화면을 보이면(display: block) 된다.

## 10.2 주인공과 몬스터 만들기

주인공의 이름만 입력받았을 뿐, 주인공의 정보는 아직 입력되지 않았다. 주인공의 정보와 몬스터들의 정보를 작성해보자.

```js
const $startScreen = document.querySelector('#start-screen');
const $gameMenu = document.querySelector('#game-menu');
const $battleMenu = document.querySelector('#battle-menu');
const $heroName = document.querySelector('#hero-name');
const $heroLevel = document.querySelector('#hero-level');
const $heroHp = document.querySelector('#hero-hp');
const $heroXp = document.querySelector('#hero-xp');
const $heroAtt = document.querySelector('#hero-att');
const $monsterName = document.querySelector('#monster-name');
const $monsterHp = document.querySelector('#monster-hp');
const $monsterAtt = document.querySelector('#monster-att');
const $message = document.querySelector('#message');
const hero = {
  name: '', // 이름
  lev: 1, // 레벨
  maxHp: 100, // 최대 체력
  hp: 100, // 현재 체력
  xp: 0, // 경험치
  att: 10, // 공격력
};
let monster = null;
const monsterList = [
  { name: '슬라임', hp: 25, att: 10, xp: 10 },
  { name: '스켈레톤', hp: 50, att: 15, xp: 20 },
  { name: '마왕', hp: 150, att: 35, xp: 50 },
];

$startScreen.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = event.target['name-input'].value;
  $startScreen.style.display = 'none';
  $gameMenu.style.display = 'block';
  $heroName.textContent = name;
  $heroLevel.textContent = `${hero.lev}Lev`;
  $heroHp.textContent = `HP: ${hero.hp}/${hero.maxHp}`;
  $heroXp.textContent = `XP: ${hero.xp}/${15 * hero.lev}`;
  $heroAtt.textContent = `ATT: ${hero.att}`;
  hero.name = name;
});
```

객체 리터럴로 간단하게 주인공을 만들었다. hp가 0이 되면 게임 오버가 된다. xp가 일정 수준에 도달하면 레벨업되어 체력과 공격력이 올라간다. 몬스터 정보는 monsterList에 저장했다.

일반 메뉴에서 1번을 눌러 모험을 선택하면 화면이 전투 메뉴로 바뀌고 상대할 몬스터를 무작위로 선택한다. 이때 몬스터는 monsterList에서 가져온다.

```js
$gameMenu.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = event.target['menu-input'].value;
  if (input === '1') {
    $gameMenu.style.display = 'none';
    $battleMenu.style.display = 'block';
    monster = JSON.parse(
      JSON.stringify(monsterList[Math.floor(Math.random() * monsterList.length)])
    );
    monster.maxHp = monster.hp;
    $monsterName.textContent = monster.name;
    $monsterHp.textContent = `HP: ${monster.hp}/${monster.maxHp}`;
    $monsterAtt.textContent = `ATT: ${monster.att}`;
  } else if (input === '2') {
  } else if (input === '3') {
  }
});
```

몬스터를 생성하는 코드를 보면 `JSON.parse`와 `JSON.stringify`라는 메서드를 사용했다. 원래 `parse`메서드는 문자열을 객체로, `stringify`메서드는 객체를 문자열로 만드는 메서드이다. 하지만 두 메서드를 조합해 사용하면 대상 객체를 **깊은 복사**(deep copy)할 수 있다.

여기서 **깊은 복사와 참조의 차이점**을 알아야 한다.

```js
const monster1 = JSON.parse(JSON.stringify(monsterList[0])); // 깊은 복사
const monster2 = monsterList[0]; // 얕은 복사
monster1.name = '새 몬스터';
console.log(monsterList[0].name); // 슬라임
monster2.name = '새 몬스터';
console.log(monsterList[0].name); // 새 몬스터
console.log(monsterList[0] === monster1); // false, 깊은 복사
console.log(monsterList[0] === monster2); // true, 참조 관계
```

참조는 얕은 복사로 인해서 발생하는데, 같은 메모리의 주솟값을 참조하여 서로의 데이터가 연결되어 공유된 상태라고 보면 된다. 복사된 객체나 배열의 내부 구조를 변경하면 원본도 함께 변경된다.

따라서 참조하는 경우와 깊은 복사하는 경우를 구별해서 사용해야 한다. 이 코드에서는 `monsterList`를 계속 재사용하므로 참조가 아니라 깊은 복사를 해야 한다.

![그림 10-4 전투 메뉴](./images/10-4.png)

### 제로초의 조언

간단한 객체는 JSON.parse(JSON.stringify(객체))를 사용해도 크게 문제는 없습니다. 다만, 성능도 느리고 함수나 Math, Date 같은 객체를 복사할 수 없다는 단점이 있습니다. 따라서 실무에서는 lodash 같은 라이브러리(다른 사람이 미리 만들어 둔 코드)를 사용하곤 합니다.

깊은 복사가 있다면 얕은 복사도 있겠죠? 얕은 복사(shallow copy)는 중첩된 객체가 있을 때 가장 바깥 객체만 복사되고, 내부 객체는 참조 관계를 유지하는 복사를 의미합니다. 말로 설명하면 복잡하니 코드로 살펴봅시다.

```js
const array = [{ j: 'k' }, { l: 'm' }];
const shallowCopy = [...array]; // 얕은 복사
console.log(array === shallowCopy); // false
console.log(array[0] === shallowCopy[0]); // true
```

얕은 복사를 할 때는 ... 연산자를 사용합니다. ... 연산자를 스프레드(spread) 문법이라고 하는데, 스프레드 문법은 기존 객체의 속성을 새 객체에 할당할 때 사용합니다. 배열이라면 [...배열]을 하면 되고, 객체라면 {...객체}를 하면 됩니다.

array와 shallowCopy 변수는 서로 다른데, array[0]과 shallowCopy[0]은 같습니다. 가장 바깥 객체는 복사되어 참조 관계가 끊어지므로 다른 값이 됩니다.

깊은 복사 및 참조와의 차이점도 알아봅시다.

```js
const reference = array; // 참조
const deepCopy = JSON.parse(JSON.stringify(array)); // 깊은 복사
console.log(array === reference); // true
console.log(array[0] === reference[0]); // true
console.log(array === deepCopy); // false
console.log(array[0] === deepCopy[0]); // false
```

얕은 복사는 깊은 복사와 참조의 중간에 위치한 복사 방법임을 알 수 있습니다.

> 깊은 복사와 얕은 복사에 대한 자세한 내용은 아래 링크를 참고
> <https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy>
> <https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy>

### 1분 퀴즈 1번 문제는

다음 다섯 개의 값을 각각 복사해 보세요. 여기서 복사라고 함은 복사본을 수정할 때 원본이 바뀌지 않는 것을 의미합니다. 객체라면 복사한 객체 내부의 값을 바꿔도 원본 객체의 값이 바뀌지 않아야 합니다.

```js
const a = 'b';
const c = ['d', true, 1];
const e = { g: 'h' };
const i = [{ j: 'k' }, { l: 'm' }];
const n = { o: { p: 'q' }};
```

나의 풀이는 아래와 같다.

```js
const a = 'b';
const c = ['d', true, 1];
const e = { g: 'h' };
const i = [{ j: 'k' }, { l: 'm' }];
const n = { o: { p: 'q' }};

let deepA = a;
deepA = 10;
const deepC = [...c]; // c.slice()도 가능
deepC[0] = 'd->ddd';
const deepE = { ...e };
deepE.g = 'h->hhh';
const deepI = JSON.parse(JSON.stringify(i));
// const deepI = [{ ...i[0] }, { ...i[1] }]; // 이렇게도 가능
deepI[0].j = 'k->kkk';
const deepN = JSON.parse(JSON.stringify(n));
deepN.o.p = 'q->qqq';

console.log(a); // b
console.log(deepA); // 10
console.log(c); // ['d', true, 1]
console.log(deepC); // ['d->ddd', true, 1]
console.log(e); // {g: 'h'}
console.log(deepE); // {g: 'h->hhh'}
console.log(i); // [{j: 'k'}, {l: 'm'}]
console.log(deepI); // {j: 'k->kkk'}, {l: 'm'}
console.log(n); // { o: {p: 'q'} }
console.log(deepN); // { o: {p: 'q->qqq'} }
```

lodash 등 외부 라이브러리를 사용하지 않고 객체를 깊은 복사하려고 한다면, 아래와 같은 재귀 함수로도 가능하다. 객체, 배열, 클래스 자료형이 아닌 대부분의 자료형은 대입하면 깊은 복사가 된다.

```js
function deepCopy(obj) {
  let result = {};
  for (let key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      result[key] = deepCopy(obj[key]); // 재귀 호출
    } else {
      result[key] = obj[key];
    }
  }
  return result;
}
```

또한 `Object.assign`메서드를 이용하면 내부에 객체가 없는 일차원의 객체는 쉽게 깊은 복사를 할 수 있다. 다만 객체 내부에 객체가 있는 이차원 이상의 객체에 대해서는 얕은 복사가 된다.

```js
const obj = { a: 10, b: 'b', c: { d: 'good' } };
const shallowCopy = Object.assign({}, obj);
shallowCopy.a = 999;
shallowCopy.c.d = 'bad';
console.log(obj);
/* console.log(obj)
a: 10
b: "b"
c: {d: 'bad'} // 얕은 복사로 인해서 good에서 bad로 바뀜
*/

console.log(shallowCopy);
/* console.log(shallowCopy)
a: 999 // 깊은 복사로 인해 obj에는 변화가 없음
b: "b"
c: {d: 'bad'}
*/
```

> Object.assign에 대한 자세한 내용은 아래 링크를 참고
> <https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/assign>

## 10.3 서로 공격하기

이제 전투 모드에서 서로 공격을 주고받고, 회복하거나 도망가는 것을 구현하자. 주인공 객체와 몬스터 객체 간에 상호 작용하는 것을 함수로 구현하면 된다. 객체 안에 쓰인 함수는 **메서드**이다. `hero`객체에 메서드를 추가해보자.

```js
const hero = {
  name: '', // 이름
  lev: 1, // 레벨
  maxHp: 100, // 최대 체력
  hp: 100, // 현재 체력
  xp: 0, // 경험치
  att: 10, // 공격력
  attack(monster) {
    monster.hp -= this.att;
    this.hp -= monster.att;
  },
  heal(monster) {
    this.hp += 20;
    this.hp -= monster.att;
  },
};
```

몬스터를 공격하는 `attack`메서드와 체력을 회복하는 `heal`메서드를 추가했다. 객체의 메서드에서는 `function`예약어를 생략할 수 있다.

앞의 코드 attack 메서드는 다음 코드와 같다.

```js
attack: function(monster) {
  monster.hp -= this.att;
  this.hp -= monster.att;
}
```

처음 보는 `this`예약어에 당황하지 않았는가? 지금 상황에서 `this`는 객체 자신을 가리킨다. 즉 `hero`객체이다. 지금 상황이라고 표현한 이유는 `this`가 가리키는 것이 상황에 따라 달라지기 때문이다. 기본적으로 웹 브라우저에서 `this`는 `window` 객체를 가리킨다.

```js
function a() {
  console.log(this);
};
a(); // window 객체
```

`window` 객체는 브라우저를 가리키는 객체로, 브라우저가 제공하는 기본 객체와 함수들은 대부분 `window`객체 안에 들어있다. `document`나 `console`객체도 실제로는 `window.document`, `window.console`이다. `window`는 생략할 수 있어서 `document`와 `console`로만 적는 것이다.

객체에서 `this`를 사용할 때는 해당 객체를 가리킨다.

```js
const b = {
  name: '제로초',
  sayName() {
    console.log(this === b);
  }
};
b.sayName(); // true
```

앞에서 배운 내용을 기반으로 전투 메뉴를 구현해보자.

```js
$battleMenu.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = event.target['battle-input'].value;
  if (input === '1') {
    hero.attack(monster);
    monster.attack(hero);
    $heroHp.textContent = `HP: ${hero.hp}/${hero.maxHp}`;
    $monsterHp.textContent = `HP: ${monster.hp}/${monster.maxHp}`;
    $message.textContent = `${hero.att}의 데미지를 주고, ${monster.att}의 데미지를 받았다.`;
  } else if (input === '2') {
  } else if (input === '3') {
  }
});
```

여기까지가 배운 내용으로 만들 수 있는 코드이다. 코드가 흩어져 있어서 어떤 부분에 어떤 코드를 써야 할지 헷갈린다. 이대로 가면 코드가 더욱더 복잡해진다. 이제 클래스를 도입해서 어떻게 코드를 깔끔하게 만들 수 있는지 배워보자.

## 10.4 클래스로 재구성하기

`클래스`(class)는 객체를 생성하기 위한 템플릿(서식)이다. 클래스는 2015년에 자바스크립트에 추가된 문법으로, 이전에는 함수로 객체를 만들었다. 함수로 어떻게 객체를 생성했는지 잠깐 살펴보자.

```js
function createMonster(name, hp, att, xp) {
  return { name, hp, att, xp };
}
const monster1 = createMonster('슬라임', 25, 10, 11);
const monster2 = createMonster('슬라임', 26, 10, 10);
const monster3 = createMonster('슬라임', 25, 11, 10);
```

가장 간단하게 객체를 반환하는 함수를 만들면 된다. 이와 같이 객체를 반환하는 함수를 **공장**(factory) **함수**라고 한다. 공장처럼 객체를 찍어낸다고 해서 붙은 이름이다.

여기서 중요한 점은 생성한 세 개의 객체가 서로 참조 관곅가 아닌 다른 객체여야 한다는 점이다. 같은 객체를 반환하면 하나의 몬스터를 잡았는데도 다른 두 마리가 같이 죽게 된다. 따라서 매번 새로운 객체를 반환하게 객체 리터럴로 작성하였다(또는 기존 객체를 깊은 복사해도 된다).

객체를 생성해보자.

```js
function Monster(name, hp, att, xp) {
  this.name = name;
  this.hp = hp;
  this.att = att;
  this.xp = xp;
}
const monster1 = new Monster('슬라임', 25, 10, 11);
const monster2 = new Monster('슬라임', 26, 10, 10);
```

객체의 속성을 `this`에 대입했다. 그리고 함수를 호출할 때는 함수 이름 앞에 `new`를 붙인다. `new`를 붙여 호출해도 `this`는 객체 자신을 가리킨다. 이렇게 `Monster`에 `new`를 붙여 호출하는 함수를 **생성자**(constructor) **함수**라고 한다. 실수로 `new`를 붙이지 않고 호출하면 `this`는 `window`가 되어 `window.name`의 값을 바꾸게 되니 반드시 `new`를 붙여 호출해야 한다.

생성자 함수의 이름은 보통 대문자로 시작한다. 필수는 아니지만, 자바스크립트 개발자들이 많이 사용하는 규칙이다. 8장에서 사용했던 `new Date`의 `Date`함수도 생성자 함수이다.

클래스 문법이 여기서 나온다. 자바스크립트는 생성자 함수를 조금 더 편하게 쓸 수 있도록 클래스 문법을 도입했다.

```js
class Monster {
  constructor(name, hp, att, xp) {
    this.name = name;
    this.hp = hp;
    this.att = att;
    this.xp = xp;
  }
}
const monster1 = new Monster('슬라임', 25, 10, 11);
const monster2 = new Monster('슬라임', 26, 10, 10);
```

`class` 예약어로 클래스를 선언하고, `constructor`메서드 안에 기존 코드를 넣으면 된다. 클래스에 `new`를 붙여 호출하면 `constructor`함수가 실행되고 객체가 반환된다. 여기서 `this`는 생성된 객체 자신을 가리킨다.

클래스 문법의 장점은 객체의 메서드를 같이 묶을 수 있다는 점이다.

```js
class Monster {
  constructor(name, hp, att, xp) {
    this.name = name;
    this.hp = hp;
    this.att = att;
    this.xp = xp;
  }
  attack(monster) {
    monster.hp -= this.att;
    this.hp -= monster.att;
  }
  heal(monster) {
    this.hp += 20;
    this.hp -= monster.att;
  }
}
```

그럼 공장 함수나 생성자 함수를 사용할 때와 비교해 보겠다.

```js
function createMonster(name, hp, att, xp) {
  return {
    name, hp, att, xp,
    attack(monster) {
      monster.hp -= this.att;
      this.hp -= monster.att;
    },
    heal(monster) {
      this.hp += 20;
      this.hp -= monster.att;
    },
  };
}
```

공장 함수 방식에 메서드를 추가했다. 클래스 문법과 똑같아 보이지만, 한 가지 큰 차이점은 공장 함수에서 객체를 생성할 때마다 `attack`과 `heal`메서드도 같이 새로 생성된다. 클래스 문법에서는 한번 만든 `attack`과 `heal`메서드는 계속 재사용한다. 재사용해도 되는 메서드를 새로 만들어내는 것을 비효율적이다.

이번에는 생성자 함수 방식에 메서드를 추가해보자.

```js
function Monster(name, hp, att, xp) {
  this.name = name;
  this.hp = hp;
  this.att = att;
  this.xp = xp;
}
Monster.prototype.attack = function(monster) {
  monster.hp -= this.att;
  this.hp -= monster.att;
};
Monster.prototype.heal = function(monster) {
  this.hp += 20;
  this.hp -= monster.att;
};
```

이번에는 `prototype`이라는 새로운 속성이 나왔다. 생성자 함수에 메서드를 추가할 때는 `prototype`이라는 속성 안에 추가해야 한다. `prototype`속성 안에 추가한 메서드를 **프로토타입 메서드**라고 한다. 이렇게 하면 공장 함수와는 달리 `attack`과 `heal`메서드를 재사용한다. 다만, 생성자 함수와 프로토타입 메서드가 하나로 묶여 있지 않다.

이런 문제점을 모두 해결한 것이 클래스 문법이다. 생성자 함수와 메서드가 묶여 있어서 보기에도 편하고 메서드 함수를 매번 재생성해야 하는 문제도 발생하지 않는다.

이제 클래스 문법을 활용해 텍스트 RPG를 다시 구성해보자. 주인공, 몬스터, 게임을 클래스로 만든다. 그리고 게임 클래스에 주인공과 몬스터는 속성이 된다. 게임을 시작하는 것, 메뉴를 바꾸는 것, 게임을 종료하는 것 모두 게임 클래스의 메서드가 된다.

```html
<script>
  const $startScreen = document.querySelector('#start-screen');
  const $gameMenu = document.querySelector('#game-menu');
  const $battleMenu = document.querySelector('#battle-menu');
  const $heroName = document.querySelector('#hero-name');
  const $heroLevel = document.querySelector('#hero-level');
  const $heroHp = document.querySelector('#hero-hp');
  const $heroXp = document.querySelector('#hero-xp');
  const $heroAtt = document.querySelector('#hero-att');
  const $monsterName = document.querySelector('#monster-name');
  const $monsterHp = document.querySelector('#monster-hp');
  const $monsterAtt = document.querySelector('#monster-att');
  const $message = document.querySelector('#message');

  class Game {
    constructor(name) {
      this.monster = null;
      this.hero = null;
      this.monsterList = [
        { name: '슬라임', hp: 25, att: 10, xp: 10 },
        { name: '스켈레톤', hp: 50, att: 15, xp: 20 },
        { name: '마왕', hp: 150, att: 35, xp: 50 },
      ];
    }
  }
  class Hero {
    constructor(game, name) {
      this.game = game;
      this.name = name;
      this.lev = 1;
      this.maxHp = 100;
      this.hp = 100;
      this.xp = 0;
      this.att = 10;
    }
    attack(target) {
      target.hp -= this.att;
    }
    heal(monster) {
      this.hp += 20;
      this.hp -= monster.att;
    }
  }
  class Monster {
    constructor(game, name, hp, att, xp) {
      this.game = game;
      this.name = name;
      this.maxHp = hp;
      this.hp = hp;
      this.xp = xp;
      this.att = att;
    }
    attack(target) {
      target.hp -= this.att;
    }
  }

  let game = null;
  $startScreen.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = event.target['name-input'].value;
    game = new Game(name);
  });
</script>
```

클래스로 전환하면서 이전에 작업했던 것이 지워졌기 때문에 아무런 작동을 하지 않을 것이다.

`Game`, `Hero`, `Monster` 세 개의 클래스를 만들고 주인공 이름을 입력 받는다. `new Game`을 하게 되면 `Game`클래스의 `constructor`메서드가 실행되고 `monster`, `hero`, `monsterList`속성을 만든다.

`Game`클래스 안에 기본 메서드를 만들어 보자. 게임을 시작하는 `start`메서드, 게임을 종료하는 `quit`메서드, 화면을 전환하는 `changeScreen`메서드, 일반 메뉴를 담당하는 `onGameMenuInput`메서드, 전투 메뉴를 담당하는 `onBattleMenuInput`메서드를 만든다. 객체의 메서드는 `this`를 통해 서로 호출할 수 있다.

```js
class Game {
  constructor(name) {
    this.monster = null;
    this.hero = null;
    this.monsterList = [
      { name: '슬라임', hp: 25, att: 10, xp: 10 },
      { name: '스켈레톤', hp: 50, att: 15, xp: 20 },
      { name: '마왕', hp: 150, att: 35, xp: 50 },
    ];
    this.start();
  }
  start() {
    $gameMenu.addEventListener('submit', this.onGameMenuInput);
    $battleMenu.addEventListener('submit', this.onBattleMenuInput);
    this.changeScreen('game');
  }
  changeScreen(screen) {
    if (screen === 'start') {
      $startScreen.style.display = 'block';
      $gameMenu.style.display = 'none';
      $battleMenu.style.display = 'none';
    } else if (screen === 'game') {
      $startScreen.style.display = 'none';
      $gameMenu.style.display = 'block';
      $battleMenu.style.display = 'none';
    } else if (screen === 'battle') {
      $startScreen.style.display = 'none';
      $gameMenu.style.display = 'none';
      $battleMenu.style.display = 'block';
    }
  }
  onGameMenuInput = (event) => {
    event.preventDefault();
    const input = event.target['menu-input'].value;
    if (input === '1') { // 모험
      this.changeScreen('battle');
    } else if (input === '2') { // 휴식
    } else if (input === '3') { // 종료
    }
  }
  onBattleMenuInput = (event) => {
    event.preventDefault();
    const input = event.target['battle-input'].value;
    if (input === '1') { // 공격
    } else if (input === '2') { // 회복
    } else if (input === '3') { // 도망
    }
  }
}
```

`#game-menu`와 `#battle-menu`의 `submit`이벤트 리스너를 메서드 내부에 연결한 이유는 `onGameMenuInput`과 `onBattleMenuInput`이 `Game`클래스의 메서드이기 때문이다.

```js
start() {
  $gameMenu.addEventListener('submit', this.onGameMenuInput);
  $battleMenu.addEventListener('submit', this.onBattleMenuInput);
  this.changeScreen('game');
}
```

`Game`클래스 밖에서 `this`는 `window`이니까 문제가 된다. 또 한 가지 특이한 점은 `onGameMenuInput`과 `onBattleMenuInput`만 화살표 함수로 되어 있다. 이것은 this 및 콜백 함수의 특성과 관련이 있다. 다음 코드를 콘솔에 입력해 보자.

```js
document.addEventListener('click', function() {
  console.log(this); // document
});
```

그러고 나서 화면을 클릭하면 `this`가 `document`를 출력한다.

앞에서 `this`를 설명할 때 this는 기본적으로 `window`라고 했는데, 이번에는 어째서 `document`일까? 이번에는 함수 선언문을 화살표 함수로 바꿔보자(코드 입력 전에 새로고침).

```js
document.addEventListener('click', () => {
  console.log(this); // window
});
```

화면을 클릭하면 `window`가 출려된다.

함수 선언문일 때만 `document`가 나오는 이유는 `click`이벤트가 발생하면 `addEventListener`메서드가 콜백 함수의 `this`를 `event.target`으로 바꿔서 호출하기 때문이다.

함수 선언문의 this는 다음과 같이 bind 메서드를 사용해서 직접 바꿀 수 있다.

```js
function a() {
  console.log(this);
}
a.bind(document)(); // document
```

화살표 함수는 `bind`를 할 수 없다. 따라서 `this`가 바뀌지 않아 `window`가 그대로 나온다.

```js
const b = () => {
  console.log(this);
}
b.bind(document)(); // window
```

이런 이유로 `addEventListener`안에서 함수 선언문을 사용하면 `document`가 출력되고, 화살표 함수를 사용하면 `window`가 출력되는 것이다.

`onGameMenuInput`과 `onBattleMenuInput`이 화살표 함수여야 하는 이유도 같다. 객체의 `this`를 가리키게 하기 위해서이다.

화살표 함수의 `this`가 무조건 `window`라고 오해할 수 있는데, 화살표 함수는 기존 `this`를 유지할 뿐 `this`를 어떤 값으로 바꾸지는 않는다. 따라서 앞의 코드에서는 기존 `this`를 유지해 `onGameMenuInput`메서드 안에서도 `this`가 `Game`객체가 되게 한다.

모든 콜백 함수의 `this`가 다른 값으로 바뀌는 것도 아니다. 따라서 `this`를 바꾸는 함수나 메서드를 볼 때마다 따로 외우고 있어야 한다.

> this에 대한 자세한 내용은 아래 링크를 참고
> <https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this>
> <https://web.dev/i18n/ko/javascript-this/>

이제 클래스 간에 상호 작용을 시작해 보겠다. 게임 시작할 때 주인공을 만든다.

```js
class Game {
  constructor(name) {
    ...
    this.start(name); // 주인공 이름을 인자로 받음
  }
  start(name) {
    $gameMenu.addEventListener('submit', this.onGameMenuInput);
    $battleMenu.addEventListener('submit', this.onBattleMenuInput);
    this.changeScreen('game');
    this.hero = new Hero(this, name); // 주인공 클래스 생성
  }
  ...
}
```

주인공이 `Game`클래스의 `hero`속성에 등록됐다. `hero`객체에서도 `this.game`을 통해 게임 객체에 접근할 수 있다.

이제는 주인공을 생성하자마자 주인공의 체력, 공격력, 경험치 등이 화면에 표시돼야 한다. 이를 담당하는 `updateHeroStat`메서드를 `Game`클래스에 생성하고 `start`메뉴에서 호출합니다.

```js
class Game {
  ...
  start(name) {
    $gameMenu.addEventListener('submit', this.onGameMenuInput);
    $battleMenu.addEventListener('submit', this.onBattleMenuInput);
    this.changeScreen('game');
    this.hero = new Hero(this, name);
    this.updateHeroStat();
  }
  ...
  updateHeroStat() {
    const { hero } = this;
    if (hero === null) { // 주인공이 전사한 경우
      $heroName.textContent = '';
      $heroLevel.textContent = '';
      $heroHp.textContent = '';
      $heroXp.textContent = '';
      $heroAtt.textContent = '';
      return;
    }
    $heroName.textContent = hero.name;
    $heroLevel.textContent = `${hero.lev}Lev`;
    $heroHp.textContent = `HP: ${hero.hp}/${hero.maxHp}`;
    $heroXp.textContent = `XP: ${hero.xp}/${15 * hero.lev}`;
    $heroAtt.textContent = `ATT: ${hero.att}`;
  }
}
```

이제 주인공을 생성하고 화면에도 표시했으니 사용자로부터 메뉴 입력을 받으면 된다. 이제는 전투 화면에서 몬스터를 생성하고 몬스터 정보를 화면에 표시(updateMonsterStat)해야 한다. 추가로 몬스터가 나타났다는 메시지도 화면에 띄운다(showMessage).

```js
class Game {
  ...
  onGameMenuInput = (event) => {
    event.preventDefault();
    const input = event.target['menu-input'].value;
    if (input === '1') { // 모험
      this.changeScreen('battle');
      const randomIndex = Math.floor(Math.random() * this.monsterList.length);
      const randomMonster = this.monsterList[randomIndex];
      this.monster = new Monster(
        this,
        randomMonster.name,
        randomMonster.hp,
        randomMonster.att,
        randomMonster.xp,
      );
      this.updateMonsterStat();
      this.showMessage(`몬스터와 마주쳤다. ${this.monster.name}인 것 같다!`);
    } else if (input === '2') { // 휴식
    } else if (input === '3') { // 종료
    }
  }
  onBattleMenuInput = (event) => {...}
  updateHeroStat() {...}
  updateMonsterStat() {
    const { monster } = this;
    if (monster === null) {
      $monsterName.textContent     = '';
      $monsterHp.textContent = '';
      $monsterAtt.textContent = '';
      return;
    }
    $monsterName.textContent = monster.name;
    $monsterHp.textContent = `HP: ${monster.hp}/${monster.maxHp}`;
    $monsterAtt.textContent = `ATT: ${monster.att}`;
  }
  showMessage(text) {
    $message.textContent = text;
  }
}
```

이번에는 `JSON.parse(JSON.stringify(객체))`를 사용하지 않았다. `monsterList`로부터 `name`, `maxHp`, `att`, `xp` 값을 꺼내, `game`객체(this)와 함께 `Monster`클래스에 넣어 주었다. 문자열이나 숫자 같은 값은 깊은 복사를 할 필요가 없다.

![그림 10-7 몬스터를 마주친 상태](./images/10-7.png)

마지막으로 전투 메뉴에서 1(공격)을 입력하면 몬스터를 공격하게 해보자.

```js
class Game {
  ...
  onBattleMenuInput = (event) => {
    event.preventDefault();
    const input = event.target['battle-input'].value;
    if (input === '1') { // 공격
      const { hero, monster } = this;
      hero.attack(monster);
      monster.attack(hero);
      this.showMessage(`${hero.att}의 데미지를 주고, ${monster.att}의 데미지를 받았다.`);
      this.updateHeroStat();
      this.updateMonsterStat();
    } else if (input === '2') { // 회복
    } else if (input === '3') { // 도망
    }
  }
  ...
}
```

![그림 10-8 서로 공격을 주고 받는 모습](./images/10-8.png)

클래스로 바꾸니 코드가 기능별로 묶여 있어 깔끔해 보인다. 그런데 코드의 순서와 실행 순서가 달라 헷갈리기도 한다. 기존에는 코드가 순서대로 짜여 있어서 코드의 순서를 따라가면 됐다. 하지만 이제는 어떤 객체가 생성되고, 객체들이 어떻게 상호 작용을 하는지 파악해야 코드를 이해할 수 있다. 객체 간의 관계만 명확하게 프로그래밍하면 그 뒤로는 객체들끼리 알아서 상호 작용한다.

### 제로초의 조언

이렇게 클래스를 활용하다 보면 무조건 클래스로 만드는 것이 좋은지 궁금할 겁니다. 모든 것을 클래스로 만드는 사람이 있지만, 클래스를 아예 사용하지 않고 프로그래밍하는 사람도 있습니다. 클래스 위주로 프로그래밍하는 것을 **객체 지향 프로그래밍**이라고 하고, 함수를 조합해 가며 프로그래밍하는 것을 **함수형 프로그래밍**이라고 합니다. 9장까지 만든 게임처럼 순서도 절차대로 프로그래밍하는 것은 **절차형 프로그래밍**이라고 하고요.

자바스크립트에서는 이 세 가지 프로그래밍 방식으로 코딩할 수 있습니다. 어떤 것이 다른 것보다 더 낫다고 말하기는 어렵습니다. 개발자 개인의 취향 차이일 수 있어서 다양한 방식을 경험해 보고 자신과는 어떤 방식이 맞는지, 현재 프로젝트와는 어떤 방식이 맞는지 판단해 보는 것이 좋습니다.

> 객체 지향, 함수형, 절차형 프로그래밍에 대한 자세한 내용은 아래 링크를 참고
> <https://ko.wikipedia.org/wiki/%EA%B0%9D%EC%B2%B4_%EC%A7%80%ED%96%A5_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D>
> <https://ko.wikipedia.org/wiki/%ED%95%A8%EC%88%98%ED%98%95_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D>
> <https://ko.wikipedia.org/wiki/%EC%A0%88%EC%B0%A8%EC%A0%81_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D>

### 1분 퀴즈 2번 문제

이 세상에 존재하는 것을 클래스로 만드는 연습을 하면 좋습니다. 사람을 컴퓨터 세상 속에 구현해 봅시다. 사람(Human) 클래스를 만들고, 생성자 메서드에서는 이름과 나이를 속성으로 입력받으세요. 또한, 자신의 이름과 나이를 콘솔에 출력하는 메서드도 두 개 만드세요.

나의 풀이는 아래와 같다.

```js
class Human {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  consoleName() {
    console.log(this.name);
  }
  consoleAge() {
    console.log(this.age);
  }
}

const human = new Human('trevor1107', '999');
human.consoleName(); // trevor1107
human.consoleAge(); // 999
```

## 10.5 전투 결과 구현하기

공격을 누르면 서로 공격하게 했으니 둘 중 먼저 체력이 0이 되는 쪽이 나오면 승부가 가려진다. 주인공의 체력이 0이 되면 게임 오버이고, 몬스터의 체력 0이 되면 주인공은 경험치를 얻는다. 경험치가 주인공 `레벨 x 15`보다 높으면 주인공은 레벨업을 한다. 레벨업을 하면 주인공은 체력을 모두 회복하고 최대 체력과 공격력이 5씩 증가한다.

```js
class Game {
  ...
  onBattleMenuInput = (event) => {
    event.preventDefault();
    const input = event.target['battle-input'].value;
    if (input === '1') { // 공격
      const { hero, monster } = this;
      hero.attack(monster);
      monster.attack(hero);
      if (hero.hp <= 0) { // 주인공 체력이 0이하, 게임 오버
        this.showMessage(`${hero.lev} 레벨에서 전사. 새 주인공을 생성하세요.`);
        this.quit();
      } else if (monster.hp <= 0) { // 몬스터 체력 0이하, 경험치 획득
        this.showMessage(`몬스터를 잡아 ${monster.xp} 경험치를 얻었다.`);
        hero.getXp(monster.xp);
        this.monster = null;
        this.changeScreen('game');
      } else {
        this.showMessage(`${hero.att}의 데미지를 주고, ${monster.att}의 데미지를 받았다.`);
      }
      this.updateHeroStat();
      this.updateMonsterStat();
    } else if (input === '2') { // 회복
    } else if (input === '3') { // 도망
    }
  }
...
  showMessage(text) {
    $message.textContent = text;
  }
  quit() {
    this.hero = null;
    this.monster = null;
    this.updateHeroStat();
    this.updateMonsterStat();
    $gameMenu.removeEventListener('submit', this.onGameMenuInput);
    $battleMenu.removeEventListener('submit', this.onBattleMenuInput);
    this.changeScreen('start');
    game = null;
  }
}

class Hero {
  ...
  heal(monster) {...}
  getXp(xp) {
    this.xp += xp;
    if (this.xp >= this.lev * 15) { // 경험치를 다 채우면
      this.xp -= this.lev * 15;
      this.lev += 1;
      this.maxHp += 5;
      this.att += 5;
      this.hp = this.maxHp;
      this.game.showMessage(`레벨업! 레벨 ${this.lev}`);
    }
  }
}
```

![그림 10-9 레벨업을 한 모습](./images/10-9.png)

그런데 `Hero`클래스와 `Monster`클래스에 공통되는 이름, 체력, 공격력, 경험치 같은 속성이 있다. 그리고 `attack` 같은 공통 메서드가 있다. 이러한 중복을 제거하기 위해 클래스의 **상속**이라는 개념을 사용한다.

공통되는 부분만 추려 새로운 클래스로 만들고 각각의 클래스는 이 클래스를 가져와 사용할 수 있는데, 이를 상속받는다고 한다.

공통 클래스인 `Unit`을 만들어본다.

```js
class Unit {
  constructor(game, name, hp, att, xp) {
    this.game = game;
    this.name = name;
    this.maxHp = hp;
    this.hp = hp;
    this.att = att;
    this.xp = xp;
  }
  attack(target) {
    target.hp -= this.att;
  }
}
```

이제 다른 클래스에서 공통 클래스인 `Unit`을 `extends`예약어로 상속 받을 수 있다.

```js
class Hero extends Unit {
  constructor(game, name) {
    super(game, name, 100, 10, 0); // 부모 클래스의 생성자 호출
    this.lev = 1; // 그 외 속성
  }
  attack(target) {
    super.attack(target); // 부모 클래스의 attack
    // 부모 클래스 attack 외의 동작
  }
  ...
}

class Monster extends Unit {
  constructor(game, name, hp, att, xp) {
    super(game, name, hp, att, xp);
  }
}
```

`super`함수는 부모 클래스(Unit)을 의미한다. `super()`는 부모 클래스의 `constructor`함수를 호출하는 것과 같다. 즉, 부모 클래스의 생성자에 인수를 전달한다. `Hero`의 `lev`속성은 부모 클래스에 존재하지 않는 속성이라서 `lev`속성은 `super`아래에 따로 적는다. 공통 속성을 super로 처리했다고 보면 된다.

`Hero`의 `Attack`메서드에 보면 `super.attack`을 호출하는데, 이것은 부모 클래스의 `attack`메서드를 호출하는 것과 같다. `super.attack`을 호출하는 것은 필수가 아닌 선택이다.

`Monster`처럼 `attack`메서드를 생성하지 않은 경우에 부모 클래스에 `attack`메서드가 존재한다면 부모 클래스의 `attack`메서드를 대신 호출한다. 따라서 `Hero`의 `attack`메서드 또한 부모 클래스의 `attack`메서드를 호출하는 것 외에는 다른 작업을 하지 않는다면 생략해도 된다.

```js
class A extends B {
  method() {
    super.method(); // 메서드 내에서 부모의 메서드만 호출하므로 생략 가능
  }
}

// 아래 처럼 바꿔도 된다는 뜻이다.
class A extends B {
}

const obj = new A();
obj.method(); // super.method()를 호출 즉, B의 method()를 호출
```

### 1분 퀴즈 3번 문제

1분 퀴즈 2에서 다음과 같이 Human 클래스를 만들었습니다.

```js
class Human {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  sayName() {
    console.log(this.name);
  }
  sayAge() {
    console.log(this.age);
  }
}
```

`Human`클래스를 상속하면 조금 더 구체적인 사람을 만들 수 있습니다. HTML, CSS, JS를 할 줄 아는 개발자를 만들어 봅시다.

나의 풀이는 아래와 같다.

```js
class Human {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  sayName() {
    console.log(this.name);
  }
  sayAge() {
    console.log(this.age);
  }
}

class WebProgrammer extends Human {
  constructor(name, age, skills) {
    super(name, age);
    this.skills = skills;
  }
}

const webProgrammer = new WebProgrammer('trevor1107', '999', ['HTML', 'CSS', 'JS']);

console.log(webProgrammer.skills); // ['HTML', 'CSS', 'JS']
```

## 마무리 요약

### window

window 객체는 브라우저를 가리키는 객체로, 브라우저가 제공하는 기본 객체와 함수들은 대부분 window 객체 안에 들어 있습니다. document 객체나 console 객체도 실제로는 window.document, window.console인데, window를 생략하고 document와 console만 적습니다.

### this

this는 상황에 따라 다른 값을 가집니다. 기본적으로 this는 window 객체를 가리키므로 어떤 때에 어떤 값을 가지는지 외우면 됩니다.

1. 객체를 통해 this를 사용할 때는 this가 해당 객체를 가리키게 됩니다.
2. 특정 메서드는 콜백 함수의 this를 바꿉니다. addEventListener가 대표적입니다.
3. this가 바뀌는 것을 원치 않는다면 함수 선언문 대신 화살표 함수를 사용합니다.

### 참조, 깊은 복사, 얕은 복사

복사는 어떤 값을 다른 변수에 대입할 때 기존 값과 참조 관계가 끊기는 것을 의미합니다. 객체가 아닌 값은 애초부터 참조 관계가 없으므로 그냥 복사됩니다.

객체를 복사할 때는 얕은 복사와 깊은 복사가 있는데, 얕은 복사는 중첩된 객체가 있을 때 가장 바깥 객체만 복사되고 내부 객체는 참조 관계를 유지하는 복사를 의미합니다. 깊은 복사는 내부 객체까지 참조 관계가 끊겨서 복사되는 것을 의미합니다.

```js
const array = [{ j: 'k' }, { l: 'm' }];
const reference = array; // 참조
const shallowCopy = [...array]; // 얕은 복사
const deepCopy = JSON.parse(JSON.stringify(array)); // 깊은 복사
console.log(array === reference); // true
console.log(array[0] === reference[0]); // true
console.log(array === shallowCopy); // false
console.log(array[0] === shallowCopy[0]); // true
console.log(array === deepCopy); // false
console.log(array[0] === deepCopy[0]); // false
```

JSON.parse(JSON.stringify(값))으로 간단하게 깊은 복사할 수 있습니다.

얕은 복사를 할 때는 ... 연산자를 사용합니다. 배열이라면 [...배열]을 하면 되고, 객체라면 {...객체}를 하면 됩니다.

### 클래스

객체를 생성하는 템플릿 문법입니다. class 예약어로 클래스를 선언하고 constructor 메서드 안에 기존 코드를 넣습니다. new를 붙여 호출하면 constructor 함수가 실행되고 객체가 반환됩니다. this는 생성된 객체 자신을 가리키게 됩니다.

### 클래스 상속

클래스끼리 extends 예약어로 상속할 수 있습니다. 상속하는 클래스는 부모 클래스가 되고, 상속받는 클래스는 자식 클래스가 됩니다. 공통되는 속성이나 메서드는 부모 클래스로부터 상속받습니다.

```js
class Hero extends Unit {
  constructor(game, name) {
    super(game, name, 100, 10, 0); // 부모 클래스의 생성자 호출
    this.lev = 1; // 그 외 속성
  }
  attack(target) {
    super.attack(target); // 부모 클래스의 attack
    // 자식 클래스만의 동작
  }
}
```

자식 클래스에서 super 함수는 부모 클래스를 의미하며 부모 클래스의 생성자에 인수를 전달합니다. 공통되는 속성은 부모 클래스의 것을 사용하고, 공통되지 않는 속성은 자식 클래스에 따로 선언합니다.

메서드에서도 super를 사용할 수 있습니다. 자식 클래스에서 super.메서드를 호출하는 것은 부모 클래스의 메서드를 호출하는 것과 같습니다. 부모 클래스의 메서드를 호출한 후 다른 작업을 할 수 있습니다. 자식 클래스에 메서드를 생성하지 않은 경우에도 부모 클래스에 메서드가 존재한다면 호출할 수 있습니다.

## Self Check 기타 기능 구현하기

앞에서 구현한 내용을 참고해 나머지 기능을 구현해 봅시다. 일반 메뉴에서는 휴식과 종료 기능을, 전투 메뉴에서는 회복과 도망 기능을 구현하면 됩니다.

휴식 기능은 주인공의 체력을 최대로 회복하는 기능입니다. 종료 기능은 게임을 종료하고 주인공을 새로 생성하는 화면으로 되돌립니다. 회복 기능은 전투 중에 체력을 20 회복하는 기능입니다. 다만, 회복 후에 몬스터에게 한 번 공격을 당합니다. 또한, 체력은 최대 체력(maxHp) 값을 넘을 수 없습니다. 예를 들어, 최대 체력이 80이고 현재 체력이 70이라면 체력을 20 회복해도 90이 되는 것이 아니라 80이 됩니다. 도망 기능은 강력한 몬스터를 만났을 때 도망가는 기능으로, 일반 메뉴로 되돌아가게 합니다.

힌트: 회복 기능에는 Math.min 메서드를 사용하고, 종료 기능은 quit 메서드를 재사용하면 됩니다.

### 소스코드

기존 소스코드에서 달라지는 부분만 작성했다.

```js
class Game {
  ...
  onGameMenuInput = (event) => {
    event.preventDefault();
    const input = event.target['menu-input'].value;
    const { hero } = this;
    if (input === '1') { // 모험
      this.changeScreen('battle');
      const randomIndex = Math.floor(Math.random() * this.monsterList.length);
      const randomMonster = this.monsterList[randomIndex];
      this.monster = new Monster(
        this,
        randomMonster.name,
        randomMonster.hp,
        randomMonster.att,
        randomMonster.xp,
      );
      this.updateMonsterStat();
      this.showMessage(`몬스터와 마주쳤다. ${this.monster.name}인 것 같다!`);
    } else if (input === '2') { // Self Check 휴식
      hero.rest();
      this.updateHeroStat();
      this.showMessage(`휴식으로 모든 HP가 회복되었다.`);
    } else if (input === '3') { // 종료
      this.quit();
    }
  }
  onBattleMenuInput = (event) => {
    event.preventDefault();
    const input = event.target['battle-input'].value;
    const { hero, monster } = this;
    if (input === '1') { // 공격
      hero.attack(monster);
      monster.attack(hero);
      if (hero.hp <= 0) { // 주인공 체력이 0이하, 게임 오버
        this.heroDie();
      } else if (monster.hp <= 0) { // 몬스터 체력 0이하, 경험치 획득
        this.monsterDie();
      } else {
        this.showMessage(`${hero.att}의 데미지를 주고, ${monster.att}의 데미지를 받았다.`);
      }
      this.updateHeroStat();
      this.updateMonsterStat();
    } else if (input === '2') { // Self Check 회복
      hero.heal(this.monster);
      if (hero.hp <= 0) { // 주인공 체력이 0이하, 게임 오버
        this.heroDie();
      } else {
        this.showMessage(`${hero.healNum}의 HP를 회복, ${monster.att}의 데미지를 받았다.`);
      }
      this.updateHeroStat();
    } else if (input === '3') { // 도망
      this.monster = null;
      this.updateMonsterStat();
      this.showMessage(`도망에 성공했다!`);
      this.changeScreen('game'); // Self Check 일반 메뉴로 돌아가기
    }
  }
  heroDie() {
    this.showMessage(`${this.hero.lev} 레벨에서 전사. 새 주인공을 생성하세요.`);
    this.quit();
  }
  monsterDie() {
    const { hero, monster } = this;
    this.showMessage(`몬스터를 잡아 ${monster.xp} 경험치를 얻었다.`);
    hero.getXp(monster.xp);
    this.monster = null;
    this.changeScreen('game');
  }
  updateHeroStat() { ... }
  updateMonsterStat() { ... }
  showMessage() { ... }
  quit() { ... }
}

class Hero extends Unit{
  constructor(game, name) {
    super(game, name, 100, 10, 0); // 부모 클래스의 생성자 호출
    this.lev = 1; // 그 외 속성
    this.healNum = 20;
  }
  attack(target) { ... }
  rest() { // Self Check 휴식
    this.hp = this.maxHp;
  }
  heal(monster) { // 회복
    // Self Check 최대 체력 제한
    this.hp = Math.min(this.hp + this.healNum, this.maxHp);
    this.hp -= monster.att;
  }
  getXp(xp) { ... }
}
```

### 결과

![Self Check 결과 화면](./images/self-check-result.gif)
