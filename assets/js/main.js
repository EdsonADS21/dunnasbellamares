/* ==========================================================================
   Dunnas Bella Mares - Glassmorphism Pro JavaScript Interactive Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar Effect
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
          if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
          } else {
            navbar.classList.remove('scrolled');
          }
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true })

  // 2. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });
  }

  // Close mobile menu when clicking nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      }
    });
  });

  // 3. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(otherItem => item !== otherItem && otherItem.classList.remove('active'));
      item.classList.toggle('active', !isActive);
    });
  });

  // 4. Gallery Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');
      galleryCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Interactive Lightbox Visualizer
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentGalleryIndex = 0;
  let visibleCards = [];

  function updateVisibleCards() {
    visibleCards = Array.from(galleryCards).filter(card => card.style.display !== 'none');
  }

  function openLightbox(index) {
    updateVisibleCards();
    if (visibleCards.length === 0) return;
    currentGalleryIndex = index;
    const card = visibleCards[currentGalleryIndex];
    const img = card.querySelector('img');
    const title = card.querySelector('.gallery-card-overlay h4').textContent;

    lightboxImg.src = img.src;
    lightboxCaption.textContent = title;
    lightboxCounter.textContent = `${currentGalleryIndex + 1} de ${visibleCards.length}`;

    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  galleryCards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      updateVisibleCards();
      const visibleIndex = visibleCards.indexOf(card);
      openLightbox(visibleIndex >= 0 ? visibleIndex : 0);
    });
  });

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

  lightboxNext.addEventListener('click', () => {
    currentGalleryIndex = (currentGalleryIndex + 1) % visibleCards.length;
    openLightbox(currentGalleryIndex);
  });

  lightboxPrev.addEventListener('click', () => {
    currentGalleryIndex = (currentGalleryIndex - 1 + visibleCards.length) % visibleCards.length;
    openLightbox(currentGalleryIndex);
  });

  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') lightboxNext.click();
    if (e.key === 'ArrowLeft') lightboxPrev.click();
  });

  // 6. Privacy Policy Modal
  const privacyModal = document.getElementById('privacyModal');
  const openPrivacyBtn = document.getElementById('openPrivacy');
  const closePrivacyBtn = document.getElementById('closePrivacy');

  if (openPrivacyBtn) {
    openPrivacyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      privacyModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closePrivacyBtn) {
    closePrivacyBtn.addEventListener('click', () => {
      privacyModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (privacyModal) {
    privacyModal.addEventListener('click', (e) => {
      if (e.target === privacyModal) {
        privacyModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // 7. Contact Form Feedback Simulation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Obrigado pelo seu contato! Sua mensagem foi enviada ao proprietário do Dunnas Bella Mares e responderemos em breve.');
      contactForm.reset();
    });
  }
});
