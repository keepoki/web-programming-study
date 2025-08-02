/**
 * @file 유효성 검사 규칙을 정의합니다.
 */

/**
 * 이메일 형식이 유효한지 검사합니다.
 * @param {string} email - 검사할 이메일 문자열.
 * @returns {boolean} 유효하면 `true`, 아니면 `false`.
 */
export function isEmailValid(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * 비밀번호가 최소 길이를 만족하는지 검사합니다.
 * @param {string} password - 검사할 비밀번호 문자열.
 * @param {number} [minLength=8] - 최소 길이.
 * @returns {boolean} 유효하면 `true`, 아니면 `false`.
 */
export function isPasswordValid(password, minLength = 8) {
  return password.length >= minLength;
}

/**
 * 입력 필드가 비어있지 않은지 검사합니다.
 * @param {string} value - 검사할 입력 값.
 * @returns {boolean} 비어있지 않으면 `true`, 비어있으면 `false`.
 */
export function isNotEmpty(value) {
  return value.trim() !== '';
}

/**
 * 닉네임 유효성을 검사합니다: 특수문자를 제외한 한글, 영어, 숫자만 허용합니다.
 * @param {string} nickname - 검사할 닉네임.
 * @returns {boolean} 유효하면 `true`, 아니면 `false`.
 */
export function isNicknameValid(nickname) {
  const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/;
  return nicknameRegex.test(nickname);
}
