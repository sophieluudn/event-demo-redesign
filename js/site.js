'use strict';

function openDialog(dialogId) {
  const dialog = document.getElementById(dialogId);
  if (!(dialog instanceof HTMLDialogElement)) return;

  dialog.showModal();
}

document.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const dialogTrigger = target.closest('[data-dialog-target]');
  if (dialogTrigger) {
    openDialog(dialogTrigger.dataset.dialogTarget);
    return;
  }

  const closeButton = target.closest('[data-dialog-close]');
  if (closeButton) {
    closeButton.closest('dialog')?.close();
    return;
  }

  if (target.matches('[data-print]')) {
    window.print();
    return;
  }

  if (target instanceof HTMLDialogElement) {
    const panel = target.querySelector('.modal__dialog');
    if (!panel) return;

    const bounds = panel.getBoundingClientRect();
    const isOutside = event.clientX < bounds.left || event.clientX > bounds.right
      || event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (isOutside) target.close();
  }
});

document.querySelectorAll('[data-dialog-on-submit]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    if (!form.reportValidity()) return;

    event.preventDefault();
    openDialog(form.dataset.dialogOnSubmit);
  });
});

document.querySelectorAll('[data-send-otp]').forEach((button) => {
  button.addEventListener('click', () => {
    const form = button.closest('form');
    const phone = form?.querySelector('#query-phone');
    const otpStep = form?.querySelector('#otp-step');
    const otpInput = form?.querySelector('#query-otp');
    if (!(phone instanceof HTMLInputElement) || !phone.reportValidity() || !otpStep) {
      phone?.focus();
      return;
    }

    otpStep.hidden = false;
    form.classList.add('is-otp-sent');
    button.disabled = true;
    button.setAttribute('aria-expanded', 'true');
    otpInput?.focus();
  });
});

document.querySelectorAll('[data-nav-toggle]').forEach((button) => {
  button.addEventListener('click', () => {
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    if (!panel) return;

    const isOpen = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!isOpen));
    button.setAttribute('aria-label', isOpen ? '開啟選單' : '關閉選單');
    panel.hidden = isOpen;
  });

  const panel = document.getElementById(button.getAttribute('aria-controls'));
  panel?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', '開啟選單');
      panel.hidden = true;
    });
  });
});
