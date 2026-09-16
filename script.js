const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const dialog = document.querySelector('#lightbox');
const dialogImage = dialog?.querySelector('img');

document.querySelectorAll('.lightbox-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    if (!dialog || !dialogImage) return;
    dialogImage.src = trigger.dataset.image;
    dialogImage.alt = trigger.dataset.alt || 'Portfolio preview';
    dialog.showModal();
  });
});

dialog?.querySelector('.lightbox-close')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', (event) => {
  const bounds = dialog.getBoundingClientRect();
  const inside = event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
  if (!inside) dialog.close();
});

// Keep the website's resume buttons pointed at the newest accounting resume.
document.querySelectorAll('a[href="assets/Lourivel_Lorejo_Resume.pdf"]').forEach((link) => {
  link.href = 'resume.html';
  link.removeAttribute('download');
});

// Surface Xero certification in the top proof points and tool strip.
const proofItems = document.querySelectorAll('.hero-proof div');
if (proofItems[2]) {
  proofItems[2].innerHTML = '<strong>QBO + Xero</strong><span>certified bookkeeping tools</span>';
}
const trustItems = document.querySelectorAll('.trust-inner span');
if (trustItems[5]) trustItems[5].textContent = 'Xero Certified';

// Add the Xero Associate credential to the credentials section.
const credentialGrid = document.querySelector('.credential-grid');
if (credentialGrid && !document.querySelector('[data-xero-credential]')) {
  const card = document.createElement('article');
  card.className = 'credential-card reveal visible';
  card.setAttribute('data-xero-credential', 'true');
  card.innerHTML = `
    <div class="credential-visual" style="display:grid;place-items:center;background:linear-gradient(145deg,#17a9df,#0b86bd);color:white;cursor:default;text-align:center;padding:24px;">
      <div>
        <div style="display:inline-block;background:white;color:#1688b8;padding:7px 12px;border-radius:999px;font-size:11px;font-weight:900;letter-spacing:.08em;">XERO</div>
        <div style="font-size:24px;font-weight:900;line-height:1.08;margin-top:18px;">CERTIFIED ASSOCIATE<br>LEVEL 1</div>
      </div>
    </div>
    <div class="credential-copy">
      <p class="credential-date">September 2026</p>
      <h3>Xero Certified Associate - Level 1</h3>
      <p>Successfully completed and passed the Xero Associate Certification. Certified 15 September 2026; valid until 15 September 2027.</p>
      <a class="text-link" href="xero-certificate.html" target="_blank" rel="noopener">View credential details <span aria-hidden="true">↗</span></a>
    </div>`;
  credentialGrid.appendChild(card);
}

const observer = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 })
  : null;

document.querySelectorAll('.reveal').forEach((element) => {
  if (observer) observer.observe(element);
  else element.classList.add('visible');
});

document.querySelector('#year').textContent = new Date().getFullYear();
