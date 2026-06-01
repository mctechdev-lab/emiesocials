// ===== IMAGES =====
const PHOTOS = [
  { key: 'photo_1', cat: 'photo', label: 'Fashion Shoot' },
  { key: 'photo_2', cat: 'graphic', label: 'Salon & Spa Design' },
  { key: 'photo_3', cat: 'photo', label: 'Creative Editorial' },
  { key: 'photo_4', cat: 'photo', label: 'Portrait Session' },
  { key: 'photo_5', cat: 'photo', label: 'Billboard Shoot' },
  { key: 'photo_couple_blue_outfits', cat: 'photo', label: 'Event Coverage' },
  { key: 'photo_event_mother_baby_blue', cat: 'photo', label: 'Event Portraits' },
  { key: 'photo_girl_red_dress_outdoor', cat: 'photo', label: 'Lifestyle Shoot' },
  { key: 'photo_guy_bench_hoodie', cat: 'photo', label: 'Street Fashion' },
  { key: 'photo_guy_indoor_green_hat', cat: 'photo', label: 'Indoor Fashion' },
  { key: 'photo_woman_baby_car', cat: 'photo', label: 'Event Photography' },
  { key: 'photo_woman_sofa_sunglasses', cat: 'photo', label: 'Portrait Session' },
  { key: 'photo_woman_traditional_attire', cat: 'photo', label: 'Cultural Portraits' },
  { key: 'graphic_zobo', cat: 'graphic', label: 'Product Flyer' },
  { key: 'graphic_mothersday', cat: 'graphic', label: "Mother's Day Flyer" },
  { key: 'graphic_anniversary', cat: 'graphic', label: 'Anniversary Flyer' },
  { key: 'graphic_workersday', cat: 'graphic', label: "Workers' Day Flyer" },
];

// ===== PRELOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const pre = document.getElementById('preloader');
    pre.style.opacity = '0';
    pre.style.transition = 'opacity 0.5s ease';
    setTimeout(() => pre.remove(), 500);
  }, 1600);
});

// ===== SET IMAGES FROM BASE64 =====
function setImages() {
  if (typeof IMAGES === 'undefined') return;
  const navLogo = document.getElementById('nav-logo-img');
  const footerLogo = document.getElementById('footerLogo');
  const ownerImg = document.getElementById('ownerImg');
  if (navLogo && IMAGES['logo-full']) navLogo.src = IMAGES['logo-full'];
  if (footerLogo && IMAGES['logo-full']) footerLogo.src = IMAGES['logo-full'];
  if (ownerImg && IMAGES['owner_emmanuel']) ownerImg.src = IMAGES['owner_emmanuel'];
  const preloaderLogo = document.getElementById('preloader-logo-img');
  if (preloaderLogo && IMAGES['logo-full']) preloaderLogo.src = IMAGES['logo-full'];

  // Visuals gallery (use action/outdoor shots)
  const visualsGallery = document.getElementById('visualsGallery');
  const visualKeys = ['photo_1','photo_3','photo_5','photo_guy_bench_hoodie','photo_guy_indoor_green_hat','photo_couple_blue_outfits'];
  if (visualsGallery) {
    visualKeys.forEach(key => {
      if (IMAGES[key]) {
        const img = document.createElement('img');
        img.src = IMAGES[key];
        img.alt = 'Emie Visuals';
        img.loading = 'lazy';
        img.onclick = () => openLightbox(key, visualKeys);
        visualsGallery.appendChild(img);
      }
    });
  }

  // Photo gallery
  const photoGallery = document.getElementById('photoGallery');
  const photoKeys = ['photo_1','photo_3','photo_4','photo_5','photo_couple_blue_outfits','photo_event_mother_baby_blue','photo_girl_red_dress_outdoor','photo_guy_bench_hoodie','photo_guy_indoor_green_hat','photo_woman_baby_car','photo_woman_sofa_sunglasses','photo_woman_traditional_attire'];
  if (photoGallery) {
    photoKeys.forEach((key, i) => {
      if (IMAGES[key]) {
        const img = document.createElement('img');
        img.src = IMAGES[key];
        img.alt = 'Photography Portfolio';
        img.loading = 'lazy';
        img.onclick = () => openLightbox(key, photoKeys);
        photoGallery.appendChild(img);
      }
    });
  }

  // Graphics gallery
  const graphicsGallery = document.getElementById('graphicsGallery');
  const graphicKeys = ['graphic_zobo','graphic_mothersday','graphic_anniversary','graphic_workersday'];
  if (graphicsGallery) {
    graphicKeys.forEach(key => {
      if (IMAGES[key]) {
        const img = document.createElement('img');
        img.src = IMAGES[key];
        img.alt = 'Graphic Design Portfolio';
        img.loading = 'lazy';
        img.onclick = () => openLightbox(key, graphicKeys);
        graphicsGallery.appendChild(img);
      }
    });
  }

  // Portfolio grid
  buildPortfolio('all');
}

