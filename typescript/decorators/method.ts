/*
  메서드 데코레이터 (Method Decorators)
  메서드 데코레이터는 메서드 선언 직전에 선언된다.
  데코레이터는 메서드의 프로퍼티 설명자(Property Descriptor)에 적용되며 메서드 정의를 관찰, 수정 또는 대체하는 데 사용할 수 있다.
  
  메서드 데코레이터의 표현식은 런타임에 다음 세 개의 인수와 함께 함수로 호출 된다.
  function decorator(target: any, propertyKey?: string, descriptor?: PropertyDescriptor)
  1. 정적 멤버에 대한 클래스의 생성자 함수 또는 인스턴스 멤버에 대한 클래스의 프로토타입
  2. 멤버의 이름
  3. 멤버의 프로퍼티 설명자
  여기서 '멤버'란 메서드 또는 프로퍼티를 말한다.
  
  descriptor 매개변수는 ES5부터 지원하는 Object.defineProperty()를 참고
  https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
 */
namespace MethodDecorators {
  function methodCallDecorator() {
    console.log('1. methodCallDecorator');
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      console.log('2.', target);
      console.log('3.', descriptor.value);
      
      // descriptor.value는 메서드를 가리킨다.
      const originalMethod: Function = descriptor.value;

      // 기존 메서드의 기능을 바꾼다.
      descriptor.value = function (...args: any[]) {
        const returnData = originalMethod.apply(this, args);
        console.log(`5. original method return: ${JSON.stringify(returnData)}`);
        console.log(`6. Change the ${propertyKey}`);
        // 어떤 경우에도 0을 리턴 시킨다.
        return 0; 
      };
    };
  }
  class Vector {
    private positionX: number;
    private positionY: number;
    private positionZ: number;

    constructor(positionX: number, positionY: number, positionZ:number) {
      this.positionX = positionX;
      this.positionY = positionY;
      this.positionZ = positionZ;
    }

    @methodCallDecorator()
    getPosition() {
      console.log('4. getPosition call');
      return { 
        positionX: this.positionX, 
        positionY: this.positionY, 
        positionZ: this.positionZ,
      };
    }
  }

  const vector = new Vector(4, 4, 1);
  // position에 대한 데이터가 아닌 0이 리턴된다.
  console.log('7.', vector.getPosition()); 

  /*
    - Console Log -
    1. methodCallDecorator
    2. {}
    3. [Function: getPosition]
    4. getPosition call
    5. original method return: {"positionX":4,"positionY":4,"positionZ":1}
    6. Change the getPosition
    7. 0
   */
}
