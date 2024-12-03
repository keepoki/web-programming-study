{
  /*
    async function
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
    await
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
    
    async 키워드를 사용한 함수는 Promise를 리턴한다.
    await 키워드는 Promise의 이행 또는 거부를 기다린다.
    Promise에서 이행, 거부를 기다리지 않는다면, 일반 함수와 똑같이 동작한다. 
    따라서 Promise를 리턴하는 함수라도 내부 로직에 지연이 발생하지 않는다면, 
    순차적으로 실행된다.
  */

  async function a() {
    console.log('a start');

    // 지연되는 로직이 없는 Promise는 즉각 실행되고 결과를 바로 내뱉는다.
    console.log('a promise start');
    new Promise(r => {
      console.log('a promise done');
      r(true);
    })

    // await 키워드를 사용하여 Promise의 이행 또는 거부의 결과를 기다린다.
    console.log('a setTimeout promise start');
    await new Promise(r => {
      setTimeout(() => {
        console.log('a setTimeout promise done');
        r(true);
      }, 10);
    })

    let i = 0, a = '';
    for (; i < 5000000;) {
      i++;
      a += i.toString();
    }
    console.log('a done');
  }

  async function b() {
    // new Promise로 감싸더라도 바로 이행하므로 c 함수와 같다.
    new Promise(r => {
      let i = 0, a = '';
      console.log('b start');
      for (; i < 5000000;) {
        i++;
        a += i.toString();
      }
      console.log('b done');
      r(true);
    })
  }

  async function c() {
    let i = 0, a = '';
    console.log('c start');
    for (; i < 5000000;) {
      i++;
      a += i.toString();
    }
    console.log('c done');
  }

  async function start() {
    // a();
    // b();
    // c();

    // await 키워드를 사용하지 않아 위의 일반적인 함수 호출과 다르지 않다.
    console.log('start()');
    Promise.all([a(), b(), c()]);
    console.log('start done');
  }

  async function awaitStart() {
    console.log('await start');
    await Promise.all([a(), b(), c()]);
    console.log('await start done');
  }

  // start();
  /*
    start
    a start
    a promise start
    a promise done
    a setTimeout promise start
    b start
    b done
    c start
    c done
    start done                ---- await을 하지 않아서 먼저 호출
    a setTimeout promise done
    a done
  */

  // awaitStart();
  /*
    a start
    a promise start
    a promise done
    a setTimeout promise start
    b start
    b done
    c start
    c done
    a setTimeout promise done
    a done
    await start done          ---- await으로 Promise all을 기다려서 나중에 호출
  */

  // Promise의 then과 catch 또한 await으로 해당 함수의 리턴을 기다릴 수 있다.
  async function awaitPromise(bool) {
    console.log(`awaitPromise(${bool}) start`);

    await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (bool === true) {
          resolve('resolved');
        } else {
          reject('rejected');
        }
      }, 50);
    }).then(val => {
      console.log(val);
    }).catch(err => {
      console.log(err);
    })
    console.log('awaitPromise done');
  }

  // awaitPromise(true);
  // awaitPromise();
  /*
    awaitPromise(true) start
    awaitPromise(undefined) start
    resolved
    awaitPromise done
    rejected
    awaitPromise done
  */

  function sendEmail(userEmail) {
    return new Promise(async (resolve, reject) => {
      setTimeout(() => {
        resolve(`Email Sent to ${userEmail}`);
      }, 3000);
    });
  }

  async function sendEmails() {
    const userEmails = ['a1@gmail.com', 'b2@gmail.com', 'c3@gmail.com'];
    const status = await Promise.all(userEmails.map(async email => await sendEmail(email)));
    console.log("Status =>", status);
  }

  sendEmails();
  /*
    Status => [
      'Email Sent to a1@gmail.com',
      'Email Sent to b2@gmail.com',
      'Email Sent to c3@gmail.com'
    ]
   */
}