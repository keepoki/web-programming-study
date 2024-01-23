/* 
    클래스의 getter, setter만으로는 private 접근 제어가 불가능
    ES2022에 추가된 기능으로 변수의 이름에 #을 붙혀서 private 접근 제어자를 사용할 수 있다.
 */
{
  class Fruit {
    #dd = 'zzz';
    get name() {
      return `Like a ${this._name}`;
    }
    set name(newName) {
      this._name = newName;
    }

    get dd() {
      return this.#dd;
    }
  }
  
  const fruit = new Fruit();
  // set을 무시하고 _name 프로퍼티에 접근해서 값을 변경할 수 있다.
  fruit._name = 'public fruit'; 

  console.log(fruit.name); // Like a public fruit
  console.log(fruit.dd); // zzz
  
  console.log('--------------------------------');
}


/*
  ES5 이하의 버전에서는 팩토리 함수를 이용하여 접근 제어를 할 수 있다.
 */
{
  function FruitFunc(newName = 'fruit') {
    let name = newName;
    const getName = () => name;
    const setName = (newName) => { name = newName };
    return {
      setName,
      getName
    }
  }

  const fruit2 = FruitFunc('apple');
  console.log(fruit2.getName()); // apple

  fruit2.setName('banana');
  console.log(fruit2.getName()); // banana

  const fruit3 = FruitFunc('orange');
  console.log(fruit3.getName()); // orange
}