namespace UtilNumber {
  console.log(floor(0.2193545, 2)); // 0.21

  function toFixedNum(num: number, fixed: number, mathFunc: Function): number | undefined {
    if (num == 0) { 
      return 0;
    } else if (num == null || fixed == null) {
      return undefined;
    }
  
    let cuttingNumber = 1;
    for (let i = 0; i < fixed; i++) {
      cuttingNumber *= 10;
    }
  
    return mathFunc(num * cuttingNumber) / cuttingNumber;
  }
  
  /** 소수점 자릿수 내림 */
  export function floor(num: number, fixed: number): number | undefined {
    return toFixedNum(num, fixed, Math.floor);
  }
  
  /** 소수점 자릿수 올림 */
  export function ceil(num: number, fixed: number): number | undefined {
    return toFixedNum(num, fixed, Math.ceil);
  }
  
  /** 소숫점 자릿수 반올림 */
  export function round(num: number, fixed: number): number | undefined {
    return toFixedNum(num, fixed, Math.round);
  }
  
  /** 랜덤한 정수를 리턴 */
  export function randomInt(min: number, max: number) {
    return Number((Math.random() * (max - min) + min).toFixed(0));
  }
  
  /** 랜덤한 정수 배열을 리턴 */
  export function randomIntArray(min: number, max: number, length: number) {
    const result = [];
    for (let i = 0; i < length; i++) {
      const num = Number((Math.random() * (max - min) + min).toFixed(0));
      result.push(num);
    }
    return result;
  }
}