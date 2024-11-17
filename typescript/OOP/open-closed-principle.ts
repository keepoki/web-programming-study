/* 
  https://ko.wikipedia.org/wiki/%EA%B0%9C%EB%B0%A9-%ED%8F%90%EC%87%84_%EC%9B%90%EC%B9%99
  객체지향 설계 5대 원칙(SOLID)에서 O에 해당하는 개방-폐쇄 원칙(Open-Closed Principle)에 대해 알아본다.
*/
namespace OpenClosedPrinciple {
  class Animal {
    name: string;

    attack() {
      console.log(this.name, 'Attack!!');
    };
  }

  class Dog extends Animal {
    constructor() {
      super();
      this.name = 'Dog';
    }

    attack() {
      return new Promise((resolve, reject) => {
        super.attack();
        resolve(true);
      })
    }
  }

  class Bird extends Animal {
    constructor() {
      super();
      this.name = 'Bird';
    }

    attack() {
      super.attack();
    }
  }

  class AnimalAttacker {
    animal: Animal;

    constructor(animal: Animal) {
      this.animal = animal;
    }

    attack() {
      this.animal.attack();
    }
  }

  const dog = new Dog();
  const bird = new Bird();

  const dogAttacker = new AnimalAttacker(dog);
  const birdAttacker = new AnimalAttacker(bird);

  dogAttacker.attack();
  birdAttacker.attack();
}