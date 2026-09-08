(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');
  if (toggle && nav) {
    toggle.hidden = false;
    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.querySelector('span').textContent = open ? '−' : '+';
      nav.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.site-header')) setOpen(false);
    });
    window.matchMedia('(min-width: 781px)').addEventListener('change', () => setOpen(false));
  }
  const form = document.getElementById('inquiry-form');
  const preview = document.getElementById('preview-inquiry');
  const status = document.getElementById('form-status');
  if (form && preview && status) {
    form.addEventListener('submit', (event) => event.preventDefault());
    preview.addEventListener('click', () => {
      if (!form.reportValidity()) return;
      status.replaceChildren();
      const heading = document.createElement('strong');
      heading.textContent = 'Your inquiry preview is ready.';
      const detail = document.createElement('p');
      detail.textContent = `Service selected: ${form.elements.service.value}. This is a demonstration only. Your details have not been sent or stored.`;
      status.append(heading, detail);
      status.hidden = false;
      status.focus();
    });
    form.addEventListener('input', () => { status.hidden = true; });
  }
})();
