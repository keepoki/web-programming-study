{
  /*
  ## JS Promise all, race, allSettled

  https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

  `Promise.all()`는 전달 받은 프로미스 중 하나라도 실패하면 Promise.all은 rejected 상태가 된다. 
  주로 모든 프로미스의 성공에 의미를 두어야 할 때 사용한다.

  `Promise.race()`는 전달 받은 프로미스 중 처리가 가장 빠른 프로미스의 반환 값을 받는다. 
  실패나 성공 중에 빨리 처리 된 것으로 상태를 변경 시킨다. 성공이 먼저 발생하면 오류는 무시된다.
  주로 중복된 서비스에서 더 빠른 서비스를 사용해야 하는 상황에서 유용하다.

  `Promise.allSettled()`는 성공과 실패와 상관 없이 모든 프로미스가 완료될 때 까지 기다린다. 
  완료가 되면 then() 콜백에 인자 값으로 프로미스의 결과 데이터가 배열로 전달되는 데, 
  상태(fulfilled, rejected)와 값을 가지고 있다. 실패의 경우 reason이라는 필드에 오류 원인을 제공한다.
  `[0: { status: 'fulfilled', value: “happy!" }, 1: { status: 'rejected', reason: undefined }]`
  */

  /** Promise.all에서 모든 프로미스가 이행한 경우 */
  function promiseAllSuccess() {
    const promiseA = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('A');
        resolve('A');
      }, 50);
    });
    const promiseB = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('B');
        resolve('B');
      }, 100);
    });
    const promiseC = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('C');
        resolve('C');
      }, 10);
    });

    // 전달 받은 프로미스 중에 하나라도 실패가 발생되면 then으로 호출 되지 않는다.
    Promise.all([promiseA, promiseB, promiseC]).then(val => {
      console.log(val);
      console.log('Promise All');
    }).catch(err => {
      console.error(err);
    });
  }

  // promiseAllSuccess();
  /*
    C
    A
    B
    [ 'A', 'B', 'C' ]
    Promise All
   */

  /** Promise.all에서 거부한 프로미스가 있는 경우 */
  function promiseAllFailed() {
    const promiseA = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('A');
        reject(new Error('rejected A'));
      }, 50);
    });
    const promiseB = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('B');
        resolve('B');
      }, 100);
    });
    const promiseC = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('C');
        resolve('C');
      }, 10);
    });

    // 전달 받은 프로미스 중에 하나라도 실패가 발생되면 then으로 호출 되지 않는다.
    Promise.all([promiseA, promiseB, promiseC]).then(val => {
      console.log(val);
      console.log('Promise All');
    }).catch(err => {
      console.error(err);
    });
  }
  // promiseAllFailed();
  /*
    C
    A
    Error: rejected A
    B
   */ 

  /** Promise.race에서 resolve가 빠른 경우 */
  function promiseRaceSuccess() {
    const promiseA = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('A');
        reject(new Error('rejected A'));
      }, 50);
    });
    const promiseB = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('B');
        resolve('B');
      }, 100);
    });
    const promiseC = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('C');
        resolve('C');
      }, 10);
    });

    // 전달 받은 프로미스 중 처리가 가장 빠른 프로미스의 반환 값을 받는다.
    Promise.race([promiseA, promiseB, promiseC]).then(val => {
      console.log(val);
      console.log('Promise Race');
    }).catch(err => {
      console.error(err);
    });
  }
  // promiseRaceSuccess();
  /*
    C
    C
    Promise Race
    A
    B
  */

  /** Promise.race에서 reject가 빠른 경우 */
  function promiseRaceFailed() {
    const promiseA = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('A');
        reject(new Error('rejected A'));
      }, 10);
    });
    const promiseB = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('B');
        resolve('B');
      }, 100);
    });
    const promiseC = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('C');
        resolve('C');
      }, 50);
    });

    // 전달 받은 프로미스 중 처리가 가장 빠른 프로미스의 반환 값을 받는다.
    Promise.race([promiseA, promiseB, promiseC]).then(val => {
      console.log(val);
      console.log('Promise Race');
    }).catch(err => {
      console.error(err);
    });
  }
  // promiseRaceFailed();
  /*
    A
    Error: rejected A
    C
    B
  */

  function promiseAllSettled() {
    const promiseA = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('A');
        reject(new Error('rejected A'));
      }, 10);
    });
    const promiseB = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('B');
        resolve('B');
      }, 100);
    });
    const promiseC = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('C');
        resolve('C');
      }, 50);
    });

    /*
      성공과 실패와 상관 없이 모든 프로미스가 완료될 때 까지 기다린다.
      완료가 되면 then() 콜백에 인자 값으로 프로미스의 결과 데이터가 배열로 전달된다.
      실패의 경우 reason이라는 필드에 오류 원인을 제공한다.
    */
    Promise.allSettled([promiseA, promiseB, promiseC]).then(val => {
      console.log(val);
      console.log('Promise all settled');
    }).catch(err => {
      console.error(err);
    });
  }
  // promiseAllSettled();
  /*
    A
    C
    B
    [
      {
        status: 'rejected',
        reason: Error: rejected A
            at Timeout._onTimeout (c:\myspace\learn\javascript\promise.js:138:16)
            at listOnTimeout (internal/timers.js:557:17)
            at processTimers (internal/timers.js:500:7)
      },
      { status: 'fulfilled', value: 'B' },
      { status: 'fulfilled', value: 'C' }
    ]
    Promise all settled
  */


  /** Promise.all을 같은 컨텍스트에서 연달아 실행하는 경우에 대한 실험 */
  function promiseContextTest() {
    const promiseA = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('A');
        reject(new Error('rejected A'));
      }, 50);
    });
    const promiseB = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('B');
        resolve('B');
      }, 100);
    });
    const promiseC = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('C');
        resolve('C');
      }, 10);
    });

    const promiseAll = () => {
      Promise.all([promiseA, promiseB, promiseC]).then(val => {
        console.log(val);
        console.log('Interval promise all');
      }).catch(err => {
        console.error(err);
      });
    }

    promiseAll();
    promiseAll();
    promiseAll();

    setTimeout(() => {
      promiseAll();
    }, 500);
  }

  promiseContextTest();

  /*
    C
    A
    Error: rejected A
    Error: rejected A
    Error: rejected A
    B
    Error: rejected A
  */

  /* 
    Promise.all을 여러 번 호출해도 전달 받은 프로미스 함수는 한 번만 수행하는 것을 알 수 있다.
    프로미스 함수의 결과 값은 Promise.all를 호출한 만큼 전달 받는 것을 알 수 있다.
    setTimeout으로 모든 프로미스의 실행 시간을 마친 후에도 
    같은 컨텍스트에 존재하는 Promise의 함수는 다시 실행되지 않고 
    상태 값과 리턴 값이 유지되는 것을 알 수 있다.
  */
}