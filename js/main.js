/* ============================================
   LIMA BARBEARIA — Main Application
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Mobile Nav Toggle ---- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    const closeMenu = (returnFocus) => {
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
      if (returnFocus) {
        navToggle.focus();
      }
    };

    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
      navMenu.classList.toggle('active');
      document.body.style.overflow = expanded ? '' : 'hidden';
      if (!expanded) {
        const firstLink = navMenu.querySelector('a[href], button');
        if (firstLink) {
          firstLink.focus();
        }
      }
    });

    document.querySelectorAll('.header__nav-link, .header__nav-cta').forEach(link => {
      link.addEventListener('click', () => closeMenu(false));
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.header__nav') && !e.target.closest('.header__nav-toggle')) {
        closeMenu(false);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMenu(true);
      }

      if (e.key === 'Tab' && navMenu.classList.contains('active')) {
        const isMobile = window.getComputedStyle(navToggle).display !== 'none';
        if (isMobile) {
          const focusables = navMenu.querySelectorAll('a[href], button');
          if (focusables.length > 0) {
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            if (e.shiftKey && document.activeElement === first) {
              e.preventDefault();
              last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      }
    });
  }

  /* ---- Header Scroll Effect ---- */
  const header = document.getElementById('header');
  let lastScroll = 0;

  if (header) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 50) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  /* ---- Scroll Reveal ---- */
  const revealElements = document.querySelectorAll('[data-reveal]');

  if (revealElements.length > 0) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const siblings = el.parentElement
            ? Array.from(el.parentElement.children).filter(child => child.classList.contains('revealed') === false)
            : [];
          if (!reduceMotion.matches && siblings.length > 1) {
            const index = Math.min(siblings.indexOf(el), 5);
            el.style.transitionDelay = (index * 80) + 'ms';
          } else {
            el.style.transitionDelay = '0ms';
          }
          el.classList.add('revealed');
          revealObserver.unobserve(el);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* ---- Counter Animation ---- */
  const counterElements = document.querySelectorAll('[data-count]');

  if (counterElements.length > 0) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);

          if (reduceMotion.matches) {
            el.textContent = target;
          } else {
            const index = Array.from(counterElements).indexOf(el);
            const delay = index * 250;
            const duration = 2000;
            const startTime = performance.now() + delay;

            function animateCounter(currentTime) {
              const elapsed = currentTime - startTime;
              if (elapsed < 0) {
                requestAnimationFrame(animateCounter);
                return;
              }
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = Math.floor(eased * target);
              el.textContent = current;
              if (progress < 1) {
                requestAnimationFrame(animateCounter);
              } else {
                el.textContent = target;
              }
            }

            requestAnimationFrame(animateCounter);
          }

          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counterElements.forEach(el => counterObserver.observe(el));
  }

  /* ---- Gallery Lightbox ---- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const galleryItems = document.querySelectorAll('.gallery__item');

  if (lightbox && lightboxImg && galleryItems.length > 0) {
    galleryItems.forEach(item => {
      const img = item.querySelector('img');
      const caption = item.querySelector('.gallery__caption span');
      const label = caption ? caption.textContent : (img ? img.alt : 'Ampliar imagem');
      item.tabIndex = 0;
      item.setAttribute('role', 'button');
      item.setAttribute('aria-label', 'Ampliar imagem: ' + label);

      const openLightbox = () => {
        lightboxImg.src = img.dataset.full || img.src;
        lightboxImg.alt = img ? img.alt : '';
        if (lightboxCaption) {
          lightboxCaption.textContent = caption ? caption.textContent : '';
        }
        if (typeof lightbox.showModal === 'function') {
          lightbox.showModal();
        } else {
          lightbox.setAttribute('open', '');
        }
        if (lightboxClose) {
          lightboxClose.focus();
        }
      };

      item.addEventListener('click', openLightbox);
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox();
        }
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', () => {
        if (typeof lightbox.close === 'function') {
          lightbox.close();
        } else {
          lightbox.removeAttribute('open');
        }
      });
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        if (typeof lightbox.close === 'function') {
          lightbox.close();
        } else {
          lightbox.removeAttribute('open');
        }
      }
    });
  }

  /* ---- Back to Top ---- */
  const backToTop = document.getElementById('backToTop');

  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---- FAQ Accordion (close others on open) ---- */
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach(other => {
          if (other !== item && other.open) {
            other.open = false;
          }
        });
      }
    });
  });

  /* ---- Smooth Scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    });
  });

});
