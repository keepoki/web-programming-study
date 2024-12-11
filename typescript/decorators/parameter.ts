/*
  매개변수 데코레이터 (Parameter Decorators)
  매개변수 데코레이터는 매개 변수 선언 직전에 선언된다.
  매개변수 데코레이터는 클래스 생성자 또는 메서드 선선의 함수에 적용된다.
  매개변수 데코레이터는 선언 파일, 오버로드 또는 다른 주변 컨텍스트에서 사용할 수 없다.
  
  매개변수 데코레이터의 표현식은 런타임시 다음 세 개의 인수와 함께 함수로 호출된다.
  function parameterDecorator(target: any, methodName: string, parameterIndex: number)
 */
namespace ParameterDecorators {
  function parameterDecorator(target: any, methodName: string, parameterIndex: number) {
    console.log(target);
    console.log(methodName);
    console.log(parameterIndex);
    console.log(target[methodName]);
    target[methodName]('decorator user', 'decorator message'); // 메서드 호출
  }

  class LetterBox {    
    send(receivingUser: string, @parameterDecorator message: string) {
      console.log('receivingUser:', receivingUser);
      console.log('message:', message);
    }
  }

  const letterBox = new LetterBox();
  letterBox.send('john', 'hello john');

  /*
    Console Log
    {}
    send
    1
    [Function: send]
    receivingUser: decorator user
    message: decorator message
    receivingUser: john
    message: hello john
   */
}
