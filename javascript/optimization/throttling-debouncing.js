/*
  쓰로틀링(throttling)
  함수가 실행되는 동안 다시 호출되지 않도록 하는 기술이다. 
  성능 최적화, 실행 횟수에 제한을 둘 때 사용한다.
  검색 자동완성 기능에서 주로 사용한다.
  Lodash, Underscore 라이브러리에서 해당 기능을 제공해준다.
 */
{
  /** @type {number} */
  let throttleTimer = null;

  /**
   * @param {Function} func 
   * @param {number} time 
   */
  function throttle(func, time = 200) {
    if (!throttleTimer) {
      throttleTimer = setTimeout(() => {
        func();
        throttleTimer = null;
      }, time);
    }
  }

  throttle(() => console.log('throttle 1')); // 호출 됨
  throttle(() => console.log('throttle 2'));
  throttle(() => console.log('throttle 3'));
}

/*
  디바운싱(debouncing)
  연이어 호출되는 함수들 중에 마지막 또는 첫 번째 함수만 호출 되도록 하는 기술이다.
  중복 처리 방지를 위해 좋아요 토글 버튼 등 클릭 이벤트에 주로 사용한다.
  Lodash, Underscore 라이브러리에서 해당 기능을 제공해준다.
 */
{
  /** @type {number}  */
  let debounceTimer = null;
  
  /**
   * 연이어 호출되는 함수들 중에 마지막 함수만 호출한다.
   * @param {Function} func 
   * @param {number} time 
   */
  function debounce(func, time = 200) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      func();
    }, time);
  }

  debounce(() => console.log('debounce 1'));
  debounce(() => console.log('debounce 2'));
  debounce(() => console.log('debounce 3')); // 호출 됨

  /**
   * 연이어 호출되는 함수들 중에 첫 번째 함수만 호출한다.
   * @param {Function} func 
   * @param {number} time 
   * @returns 
   */
  function debounceFirstCall(func, time = 200) {
    if (!debounceTimer) {
      func();
    }

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      debounceTimer = null;
    }, time);  
  }

  debounceTimer = null;

  debounceFirstCall(() => console.log('debounceFirstCall 1')); // 호출 됨
  debounceFirstCall(() => console.log('debounceFirstCall 2'));
  debounceFirstCall(() => console.log('debounceFirstCall 3'));
}


// 클로저를 이용해서 더 유연한 방법으로 사용할 수 있다.
{
  /**
   * @param {Function} func 
   * @param {number} time 
   * @returns 
   */
  function debounceCloser(func, time = 200) {
    let timer = null;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, time);
    }
  }

  /**
   * @param {*} str 
   * @returns {string}
   */
  function print(str) {
    console.log(str);
  }

  // 화살표 함수를 인수로 전달함으로써 똑같은 결과를 나타내는 방법
  const printCat =  debounceCloser(() => print('Cat'));
  printCat(); // 디바운스로 호출되지 않음
  printCat('what?'); // Cat

  // 호출 함수의 인수를 자유롭게 전달할 수 있는 방법 
  const printFunc = debounceCloser(print);
  printFunc('Dog'); // 디바운스로 호출되지 않음
  printFunc('Lion'); // Lion
}