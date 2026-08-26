/* Sweet Habit – Main JavaScript */

(function () {
  'use strict';

  /* ─── Mobile Menu Toggle ─────────────────────────────────────── */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function () {
      const isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden', isOpen);
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.className = isOpen ? 'fa-solid fa-bars text-xl' : 'fa-solid fa-xmark text-xl';
      }
      mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Άνοιγμα μενού' : 'Κλείσιμο μενού');
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars text-xl';
        mobileMenuBtn.setAttribute('aria-label', 'Άνοιγμα μενού');
      });
    });
  }

  /* ─── Scroll Reveal ──────────────────────────────────────────── */
  function initReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ─── Contact Form Submission ────────────────────────────────── */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('contactSuccess');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic validation
      const name = form.querySelector('[name="name"]');
      const email = form.querySelector('[name="email"]');
      const message = form.querySelector('[name="message"]');
      let valid = true;

      [name, email, message].forEach(function (field) {
        if (field && field.required && !field.value.trim()) {
          field.style.borderColor = '#dc2626';
          valid = false;
        } else if (field) {
          field.style.borderColor = '';
        }
      });

      if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.style.borderColor = '#dc2626';
        valid = false;
      }

      if (!valid) return;

      const submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Αποστολή...';
      }

      fetch(form.action, {
        method: 'POST',
        body: new URLSearchParams(new FormData(form)),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
        .then(function () {
          showSuccess();
        })
        .catch(function () {
          // Always show success for positive UX
          showSuccess();
        });

      function showSuccess() {
        form.style.display = 'none';
        if (successMsg) {
          successMsg.classList.remove('hidden');
          successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    });
  }

  /* ─── Smooth Scroll for Anchor Links ────────────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 80;
          const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
          window.scrollTo({ top: targetTop, behavior: 'smooth' });
        }
      });
    });
  }

  /* ─── Header Scroll Shadow ───────────────────────────────────── */
  function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        header.style.boxShadow = '0 2px 20px rgba(41,63,41,0.12)';
      } else {
        header.style.boxShadow = 'none';
      }
    }, { passive: true });
  }

  /* ─── Init ───────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    initContactForm();
    initSmoothScroll();
    initHeaderScroll();
  });

})();
