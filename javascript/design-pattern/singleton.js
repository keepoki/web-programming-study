/*
  싱글턴 패턴(Singleton pattern)
  https://ko.wikipedia.org/wiki/%EC%8B%B1%EA%B8%80%ED%84%B4_%ED%8C%A8%ED%84%B4
  생성자가 여러 차례 호출되더라도 실제로 생성되는 객체는 하나이고 
  최초 생성 이후에 호출된 생성자는 최초의 생성자가 생성한 객체를 리턴한다.
 */
{
  // ES6에서 추가된 클래스 문법으로 싱글턴 패턴을 알아보자.
  class Singleton {
    name = null;

    constructor() {
      if (!Singleton.instance) {
        Singleton.instance = this;
      }
      return Singleton.instance;
    }

    printName() {
      console.log(this.name);
    }
  }

  const singleton1 = new Singleton();
  singleton1.name = 'singleton1';
  const singleton2 = new Singleton();
  singleton2.name = 'singleton2';

  singleton1.printName(); // singleton2
  singleton2.printName(); // singleton2
  console.log(singleton1 === singleton2); // true
  console.log('----------------------------------');
}

/*
  ES5 버전에서는 생성자 함수를 사용한다.
  instance 변수가 상위 컨텍스트에 존재해야 상태가 유지된다.
 */
{
  let instance;

  function Singleton() {
    this.name = null;

    if (!instance) {
      instance = this;
    }
    return instance;
  }

  Singleton.prototype.printName = function () {
    console.log(this.name);
  }

  const singleton1 = new Singleton();
  const singleton2 = new Singleton();

  singleton1.name = 'singleton1';
  singleton2.name = 'singleton2';

  singleton1.printName(); // singleton2
  singleton2.printName(); // singleton2
  console.log(singleton1 === singleton2); // true
  console.log('----------------------------------');
}

/* 
  이번에는 클로저를 이용하여 instance 변수에 접근하는 방식으로 작성해보자.
 */
{
  const Singleton = (function () {
    let instance;

    function createInstance() {
      return {
        name: null,
        printName: function () {
          console.log(this.name);
        }
      }
    }

    return {
      getInstance: function () {
        if (!instance) {
          instance = createInstance();
        }
        return instance;
      }
    }
  })();

  const singleton1 = Singleton.getInstance();
  const singleton2 = Singleton.getInstance();

  singleton1.name = 'singleton1';
  singleton2.name = 'singleton2';
  
  singleton1.printName(); // singleton2
  singleton2.printName(); // singleton2
  console.log(singleton1 === singleton2);
  console.log('----------------------------------');
}