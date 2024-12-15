/*
  데코레이터 호출 순서를 확인해보자.
 */
namespace DecoratorCallOrder {
  function classDecorator() {
    console.log('class'); // 7
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
      console.log('class decorator'); // 8
      return class extends constructor { };
    };
  }

  function methodDecorator() {
    console.log('method'); // 3
    return function (target: any, property: any, descriptor: any) {
      console.log('method decorator'); // 6
    };
  }

  function propertyDecorator(writable: boolean = true) {
    console.log('property'); // 1
    return function (target: any, decoratedPropertyName: any): any { 
      console.log('property decorator'); // 2
    };
  }

  function parameterDecorator() {
    console.log('parameter'); // 4
    return function (target: any, methodName: string, paramIdx: number) { 
      console.log('parameter decorator'); // 5
    };
  }

  @classDecorator() // 표현 4
  class Lion {
    @propertyDecorator() // 표현 1
    property = 'property';

    @methodDecorator() // 표현 2
    attack(@parameterDecorator() power: number) { // 표현 3
    }
  }

  /*
    - Console Log -
    property
    property decorator
    method
    parameter
    parameter decorator
    method decorator
    class
    class decorator
    
    데코레이터 표현의 경우 아래 순서와 같다.
    property -> method -> parameter -> class
    데코레이터 결과는 아래 순서와 같다.
    property -> parameter -> method -> class
   */
}
