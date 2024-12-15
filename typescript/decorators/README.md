# 데코레이터 (Decorators)

데코레이터는 클래스 선언, 메서드, 접근자, 프로퍼티 또는 매개변수에 첨부할 수 있는 특수한 종류의 선언이다. 쉽게 말해서 클래스 요소에 선언할 수 있고 런타임에서 요소들의 선언 직전에 실행되는 함수이다.

`@`(at) 기호는 타입스크립트에게 이것이 데코레이터임을 알려주고, 타입스크립트는 클래스 실행 시 플러그인 형태로 실행되게 해준다. 데코레이터를 만드려면 정해진 매개변수 규칙을 준수하여 정의해야 한다.

2023-11-13(월) 기준 데코레이터는 실험적인 기능이다. 하지만 Angular, NestJS에서 쓰고 있다.

데코레이터를 사용하려면 `tsconfig.json`에서 `experimentDecorators` 컴파일러 옵션을 활성화해야 한다.

1. [데코레이터 팩토리 (Decorator Factories)](./factories.ts)
2. [데코레이터 합성 (Decorator Composition)](./composition.ts)
3. [클래스 데코레이터 (Class Decorators)](./class.ts)
4. [메서드 데코레이터 (Method Decorators)](./method.ts)
5. [프로퍼티 데코레이터 (Property Decorators)](./property.ts)
6. [파라미터 데코레이터 (Parameter Decorators)](./parameter.ts)
7. [데코레이터 호출 순서](./call-order.ts)

## 참고 자료
<https://www.typescriptlang.org/ko/docs/handbook/decorators.html>
<https://inpa.tistory.com/entry/TS-%F0%9F%93%98-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%8D%B0%EC%BD%94%EB%A0%88%EC%9D%B4%ED%84%B0-%EA%B0%9C%EB%85%90-%EC%82%AC%EC%9A%A9%EB%B2%95-%EC%A0%95%EB%A6%AC>