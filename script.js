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

// Add the Xero Associate certificate directly to the Credentials section.
const credentialGrid = document.querySelector('.credential-grid');
if (credentialGrid && !document.querySelector('[data-xero-credential]')) {
  const card = document.createElement('article');
  card.className = 'credential-card reveal visible';
  card.setAttribute('data-xero-credential', 'true');
  card.innerHTML = `
    <a class="credential-visual" href="xero-certificate.html" target="_blank" rel="noopener" style="display:block;background:#eaf5f9;cursor:pointer;">
      <img class="cert-only" src="assets/xero-certified-associate-level-1.svg" alt="Xero Certified Associate Level 1 certificate for Lourivel Lorejo" style="width:100%;height:100%;object-fit:cover;object-position:center 38%;">
    </a>
    <div class="credential-copy">
      <p class="credential-date">September 2026</p>
      <h3>Xero Certified Associate — Level 1</h3>
      <p>Successfully completed and passed the Xero Associate Certification. Certified 15 September 2026; valid until 15 September 2027.</p>
      <a class="text-link" href="xero-certificate.html" target="_blank" rel="noopener">View certificate <span aria-hidden="true">↗</span></a>
    </div>`;

  const firstCredential = credentialGrid.firstElementChild;
  if (firstCredential) firstCredential.insertAdjacentElement('afterend', card);
  else credentialGrid.appendChild(card);

  const gridStyle = document.createElement('style');
  gridStyle.textContent = '@media (min-width: 981px){.credential-grid{grid-template-columns:repeat(2,1fr)}}';
  document.head.appendChild(gridStyle);
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
