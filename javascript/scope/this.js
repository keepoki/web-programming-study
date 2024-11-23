/*
  자바스크립트에서 this는 호출한 주체에 따라 달라진다.
 */
{
  // 클래스 예시
  class ClassA {
    data = 'classA';
  
    printClassA() {
      console.log(this.data);
    }
  }

  class ClassB {
    data = 'classB';
  }
  
  const classA = new ClassA();
  const classB = new ClassB();
  
  classB.print = classA.printClassA;
  classB.print(); // classB

  // 오브젝트 예시
  const a = {
    data: 'a',
    printData() {
      console.log(this.data);
    }
  };

  const b = {
    data: 'b',
  };
  b.print = a.printData;
  b.print(); // b

  // bind 메서드를 통해 this를 고정시킬 수 있다. 인자 또한 고정이 가능하다.
  const c = {
    data: 'c',
  };
  c.print = a.printData.bind(a); // a, bind 함수로 this를 묶을 수 있다.
  c.print();
  c.print.call(b); // a, 이미 bind된 상태의 함수는 변경이되지 않는다.

  const d = {
    data: 'd',
  };
  d.print = a.printData;
  d.print.call(c); // c, bind되지 않은 함수의 this는 언제든 변경할 수 있다.
  d.print.call(a); // a

  // bind된 함수의 인자값은??
  const printBindData = function (arg, arg2) {
    console.log(`data: ${this.data}, arg: ${arg}, arg2: ${arg2}`);
  }

  const e = {
    data: 'e',
  };

  e.print = printBindData.bind(c, 'bindArg');
  e.print.apply(d, ['happy', 'day']); // data: c, arg: bindArg, arg2: happy
  e.print.call(d, 'happy', 'day'); // data: c, arg: bindArg, arg2: happy
  e.print('happy', 'day'); // data: c, arg: bindArg, arg2: happy
  // 바인딩 된 인자는 건너 뛰고, 호출 시 전달 한 인자는 그 다음 매개변수로 전달 된다.
}