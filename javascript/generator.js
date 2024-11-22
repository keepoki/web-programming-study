/*
  generator
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator
  Generator 개체는 Generator 함수에 의해 반환되며 반복 가능한 프로토콜과 반복자 프로토콜 모두를 준수한다.
 */
{
  function* count() {
    yield 1;
    yield 2;
    yield 3;
  }

  const countGen = count(); // Generator를 리턴

  // console.log(generator.next().value);
  // console.log(generator.next());
  // console.log(generator.next());
  // console.log(generator.next());

  /*
    1
    { value: 2, done: false }
    { value: 3, done: false }
    { value: undefined, done: true }
   */

  function* AToZ() {
    const start = 'A'.charCodeAt();
    const end = 'Z'.charCodeAt();
    let char = start;

    while (true) {
      if (char > end) {
        char = start;
      }
      yield String.fromCharCode(char++);
    }
  }

  const aTozGen = AToZ();
  let azArray = [];
  const length = Math.abs('Z'.charCodeAt() - 'A'.charCodeAt() + 1) * 2;
  for (let i = 0; i < length; i++) {
    azArray.push(aTozGen.next().value);
  }

  console.log(azArray);

  /*
    [
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
      'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
      'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
      'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F',
      'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
      'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
      'W', 'X', 'Y', 'Z'
    ]
  */
}