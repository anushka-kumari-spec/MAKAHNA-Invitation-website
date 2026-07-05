const revealItems = document.querySelectorAll('.reveal');
const yearNodes = document.querySelectorAll('.year');
const heroCard = document.querySelector('.hero-card');
const statValues = document.querySelectorAll('.stats strong');
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

if (canvas) {
  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let particles = [];

  const resize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    particles = Array.from({ length: Math.min(80, Math.floor(width / 16)) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.4 + 0.8,
      speedX: (Math.random() - 0.5) * 0.55,
      speedY: (Math.random() - 0.5) * 0.55,
      alpha: Math.random() * 0.6 + 0.2
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((particle) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      if (particle.x < 0 || particle.x > width) particle.speedX *= -1;
      if (particle.y < 0 || particle.y > height) particle.speedY *= -1;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${particle.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  };

  resize();
  draw();
  window.addEventListener('resize', resize);
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
        const target = Number(entry.target.dataset.target || 0);
        const suffix = entry.target.dataset.suffix || '';
        entry.target.textContent = `0${suffix}`;
        animateValue(entry.target, 0, target, 1100);
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
    event.preventDefault();
    const messageBox = form.querySelector('.form-message');

    if (messageBox) {
      const name = form.querySelector('input[name="name"]')?.value?.trim() || 'there';
      messageBox.textContent = `Thank you, ${name}. Your request has been received. We will contact you shortly.`;
    }

    form.reset();
  });
});
