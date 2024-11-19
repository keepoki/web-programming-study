{
  /**
   * 인수의 문자 코드 값이 한글 코드의 범위에 포함 유무를 리턴
   * @param {string} char 
   * @returns {boolean} true: 한글
   */
  function hasHangulCharacter(char) {
    try {
      if (!char) {
        throw new Error('char is not a valid');
      }
      const charCode = char.charCodeAt(0);
      const startHangulCharCode = '가'.charCodeAt(); // 44032
      const endHangulCharCode = '힣'.charCodeAt(); // 55203
      return startHangulCharCode <= charCode && charCode <= endHangulCharCode;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * 한글 한글자에 대한 초성, 중성, 종성을 반환하는 함수
   * @param {string} oneLetter 한글자
   * @returns { { choSeong:string, jungSeong:string, jongSeong:string } | undefined }
   */
  function separateOneLetterHangul(oneLetter) {
    try {
      const startHangulCharCode = '가'.charCodeAt(); // 44032
      const charCode = oneLetter.charCodeAt(0);
      
      // 인수의 문자 코드 값이 한글 코드의 범위를 벗어나는 경우에 대한 예외처리
      if (!hasHangulCharacter(oneLetter)) {
        return undefined;
      }
      
      // 초성, 19개
      const choSeongList = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
      // 중성, 21개
      const jungSeongList = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ' ];
      // 종성, 없는 경우 포함 28개
      const jongSeongList = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']; 
      
      // 반대로 0xAC00을 빼서, 한글 표현 범위에 해당하는 0 ~ 11711로 만든다.
      const hangulCode = charCode - startHangulCharCode;
      // 인덱스는 0부터 이므로 정수 내림을 해주어야 한다.
      const choSeongIndex = Math.floor(hangulCode / (jungSeongList.length * jongSeongList.length));
      const jungSeongIndex = Math.floor(hangulCode / jongSeongList.length) % 21;
      const jongSeongIndex = hangulCode % jongSeongList.length;

      return {
        choSeong: choSeongList[choSeongIndex],
        jungSeong: jungSeongList[jungSeongIndex],
        jongSeong: jongSeongList[jongSeongIndex],
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  console.log(separateOneLetterHangul('가')); // { choSeong: 'ㄱ', jungSeong: 'ㅏ', jongSeong: '' }
  console.log(separateOneLetterHangul('힣')); // { choSeong: 'ㅎ', jungSeong: 'ㅣ', jongSeong: 'ㅎ' }
  console.log(separateOneLetterHangul('뷁')); // { choSeong: 'ㅂ', jungSeong: 'ㅞ', jongSeong: 'ㄺ' }
  console.log(separateOneLetterHangul('김밥')); // { choSeong: 'ㄱ', jungSeong: 'ㅣ', jongSeong: 'ㅁ' }

  /**
   * 한글 문자열을 초성, 중성, 종성으로 나눈 값들을 반환하는 함수
   * @param {string} hangul
   * @returns { string[] | undefined }
   */
  function separateHangul(hangul) {
    if (!hangul) {
      return undefined;
    }

    const result = [];
    for (const onLetter of hangul) {
      const separatedOnLetter = separateOneLetterHangul(onLetter);
      if (separatedOnLetter) {
        // string을 구조분해 할당하면 빈 값('')은 배열에 포함되지 않는다. 즉 종성이 없는 경우에는 추가되지 않음
        result.push(...separatedOnLetter.choSeong, ...separatedOnLetter.jungSeong, ...separatedOnLetter.jongSeong);
      }
    }
    return result;
  }

  console.log(separateHangul('김밥')); // [ 'ㄱ', 'ㅣ', 'ㅁ', 'ㅂ', 'ㅏ', 'ㅂ' ]
  console.log(separateHangul('월급 좋아').join('')); // ㅇㅝㄹㄱㅡㅂㅈㅗㅎㅇㅏ
  console.log(separateHangul('행복하세요').join('')); // ㅎㅐㅇㅂㅗㄱㅎㅏㅅㅔㅇㅛ
}