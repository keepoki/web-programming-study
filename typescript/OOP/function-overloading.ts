/*
  https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads
  https://www.typescriptlang.org/docs/handbook/declaration-files/by-example.html#overloaded-functions
  https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html#function-overloads
  
  타입스크립트 함수 오버로딩
  자바스크립트나 타입스크립트에서는 같은 이름의 함수를 여러 번 정의할 수 없다.
  함수 선언을 통해 다양한 인수에 대한 개수 및 타입을 지정하여 호출될 수는 있다.
  따라서 하나의 함수에 조건문을 통해 모든 오버 로딩 인수에 대한 기능을 정의해야 한다.
*/
namespace functionOverloading {

  // 기본적인 함수 오버로딩 
  console.log('기본적인 함수 오버로딩');
  function add(a: string, b: string): string;
  function add(a: number, b: number): number;
  function add(a: any, b: any): string | number {
    return a + b;
  }
  console.log(add(123, 321)); // 444
  console.log(add('123', '321')); // 123321

  // 인터페이스 또는 타입을 활용한 함수 오버로딩
  console.log('인터페이스 또는 타입을 활용한 함수 오버로딩');
  interface Dodo {
    (value: number): object;
    (value: string, value2: string): object;
  }

  // const dodo: Dodo = (value: number): object => ({ num: value }); // 에러 발생, 아래와 같이 모든 타입에 대해 처리해야 함
  const dodo: Dodo = (value: any, value2?: any): object => { 
    if (value2) return { value, value2 };
    return { value };
  };

  console.log(dodo(123)); // { value: 123 }
  console.log(dodo("one", "two")); // { value: 'one', value2: 'two' }
  // console.log(dodo(123, "two")); // 컴파일 시점에서 타입이 일치하지 않는다는 에러 발생

  // 콜백을 활용한 함수 오버로딩
  console.log('콜백을 활용한 함수 오버로딩');
  const dodo2: Dodo = (value: number | string, value2: string = 'none'): object => { return { num: value, str: value2 } };
  function dodoOverloading(callback: Dodo, num: number | string, str: string = 'aaa') {
    if (typeof num === 'string') {
      return callback(num, str);
    } else {
      return callback(num);
    }
  }

  console.log(dodoOverloading(dodo2, 'asd')); // { num: 'asd', str: 'aaa' }
  console.log(dodoOverloading(dodo2, 1109, "hello")); // { num: 1109, str: 'none' }
  console.log(dodoOverloading(dodo2, "1109", "hello")); // { num: '1109', str: 'hello' }

  // 타입에 따른 분기 함수를 이용한 오버로딩
  console.log('타입에 따른 분기 함수를 이용한 오버로딩');
  function numberCombine(a: number, b: number): number { return a + b; }
  function stringCombine(a: string, b: string): string { return a + b; }
  function objectCombine(a: object, b: object): object { return Object.assign({ ...a }, b); }

  function combineOverloading(a: number, b: number): number;
  function combineOverloading(a: string, b: string): string;
  function combineOverloading(a: object, b: object): object;
  function combineOverloading(a: any, b: any): any {
      if (typeof a === 'number') {
        return numberCombine(a, b);
      } else if (typeof a === 'string') { 
        return stringCombine(a, b);
      } else if (typeof a === 'object') {
        return objectCombine(a, b);
      }
  }
  
  console.log(combineOverloading(7, 44)); // numberCombine(a, b) 호출
  console.log(combineOverloading('name is ', 'trevor1107')); // stringCombine(a, b) 호출
  console.log(combineOverloading({ name: '희망' }, { name: '행복', value: 200 })); // objectCombine(a, b) 호출
    
  console.log('----------------------------------------------------------------');
  // ----------------------------------------------------------------
  // 메서드 오버로딩
  class Fruit {
    private _name: string;

    constructor(name = 'fruit') {
      this._name = name;
    }

    set name(name: string) {
      this._name = name;
    }

    get name(): string {
      return this._name;
    }

    fruitMethod(val: number);
    fruitMethod(val: string);
    fruitMethod(val: number, str: string);
    fruitMethod(val, str?): object {
      if (str) {
        return { val, str };
      } else if (['number', 'string'].includes(typeof val)) {
        return { val };
      }
    }
  }

  const fruit = new Fruit();
  console.log(fruit.fruitMethod(0, 'a')); // { val: 0, str: 'a' }
}