'use strict';

// Demo 僅展示狀態；正式版由後端提供名額與報名資格並驗證提交。
const eventStatus = document.querySelector('[data-event-status]');
if (eventStatus) {
  const start = Date.parse('2026-09-01T09:00:00+08:00');
  const end = Date.parse('2026-10-13T12:00:00+08:00');
  const eventStart = Date.parse('2026-10-14T09:00:00+08:00');
  const eventEnd = Date.parse('2026-10-14T16:30:00+08:00');
  const select = document.querySelector('[data-status-scenario]');
  const action = document.querySelector('[data-registration-action]');
  const date = document.querySelector('.info-list__secondary dd');
  const originalDate = date.textContent;
  const samples = { upcoming: start - 1, open: start, full: start, closed: end, live: eventStart, overlap: eventStart, ended: eventEnd };
  function render() {
    const scenario = select.value;
    const now = scenario === 'auto' ? Date.now() : samples[scenario];
    const deadline = scenario === 'overlap' ? Date.parse('2026-10-14T12:00:00+08:00') : end;
    const ended = now >= eventEnd;
    const upcoming = now < start;
    const full = scenario === 'full';
    const open = !ended && !full && !upcoming && now < deadline;
    eventStatus.textContent = '活動已結束，感謝您的熱情參與！';
    eventStatus.hidden = !ended;
    action.textContent = ended ? '報名截止' : upcoming ? '尚未開放'
      : now >= deadline ? '報名截止' : full ? '報名額滿' : '立即報名';
    if (ended) action.setAttribute('aria-describedby', 'event-status-message');
    else action.removeAttribute('aria-describedby');
    action.setAttribute('aria-disabled', String(!open));
    if (open) action.setAttribute('href', 'register.html');
    else action.removeAttribute('href');
    date.textContent = scenario === 'overlap' ? '2026-09-01 09:00 ～ 2026-10-14 12:00' : originalDate;
  }
  action.addEventListener('click', (event) => {
    render();
    if (action.getAttribute('aria-disabled') === 'true') event.preventDefault();
  });
  select.addEventListener('change', render);
  document.querySelector('[data-next-scenario]').addEventListener('click', () => {
    select.selectedIndex = select.selectedIndex >= select.options.length - 1
      ? 1 : select.selectedIndex + 1;
    render();
  });
  window.setInterval(render, 30000);
  render();
}
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
    const attendeeName = form.querySelector('#attendee-name');
    if (attendeeName instanceof HTMLInputElement) {
      try {
        sessionStorage.setItem('registration-attendee-name', attendeeName.value.trim());
      } catch {
        // 儲存不可用時仍保留原有報名流程。
      }
    }
    openDialog(form.dataset.dialogOnSubmit);
  });
});

const paymentGreeting = document.querySelector('[data-payment-greeting]');
if (paymentGreeting) {
  try {
    const attendeeName = sessionStorage.getItem('registration-attendee-name')?.trim();
    if (attendeeName) paymentGreeting.textContent = `${attendeeName}，請選擇付款商品`;
  } catch {
    // 直接進入付款頁或儲存不可用時，顯示通用提示。
  }
}

// Demo 僅切換畫面；正式付款結果及繳款資料須由既有金流回應提供。
const paymentForm = document.querySelector('[data-payment-form]');
if (paymentForm) {
  paymentForm.addEventListener('submit', () => {
    const method = new FormData(paymentForm).get('payment-method');
    paymentForm.action = ['convenience-store', 'atm'].includes(method)
      ? 'payment-info.html' : 'success.html';
  });
}

const paymentInfo = document.querySelector('[data-payment-info]');
if (paymentInfo) {
  const method = new URLSearchParams(window.location.search).get('payment-method');
  paymentInfo.querySelectorAll('[data-payment-details]').forEach((row) => {
    row.hidden = row.dataset.paymentDetails !== method;
  });
  const isOfflinePayment = ['convenience-store', 'atm'].includes(method);
  paymentInfo.querySelector('[data-payment-info-missing]').hidden = isOfflinePayment;
  paymentInfo.querySelector('[data-payment-info-content]').hidden = !isOfflinePayment;
}

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
