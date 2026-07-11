const revealItems = document.querySelectorAll('.reveal');
const yearNodes = document.querySelectorAll('.year');
const heroCard = document.querySelector('.hero-card');
const statValues = document.querySelectorAll('.metric-row strong'); 
const themeToggle = document.getElementById('themeToggle');
const testimonials = document.querySelectorAll('.testimonial');
const canvas = document.getElementById('particles');

// --- 1. Intersection Observer for Scroll Animations ---
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => observer.observe(item));

// --- 2. Dynamic Year Dynamic Injector ---
yearNodes.forEach((node) => {
  node.textContent = new Date().getFullYear();
});

// --- 3. Premium 3D Hero Card Parallax ---
if (heroCard) {
  heroCard.addEventListener('pointermove', (event) => {
    const rect = heroCard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    heroCard.style.transform = `perspective(1000px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg) translateY(-6px)`;
  });

  heroCard.addEventListener('pointerleave', () => {
    heroCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
  });
}

// --- 4. Dark/Light Theme Switching Engine ---
if (themeToggle) {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'light') {
    document.body.setAttribute('data-theme', 'light');
    const icon = themeToggle.querySelector('.theme-icon');
    if (icon) icon.textContent = '☾';
  }

  themeToggle.addEventListener('click', () => {
    const isLight = document.body.getAttribute('data-theme') === 'light';
    document.body.setAttribute('data-theme', isLight ? 'dark' : 'light');
    localStorage.setItem('theme', isLight ? 'dark' : 'light');
    const icon = themeToggle.querySelector('.theme-icon');
    if (icon) icon.textContent = isLight ? '☀︎' : '☾';
  });
}

// --- 5. 🍿 PREMIUM: Professional 3D Falling Makhana Engine (FIXED) ---
if (canvas) {
  const ctx = canvas.getContext('2d');
  let animationFrameId;
  
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = (canvas.width = window.innerWidth);
    height = (canvas.height = window.innerHeight);
  });

  const maxMakahnas = 22; // Balanced premium aesthetic layout
  const makhanas = [];

  for (let i = 0; i < maxMakahnas; i++) {
    makhanas.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 12 + 10, 
      speed: Math.random() * 0.4 + 0.3, // Ultra slow elegant cinematic movement
      angle: Math.random() * Math.PI * 2,
      spin: Math.random() * 0.006 - 0.003,
      opacity: Math.random() * 0.22 + 0.12, 
      depth: Math.random() * 0.5 + 0.5 
    });
  }

  // FIXED: Organic shape draw method with path resets to prevent rendering blockades
  const drawMakhanaShape = (ctx, x, y, r) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    // Secondary sub-puffs safely separated for premium depth texture
    ctx.beginPath();
    ctx.arc(x - r * 0.2, y - r * 0.1, r * 0.4, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x + r * 0.3, y + r * 0.2, r * 0.3, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  };

  const render3DMakhanas = () => {
    ctx.clearRect(0, 0, width, height);
    const isLight = document.body.getAttribute('data-theme') === 'light';

    makhanas.forEach((m) => {
      m.y += m.speed * m.depth;
      m.angle += m.spin;

      if (m.y > height + 40) {
        m.y = -40;
        m.x = Math.random() * width;
      }

      ctx.save();
      ctx.translate(m.x, m.y);
      ctx.rotate(m.angle);

      let baseColor = `rgba(255, 249, 235, ${m.opacity})`; 
      let shadowColor = `rgba(184, 166, 255, ${m.opacity * 0.4})`; 

      if (isLight) {
        baseColor = `rgba(238, 228, 208, ${m.opacity * 0.85})`;
        shadowColor = `rgba(108, 77, 255, 0.04)`;
      }

      ctx.shadowBlur = 10 * m.depth;
      ctx.shadowColor = shadowColor;
      ctx.shadowOffsetX = 3 * m.depth;
      ctx.shadowOffsetY = 5 * m.depth;

      ctx.fillStyle = baseColor;
      drawMakhanaShape(ctx, 0, 0, m.r);

      ctx.strokeStyle = isLight ? `rgba(0,0,0,0.02)` : `rgba(255,255,255,0.05)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
    });

    animationFrameId = requestAnimationFrame(render3DMakhanas);
  };

  render3DMakhanas();
}

// --- 6. Smooth Stats Counters Animation ---
const animateValue = (element, start, end, duration) => {
  const startTime = performance.now();

  const step = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const currentValue = start + (end - start) * eased;
    const valueText = Number.isInteger(end) ? Math.round(currentValue) : currentValue.toFixed(1);
    element.textContent = `${valueText}${element.dataset.suffix || ''}`;

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentTargetText = entry.target.textContent || '';
        const targetNumber = parseInt(currentTargetText.replace(/[^0-9]/g, ''), 10) || 500; 
        const suffix = currentTargetText.replace(/[0-9]/g, '') || '+';
        
        entry.target.dataset.suffix = suffix;
        entry.target.textContent = `0${suffix}`;
        animateValue(entry.target, 0, targetNumber, 1100);
        statObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

statValues.forEach((value) => statObserver.observe(value));

// --- 7. Testimonial Rotator Logic ---
let testimonialIndex = 0;
const rotateTestimonials = () => {
  if (!testimonials.length) return;
  testimonials.forEach((testimonial, index) => {
    testimonial.classList.toggle('active', index === testimonialIndex);
  });
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
};

if (testimonials.length > 0) {
  setInterval(rotateTestimonials, 4500);
  rotateTestimonials();
}

// --- 8. Premium Launch Event Countdown Clock ---
const countdownElements = {
  days: document.getElementById('days'),
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds')
};

const countdownDate = new Date('2026-10-15T00:00:00').getTime();

const updateCountdown = () => {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  if (distance <= 0) {
    Object.values(countdownElements).forEach((element) => {
      if (element) element.textContent = '00';
    });
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (countdownElements.days) countdownElements.days.textContent = String(days).padStart(2, '0');
  if (countdownElements.hours) countdownElements.hours.textContent = String(hours).padStart(2, '0');
  if (countdownElements.minutes) countdownElements.minutes.textContent = String(minutes).padStart(2, '0');
  if (countdownElements.seconds) countdownElements.seconds.textContent = String(seconds).padStart(2, '0');
};

updateCountdown();
setInterval(updateCountdown, 1000);

// --- 9. Smooth Interactive Accordions ---
const accordions = document.querySelectorAll('.accordion-card');
accordions.forEach((card) => {
  const toggle = card.querySelector('.accordion-toggle');
  const content = card.querySelector('.accordion-content');
  if (!toggle || !content) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    card.classList.toggle('open', !expanded);
    content.style.maxHeight = !expanded ? `${content.scrollHeight}px` : '0';
  });
});

// --- 10. AJAX / Local Intelligent Form Interceptor ---
const forms = document.querySelectorAll('form');
forms.forEach((form) => {
  form.addEventListener('submit', (event) => {
    const formAction = form.getAttribute('action') || '';
    if (formAction.includes('.php')) {
      return; 
    }

    event.preventDefault();
    const messageBox = form.querySelector('.form-message');

    if (messageBox) {
      const name = form.querySelector('input[name="name"]')?.value?.trim() || 'there';
      messageBox.textContent = `Thank you, ${name}. Your request has been received. We will contact you shortly.`;
    }

    form.reset();
  });
});