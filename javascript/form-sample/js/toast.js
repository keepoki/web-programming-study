/**
 * @file 토스트 메시지를 생성하고 관리합니다.
 */

const TOAST_DURATION = 3000;

let toastContainer = null;

/**
 * 토스트 컨테이너를 동적으로 생성하여 body에 추가합니다.
 */
function createToastContainer() {
  toastContainer = document.createElement('div');
  toastContainer.id = 'toast-container';
  toastContainer.classList.add('toast-container');
  document.body.appendChild(toastContainer);
}

document.addEventListener('DOMContentLoaded', createToastContainer);

/**
 * 토스트 메시지를 화면에 표시합니다.
 * @param {string} message - 표시할 메시지 텍스트.
 * @param {string} [type='info'] - 메시지 유형 ('success', 'error', 'info'). CSS 클래스에 사용됩니다.
 * @param {number} [duration=TOAST_DURATION] - 메시지가 표시될 시간 (밀리초).
 */
export function showToast(message, type = 'info', duration = TOAST_DURATION) {
  if (!toastContainer) {
    createToastContainer();
  }

  const toast = document.createElement('div');
  toast.classList.add('toast-message');
  if (type) {
    toast.classList.add(type);
  }
  toast.textContent = message;

  toast.style.setProperty('--toast-delay', `${duration}ms`);

  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = 1;
    toast.style.transform = 'translateX(0)';
  });

  setTimeout(() => {
    toast.style.opacity = 0;
    toast.style.transform = 'translateX(100%)';
    toast.addEventListener(
      'transitionend',
      () => {
        toast.remove();
      },
      { once: true }
    );
  }, duration);
}

