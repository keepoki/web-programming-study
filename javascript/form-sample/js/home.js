/**
 * @file 홈페이지의 로직을 처리하며, 로그인 상태 확인 및 로그아웃 기능을 포함합니다.
 */

import { isLoggedIn, clearLoggedInCookie } from './authUtils.js';
import { showModal } from './modal.js';

document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logoutButton');

  if (!isLoggedIn()) {
    setTimeout(() => {
      window.location.href = '/signin';
    }, 1500);
  } else {
    console.log('이미 로그인되어 있습니다. 환영합니다!');
    if (logoutButton) {
      logoutButton.style.display = 'block';
    }
  }

  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      clearLoggedInCookie();
      showModal(
        '로그아웃',
        '로그아웃되었습니다. 로그인 페이지로 이동합니다.',
        () => {
          window.location.href = '/signin';
        }
      );
    });
  }
});
