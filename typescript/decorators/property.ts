/*
  프로퍼티 데코레이터 (Property Decorators)
  프로퍼티 데코레이터는 프로퍼티 선언 바로 전에 선언된다. 
  프로퍼티 데코레이터는 선언 파일이나 다른 주변 컨텍스트에서 사용할 수 없다.
  
  프로퍼티 데코레이터의 표현 식은 런타임에 다음 두 개의 인수와 함께 함수로 호출된다.
  function propertyDecorator(target: any, propertyKey: string) {}
  1. 정적 멤버에 대한 클래스의 생성자 함수 또는 인스턴스 멤버에 대한 클래스의 프로토타입
  2. 멤버의 이름
  리턴 값으로는 Property Descriptor 또는 void 이다.
 */
namespace PropertyDecorators {
  function readOnlyDecoratorFactory (obj: { className:string, type: string, id?: string}) {
    obj.id = `${obj.className}_${Math.random().toString(36).substring(2, 11)}`;
    return readOnlyPropertyDecorator.bind(obj); // 데이터를 this 바인딩으로 넘겨준다.
  }
  function readOnlyPropertyDecorator (target: any, propertyKey: string): any {
    if (!this || !this.className ) return;

    console.log(target); // {}
    console.log(propertyKey); // unique
    
    // Object property readOnly
    for (const key in this) {
      Object.defineProperty(this, key, {
        writable: false,
      });
    }

    target[propertyKey] = this;

    Object.defineProperty(target, propertyKey, {
      writable: false,
    });
  }
  
  class Koala {
    @readOnlyDecoratorFactory({ className: 'Koala', type: 'cute' })
    public unique; 

    // 프로퍼티 선언 직전에 데코레이터가 먼저 선언되어 read only로 변한 뒤라서 초기화 불가능
    // @readOnly({ className: 'Koala', type: 'test' })
    // public readData = { className: 'Good', type: 'ReadOnly' }; // error, Cannot assign to read only property 'readData' of object '#<Koala>'
    
    public name: string;
    public readonly readonlyData = { aa: 'aa' };

    constructor(name: string) {
      this.name = name;
    }
  }

  const koala = new Koala('Sis');
  // 클래스 인스턴스 객체에 프로퍼티 데코레이터를 거친 데이터는 표현되지 않는 것을 확인할 수 있었다.
  console.log(koala); // Koala { readonlyData: { aa: 'aa' }, name: 'Sis' }

  console.log(koala.unique); // { className: 'Koala', type: 'cute', id: 'Koala_68wmfokgs' }
  koala.unique = 'none'; // readonly로 인해서 변하지 않음
  koala.unique.id = 1004; // Object property readOnly로 인해서 변하지 않음
  console.log(koala.unique); // { className: 'Koala', type: 'cute', id: 'Koala_68wmfokgs' }

  /*
    - Console Log -
    {}
    unique
    Koala { readonlyData: { aa: 'aa' }, name: 'Sis' }
    { className: 'Koala', type: 'cute', id: 'Koala_k1zhp7jf2' }
    { className: 'Koala', type: 'cute', id: 'Koala_k1zhp7jf2' }
   */

  /*
    this 바인딩을 통해 데이터를 넘겨주지 않았을 경우에 데코레이터의 this는 아래와 같았다.
    <ref *1> Object [global] {
        global: [Circular *1],
        clearInterval: [Function: clearInterval],
        clearTimeout: [Function: clearTimeout],
        setInterval: [Function: setInterval],
        setTimeout: [Function: setTimeout] {
          [Symbol(nodejs.util.promisify.custom)]: [Getter]
        },
        queueMicrotask: [Function: queueMicrotask],
        clearImmediate: [Function: clearImmediate],
        setImmediate: [Function: setImmediate] {
          [Symbol(nodejs.util.promisify.custom)]: [Getter]
        }
      }
   */
}
