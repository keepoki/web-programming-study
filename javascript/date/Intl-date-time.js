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

/*
  Intl.DateTimeFormat
  https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
  나라 또는 지역에 따라 날짜 및 시간 서식을 지정할 수 있다.
  Intl.DateTimeFormat(locales?, options?) 옵션을 설정하여 다른 출력 결과를 나타낼 수 있다.
 */
{
  const date = new Date(Date.UTC(2023, 10 - 1, 26, 10, 40, 30)); // 2023-10-26 10:40:30
  console.log(date); // 2023-11-26T10:40:30.000Z

  // format()
  console.log(Intl.DateTimeFormat('ko').format(date)); // 2023. 11. 26.

  console.log(
    Intl.DateTimeFormat('ko', {
      dateStyle: 'long',
    }).format(date),
  ); // 2023년 11월 26일

  // timeStyle을 지정해서 시간까지 출력할 수 있다.
  console.log(
    Intl.DateTimeFormat('ko', {
      dateStyle: 'long',
      timeStyle: 'full',
    }).format(date),
  ); // 2023년 11월 26일 오후 7시 40분 30초 대한민국 표준시

  console.log(
    Intl.DateTimeFormat('ko', {
      dateStyle: 'medium',
      timeStyle: 'medium',
    }).format(date),
  ); // 2023. 11. 26. 오후 7:40:30

  console.log(
    Intl.DateTimeFormat('ko', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(date),
  ); // 23. 11. 26. 오후 7:40

  // 지원하는 형식 중 이 형식을 제일 선호한다.
  console.log(
    Intl.DateTimeFormat('ko', {
      dateStyle: 'medium',
      timeStyle: 'medium',
      hourCycle: 'h24',
    }).format(date),
  ); // 2023. 11. 26. 19:40:30

  // 날짜 범위 formatRange()
  console.log('----- formatRange() -----');
  const startDate = new Date(2023, 3 - 1, 8, 10);
  const endDate = new Date(2024, 3 - 1, 31, 12);

  console.log(
    Intl.DateTimeFormat('ko', {
      dateStyle: 'medium',
    }).formatRange(startDate, endDate),
  ); // 2023. 3. 8. ~ 2024. 3. 31.

  console.log(
    Intl.DateTimeFormat('ko', {
      dateStyle: 'medium',
      timeStyle: 'long',
      hourCycle: 'h24',
    }).formatRange(startDate, endDate),
  ); // 2023. 3. 8. 19:00:00 ~ 2024. 3. 31. 21:00:00

  console.log(
    Intl.DateTimeFormat('ko', {
      dateStyle: 'medium',
      timeStyle: 'long',
    }).formatRange(startDate, endDate),
  ); // 2023. 3. 8. 오후 7시 0분 0초 GMT+9 ~ 2024. 3. 31. 오후 9시 0분 0초 GMT+9

  // UTC 시간으로 변환해보자
  console.log('----- UTC -----');
  console.log(startDate.toUTCString()); // Wed, 08 Mar 2023 01:00:00 GMT
  console.log(startDate.toISOString()); // 2023-03-08T01:00:00.000Z
  console.log(startDate.toLocaleString()); // 2023. 3. 8. 오전 10:00:00

  /*
    GMT+9, 아직 UTC 시간이 적용되지 않았다.
    new Date()로 생성된 인스턴스는 OS에 설정된 지역에 대한 시간으로 설정된다.
   */
  console.log(
    Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'long',
      hourCycle: 'h24',
    }).formatRange(
      new Date(startDate.toISOString()),
      new Date(endDate.toISOString()),
    ),
  ); // Mar 8, 2023, 10:00:00 GMT+9 – Mar 31, 2024, 12:00:00 GMT+9

  /*
    날짜 기능 라이브러리를 사용하는 것이 더 좋다 (크로스 브라우징 문제까지 해결 가능)
    바닐라 자바스크립트에서는 UTC 시간과 Local 시간을 계산하는 유일한 방법은
    getTimezoneOffset 메서드를 이용하는 것이다.
   */
  const offsetMinutes = startDate.getTimezoneOffset();
  console.log(offsetMinutes); // -540, 분을 의미한다. 즉, GMT+9는 9시간 = +540분

  // getTime의 단위가 ms라서 1000을 곱해 초로 만들고, 60을 곱해서 분으로 단위를 적용시켜서 계산한다.
  const startDateUTC = new Date(
    startDate.getTime() + offsetMinutes * 60 * 1000,
  );
  const endDateUTC = new Date(endDate.getTime() + offsetMinutes * 60 * 1000);

  console.log(
    Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'long',
      hourCycle: 'h24',
    }).formatRange(startDateUTC, endDateUTC),
  ); // Mar 8, 2023, 10:00:00 GMT+9 – Mar 31, 2024, 12:00:00 GMT+9
}