// ===== PORTFOLIO =====
function buildPortfolio(filter) {
  const grid = document.getElementById('portfolioGrid');
  if (!grid || typeof IMAGES === 'undefined') return;
  grid.innerHTML = '';
  const filtered = filter === 'all' ? PHOTOS : PHOTOS.filter(p => p.cat === filter);
  filtered.forEach(photo => {
    if (!IMAGES[photo.key]) return;
    const item = document.createElement('div');
    item.className = 'portfolio-item';
    item.dataset.cat = photo.cat;
    item.innerHTML = `
      <img src="${IMAGES[photo.key]}" alt="${photo.label}" loading="lazy" />
      <div class="portfolio-overlay"><span>${photo.label}</span></div>
    `;
    item.onclick = () => {
      const keys = filtered.map(p => p.key);
      openLightbox(photo.key, keys);
    };
    grid.appendChild(item);
  });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    buildPortfolio(btn.dataset.filter);
  });
});

// ===== LIGHTBOX =====
let lightboxKeys = [];
let lightboxIndex = 0;

function openLightbox(key, keys) {
  lightboxKeys = keys;
  lightboxIndex = keys.indexOf(key);
  document.getElementById('lightboxImg').src = IMAGES[key] || '';
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}
function lightboxPrev() {
  lightboxIndex = (lightboxIndex - 1 + lightboxKeys.length) % lightboxKeys.length;
  document.getElementById('lightboxImg').src = IMAGES[lightboxKeys[lightboxIndex]] || '';
}
function lightboxNext() {
  lightboxIndex = (lightboxIndex + 1) % lightboxKeys.length;
  document.getElementById('lightboxImg').src = IMAGES[lightboxKeys[lightboxIndex]] || '';
}
document.addEventListener('keydown', e => {
  if (!document.getElementById('lightbox').classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lightboxPrev();
  if (e.key === 'ArrowRight') lightboxNext();
});

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== PARTICLES =====
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * 10}s;
      opacity: ${Math.random() * 0.5 + 0.1};
    `;
    container.appendChild(p);
  }
}

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
        // Counter
        entry.target.querySelectorAll('.stat-num, .metric-num').forEach(el => animateCounter(el));
        if (entry.target.classList.contains('stat-num') || entry.target.classList.contains('metric-num')) {
          animateCounter(entry.target);
        }
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

function observeAll() {
  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
  });
  document.querySelectorAll('.stat-num, .metric-num').forEach(el => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { animateCounter(el); obs.disconnect(); }
    }, { threshold: 0.5 });
    obs.observe(el);
  });
}

// ===== PRICING TABS =====
document.querySelectorAll('.price-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.price-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.price-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
  });
});

// ===== BOOKING SYSTEM =====
const PACKAGES = {
  Photography: [
    { name: 'Per Edited Copy (Studio/Outdoor)', price: '₦2,400/pic' },
    { name: 'Event Photography (Birthdays/Gigs)', price: '₦40,000' },
    { name: 'Wedding Photography', price: '₦120,000' },
  ],
  Videography: [
    { name: 'Brand Content Creation (Per Video)', price: '₦20,000' },
    { name: 'Social Media Content Batch (5 Videos)', price: '₦80,000' },
    { name: 'Event Video Coverage', price: '₦56,000' },
    { name: 'Premium Event / Wedding Videography', price: '₦160,000' },
  ],
  'Graphic Design': [
    { name: 'Single Flyer Design', price: '₦8,000' },
    { name: 'Business Logo Design', price: '₦20,000' },
    { name: 'Full Corporate Branding Kit', price: '₦48,000' },
  ],
  'Social Media Management': [
    { name: 'Market Visibility Package', price: '₦64,000/month' },
    { name: 'Brand Dominance Package', price: '₦120,000/month' },
  ],
  'Paid Ads Management': [
    { name: 'Ad Campaign Setup & Management', price: '₦32,000/month' },
  ],
};

let bookingState = { step: 1, service: '', package: '', name: '', phone: '', note: '' };

document.querySelectorAll('.book-opt').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.book-opt').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    bookingState.service = btn.dataset.service;
    bookingState.package = '';
  });
});

function bookingNext() {
  if (bookingState.step === 1) {
    if (!bookingState.service) { alert('Please select a service first.'); return; }
    showStep(2);
    renderPackages();
  } else if (bookingState.step === 2) {
    if (!bookingState.package) { alert('Please select a package.'); return; }
    showStep(3);
  } else if (bookingState.step === 3) {
    bookingState.name = document.getElementById('bookName').value.trim();
    bookingState.phone = document.getElementById('bookPhone').value.trim();
    bookingState.note = document.getElementById('bookNote').value.trim();
    if (!bookingState.name || !bookingState.phone) { alert('Please fill in your name and phone number.'); return; }
    showStep(4);
    renderSummary();
  } else if (bookingState.step === 4) {
    if (!document.getElementById('policyAgree').checked) { alert('Please agree to the booking policy to continue.'); return; }
    sendToWhatsApp();
  }
}

function bookingBack() {
  if (bookingState.step > 1) showStep(bookingState.step - 1);
}

function showStep(step) {
  bookingState.step = step;
  for (let i = 1; i <= 4; i++) {
    document.getElementById('step' + i).classList.toggle('hidden', i !== step);
  }
  document.getElementById('btnBack').style.display = step > 1 ? 'inline-flex' : 'none';
  const nextBtn = document.getElementById('btnNext');
  nextBtn.textContent = step === 4 ? '✅ Confirm & Book via WhatsApp →' : 'Next Step →';
}

function renderPackages() {
  const list = document.getElementById('packageList');
  list.innerHTML = '';
  (PACKAGES[bookingState.service] || []).forEach(pkg => {
    const div = document.createElement('div');
    div.className = 'pkg-opt';
    div.innerHTML = `<span class="pkg-name">${pkg.name}</span><span class="pkg-price">${pkg.price}</span>`;
    div.onclick = () => {
      document.querySelectorAll('.pkg-opt').forEach(p => p.classList.remove('selected'));
      div.classList.add('selected');
      bookingState.package = `${pkg.name} — ${pkg.price}`;
    };
    list.appendChild(div);
  });
}

function renderSummary() {
  document.getElementById('bookingSummary').innerHTML = `
    <p><strong>Service:</strong> ${bookingState.service}</p>
    <p><strong>Package:</strong> ${bookingState.package}</p>
    <p><strong>Name:</strong> ${bookingState.name}</p>
    <p><strong>Phone:</strong> ${bookingState.phone}</p>
    ${bookingState.note ? `<p><strong>Notes:</strong> ${bookingState.note}</p>` : ''}
    <p style="margin-top:12px;color:#4d7cff;font-size:0.85rem;"><strong>⚠️ Reminder:</strong> 50% commitment fee required to secure booking.</p>
  `;
}

function sendToWhatsApp() {
  const msg = `Hello Emie Socials! 👋

