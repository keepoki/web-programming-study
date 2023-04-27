# 14장 복습_두더지 잡기 게임

이 책에서 만드는 마지막 게임은 두더지 잡기 게임이다. 두더지들이 실시간으로 무작위로 튀어나오고, 사용자는 정해진 시간 안에 두더지를 클릭해야 한다. 가끔 두더지 대신 폭탄이 튀어나오는데, 폭탄을 클릭하면 목숨이 하나 줄어든다.
목숨은 3개가 주어지고 목숨이 0개가 되면 게임이 끝난다. 60초 안에 얼마나 많은 두더지를 잡는지 경쟁하는 게임이다.

<img src='./images/14-1.jpg' alt='그림 14-1 두더지 잡기 게임' width='300px'/>

## 14.1 순서도 그리기

<img src='./images/14-2.jpg' alt='그림 14-2 순서도' width='600px'/>

이벤트 리스너와 타이머 등의 비동기 코드가 많이 나오므로 순서를 정확히 지키도록 호출 스택과 이벤트 루프를 생각하며 코딩해야 한다.

HTML 파일을 만들어 다음 코드를 작성한다.

```html
```

두더지 잡기도 언뜻 보면 3 X 3 표의 구조를 띄고 있다. `table`태그 대신해서 `div`태그를 사용했는데, `table` 태그는 원래 용도가 표를 나타내는 것이므로 다양한 화면을 표시하기에는 제약이 있다. 그래서 화면이 복잡해질수록 `div`태그로 구성하는 것이 좋다.

두더지 잡기에서 애니메이션을 자바스크립트로 처리하면 복잡할 뿐만 아니라 성능도 좋지 않다. 코드가 조금 길어지겠지만, HTML과 CSS로 처리하는 것이 좋다. CSS 부분에서 `transition`이 애니메이션 역할을 한다.

또한, 두더지 구멍을 CSS로 표현하려고 `cell`클래스 태그 안에 여러 겹의 `div`를 사용했다. HTML에서는 코드에서 아래에 위치한 태그가 화면상으로는 앞에 오게 된다. 따라서 코드에서는 `.hole`태그(구멍이미지, mole-hole.png)가 맨 앞에 있고, `.hole-front`태그(구멍 바깥쪽 이미지, mole-hole-front.png)가 맨 뒤에 위치한다.

HTML과 CSS를 적절하게 사용하는 것이 좋다. 특히 화면의 배치와 애니메이션은 CSS를 적극적으로 사용하자.

gopher.png, dead_gopher.png, bomb.png, explode.png, mole-hole.png, mole-hole-front.png
6개의 이미지를 내려 받아야 한다. 주소는 <https://raw.githubusercontent.com/ZeroCho/es2021-webgame/master/파일명> 형태이다.

예를 들어 gopher.png를 내려받으려면 <https://raw.githubusercontent.com/ZeroCho/es2021-webgame/master/gopher.png>로 접속하며 된다. 이미지를 마우스 우클릭한 후 이미지를 다른 이름으로 저장하면 된다. 이때 모든 이미지를 작성한 HTML 파일과 동일한 폴더에 저장해야 이미지가 제대로 보인다. 이미지가 안보인다면, 파일 경로를 잘 확인해야 한다.

나 같은 경우 HTML 파일이 있는 폴더 하위에 `images`폴더를 생성하고 이미지 파일들을 넣어두고 HTML 파일에서 경로를 수정하였다.

## 14.2 이미지 움직이기

애니메이션을 CSS로 처리했다. 예를 들어, 폭탄이나 두더지 `div`에 `hidden`클래스를 주면 구멍 아래로 내려가고, `hidden`클래스를 빼면 구멍 위로 올라온다. 따라서 자바스크립트로 태그에 클래스를 넣을지 뺄지만 조작하면 애니메이션은 자동으로 처리된다.

시작 버튼을 누를 때 모든 칸에서 두더지가 나타나게 해 보자. 두더지가 올라오는 애니메이션은 1초 동안 지속한다. 그리고 1초 후에 두더지가 다시 구멍으로 들어가게 한다. 내려가는 애니메이션도 1초 동안 지속한다. 따라서 기본적으로 두더지는 올라왔다 내려가는 데 총 2초가 걸린다.

```js
const $timer = document.querySelector('#timer');
const $score = document.querySelector('#score');
const $game = document.querySelector('#game');
const $start = document.querySelector('#start');
const $$cells = document.querySelectorAll('.cell');

const holes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let started = false;
let score = 0;
$start.addEventListener('click', () => {
  if (started) return; // 이미 시작했으면 무시
  started = true;
  console.log('시작');
  tick();
});
function tick() {
  holes.forEach((hole, index) => {
    const $gopher = $$cells[index].querySelector('.gopher');
    holes[index] = setTimeout(() => { // 1초 뒤에 사라짐
      $gopher.classList.add('hidden');
      holes[index] = 0;
    }, 1000);
    $gopher.classList.remove('hidden');
  });
}
```

