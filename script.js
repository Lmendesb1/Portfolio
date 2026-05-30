/**
 * Lucas Mendes — PORTFOLIO
 * script.js
 *
 * Funcionalidades:
 *  1. Cursor personalizado
 *  2. Navbar (scroll + hamburger)
 *  3. Typewriter effect
 *  4. Reveal on scroll (IntersectionObserver)
 *  5. Skill bars animadas
 *  6. Active nav link on scroll
 *  7. Validação e feedback do formulário
 *  8. Footer year
 */

/* ─────────────────────────────────────────────────────────
   1. CURSOR PERSONALIZADO
───────────────────────────────────────────────────────── */
(function initCursor() {
  const cursor      = document.getElementById('cursor');
  const cursorTrail = document.getElementById('cursorTrail');
  if (!cursor || !cursorTrail) return;

  let mouseX = 0, mouseY = 0;
  let trailX  = 0, trailY  = 0;
  let rafId;

  /* Actualiza posição do cursor principal imediatamente */
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  /* Trail com lag suave */
  function animateTrail() {
    trailX += (mouseX - trailX) * 0.12;
    trailY += (mouseY - trailY) * 0.12;
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top  = trailY + 'px';
    rafId = requestAnimationFrame(animateTrail);
  }
  animateTrail();

  /* Esconde quando o rato sai da janela */
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity      = '0';
    cursorTrail.style.opacity = '0';
    cancelAnimationFrame(rafId);
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity      = '1';
    cursorTrail.style.opacity = '0.4';
    animateTrail();
  });
})();


/* ─────────────────────────────────────────────────────────
   2. NAVBAR
───────────────────────────────────────────────────────── */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const allLinks  = navLinks?.querySelectorAll('.nav-link');

  /* Efeito de scroll */
  const onScroll = () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // estado inicial

  /* Menu hamburger (mobile) */
  hamburger?.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    navLinks?.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  /* Fecha menu ao clicar num link */
  allLinks?.forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      navLinks?.classList.remove('open');
    });
  });
})();


/* ─────────────────────────────────────────────────────────
   3. TYPEWRITER EFFECT
───────────────────────────────────────────────────────── */
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = [
    'Frontend Developer',
    'Programming Instructor',
    'Constant Student',
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let deleting    = false;
  let paused      = false;

  function type() {
    const current = phrases[phraseIndex];

    if (deleting) {
      el.textContent = current.slice(0, charIndex--);
    } else {
      el.textContent = current.slice(0, charIndex++);
    }

    let delay = deleting ? 50 : 90;

    if (!deleting && charIndex > current.length) {
      /* Pausa antes de apagar */
      delay    = 2000;
      deleting = true;
    } else if (deleting && charIndex < 0) {
      /* Próxima frase */
      deleting    = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      charIndex   = 0;
      delay       = 500;
    }

    setTimeout(type, delay);
  }

  /* Pequeno atraso para a animação de entrada terminar */
  setTimeout(type, 1200);
})();


/* ─────────────────────────────────────────────────────────
   4. REVEAL ON SCROLL
───────────────────────────────────────────────────────── */
(function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          /* Não precisa de observar mais após revelar */
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  items.forEach(item => observer.observe(item));
})();


/* ─────────────────────────────────────────────────────────
   5. SKILL BARS ANIMADAS
───────────────────────────────────────────────────────── */
(function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const level = entry.target.dataset.level || '0';
          /* Pequeno delay para a animação de reveal terminar */
          setTimeout(() => {
            entry.target.style.width = level + '%';
          }, 200);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  fills.forEach(fill => observer.observe(fill));
})();


/* ─────────────────────────────────────────────────────────
   6. ACTIVE NAV LINK ON SCROLL
───────────────────────────────────────────────────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('active', isActive);
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(section => observer.observe(section));
})();


/* ─────────────────────────────────────────────────────────
   7. FORMULÁRIO DE CONTACTO
───────────────────────────────────────────────────────── */
(function initContactForm() {
  const form        = document.getElementById('contactForm');
  const submitBtn   = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');
  if (!form) return;

  /**
   * Valida um campo e mostra mensagem de erro.
   * Retorna true se válido.
   */
  function validateField(input, errorEl, rules) {
    const value = input.value.trim();
    let message = '';

    if (rules.required && !value) {
      message = 'This field is required.';
    } else if (rules.email && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      message = 'Enter a valid email address.';
    } else if (rules.minLength && value.length < rules.minLength) {
      message = `Minimum of ${rules.minLength} characters.`;
    }

    if (message) {
      errorEl.textContent = message;
      input.classList.add('error');
      return false;
    } else {
      errorEl.textContent = '';
      input.classList.remove('error');
      return true;
    }
  }

  /* Validação em tempo real (ao sair do campo) */
  const nameInput    = document.getElementById('name');
  const emailInput   = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameError    = document.getElementById('nameError');
  const emailError   = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  nameInput?.addEventListener('blur', () =>
    validateField(nameInput, nameError, { required: true, minLength: 2 })
  );
  emailInput?.addEventListener('blur', () =>
    validateField(emailInput, emailError, { required: true, email: true })
  );
  messageInput?.addEventListener('blur', () =>
    validateField(messageInput, messageError, { required: true, minLength: 10 })
  );

  /* Submissão */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    /* Valida todos os campos obrigatórios */
    const validName    = validateField(nameInput,    nameError,    { required: true, minLength: 2 });
    const validEmail   = validateField(emailInput,   emailError,   { required: true, email: true });
    const validMessage = validateField(messageInput, messageError, { required: true, minLength: 10 });

    if (!validName || !validEmail || !validMessage) return;

    /* Simula envio (substitui por fetch real se necessário) */
    const btnText = submitBtn.querySelector('.btn-text');
    if (btnText) btnText.textContent = 'A enviar…';
    submitBtn.disabled = true;

    setTimeout(() => {
      /* Mostra sucesso */
      formSuccess?.classList.add('visible');
      form.reset();

      /* Restaura botão após 3 segundos */
      setTimeout(() => {
        if (btnText) btnText.textContent = 'Enviar Mensagem';
        submitBtn.disabled = false;
        formSuccess?.classList.remove('visible');
      }, 4000);
    }, 1200);
  });
})();


/* ─────────────────────────────────────────────────────────
   8. FOOTER — ANO DINÂMICO
───────────────────────────────────────────────────────── */
(function initFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
})();


/* ─────────────────────────────────────────────────────────
   BÓNUS: Efeito parallax subtil no hero ao scroll
───────────────────────────────────────────────────────── */
(function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroBg.style.transform = `translateY(${y * 0.25}px)`;
    }
  }, { passive: true });
})();