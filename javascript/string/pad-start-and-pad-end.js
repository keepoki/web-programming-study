{
  /**
   * 설정한 자리 수까지 부족한 문자열을 채워주는 함수가 있다.
   * String.prototype.padStart(maxLength:number, fillString?:string)는 앞에서 채워주고
   * String.prototype.padEnd(maxLength:number, fillString?:string)는 뒤에서 채워준다
   *
   * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
   * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd
   */
  const string01 = 'hello';

  console.log(string01.padStart(10, '*')); // ********hello
  console.log(string01.padEnd(10, '*')); // hello********

  // 숫자를 3자리로 고정하고 싶다면? (이미지 같은 리소스의 이름을 001.png 방식으로 사용할 때 유용하다.)
  const number01 = 1;
  const number02 = 10;
  const number03 = 100;

  // 숫자를 문자열로 변환한 후 padStart를 사용한다
  console.log(number01.toString().padStart(3, '0')); // 001
  console.log(number02.toString().padStart(3, '0')); // 010
  console.log(number03.toString().padStart(3, '0')); // 100

  console.log(`${number01.toString().padStart(3, '0')}.png`); // 001.png
  console.log(`${number02.toString().padStart(3, '0')}.png`); // 010.png
  console.log(`${number03.toString().padStart(3, '0')}.png`); // 100.png
}