먼저 9개 구멍에 대한 정보를 담당할 `holes`배열을 선언한다. 그리고 `#start`버튼을 누를 때 작동할 이벤트 리스너를 연결한다. 이벤트 리스너가 한 번만 작동하도록 `started`변수를 만들어서 관리한다.

버튼을 클릭하면 `tick`함수가 호출된다. `tick`함수는 비어 있는 칸에 두더지나 폭탄을 보여 준다. `tick`함수에서는 `holes`배열로 반복문을 돌며 각 칸의 두더지 이미지 태그에 `hidden`클래스를 제거하여 구멍에서 올라오게 하고 1초 뒤에 `hidden`클래스를 다시 추가해 두더지가 구멍으로 들어가게 한다.

`holes`배열에는 각 타이머의 아이디를 저장해 나중에 타이머를 취소할 때 사용한다. 타이머가 등록되어 있으면 0이 아닌 값이 배열에 기록되고, 타이머가 없으면 0이 들어 있으므로 각 칸에 두더지가 있는지 없는지를 구분할 수 있다.

이번에는 반복적으로 두더지가 올라왔다가 내려가게 해보자.

```js
$start.addEventListener('click', () => {
  if (started) return; // 이미 시작했으면 무시
  started = true;
  console.log('시작');
  const tickId = setInterval(tick, 1000);
  tick();
});
```

1초마다 `tick`함수를 반복 호출하게 수정하였다. 매초 `tick`함수는 비어 있는 칸을 찾아 두더지를 보여 준다.

<img src='./images/14-3.gif' alt='그림 14-3 두더지가 나타난 모습' width='300px'/>

두더지가 한번 올라왔다 내려간 뒤로는 다시 올라오지 않는다. `tick`함수에서 동시에 여러 개의 타이머가 실행되어 문제가 발생한다.

이벤트 루프로 한번 분석해 보자. 9개 구멍에서 발생하는 이벤트를 모두 분석하면 복잡하니 하나의 구멍만 분석한다. 각각의 이벤트가 서로 영향을 미치지 않는다면 굳이 전부 분석할 필요는 없다.

다음 그림은 1초가 지나서 첫 번째 `tick`함수가 실행되는 상황이다. `tick`함수 내부에서 `forEach`메서드가 실행되고 그 안에서 다시 `hidden`클래스를 제거하는 `remove`메서드가 실행된다. `hidden`클래스가 제거됐으므로 두더지가 구멍에서 올라온다.

<img src='./images/14-4.jpg' alt='그림 14-4 1초 후 상황' width='500px'/>

백그라운드에는 매초 `tick`을 호출하는 `setInterval`과 첫 번째 `tick`에서 등록한 타이머가 들어 있다.

여기서 다시 1초가 지나면(전체적으로 2초가 지난 상황) 백그라운드에 있던 타이머들이 태스크 큐로 넘어간다. 인터벌이 1초 타이머보다 더 먼저 등록됐으므로 인터벌의 콜백 함수인 `tick`이 태스크 큐에 먼저 들어간다.

<img src='./images/14-5.jpg' alt='그림 14-5 2초 후 상황' width='500px'/>

`tick`함수에서는 이전과 마찬가지로 `hidden`클래스를 제거하는데, 그 후에 실행되는 1초 타이머의 콜백 함수에서 다시 `hidden`클래스를 추가한다. 그래서 `hidden`클래스가 사라지지 않고 계속 남아 있게 된다.

이 상황이 매초 반복된다. `tick`함수와 1초 타이머가 연이어 실행되는데, `tick`함수에서 `hidden`클래스를 없애자마자 1초 타이머에서 `hidden`클래스를 추가해 버린다. 그래서 한번 구멍 속으로 들어간 두더지는 다시 구멍 위로 올라오지 않게 되는 것이다.

`hidden`클래스가 자꾸 추가되어 두더지가 올라오지 않으므로 `hidden`클래스를 추가하는 1초 타이머를 실행하지 않으면 된다. 따라서 코드를 다음과 같이 수정하면 두더지가 다시 올라온다.

```js
function tick() {
  holes.forEach((hole, index) => {
    if (hole) return; // 무언가 일어나고 있으면 return
    const $gopher = $$cells[index].querySelector('.gopher');
    holes[index] = setTimeout(() => { // 1초 뒤에 사라짐
      $gopher.classList.add('hidden');
      holes[index] = 0;
    }, 1000);
    $gopher.classList.remove('hidden');
  });
}
```

`holes`배열 안에 값이 있으면 두더지가 보이는 상황이므로 이때는 타이머를 추가하지 않는다.

이번에는 반대로 두더지 대신 폭탄이 나오게 해보자.

```js
function tick() {
  holes.forEach((hole, index) => {
    if (hole) return; // 무언가 일어나고 있으면 return
    const $bomb = $$cells[index].querySelector('.bomb');
    holes[index] = setTimeout(() => { // 1초 뒤에 사라짐
      $bomb.classList.add('hidden');
      holes[index] = 0;
    }, 1000);
    $bomb.classList.remove('hidden');
  });
}
```

`$gopher`에서 `$bomb`로만 바뀌었다. 이렇게 하면 모든 칸에 폭탄이 올라간다.

