/**
 * @file 세션 쿠키를 사용하여 인증 상태를 관리합니다.
 */

const LOGGED_IN_COOKIE_NAME = 'loggedIn';

/**
 * 사용자가 로그인했음을 나타내는 세션 쿠키를 설정합니다.
 * 쿠키는 `loggedIn=true`로 설정되며 브라우저 탭이 닫힐 때 삭제됩니다.
 * @param {string} email - 로그인한 사용자의 이메일. 현재 쿠키 값에는 사용되지 않지만 확장을 위해 사용할 수 있습니다.
 */
export function setLoggedInCookie(email) {
  document.cookie = `${LOGGED_IN_COOKIE_NAME}=true; path=/`;
  console.log('세션 쿠키에 로그인 정보가 저장되었습니다.');
}

/**
 * 세션 쿠키의 존재 여부를 확인하여 사용자가 로그인했는지 확인합니다.
 * @returns {boolean} 사용자가 로그인한 경우 `true`, 그렇지 않은 경우 `false`.
 */
export function isLoggedIn() {
  return document.cookie.includes(`${LOGGED_IN_COOKIE_NAME}=true`);
}

/**
 * 세션 쿠키를 삭제하여 사용자를 로그아웃합니다.
 */
export function clearLoggedInCookie() {
  document.cookie = `${LOGGED_IN_COOKIE_NAME}=; Max-Age=0; path=/`;
  console.log('세션 쿠키 로그인 정보가 삭제되었습니다 (로그아웃).');
}
