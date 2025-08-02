/**
 * @file 회원가입 페이지의 유효성 검사 및 가입 처리를 담당합니다.
 */

import {
  isEmailValid,
  isPasswordValid,
  isNotEmpty,
  isNicknameValid,
} from './validation.js';
import { showModal } from './modal.js';
import { registerUser } from './auth.js';
import { showToast } from './toast.js';

// --- DOM Elements ---
const signupForm = document.getElementById('registerForm');
const regEmailInput = document.getElementById('regEmail');
const nicknameInput = document.getElementById('nickname');
const regPasswordInput = document.getElementById('regPassword');
const regPasswordConfirmInput = document.getElementById('regPasswordConfirm');
const signupButton = document.getElementById('registerButton');

const regEmailError = document.getElementById('regEmailError');
const nicknameError = document.getElementById('nicknameError');
const regPasswordError = document.getElementById('regPasswordError');
const regPasswordConfirmError = document.getElementById(
  'regPasswordConfirmError'
);

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
 * 모든 입력 필드의 유효성을 확인하여 회원가입 버튼의 활성화 상태를 업데이트합니다.
 */
function updateButtonState() {
  const email = regEmailInput.value;
  const nickname = nicknameInput.value;
  const password = regPasswordInput.value;
  const passwordConfirm = regPasswordConfirmInput.value;

  const isEmailOk = isNotEmpty(email) && isEmailValid(email);
  const isNicknameOk = isNotEmpty(nickname) && isNicknameValid(nickname);
  const isPasswordOk = isPasswordValid(password);
  const isPasswordConfirmOk =
    isNotEmpty(passwordConfirm) && password === passwordConfirm;

  signupButton.disabled = !(
    isEmailOk &&
    isNicknameOk &&
    isPasswordOk &&
    isPasswordConfirmOk
  );
}

/** 이메일 필드의 유효성을 검사하고 오류를 표시합니다. */
function validateEmailField() {
  const email = regEmailInput.value;
  if (!isNotEmpty(email))
    displayError(regEmailError, '아이디(이메일)를 입력해주세요.');
  else if (!isEmailValid(email))
    displayError(regEmailError, '유효한 이메일 형식이 아닙니다.');
  else displayError(regEmailError, '');
}

/** 닉네임 필드의 유효성을 검사하고 오류를 표시합니다. */
function validateNicknameField() {
  const nickname = nicknameInput.value;
  if (!isNotEmpty(nickname))
    displayError(nicknameError, '닉네임을 입력해주세요.');
  else if (!isNicknameValid(nickname))
    displayError(
      nicknameError,
      '닉네임은 특수문자를 제외한 한글, 영어, 숫자만 가능합니다.'
    );
  else displayError(nicknameError, '');
}

/** 비밀번호 필드의 유효성을 검사하고 오류를 표시합니다. */
function validatePasswordField() {
  const password = regPasswordInput.value;
  if (!isNotEmpty(password))
    displayError(regPasswordError, '비밀번호를 입력해주세요.');
  else if (!isPasswordValid(password))
    displayError(regPasswordError, '비밀번호는 8자 이상이어야 합니다.');
  else displayError(regPasswordError, '');
}

/** 비밀번호 확인 필드의 유효성을 검사하고 오류를 표시합니다. */
function validatePasswordConfirmField() {
  const password = regPasswordInput.value;
  const passwordConfirm = regPasswordConfirmInput.value;
  if (!isNotEmpty(passwordConfirm))
    displayError(regPasswordConfirmError, '비밀번호를 다시 입력해주세요.');
  else if (password !== passwordConfirm)
    displayError(regPasswordConfirmError, '비밀번호가 일치하지 않습니다.');
  else displayError(regPasswordConfirmError, '');
}

// --- Event Listeners ---

const inputs = [
  { element: regEmailInput, validator: validateEmailField },
  { element: nicknameInput, validator: validateNicknameField },
  { element: regPasswordInput, validator: validatePasswordField },
  { element: regPasswordConfirmInput, validator: validatePasswordConfirmField },
];

inputs.forEach(({ element, validator }) => {
  element.addEventListener('input', updateButtonState);
  element.addEventListener('blur', validator);
});

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // 모든 필드의 유효성을 마지막으로 한 번 더 확인합니다.
  validateEmailField();
  validateNicknameField();
  validatePasswordField();
  validatePasswordConfirmField();

  // 버튼이 활성화 상태일 때만 제출 로직 실행
  if (!signupButton.disabled) {
    const newUser = {
      email: regEmailInput.value,
      nickname: nicknameInput.value,
      password: regPasswordInput.value,
    };
    const isRegistered = registerUser(newUser);

    if (isRegistered) {
      showModal('회원가입 성공', '이제 로그인할 수 있습니다.', () => {
        window.location.href = '/signin';
      });
      signupForm.reset();
    } else {
      showToast('이미 사용 중인 아이디(이메일)입니다.', 'error');
    }
  } else {
    // 제출 시 유효성 검사에 실패하면 비밀번호 필드를 비웁니다.
    regPasswordInput.value = '';
    regPasswordConfirmInput.value = '';
    updateButtonState();
  }
});

// 페이지 로드 시 초기 버튼 상태 설정
updateButtonState();
