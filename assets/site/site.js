(() => {
  const menuButton = document.querySelector('.pf-menu-toggle');
  const navigation = document.querySelector('#site-navigation');

  const setMenuOpen = (open) => {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    navigation.classList.toggle('is-open', open);
    document.body.classList.toggle('pf-menu-open', open);
  };

  menuButton?.addEventListener('click', () => {
    setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
  });

  navigation?.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenuOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuOpen(false);
  });

  const detailNavLinks = [...document.querySelectorAll('.pf-detail-subnav a[href^="#"]')];
  if (detailNavLinks.length) {
    const detailSections = detailNavLinks
      .map((link) => ({ link, section: document.querySelector(link.getAttribute('href')) }))
      .filter(({ section }) => section);
    let navFrame = 0;
    const updateDetailNavigation = () => {
      navFrame = 0;
      const headerHeight = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--pf-header-height')) || 52;
      const marker = window.scrollY + headerHeight + 56;
      let current = detailSections[0];
      detailSections.forEach((item) => {
        if (item.section.getBoundingClientRect().top + window.scrollY <= marker) current = item;
      });
      detailSections.forEach(({ link }) => {
        if (link === current.link) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    };
    const scheduleDetailNavigation = () => {
      if (!navFrame) navFrame = window.requestAnimationFrame(updateDetailNavigation);
    };
    window.addEventListener('scroll', scheduleDetailNavigation, { passive: true });
    window.addEventListener('resize', scheduleDetailNavigation);
    updateDetailNavigation();
  }

  const detailDocumentTrack = document.querySelector('.pf-detail-documents__track');
  if (detailDocumentTrack) {
    const documentCards = [...detailDocumentTrack.querySelectorAll('.pf-detail-doc-card')];
    const previousButton = document.querySelector('.pf-detail-documents__controls .pf-carousel-arrow--prev');
    const nextButton = document.querySelector('.pf-detail-documents__controls .pf-carousel-arrow--next');
    const documentStatus = document.querySelector('.pf-detail-documents__status');
    const activeCardIndex = () => {
      const maxScroll = Math.max(0, detailDocumentTrack.scrollWidth - detailDocumentTrack.clientWidth);
      if (!maxScroll || documentCards.length < 2) return 0;
      return Math.round((detailDocumentTrack.scrollLeft / maxScroll) * (documentCards.length - 1));
    };
    const updateDocumentControls = () => {
      const active = activeCardIndex();
      const maxScroll = Math.max(0, detailDocumentTrack.scrollWidth - detailDocumentTrack.clientWidth);
      if (previousButton) previousButton.disabled = detailDocumentTrack.scrollLeft <= 1;
      if (nextButton) nextButton.disabled = detailDocumentTrack.scrollLeft >= maxScroll - 1;
      if (documentStatus) documentStatus.textContent = `${String(active + 1).padStart(2, '0')} / ${String(documentCards.length).padStart(2, '0')}`;
    };
    const moveDocumentCard = (direction) => {
      const targetIndex = Math.max(0, Math.min(documentCards.length - 1, activeCardIndex() + direction));
      const maxScroll = Math.max(0, detailDocumentTrack.scrollWidth - detailDocumentTrack.clientWidth);
      if (documentCards.length > 1) {
        detailDocumentTrack.scrollTo({ left: maxScroll * targetIndex / (documentCards.length - 1), behavior: 'smooth' });
      }
    };
    previousButton?.addEventListener('click', () => moveDocumentCard(-1));
    nextButton?.addEventListener('click', () => moveDocumentCard(1));
    detailDocumentTrack.addEventListener('scroll', updateDocumentControls, { passive: true });
    window.addEventListener('resize', updateDocumentControls);
    updateDocumentControls();
  } else {
    const documentTrack = document.querySelector('.pf-document-track');
    const moveDocuments = (direction) => {
      if (!documentTrack) return;
      const distance = Math.max(260, documentTrack.clientWidth * 0.8);
      const target = Math.max(0, Math.min(documentTrack.scrollWidth - documentTrack.clientWidth, documentTrack.scrollLeft + direction * distance));
      documentTrack.scrollTo({ left: target, behavior: 'smooth' });
    };
    document.querySelector('.pf-carousel-arrow--prev')?.addEventListener('click', () => moveDocuments(-1));
    document.querySelector('.pf-carousel-arrow--next')?.addEventListener('click', () => moveDocuments(1));
  }

  const imageDialog = document.querySelector('.pf-image-dialog');
  const dialogImage = imageDialog?.querySelector('img');
  document.querySelectorAll('[data-zoom]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!imageDialog || !dialogImage) return;
      dialogImage.src = button.dataset.zoom;
      dialogImage.alt = button.querySelector('img')?.alt || button.getAttribute('aria-label') || 'Увеличенное изображение';
      imageDialog.showModal();
    });
  });
  imageDialog?.querySelector('.pf-image-dialog__close')?.addEventListener('click', () => imageDialog.close());
  imageDialog?.addEventListener('click', (event) => {
    if (event.target === imageDialog) imageDialog.close();
  });
  imageDialog?.addEventListener('close', () => {
    if (dialogImage) dialogImage.removeAttribute('src');
  });

  const form = document.querySelector('#contact-form');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const values = new FormData(form);
    const isEnglish = document.documentElement.lang === 'en';
    const subject = isEnglish ? `PYROFLEX ® website request — ${values.get('name')}` : `Запрос с сайта ПИРОФЛЕКС ® — ${values.get('name')}`;
    const body = [
      `${isEnglish ? 'Name' : 'Имя'}: ${values.get('name')}`,
      `${isEnglish ? 'Phone' : 'Телефон'}: ${values.get('phone')}`,
      `${isEnglish ? 'Email' : 'Электронная почта'}: ${values.get('email')}`,
      values.get('message') ? `${isEnglish ? 'Project or question' : 'Объект или вопрос'}: ${values.get('message')}` : '',
    ].join('\n');
    const status = form.querySelector('.pf-form-status');
    if (status) status.textContent = isEnglish
      ? 'Your email is ready. If the mail app did not open, write to office@pyroflex.ru.'
      : 'Подготовлено письмо. Если почтовое приложение не открылось, напишите на office@pyroflex.ru.';
    window.location.href = `mailto:office@pyroflex.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();
