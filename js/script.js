const revealItems = document.querySelectorAll('.reveal');
const yearNodes = document.querySelectorAll('.year');
const heroCard = document.querySelector('.hero-card');
const statValues = document.querySelectorAll('.metric-row strong'); 
const themeToggle = document.getElementById('themeToggle');
const testimonials = document.querySelectorAll('.testimonial');
const canvas = document.getElementById('particles');

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

yearNodes.forEach((node) => {
  node.textContent = new Date().getFullYear();
});

if (heroCard) {
  heroCard.addEventListener('pointermove', (event) => {
    const rect = heroCard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    heroCard.style.transform = `perspective(1000px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg) translateY(-6px)`;
  });

  heroCard.addEventListener('pointerleave', () => {
    heroCard.style.transform = 'perspective(1000px) rotateX(8deg) rotateY(-10deg) translateY(0)';
  });
}

if (themeToggle) {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'light') {
    document.body.setAttribute('data-theme', 'light');
    themeToggle.querySelector('.theme-icon').textContent = '☾';
  }

  themeToggle.addEventListener('click', () => {
    const isLight = document.body.getAttribute('data-theme') === 'light';
    document.body.setAttribute('data-theme', isLight ? 'dark' : 'light');
    localStorage.setItem('theme', isLight ? 'dark' : 'light');
    themeToggle.querySelector('.theme-icon').textContent = isLight ? '☀︎' : '☾';
  });
}

// 🍿 PREMIUM: Professional 3D Falling Makhana Engine
if (canvas) {
  const ctx = canvas.getContext('2d');
  let animationFrameId;
  
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = (canvas.width = window.innerWidth);
    height = (canvas.height = window.innerHeight);
  });

  // Balanced count for premium aesthetic (No overcrowding)
  const maxMakahnas = 22;
  const makhanas = [];

  for (let i = 0; i < maxMakahnas; i++) {
    makhanas.push({
      x: Math.random() * width,
      y: Math.random() * height - height,
      r: Math.random() * 15 + 10, // Various sizes for 3D depth
      speed: Math.random() * 0.6 + 0.4, // Slow premium cinematic speed
      angle: Math.random() * Math.PI * 2,
      spin: Math.random() * 0.01 - 0.005,
      opacity: Math.random() * 0.25 + 0.15, // Subtle transparency to protect text readability
      depth: Math.random() * 0.5 + 0.5 // Depth factor for perspective parallax
    });
  }

  // Draw an organic 3D-ish stylized Makhana shape programmatically
  const drawMakhanaShape = (ctx, x, y, r) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    // Adding internal organic structural lines for realistic puff texture
    ctx.arc(x - r*0.2, y - r*0.1, r * 0.4, 0, Math.PI * 2);
    ctx.arc(x + r*0.3, y + r*0.2, r * 0.3, 0, Math.PI * 2);
  };

  const render3DMakhanas = () => {
    ctx.clearRect(0, 0, width, height);

    const isLight = document.body.getAttribute('data-theme') === 'light';

    makhanas.forEach((m) => {
      // Move downward based on depth multiplier
      m.y += m.speed * m.depth;
      m.angle += m.spin;

      // Wrap around when it hits bottom
      if (m.y > height + 40) {
        m.y = -40;
        m.x = Math.random() * width;
      }

      ctx.save();
      ctx.translate(m.x, m.y);
      ctx.rotate(m.angle);

      // Setup dynamic colors for premium aesthetics based on theme
      let baseColor = `rgba(255, 249, 235, ${m.opacity})`; // Warm creamy ivory tint
      let shadowColor = `rgba(184, 166, 255, ${m.opacity * 0.4})`; // Luxury subtle accent shade

      if (isLight) {
        baseColor = `rgba(240, 230, 210, ${m.opacity * 0.8})`;
        shadowColor = `rgba(108, 77, 255, 0.05)`;
      }

      // Applied elegant depth shadows
      ctx.shadowBlur = 12 * m.depth;
      ctx.shadowColor = shadowColor;
      ctx.shadowOffsetX = 4 * m.depth;
      ctx.shadowOffsetY = 6 * m.depth;

      // Fill basic makhana shade
      ctx.fillStyle = baseColor;
      drawMakhanaShape(ctx, 0, 0, m.r);
      ctx.fill();

      // Delicate stroke highlight for raw 3D edge definition
      ctx.strokeStyle = isLight ? `rgba(0,0,0,0.03)` : `rgba(255,255,255,0.06)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
    });

    animationFrameId = requestAnimationFrame(render3DMakhanas);
  };

  render3DMakhanas();
}

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

let testimonialIndex = 0;
const rotateTestimonials = () => {
  if (!testimonials.length) return;
  testimonials.forEach((testimonial, index) => {
    testimonial.classList.toggle('active', index === testimonialIndex);
  });
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
};

setInterval(rotateTestimonials, 4500);
rotateTestimonials();

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