/**
 * @file 사용자 인증 및 등록 로직을 담당합니다.
 */

import initialUsers from '../data/users.js';

/**
 * 메모리에 사용자 데이터를 저장합니다.
 * 이 배열은 브라우저 메모리에만 존재하며 페이지 새로고침 시 초기화됩니다.
 * @type {Array<object>}
 */
let users = [...initialUsers];

/**
 * 메모리에서 모든 사용자 정보를 가져옵니다.
 * @returns {Array<object>} 현재 모든 사용자 정보를 담은 배열.
 */
function getAllUsers() {
  return users;
}

/**
 * 사용자를 인증합니다. 제공된 이메일과 비밀번호가 저장된 사용자와 일치하는지 확인합니다.
 * @param {string} email - 사용자 이메일.
 * @param {string} password - 사용자 비밀번호.
 * @returns {boolean} 인증 성공 시 `true`, 실패 시 `false`.
 */
export function authenticateUser(email, password) {
  const allUsers = getAllUsers();
  const foundUser = allUsers.find(
    (user) => user.email === email && user.password === password
  );
  return Boolean(foundUser);
}

/**
 * 새로운 사용자를 등록합니다.
 * @param {object} newUser - 새로운 사용자 객체.
 * @param {string} newUser.email - 새로운 사용자의 이메일.
 * @param {string} newUser.nickname - 새로운 사용자의 닉네임.
 * @param {string} newUser.password - 새로운 사용자의 비밀번호.
 * @returns {boolean} 등록 성공 시 `true`, 이메일이 이미 사용 중인 경우 `false`.
 */
export function registerUser(newUser) {
  const allUsers = getAllUsers();

  const isEmailTaken = allUsers.some((user) => user.email === newUser.email);
  if (isEmailTaken) {
    return false;
  }

  users.push(newUser);
  console.log('새로운 사용자가 등록되었습니다:', newUser);
  console.log('현재 사용자 목록 (새로고침 시 사라집니다):', users);

  return true;
}
