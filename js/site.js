'use strict';

const sectionLinks = [...document.querySelectorAll('.navbar__links a[href^="#"], .navbar__panel > a[href^="#"]')];
const navSections = [...new Set(sectionLinks.map((link) => document.getElementById(link.hash.slice(1))).filter(Boolean))];

if (navSections.length) {
  const header = document.querySelector('.navbar');
  const setCurrentSection = (id) => {
    sectionLinks.forEach((link) => {
      if (link.hash === `#${id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };

  const updateCurrentSection = () => {
    // 使用與錨點定位相同的頂部留白；展開的選單不計入 header 高度。
    const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || header.offsetHeight;
    let current = null;
    navSections.forEach((section) => {
      if (section.getBoundingClientRect().top <= offset + 1) current = section;
    });
    // 最後一節可能太短，無法捲到頂部定位線。
    if (current && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1) {
      current = navSections[navSections.length - 1];
    }
    setCurrentSection(current?.id);
  };

  sectionLinks.forEach((link) => {
    link.addEventListener('click', () => setCurrentSection(link.hash.slice(1)));
  });

  let updatePending = false;
  const scheduleUpdate = () => {
    if (updatePending) return;
    updatePending = true;
    requestAnimationFrame(() => {
      updatePending = false;
      updateCurrentSection();
    });
  };
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('hashchange', scheduleUpdate);
  window.addEventListener('load', scheduleUpdate);
  updateCurrentSection();
}

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
  const panel = document.getElementById(button.getAttribute('aria-controls'));
  if (!panel) return;

  const setOpen = (isOpen) => {
    button.setAttribute('aria-expanded', String(isOpen));
    button.setAttribute('aria-label', isOpen ? '關閉選單' : '開啟選單');
    panel.hidden = !isOpen;
  };

  button.addEventListener('click', () => {
    setOpen(button.getAttribute('aria-expanded') !== 'true');
  });

  panel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  // 與 CSS 導覽斷點一致；回到桌面時清除收合選單狀態。
  const desktop = window.matchMedia('(min-width: 1024px)');
  desktop.addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
});
