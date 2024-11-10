/*
  https://refactoring.guru/ko/design-patterns/adapter
  https://inpa.tistory.com/entry/GOF-%F0%9F%92%A0-%EC%96%B4%EB%8C%91%ED%84%B0Adaptor-%ED%8C%A8%ED%84%B4-%EC%A0%9C%EB%8C%80%EB%A1%9C-%EB%B0%B0%EC%9B%8C%EB%B3%B4%EC%9E%90
  어댑터 패턴(Adapter Pattern)은 이름 그대로 클래스를 어댑터로서 사용되는 
  구조 패턴이다. 어댑터는 우리 주변에도 많이 볼 수 있는 것으로서, 대표적으로 
  110V 전용 가전제품에 220V 어댑터를 끼워 사용하는 걸 들 수 있다.
  호환되지 않는 인터페이스를 가진 객체들이 협업할 수 있도록 하는 구조적 디자인 
  패턴이다.
  
  이를 객체 지향 프로그래밍에 접목해보면, 호환성이 없는 인터페이스 때문에 함께 
  동작할 수 없는 클래스들을 함께 작동해주도록 변환 하는 역할을 해주는 행동 패턴
  이라고 보면 된다.

  예제는 아래 링크를 참조하였다.
  (번역본) https://velog.io/@superlipbalm/how-i-use-adapter-pattern-in-reactjs
  (원본) http://javascript.plainenglish.io/how-i-use-adapter-pattern-in-reactjs-cb331e9bef0c?gi=75398873011f 
 */

namespace AdapterPattern {
  /** 모든 클래스가 사용할 수 있도록 일반화된 방식으로 설계 */
  export class Adapter {
    private static value: unknown;

    static from<Source>(originData: Source) {
      this.value = originData;
      return this;
    }

    static to<Input, Output>(mapperFn: (value: Input) => Output) {
      const transformed = mapperFn(this.value as Input);
      return transformed;
    }
  }

  /** 서버에서 응답하는 데이터를 타입으로 정의 */
  type RawNotification = {
    id: string,
    statusId: number,
    typeId: number,
    message: string,
    createTime: string;
  }

  /** 외부 로직에서 사용할 공지사항에 대한 어댑터 */
  export class NotificationAdapter {
    private value: RawNotification;

    constructor(raw: RawNotification) {
      this.value = raw;
    }

    get statusText() {
      switch (this.value.statusId) {
        case 1:
          return 'Info';
        case 2:
          return 'Success';
        case 3:
          return 'Error';
        default:
          return 'Default';
      }
    }

    get typeText() {
      switch (this.value.typeId) {
        case 1: 
          return 'Important';
        case 2:
          return 'Normal';
        default: 
          return 'Default';
      }
    }

    get createDateFormatted() {
      return new Date(this.value.createTime).toLocaleString();
    }

    /** 서버 데이터 파싱을 통해 매핑해준다. */
    adapt() {
      return {
        id: this.value.id,
        message: this.value.message,
        statusText: this.statusText,
        typeText: this.typeText,
        createdDate: this.createDateFormatted,
      }
    }
  }

  async function getNotification() {
    const rawData = Promise.resolve({
      id: "abc-zxy",
      statusId: 2,
      typeId: 3,
      message: "This is a adapter pattern",
      createTime: "2024-06-18T01:50:29.000Z"
    });

    // const resData: RawNotification = await fetch('./response.json').then(response => response.json());
    const resData = await rawData as RawNotification;
    return Adapter.from(resData).to((item) => new NotificationAdapter(resData).adapt());
  }

  async function main() {
    const d = await getNotification();
    console.log(d);
  }

  // 함수 실행
  main();

  /*
  {
    id: 'abc-zxy',
    message: 'This is a adapter pattern',
    statusText: 'Success',
    typeText: 'Default',
    createdDate: '2024. 6. 18. 오전 10:50:29'
  }
  */
}