{
  /* 
    1.부모 프로퍼티를 변수로, 자식 프로퍼티를 get set으로 할 때 동작하는지 확인한다.
    2.get, set에 대한 오버라이딩을 확인한다.
    3.메서드에 대한 오버라이딩을 확인한다. 
   */
  class Car {
    // 1번 부모 프로퍼티 get, set에 대한 테스트
    /** @type string */ 
    engine;

    // 2번 get, set 오버라이딩 테스트
    /** @returns {string} */
    get wheel() {
      return this._wheel;
    }

    /** @param {string} wheel */
    set wheel(wheel) {
      this._wheel = wheel;
    }

    // 3번 메서드 오버라이딩 테스트
    showInfo() {
      console.log(`engine: ${this.engine}`);
      console.log(`wheel: ${this.wheel}`);
    }
  }

  class Porsche extends Car {
    // 1번 테스트, 호출되지 않음, 부모 프로퍼티가 변수로 선언되어 있어서 그렇다. 경고나 에러도 없음
    /** @returns {string} */
    get engine() {
      return `porsche ${this.engine}`;
    }

    // 1번 테스트, 호출되지 않음, get과 같다.
    set engine(engine) {
      console.log('set engine:', engine);
      this.engine = engine;
    }

    // 2번 테스트, 호출됨, 부모 프로퍼티의 형태와 일치하고 오버라이딩에 성공함
    get wheel() {
      return `porsche ${this._wheel}`;
    }

    // 2번 테스트, 호출됨, get과 같다.
    set wheel(wheel) {
      console.log('set wheel:', wheel);
      this._wheel = wheel;
    }

    // 3번 테스트, 오버라이딩 성공
    showInfo() {
      console.log('-- show porsche info --');
      super.showInfo();
    }
  }

  const porsche = new Porsche();

  porsche.engine = 'super-engine';
  porsche.wheel = 'wheel-1';

  porsche.showInfo();
}