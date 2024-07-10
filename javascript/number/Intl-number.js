/*
  Intl
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
  여러 나라 또는 지역의 언어로 서비스하기 위해 프로그램을 설계하고 구현하는 과정을
  국제화(Internalization, i18n)이라고 한다.
  Intl(International) 네임 스페이스 객체에는 여러 생성자뿐만 아니라 국제화 생성자 및
  기타 언어에 민감한 함수의 공통적인 함수가 포함되어 있다.
  이들은 언어에 민감한 문자열 비교, 숫자 서식 지정, 날짜 및 시간 서식 지정 등을 제공하는
  ECMAScript Internationalization API로 구성된다.

  이 중에 사용 빈도가 높다고 생각되는 몇 가지 클래스를 알아보자.
  */

/**
  Intl.NumberFormat
  https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
  나라 또는 지역에 따라 통화(currency), 백분율, 무게, 길이, 속도 등의 숫자 서식을 지정할 수 있다.
  Intl.NumberFormat(locales?, options?) 옵션을 설정하여 다른 출력 결과를 나타낼 수 있다.

  첫 번째 매개변수(locales)를 통해 단위에 대한 구분(콤마)을 지정한다.
 */
{
  console.log('----- NumberFormat -----');
  console.log(Intl.NumberFormat('ko').format(100000)); // 한국 100,000
  console.log(Intl.NumberFormat('ca').format(100000)); // 캐나다 100.000

  /*
    두 번째 매개변수 옵션에 대해 알아보자.
    style과 해당 옵션에 대한 변수의 값을 쌍으로 가지는 경우도 있다.
    style 'currency' 옵션을 사용하려면 currency 변수의 값은 필수로 입력해주어야 한다.
    예) { style: 'currency', currency: 'kilogram' }
    화폐 코드는 ISO 4217를 기준으로 한다.
    https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes
   */
  console.log(
    Intl.NumberFormat('ko', {
      style: 'currency',
      currency: 'KRW',
    }).format(100000),
  ); // ₩100,000

  console.log(
    Intl.NumberFormat('ko', {
      style: 'currency',
      currency: 'USD',
    }).format(100),
  ); // US$100.00

  console.log(
    Intl.NumberFormat('ko', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(10000),
  ); // US$10,000

  console.log(
    Intl.NumberFormat('ko', {
      style: 'unit',
      unit: 'kilogram',
    }).format(1024),
  ); // 1,024kg

  console.log(
    Intl.NumberFormat('ko', {
      style: 'unit',
      unit: 'liter',
    }).format(2048),
  ); // 2,048L

  console.log(
    Intl.NumberFormat('ko', {
      style: 'percent',
    }).format(0.99),
  ); // 99%, 기본 signDisplay는 auto이며 음수 부호만 표시한다.

  console.log(
    Intl.NumberFormat('ko', {
      style: 'percent',
      signDisplay: 'always',
    }).format(0.8),
  ); // +80%, always는 부호를 표시한다.

  console.log(
    Intl.NumberFormat('ko', {
      style: 'percent',
      signDisplay: 'always',
    }).format(-0.5),
  ); // -50%

  console.log(
    Intl.NumberFormat('ko', {
      style: 'percent',
      signDisplay: 'never',
    }).format(-0.4),
  ); // 40%, never은 부호를 표시하지 않는다.
}