/*
  데코레이터 팩토리 (Decorator Factories)
  데코레이터 팩토리는 데코레이터 함수를 감싸는 래퍼 함수이다.
  데코레이터가 선언에 적용되는 방식을 원하는 대로 바꾸고 싶을 때 사용한다.
  @Decorator("decorator")같이 인자를 받아서 사용하는 방식이다.
 */
namespace DecoratorFactories{
  function subscribe(key: string) {
    console.log(`key: ${key}, 구독자 발생!`);
    return function (target: any) {
      console.log(`Key: ${key}, 구독자: ${target}`);
    };
  }

  @subscribe("class")
  class Cat {}

  @subscribe("class")
  class Dog {}

  /*
    - Console log - 
    key: class, 구독자 발생!
    key: class, 구독자: class Cat {
        }
    key: class, 구독자 발생!
    key: class, 구독자: class Dog {
        }
   */
}
