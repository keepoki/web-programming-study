/**
 * @file 로그인 페이지의 유효성 검사 및 로그인 처리를 담당합니다.
 */

import { isEmailValid, isPasswordValid, isNotEmpty } from './validation.js';
import { showModal } from './modal.js';
import { setLoggedInCookie } from './authUtils.js';
import { authenticateUser } from './auth.js';
import { showToast } from './toast.js';

// --- DOM Elements ---
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('loginButton');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// --- Validation Logic ---

/**
 * 오류 메시지를 표시하거나 숨깁니다.
 * @param {HTMLElement} element - 오류 메시지를 표시할 HTML 엘리먼트.
 * @param {string} message - 표시할 오류 메시지. 메시지가 없으면 엘리먼트를 숨깁니다.
 */
function displayError(element, message) {
  element.textContent = message;
  element.style.display = message ? 'block' : 'none';
}

/**
 * 모든 입력 필드의 유효성을 확인하여 로그인 버튼의 활성화 상태를 업데이트합니다.
 */
function updateButtonState() {
  const email = emailInput.value;
  const password = passwordInput.value;

  const isEmailOk = isNotEmpty(email) && isEmailValid(email);
  const isPasswordOk = isPasswordValid(password);

  loginButton.disabled = !(isEmailOk && isPasswordOk);
}

/** 이메일 필드의 유효성을 검사하고 오류를 표시합니다. */
function validateEmailField() {
  const email = emailInput.value;
  if (!isNotEmpty(email)) displayError(emailError, '이메일을 입력해주세요.');
  else if (!isEmailValid(email)) displayError(emailError, '유효한 이메일 형식이 아닙니다.');
  else displayError(emailError, '');
}

/** 비밀번호 필드의 유효성을 검사하고 오류를 표시합니다. */
function validatePasswordField() {
  const password = passwordInput.value;
  if (!isNotEmpty(password)) displayError(passwordError, '비밀번호를 입력해주세요.');
  else if (!isPasswordValid(password)) displayError(passwordError, '비밀번호는 8자 이상이어야 합니다.');
  else displayError(passwordError, '');
}

// --- Event Listeners ---

const inputs = [
  { element: emailInput, validator: validateEmailField },
  { element: passwordInput, validator: validatePasswordField },
];

inputs.forEach(({ element, validator }) => {
  element.addEventListener('input', updateButtonState);
  element.addEventListener('blur', validator);
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  validateEmailField();
  validatePasswordField();

  if (!loginButton.disabled) {
    const isAuthenticated = authenticateUser(emailInput.value, passwordInput.value);

    if (isAuthenticated) {
      loginForm.reset();
      setLoggedInCookie(emailInput.value);
      showModal('로그인 성공', '이제 환영 페이지로 이동합니다.', () => {
        window.location.href = '/';
      });
    } else {
      showToast('아이디 또는 비밀번호가 올바르지 않습니다.', 'error');
      passwordInput.value = '';
      updateButtonState();
    }
  }
});

// 페이지 로드 시 초기 버튼 상태 설정
updateButtonState();
