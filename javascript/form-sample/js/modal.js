/**
 * @file 동적으로 모달 엘리먼트를 생성하고 관리합니다.
 */

let modalBackdrop = null;
let customModal = null;
let modalTitle = null;
let modalMessage = null;
let confirmButton = null;

let currentOnConfirmCallback = null;

/**
 * 모달 엘리먼트들을 동적으로 생성하여 body에 추가합니다.
 */
function createModalElements() {
  modalBackdrop = document.createElement('div');
  modalBackdrop.id = 'modal-backdrop';
  modalBackdrop.classList.add('modal-backdrop');

  customModal = document.createElement('div');
  customModal.id = 'custom-modal';
  customModal.classList.add('custom-modal');

  modalTitle = document.createElement('h3');
  modalTitle.id = 'modal-title';

  modalMessage = document.createElement('p');
  modalMessage.id = 'modal-message';

  confirmButton = document.createElement('button');
  confirmButton.id = 'modal-confirm-button';
  confirmButton.textContent = '확인';
  confirmButton.addEventListener('click', handleConfirm);

  customModal.appendChild(modalTitle);
  customModal.appendChild(modalMessage);
  customModal.appendChild(confirmButton);

  modalBackdrop.appendChild(customModal);

  document.body.appendChild(modalBackdrop);
}

document.addEventListener('DOMContentLoaded', createModalElements);

/**
 * '확인' 버튼 클릭을 처리하고 모달을 닫습니다.
 */
function handleConfirm() {
  closeModal();
  if (currentOnConfirmCallback) {
    currentOnConfirmCallback();
    currentOnConfirmCallback = null;
  }
}

/**
 * 커스텀 모달을 표시합니다.
 * @param {string} title - 모달 제목.
 * @param {string} message - 모달 메시지.
 * @param {Function} [onConfirm=null] - '확인' 버튼 클릭 시 실행될 콜백 함수.
 */
export function showModal(title, message, onConfirm = null) {
  if (!modalBackdrop) {
    createModalElements();
  }

  modalTitle.textContent = title;
  modalMessage.textContent = message;
  currentOnConfirmCallback = onConfirm;

  modalBackdrop.classList.add('show');
  customModal.classList.add('show');
}

/**
 * 커스텀 모달을 숨깁니다.
 */
function closeModal() {
  modalBackdrop.classList.remove('show');
  customModal.classList.remove('show');
}