I'd like to book a session:

📌 *Service:* ${bookingState.service}
📦 *Package:* ${bookingState.package}
👤 *Name:* ${bookingState.name}
📞 *Phone:* ${bookingState.phone}
${bookingState.note ? `📝 *Notes:* ${bookingState.note}` : ''}

I understand that a 50% non-refundable commitment fee is required to secure my booking, and the balance is due upon delivery. Kindly confirm availability. Thank you!`;

  const encoded = encodeURIComponent(msg);
  window.open(`https://wa.me/2349049086446?text=${encoded}`, '_blank');
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  setImages();
  createParticles();
  observeAll();
});

// ===== DARK MODE TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
let isDark = localStorage.getItem('theme') === 'dark';

function applyTheme() {
  document.body.classList.toggle('dark', isDark);
  themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}
applyTheme();

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    applyTheme();
  });
}

// ===== ENHANCED SCROLL REVEAL (staggered, physics-based) =====
const enhancedObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Stagger children if it's a grid container
      const children = entry.target.querySelectorAll(
        '.service-card, .price-card, .process-card, .testimonial-card, .contact-card, .pow-card, .portfolio-item'
      );
      if (children.length > 0) {
        children.forEach((child, i) => {
          child.style.transitionDelay = `${i * 0.1}s`;
          setTimeout(() => {
            child.classList.add('visible');
          }, i * 80);
        });
      }
      enhancedObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -60px 0px' });

// Observe grid containers for stagger
document.querySelectorAll('.services-grid, .price-cards, .process-grid, .testimonials-grid, .contact-grid, .portfolio-grid, .pow-grid').forEach(el => {
  enhancedObserver.observe(el);
});

// ===== NAVBAR ACTIVE LINK HIGHLIGHT ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks2 = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });
  navLinks2.forEach(link => {
    link.classList.remove('active-link');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active-link');
    }
  });
}, { passive: true });

// ===== SMOOTH CARD TILT EFFECT (subtle 3D on mouse move) =====
document.querySelectorAll('.service-card, .process-card, .testimonial-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== SMOOTH PAGE ENTRY ANIMATION =====
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});
