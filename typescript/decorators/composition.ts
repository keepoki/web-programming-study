/* 
  데코레이터 합성 (Decorator Composition) 
  1. 각 데코레이터의 표현은 위에서 아래로 평가된다.
  2. 그런 다음 결과는 아래에서 위로 함수로 호출된다.
 */
namespace DecoratorComposition {
  function addClass(key: string) {
    // 실행 순서 2. 표현에 대한 평가
    console.log(`Add 표현에 대한 평가, ${key} 클래스 추가`);
    return function (target: any) {
      // 실행 순서 3. 함수 호출
      console.log(`Add 데코레이터 함수 호출, ${target}`);
    };
  }

  function removeClass(key: string) {
    // 실행 순서 1. 표현에 대한 평가
    console.log(`Remove 표현에 대한 평가, ${key} 클래스 제거`);
    return function (target: any) {
      // 실행 순서 4. 데코레이터 함수 호출
      console.log(`Remove 데코레이터 함수 호출, ${target}`);
    };
  }

  @removeClass("Fox") // 1 -> 4
  @addClass("Fox") // 2 -> 3
  class Fox {}

  /*
    - Console Log - 
    Remove 표현에 대한 평가, Fox 클래스 제거
    Add 표현에 대한 평가, Fox 클래스 추가
    Add 데코레이터 함수 호출, class Fox {}
    Remove 데코레이터 함수 호출, class Fox {}
   */
}
