/*
  클래스 데코레이터 (Class Decorators)
  클래스 데코레이터는 클래스 선언 직전에 선언된다. 클래스 데코레이터는 클래스 생성자에 적용되며
  클래스 정의를 관찰, 수정 또는 교체하는 데 사용할 수 있다.
  
  클래스 데코레이터 매개변수로는 클래스 생성자 자체를 받게 되는 특징이 있다.
  function reportableClassDecorator<T extends { new (...args: any[]): {} }>(constructor: T)
  리턴 값으로는 class 또는 void 이다.
  
  클래스 데코레이터에서 추가한 데이터에 접근하기 위해서는 클래스 내부에 프로퍼티를 추가해 주어야 한다.
 */
namespace ClassDecorators {
  function commonClassDecorators<T extends { new (...args: any[]): {} }>(constructor: T) {
    console.log(constructor); // [class Alpaca]
    return class extends constructor {
      id = Math.random().toString(36).substring(2, 11);
    }
  }

  @commonClassDecorators
  class Alpaca {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }

  const alpaca = new Alpaca('MooMoo');
  console.log(alpaca); // Alpaca { name: 'MooMoo', id: 'ekmuxh71e' }
  // console.log(alpaca.id) // error: 해당 프로퍼티가 정의되지 않아 접근 불가

  /*
    - Console Log -
    [class Alpaca]
    Alpaca { name: 'MooMoo', id: 'ekmuxh71e' }
   */

  // 데코레이터 팩토리를 응용한 클래스 데코레이터
  console.log('--------------------------------------------------------');
  console.log('데코레이터 팩토리를 응용한 클래스 데코레이터');
  function classDecoratorFactory(type: string, id?: string) {
    return function <T extends { new (...args: any[]): {}}>(c: T) {
      return class extends c {
        type = type;
        id = id ? `${id}_${Math.random().toString(36).substring(2, 11)}` : Math.random().toString(36).substring(2, 11);
      }
    }
  }

  @classDecoratorFactory('omnivorousness', 'strong')
  class Pig {
    type: string;
    id: string;
    name: string;

    constructor(name: string) {
      this.name = name;
    }
  }

  const pig = new Pig('GuRu');
  console.log(pig.type); // omnivorousness
  console.log(pig.id); // strong_ps0495b9w // strong을 제외하면 랜덤 값이다.
}
