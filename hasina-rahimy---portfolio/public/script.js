// Hero Name Stagger & Gradient Initialization
function initHeroNameAnimation() {
  const heroNameEl = document.getElementById('hero-name');
  if (!heroNameEl) return;

  const currentLang = document.documentElement.getAttribute('lang') || 'en';
  const rawText = (typeof I18N_TRANSLATIONS !== 'undefined' && I18N_TRANSLATIONS[currentLang] ? I18N_TRANSLATIONS[currentLang].heroName : null) || heroNameEl.getAttribute('data-name') || heroNameEl.textContent.trim() || 'Hasina Rahimy';
  heroNameEl.setAttribute('aria-label', rawText);
  heroNameEl.innerHTML = '';

  const words = rawText.split(' ');
  let globalCharIndex = 0;

  words.forEach((wordText, wordIdx) => {
    const wordSpan = document.createElement('span');
    wordSpan.className = 'hero-name-word';

    Array.from(wordText).forEach((char) => {
      const charSpan = document.createElement('span');
      charSpan.className = 'hero-name-char';
      charSpan.style.setProperty('--char-index', globalCharIndex);
      charSpan.textContent = char;
      wordSpan.appendChild(charSpan);
      globalCharIndex++;
    });

    heroNameEl.appendChild(wordSpan);

    if (wordIdx < words.length - 1) {
      const spaceSpan = document.createElement('span');
      spaceSpan.className = 'hero-name-space';
      spaceSpan.innerHTML = '&nbsp;';
      heroNameEl.appendChild(spaceSpan);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroNameAnimation);
} else {
  initHeroNameAnimation();
}

// Menu icon on the navigation bar 
let menuIcon = document.getElementById('menu-icon');
let navBar = document.querySelector('.navbar');

if (menuIcon && navBar) {
  menuIcon.onclick = () => {
    navBar.classList.toggle('active');
    menuIcon.classList.toggle('bx-x');
  };
}

// Sticky Nav & Active link on scroll
let header = document.querySelector('header');
let sections = document.querySelectorAll('section');

window.onscroll = () => {
  let navLinks = document.querySelectorAll('header .navbar a, .floating-bottom-nav .nav-center a');
  if (sections && navLinks.length) {
    sections.forEach((sec) => {
      let top = window.scrollY;
      let offSet = sec.offsetTop - 150;
      let height = sec.offsetHeight;
      let id = sec.getAttribute('id');

      if (top >= offSet && top < offSet + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
        });
        let targetLinks = document.querySelectorAll('header .navbar a[href*=' + id + '], .floating-bottom-nav .nav-center a[href*=' + id + ']');
        targetLinks.forEach((link) => link.classList.add('active'));
      }
    });
  }

  if (header) {
    header.classList.toggle('sticky', window.scrollY > 100);
  }

  // Remove Navbar when active link (click) 
  if (navBar && menuIcon) {
    navBar.classList.remove('active');
    menuIcon.classList.remove('bx-x');
  }
};

// Vanilla JS Typewriter Animation for Hero Section Roles
let typewriterTimerId = null;

function initTypewriter(customRoles) {
  const roleTextEl = document.getElementById('hero-typewriter-text');
  const cursorEl = document.getElementById('hero-typewriter-cursor');

  if (!roleTextEl) return;

  if (typewriterTimerId) {
    clearTimeout(typewriterTimerId);
    typewriterTimerId = null;
  }

  const currentLang = document.documentElement.getAttribute('lang') || 'en';
  const roles = customRoles || (typeof I18N_TRANSLATIONS !== 'undefined' && I18N_TRANSLATIONS[currentLang] ? I18N_TRANSLATIONS[currentLang].heroRoles : [
    'Frontend Developer',
    'Graphic Designer',
    'UI/UX Enthusiast',
    'Problem Solver'
  ]);

  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (mediaQuery && mediaQuery.matches) {
    roleTextEl.textContent = roles[0];
    if (cursorEl) cursorEl.style.display = 'none';
    return;
  }

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeStep() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
      roleTextEl.textContent = currentRole.substring(0, charIndex);
    } else {
      charIndex++;
      roleTextEl.textContent = currentRole.substring(0, charIndex);
    }

    let delay = isDeleting ? 45 : 85;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = 1800; // Pause 1.8 seconds once fully typed
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 350; // Brief pause before typing next word
    }

    typewriterTimerId = setTimeout(typeStep, delay);
  }

  if (mediaQuery) {
    mediaQuery.addEventListener('change', (e) => {
      if (e.matches) {
        if (typewriterTimerId) clearTimeout(typewriterTimerId);
        roleTextEl.textContent = roles[0];
        if (cursorEl) cursorEl.style.display = 'none';
      } else {
        if (cursorEl) cursorEl.style.display = 'inline-block';
        roleIndex = 0;
        charIndex = 0;
        isDeleting = false;
        typeStep();
      }
    });
  }

  typeStep();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTypewriter);
} else {
  initTypewriter();
}

// Swiper Slider JavaScript
function initTestimonialSwiper() {
  const sliderEl = document.querySelector('.slider-wrapper');
  if (!sliderEl) return;

  if (typeof Swiper !== 'undefined') {
    const testimonialSwiper = new Swiper('.slider-wrapper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      grabCursor: true,
      speed: 650,
      autoplay: {
        delay: 5500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: '.testimonial-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.testimonial-next, .testimonial-next-mobile',
        prevEl: '.testimonial-prev, .testimonial-prev-mobile',
      },
    });

    // Pause autoplay on mouse enter and resume on mouse leave
    const carouselContainer = document.querySelector('.slide-container');
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', () => {
        if (testimonialSwiper && testimonialSwiper.autoplay && testimonialSwiper.autoplay.running) {
          testimonialSwiper.autoplay.stop();
        }
      });
      carouselContainer.addEventListener('mouseleave', () => {
        if (testimonialSwiper && testimonialSwiper.autoplay && !testimonialSwiper.autoplay.running) {
          testimonialSwiper.autoplay.start();
        }
      });
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTestimonialSwiper);
} else {
  initTestimonialSwiper();
}

// Scroll Reveal JavaScript
if (typeof ScrollReveal !== 'undefined') {
  const sr = ScrollReveal({
    reset: false,
    distance: '60px',
    duration: 1800,
  });

  sr.reveal('.hero-sidebar-card, .heading, .service-box', { origin: 'left' });
  sr.reveal('.hero-eyebrow, .hero-greeting, .hero-headline', { origin: 'top' });
  sr.reveal('.hero-paragraph, .stat-card, .slider-wrapper, button, .contact-card, .text-typing-about', { origin: 'bottom' });
  sr.reveal('.about-img, .service-box p, .left-section-details, .footer-text, .social-media', { origin: 'left' });
  sr.reveal('.text-about-content, .footer-icon', { origin: 'right' });

  // Staggered interval reveal for portfolio project cards
  sr.reveal('.portfoli-box', { origin: 'bottom', distance: '40px', duration: 1000, interval: 100 });
}

// =========================================================
// PORTFOLIO PROJECTS DATA & MODAL CASE STUDY
// =========================================================

const projectsData = [
  {
    id: 1,
    image: "photo1.jpg",
    liveUrl: "#",
    codeUrl: "#",
    en: {
      title: "E-Commerce Web App",
      shortDescription: "Modern, responsive online shopping platform with intuitive product flow.",
      longDescription: "A full-featured, responsive e-commerce web application designed with seamless product discovery, dynamic filtering, real-time cart state management, and an optimized checkout workflow. Built with high performance and accessibility in mind, ensuring a frictionless shopping experience across desktop and mobile devices.",
      tags: ["HTML5", "CSS3", "JavaScript", "E-Commerce", "UI/UX"]
    },
    da: {
      title: "اپلیکیشن وب تجارت الکترونیک",
      shortDescription: "پلتفرم خرید آنلاین مدرن و پاسخگو با جریان هوشمند محصولات.",
      longDescription: "یک اپلیکیشن وب تجارت الکترونیک کاملاً پاسخگو و پیشرفته با قابلیت جستجوی آسان، فیلتر برنامه‌ریزی‌شده، مدیریت حالت سبد خرید و مراحل پرداخت بهینه. طراحی شده برای عملکرد بالا و سهولت استفاده در تمامی دستگاه‌ها.",
      tags: ["HTML5", "CSS3", "JavaScript", "تجارت الکترونیک", "UI/UX"]
    }
  },
  {
    id: 2,
    image: "photo2.jpg",
    liveUrl: "#",
    codeUrl: "#",
    en: {
      title: "Brand Identity & Graphic Design",
      shortDescription: "Minimalist brand identity and comprehensive visual creative suite.",
      longDescription: "A cohesive visual brand identity package featuring custom typography, vector brand assets, style guidelines, and marketing collateral designed to maximize brand recognition across digital and print channels. Focused on creating memorable and elevated aesthetic consistency.",
      tags: ["Graphic Design", "Branding", "Figma", "Photoshop", "Typography"]
    },
    da: {
      title: "هویت برند و طراحی گرافیک",
      shortDescription: "هویت برند مینی مالیستی و مجموعه کامل خلاقیت‌های بصری.",
      longDescription: "مجموعه هماهنگ هویت بصری برند شامل تایپوگرافی اختصاصی، دارایی‌های برداری برند، راهنمای سبک و اقلام تبلیغاتی طراحی شده برای افزایش شناخته شدن برند در کانال‌های دیجیتال و چاپ.",
      tags: ["طراحی گرافیک", "برندسازی", "فیگما", "فوتوشاپ", "تایپوگرافی"]
    }
  },
  {
    id: 3,
    image: "photo3.jpg",
    liveUrl: "#",
    codeUrl: "#",
    en: {
      title: "Analytics & UI/UX Dashboard",
      shortDescription: "Clean analytical dashboard interface tailored for streamlined workflow.",
      longDescription: "A data-driven analytics dashboard UI created for rapid visual insights, customizable widget layouts, interactive data visualization, and streamlined user experience for enterprise applications. Engineered to turn complex metrics into intuitive visual reports.",
      tags: ["UI/UX Design", "Dashboard", "CSS Grid", "JavaScript", "Data Viz"]
    },
    da: {
      title: "داشبورد تحلیلی و UI/UX",
      shortDescription: "رابط داشبورد تحلیلی تمیز و متناسب برای گردش کار ساده.",
      longDescription: "رابط کاربری داشبورد تحلیلی مبتنی بر داده‌ها که برای درک سریع بصری، چیدمان ویجت‌های سفارشی، تجسم تعاملی داده‌ها و تجربه کاربری روان برای برنامه‌های سازمانی ایجاد شده است.",
      tags: ["طراحی UI/UX", "داشبورد", "CSS Grid", "JavaScript", "تجسم داده‌ها"]
    }
  },
  {
    id: 4,
    image: "photo4.jpg",
    liveUrl: "#",
    codeUrl: "#",
    en: {
      title: "Creative Agency Landing Page",
      shortDescription: "High-converting landing page crafted with responsive web animation.",
      longDescription: "An engaging, high-converting creative agency landing page built with modern micro-interactions, responsive typography, scroll-triggered visual effects, and optimized site performance. Designed to captivate visitors and drive user conversions efficiently.",
      tags: ["HTML5", "CSS Animation", "Responsive", "UI/UX", "Frontend"]
    },
    da: {
      title: "صفحه فرود آژانس خلاق",
      shortDescription: "صفحه فرود با نرخ تبدیل بالا و انیمیشن‌های وب پاسخگو.",
      longDescription: "یک صفحه فرود جذاب برای آژانس خلاق که با تعاملات کوچک مدرن، تایپوگرافی پاسخگو، جلوه‌های بصری هنگام اسکرول و سرعت بهینه‌شده طراحی شده است.",
      tags: ["HTML5", "انیمیشن CSS", "پاسخگو", "UI/UX", "فرانت‌اند"]
    }
  },
  {
    id: 5,
    image: "photo5.jpg",
    liveUrl: "#",
    codeUrl: "#",
    en: {
      title: "Mobile Application UI",
      shortDescription: "Sleek iOS & Android interface designs focusing on user interaction.",
      longDescription: "A complete mobile app UI/UX design system crafted with touch-first ergonomics, smooth navigation patterns, dark mode support, and interactive wireframes for seamless cross-platform deployment. Tailored for mobile usability and intuitive gesture controls.",
      tags: ["Mobile UI", "Figma", "iOS & Android", "Prototyping", "User Centric"]
    },
    da: {
      title: "رابط کاربری اپلیکیشن موبایل",
      shortDescription: "طراحی‌های شیک برای iOS و اندروید با تمرکز بر تعامل کاربر.",
      longDescription: "سیستم کامل طراحی UI/UX اپلیکیشن موبایل با اصول ارگونومی لمسی، الگوهای پیمایش روان، پشتیبانی از حالت تاریک و وایرفریم‌های تعاملی برای اجرا در بسترهای مختلف.",
      tags: ["رابط موبایل", "فیگما", "iOS و اندروید", "پروتوتایپ", "کاربرمحور"]
    }
  },
  {
    id: 6,
    image: "photo6.jpg",
    liveUrl: "#",
    codeUrl: "#",
    en: {
      title: "Digital Marketing Graphics",
      shortDescription: "Impactful vector artwork and promotional marketing design assets.",
      longDescription: "A collection of high-impact digital marketing graphics, promotional banner suites, and vector illustrations designed to enhance social media engagement and brand conversion rates across omnichannel campaigns.",
      tags: ["Vector Art", "Illustrator", "Social Media", "Advertising", "Digital Art"]
    },
    da: {
      title: "گرافیک‌های بازاریابی دیجیتال",
      shortDescription: "آثار برداری تاثیرگذار و اقلام طراحی تبلیغاتی بازاریابی.",
      longDescription: "مجموعه‌ای از گرافیک‌های تبلیغاتی دیجیتال با تاثیرگذاری بالا، بنرهای تبلیغاتی و تصویرسازی‌های برداری جهت افزایش تعامل در شبکه‌های اجتماعی و جذب مخاطب.",
      tags: ["هنر برداری", "ایلاستریتور", "شبکه‌های اجتماعی", "تبلیغات", "هنر دیجیتال"]
    }
  }
];

function renderPortfolioProjects() {
  const container = document.getElementById('portfolio-content');
  if (!container) return;

  function safeEscape(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  const currentLang = document.documentElement.getAttribute('lang') || 'en';
  const translations = (typeof I18N_TRANSLATIONS !== 'undefined' && I18N_TRANSLATIONS[currentLang]) ? I18N_TRANSLATIONS[currentLang] : (typeof I18N_TRANSLATIONS !== 'undefined' ? I18N_TRANSLATIONS.en : {});
  const viewProjectText = translations.modalViewProjectBtn || "View Project";

  container.innerHTML = projectsData.map((project, index) => {
    const pData = project[currentLang] || project.en;
    return `
      <div class="portfoli-box reveal" style="--stagger-index: ${index};" data-project-id="${project.id}">
        <img src="${project.image}" alt="${safeEscape(pData.title)}" loading="lazy">
        <div class="overlay">
          <h4>${safeEscape(pData.title)}</h4>
          <p>${safeEscape(pData.shortDescription)}</p>
          <a href="#" class="btn btn-primary btn-sm view-project-btn" data-project-id="${project.id}">
            ${safeEscape(viewProjectText)} <i class='bx bx-right-arrow-alt'></i>
          </a>
        </div>
      </div>
    `;
  }).join('');

  if (typeof initCard3dTilt === 'function') {
    initCard3dTilt();
  }

  if (typeof initScrollRevealObserver === 'function') {
    initScrollRevealObserver();
  }
}

function initPortfolio() {
  const container = document.getElementById('portfolio-content');
  if (!container) return;

  function safeEscape(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  renderPortfolioProjects();

  // Handle clicking cards or buttons to open modal
  container.addEventListener('click', (e) => {
    const card = e.target.closest('.portfoli-box');
    if (!card) return;

    e.preventDefault();
    const projectId = parseInt(card.getAttribute('data-project-id'), 10);
    openProjectModal(projectId);
  });

  // Modal elements
  const modal = document.getElementById('project-modal');
  const backdrop = document.getElementById('project-modal-backdrop');
  const closeBtn = document.getElementById('project-modal-close');
  const modalBody = document.getElementById('project-modal-body');

  function openProjectModal(id) {
    const project = projectsData.find(p => p.id === id);
    if (!project || !modal || !modalBody) return;

    const currentLang = document.documentElement.getAttribute('lang') || 'en';
    const pData = project[currentLang] || project.en;
    const translations = (typeof I18N_TRANSLATIONS !== 'undefined' && I18N_TRANSLATIONS[currentLang]) ? I18N_TRANSLATIONS[currentLang] : (typeof I18N_TRANSLATIONS !== 'undefined' ? I18N_TRANSLATIONS.en : {});

    const tagsHtml = pData.tags.map(tag => `<span class="modal-tag">${safeEscape(tag)}</span>`).join('');

    modalBody.innerHTML = `
      <div class="modal-image-wrapper">
        <img src="${project.image}" alt="${safeEscape(pData.title)}" class="modal-project-img">
      </div>
      <div class="modal-details">
        <h2 class="modal-project-title" id="modal-project-title">${safeEscape(pData.title)}</h2>
        <p class="modal-project-desc">${pData.longDescription}</p>
        <div class="modal-tags-container">
          <span class="modal-tags-label">${translations.modalTechLabel || "Technologies & Skills"}</span>
          <div class="modal-tags">${tagsHtml}</div>
        </div>
        <div class="modal-actions">
          <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary modal-action-btn">
            <i class='bx bx-link-external'></i> ${translations.modalLiveBtn || "View Live Project"}
          </a>
          <a href="${project.codeUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary modal-action-btn">
            <i class='bx bxl-github'></i> ${translations.modalCodeBtn || "View Code"}
          </a>
        </div>
      </div>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  function closeProjectModal() {
    if (!modal || !modal.classList.contains('active')) return;

    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeProjectModal);
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeProjectModal);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      closeProjectModal();
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
  initPortfolio();
}

// Stat Card Number Count-Up Animation (Ease-Out Curve)
function animateStatCount(statNumberEl) {
  if (!statNumberEl) return;

  const targetStr = statNumberEl.getAttribute('data-target');
  if (!targetStr) return;

  const target = parseInt(targetStr, 10);
  if (isNaN(target)) return;

  // Respect prefers-reduced-motion: reduce by immediately displaying target with '+'
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    statNumberEl.innerHTML = `${target}<span class="stat-plus">+</span>`;
    return;
  }

  const duration = 1400; // 1.4 seconds smooth count-up
  let startTime = null;

  // Set initial display to 0 without the '+' suffix to prevent mid-count flickering
  statNumberEl.textContent = '0';

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-out cubic curve (fast start, smooth deceleration)
    const easeOutProgress = 1 - Math.pow(1 - progress, 3);
    const currentCount = Math.min(Math.round(easeOutProgress * target), target);

    if (progress < 1) {
      statNumberEl.textContent = currentCount;
      requestAnimationFrame(step);
    } else {
      // Append '+' suffix only after count-up completes
      statNumberEl.innerHTML = `${target}<span class="stat-plus">+</span>`;
    }
  }

  requestAnimationFrame(step);
}

// Text-Scramble Reveal Animation for Section H2 Headings
function animateTextScramble(headingEl) {
  if (!headingEl) return;

  // Respect prefers-reduced-motion: reduce
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const originalHTML = headingEl.innerHTML;
  const fullText = headingEl.textContent;

  if (!fullText || !fullText.trim()) return;

  const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*@+?/';
  const duration = 800; // 0.8s total scramble duration
  const textLength = fullText.length;

  // Parse child nodes to preserve HTML structure (e.g. <span>) and styling during animation
  const chunks = [];
  headingEl.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      chunks.push({
        type: 'text',
        text: node.textContent,
        length: node.textContent.length
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      chunks.push({
        type: 'element',
        tagName: node.tagName.toLowerCase(),
        className: node.className || '',
        text: node.textContent,
        length: node.textContent.length
      });
    }
  });

  function escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function getRandomChar() {
    return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
  }

  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);

    if (progress >= 1) {
      // Restore exact original HTML when scramble completes
      headingEl.innerHTML = originalHTML;
      return;
    }

    // Left-to-right character lock index
    const lockIndex = Math.floor(progress * textLength);

    const scrambledChars = [];
    for (let i = 0; i < textLength; i++) {
      const origChar = fullText[i];
      if (i < lockIndex) {
        scrambledChars.push(origChar);
      } else if (/\s/.test(origChar)) {
        scrambledChars.push(origChar);
      } else {
        scrambledChars.push(getRandomChar());
      }
    }

    let chunkOffset = 0;
    let htmlOutput = '';

    chunks.forEach((chunk) => {
      const chunkText = scrambledChars.slice(chunkOffset, chunkOffset + chunk.length).join('');
      chunkOffset += chunk.length;

      if (chunk.type === 'text') {
        htmlOutput += escapeHTML(chunkText);
      } else if (chunk.type === 'element') {
        if (chunk.className) {
          htmlOutput += `<${chunk.tagName} class="${chunk.className}">${escapeHTML(chunkText)}</${chunk.tagName}>`;
        } else {
          htmlOutput += `<${chunk.tagName}>${escapeHTML(chunkText)}</${chunk.tagName}>`;
        }
      }
    });

    headingEl.innerHTML = htmlOutput;
    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

// IntersectionObserver for Staggered Scroll Animations, Stat Count-Up & Section Heading Text Scramble
let globalRevealObserver = null;

function initScrollRevealObserver() {
  const headingSelector = 'section h2, h2.heading, .heading, h2.tab-pane-title, h2.role-box-title, h2.contact-card-title';
  const revealElements = document.querySelectorAll(`.reveal:not(.revealed), .stat-card:not([data-animated]), [data-target]:not([data-animated]), ${headingSelector}:not([data-scrambled])`);
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    if (!globalRevealObserver) {
      const observerOptions = {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1
      };

      globalRevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;

            if (el.classList.contains('reveal')) {
              const staggerIdx = parseInt(el.style.getPropertyValue('--stagger-index') || '0', 10);
              const delayMs = staggerIdx * 100; // 100ms stagger increment

              setTimeout(() => {
                el.classList.add('active', 'revealed');
              }, delayMs);
            }

            // Trigger count-up for stat numbers inside or on the entry
            const statNumbers = el.matches('[data-target]') ? [el] : el.querySelectorAll('[data-target]');
            statNumbers.forEach((statNum) => {
              if (!statNum.dataset.animated) {
                statNum.dataset.animated = 'true';
                animateStatCount(statNum);
              }
            });

            // Trigger text scramble reveal animation for section H2 headings
            const headingsToScramble = el.matches(headingSelector) ? [el] : el.querySelectorAll(headingSelector);
            headingsToScramble.forEach((heading) => {
              if (!heading.dataset.scrambled) {
                heading.dataset.scrambled = 'true';
                animateTextScramble(heading);
              }
            });

            observer.unobserve(el);
          }
        });
      }, observerOptions);
    }

    revealElements.forEach((el) => globalRevealObserver.observe(el));
  } else {
    revealElements.forEach((el) => {
      if (el.classList.contains('reveal')) {
        el.classList.add('active', 'revealed');
      }
      const statNumbers = el.matches('[data-target]') ? [el] : el.querySelectorAll('[data-target]');
      statNumbers.forEach((statNum) => {
        if (!statNum.dataset.animated) {
          statNum.dataset.animated = 'true';
          animateStatCount(statNum);
        }
      });

      const headingsToScramble = el.matches(headingSelector) ? [el] : el.querySelectorAll(headingSelector);
      headingsToScramble.forEach((heading) => {
        if (!heading.dataset.scrambled) {
          heading.dataset.scrambled = 'true';
          animateTextScramble(heading);
        }
      });
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollRevealObserver);
} else {
  initScrollRevealObserver();
}

// Tactile Button Click Ripple Effect
function initTactileButtonRipples() {
  document.addEventListener('click', (e) => {
    const button = e.target.closest('button, .btn');
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const circle = document.createElement('span');
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;
    circle.classList.add('btn-ripple');

    const existingRipple = button.querySelector('.btn-ripple');
    if (existingRipple) {
      existingRipple.remove();
    }

    button.appendChild(circle);

    setTimeout(() => {
      circle.remove();
    }, 600);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTactileButtonRipples);
} else {
  initTactileButtonRipples();
}

// Interactive 3D Movable Headline Cursor Response
function initInteractiveHeadline() {
  const headline = document.getElementById('hero-headline');
  const heroContainer = document.querySelector('.hero-main-content') || document.querySelector('.home');
  if (!headline || !heroContainer) return;

  heroContainer.addEventListener('mousemove', (e) => {
    const rect = heroContainer.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const tiltX = (y / (rect.height / 2)) * -6;
    const tiltY = (x / (rect.width / 2)) * 6;

    headline.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateZ(10px)`;
  });

  heroContainer.addEventListener('mouseleave', () => {
    headline.style.transform = '';
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initInteractiveHeadline);
} else {
  initInteractiveHeadline();
}

// Full-Screen Preloader Overlay & Twinkling Star Canvas
function initFullScreenPreloader() {
  const preloader = document.getElementById('preloader');
  const canvas = document.getElementById('star-canvas');
  if (!preloader || !canvas) return;

  // Prevent scroll while preloader is active
  document.body.classList.add('preloader-active');

  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    setTimeout(() => {
      preloader.classList.add('preloader-hidden');
      document.body.classList.remove('preloader-active');
      setTimeout(() => {
        preloader.classList.add('preloader-none');
      }, 600);
    }, 300);
    return;
  }

  const ctx = canvas.getContext('2d');
  let animationFrameId = null;
  let isRunning = true;

  // Sizing canvas to viewport
  let width = 0;
  let height = 0;
  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * (window.devicePixelRatio || 1);
    canvas.height = height * (window.devicePixelRatio || 1);
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Generate twinkling stars
  const starCount = Math.floor(Math.min(Math.max((width * height) / 8000, 80), 150));
  const stars = [];
  const colorPalette = [
    '255, 255, 255',
    '224, 242, 254', // light cyan tint
    '187, 247, 208', // light emerald tint
    '254, 240, 138'  // light gold tint
  ];

  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.2 + 0.5,
      baseAlpha: Math.random() * 0.5 + 0.25,
      speed: Math.random() * 0.02 + 0.008,
      phase: Math.random() * Math.PI * 2,
      color: colorPalette[Math.floor(Math.random() * colorPalette.length)]
    });
  }

  // Shooting Stars
  const shootingStars = [];
  function spawnShootingStar() {
    const startX = Math.random() * (width * 0.7);
    const startY = Math.random() * (height * 0.4);
    const angle = Math.PI / 4 + (Math.random() * 0.2 - 0.1); // ~45 deg
    const speed = Math.random() * 12 + 14;
    shootingStars.push({
      x: startX,
      y: startY,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      length: Math.random() * 80 + 60,
      life: 0,
      maxLife: 35,
      opacity: 1
    });
  }

  // Spawn shooting stars during intro
  setTimeout(() => { if (isRunning) spawnShootingStar(); }, 600);
  setTimeout(() => { if (isRunning) spawnShootingStar(); }, 1500);

  // Render loop
  function draw() {
    if (!isRunning) return;

    ctx.clearRect(0, 0, width, height);

    // Draw twinkling stars
    const time = Date.now() * 0.002;
    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      const opacity = star.baseAlpha + Math.sin(time * star.speed * 50 + star.phase) * 0.25;
      const currentAlpha = Math.max(0.1, Math.min(1, opacity));

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${star.color}, ${currentAlpha.toFixed(2)})`;
      ctx.fill();

      // Soft outer glow for larger stars
      if (star.radius > 1.2) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color}, ${(currentAlpha * 0.2).toFixed(2)})`;
        ctx.fill();
      }
    }

    // Draw shooting stars
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const ss = shootingStars[i];
      ss.x += ss.dx;
      ss.y += ss.dy;
      ss.life++;

      const progress = ss.life / ss.maxLife;
      const currentOpacity = (1 - progress) * ss.opacity;

      if (ss.life >= ss.maxLife) {
        shootingStars.splice(i, 1);
        continue;
      }

      const tailX = ss.x - ss.dx * (ss.length / 15);
      const tailY = ss.y - ss.dy * (ss.length / 15);

      const gradient = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity.toFixed(2)})`);
      gradient.addColorStop(0.3, `rgba(56, 189, 248, ${(currentOpacity * 0.6).toFixed(2)})`);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.beginPath();
      ctx.moveTo(ss.x, ss.y);
      ctx.lineTo(tailX, tailY);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Bright head dot
      ctx.beginPath();
      ctx.arc(ss.x, ss.y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity.toFixed(2)})`;
      ctx.fill();
    }

    animationFrameId = requestAnimationFrame(draw);
  }

  draw();

  // Exit sequence: ~2.5s duration -> fade out -> hide
  const totalDuration = 2500;
  setTimeout(() => {
    preloader.classList.add('preloader-hidden');
    document.body.classList.remove('preloader-active');

    // Clean up animation after CSS fade out
    setTimeout(() => {
      isRunning = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      preloader.classList.add('preloader-none');
    }, 650);
  }, totalDuration);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFullScreenPreloader);
} else {
  initFullScreenPreloader();
}

// Interactive Laptop Screen Tab Switcher for About Section
function initAboutLaptopTabs() {
  const tabBtns = document.querySelectorAll('.screen-tab-btn');
  const tabPanes = document.querySelectorAll('.screen-tab-pane');
  if (!tabBtns.length || !tabPanes.length) return;

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      if (!targetTab) return;

      tabBtns.forEach((b) => b.classList.remove('active'));
      tabPanes.forEach((p) => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(`tab-${targetTab}`);
      if (targetPane) {
        targetPane.classList.add('active');
        // Ensure reveal elements inside active tab pane become visible
        targetPane.querySelectorAll('.reveal').forEach((el) => {
          el.classList.add('active', 'revealed');
        });
      }
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAboutLaptopTabs);
} else {
  initAboutLaptopTabs();
}

// Contact Form Interactive Floating Labels & Mailto Handler
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const statusMsg = document.getElementById('contact-status-msg');
  const inputs = form.querySelectorAll('.form-control');

  inputs.forEach((input) => {
    const checkValue = () => {
      if (input.value.trim() !== '') {
        input.classList.add('has-value');
      } else {
        input.classList.remove('has-value');
      }
    };

    input.addEventListener('input', () => {
      checkValue();
      input.classList.remove('is-invalid');
      if (statusMsg) {
        statusMsg.className = 'contact-status-msg';
        statusMsg.textContent = '';
      }
    });

    input.addEventListener('blur', checkValue);
    checkValue();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    inputs.forEach((input) => {
      const val = input.value.trim();
      if (!val) {
        isValid = false;
        input.classList.add('is-invalid');
      } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        isValid = false;
        input.classList.add('is-invalid');
      } else {
        input.classList.remove('is-invalid');
      }
    });

    if (!isValid) {
      if (statusMsg) {
        statusMsg.textContent = 'Please complete all fields with valid information.';
        statusMsg.className = 'contact-status-msg error';
      }
      return;
    }

    const name = document.getElementById('contact-name')?.value.trim() || '';
    const email = document.getElementById('contact-email')?.value.trim() || '';
    const phone = document.getElementById('contact-phone')?.value.trim() || '';
    const subject = document.getElementById('contact-subject')?.value.trim() || 'Portfolio Contact Inquiry';
    const message = document.getElementById('contact-message')?.value.trim() || '';

    const emailBody = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;
    const mailtoUrl = `mailto:hasinarahimy5656@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoUrl;

    if (statusMsg) {
      statusMsg.textContent = 'Opening your email client... Thank you for reaching out!';
      statusMsg.className = 'contact-status-msg success';
    }

    // Immediately show animated success confirmation overlay inside contact card
    showContactSuccessState();

    form.reset();
    inputs.forEach((input) => input.classList.remove('has-value', 'is-invalid'));
  });
}

let contactSuccessTimeout = null;

function showContactSuccessState() {
  const successEl = document.getElementById('contact-success-state');
  if (!successEl) return;

  if (contactSuccessTimeout) {
    clearTimeout(contactSuccessTimeout);
    contactSuccessTimeout = null;
  }

  // Activate success state overlay with SVG checkmark stroke animation
  successEl.classList.add('active');
  successEl.setAttribute('aria-hidden', 'false');

  // Automatically fade out success state after 4.5s and restore clean empty form
  contactSuccessTimeout = setTimeout(() => {
    successEl.classList.remove('active');
    successEl.setAttribute('aria-hidden', 'true');
    const statusMsg = document.getElementById('contact-status-msg');
    if (statusMsg) {
      statusMsg.textContent = '';
      statusMsg.className = 'contact-status-msg';
    }
  }, 4500);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContactForm);
} else {
  initContactForm();
}

// ==========================================
// CLIENT-SIDE FLOATING CHATBOT WIDGET LOGIC
// ==========================================

const chatbotKnowledgeI18n = {
  en: [
    {
      category: "bio",
      keywords: ["who", "hasina", "about", "name", "rahimy", "bio", "background", "intro", "yourself", "developer", "author"],
      answer: "<strong>Hasina Rahimy</strong> is a dedicated <strong>Frontend Developer & Graphic Designer</strong> based in Kabul, Afghanistan. She crafts modern, responsive web applications and impactful visual brand identities.",
      quickReplies: ["What are her skills?", "How to contact her?", "Download CV"]
    },
    {
      category: "role",
      keywords: ["role", "job", "title", "profession", "position", "career", "occupation"],
      answer: "Hasina works as a <strong>Frontend Web Developer</strong> and <strong>Graphic Designer</strong>. She builds fast, user-friendly websites using modern web technologies.",
      quickReplies: ["What are her skills?", "Services offered", "View portfolio"]
    },
    {
      category: "skills",
      keywords: ["skill", "skills", "stack", "tech", "technology", "languages", "tools", "experience", "react", "javascript", "html", "css", "photoshop", "illustrator", "tailwind", "framework", "coding"],
      answer: "Hasina's technical toolkit includes:<br>• <strong>Frontend Web:</strong> HTML5, CSS3, JavaScript (ES6+), React.js, Tailwind CSS<br>• <strong>Design & Branding:</strong> UI/UX Wireframing, Adobe Photoshop, Adobe Illustrator, Graphic Design",
      quickReplies: ["View portfolio", "Services offered", "How to contact her?"]
    },
    {
      category: "contact",
      keywords: ["contact", "reach", "email", "phone", "number", "call", "whatsapp", "message", "hire", "address", "location", "touch", "mail", "kabul", "afghanistan"],
      answer: "You can reach Hasina directly through:<br>• <strong>Email:</strong> <a href='mailto:hasinarahimy5656@gmail.com' class='chat-inline-link'>hasinarahimy5656@gmail.com</a><br>• <strong>Phone / WhatsApp:</strong> <a href='https://wa.me/93788801110' target='_blank' rel='noopener' class='chat-inline-link'>+93788801110</a><br>• <strong>Location:</strong> Kabul, Afghanistan",
      quickReplies: ["Download CV", "Services offered", "Who is Hasina?"]
    },
    {
      category: "cv",
      keywords: ["cv", "resume", "download", "pdf", "file", "document", "qualification", "experience"],
      answer: "You can view or download Hasina Rahimy's official CV right here:<br><br><a href='Hasina Rahimy 2.pdf' target='_blank' class='chat-download-btn'><i class='bx bx-file'></i> Download Hasina's CV (PDF)</a>",
      quickReplies: ["What are her skills?", "How to contact her?", "Services offered"]
    },
    {
      category: "services",
      keywords: ["service", "services", "offer", "work", "build", "website", "design", "graphic", "logo", "branding", "freelance", "contract"],
      answer: "Hasina offers professional services in:<br>1. <strong>Web Development:</strong> Custom, responsive & fast websites<br>2. <strong>UI/UX Design:</strong> Clean, intuitive user interfaces<br>3. <strong>Graphic Design:</strong> Logos, vector artwork & brand identities",
      quickReplies: ["How to contact her?", "View portfolio", "Download CV"]
    },
    {
      category: "portfolio",
      keywords: ["project", "projects", "portfolio", "work", "sample", "case", "built", "examples", "demo"],
      answer: "Hasina has built responsive web applications and graphic design projects. Explore them in the <a href='#portfolio' class='chat-inline-link chat-nav-link'>Projects / Portfolio section</a> on this page!",
      quickReplies: ["What are her skills?", "How to contact her?"]
    },
    {
      category: "greetings",
      keywords: ["hello", "hi", "hey", "greetings", "salam", "assalam", "good", "morning", "afternoon", "evening", "sup"],
      answer: "Hello there! 👋 Welcome to Hasina Rahimy's portfolio. How can I help you today?",
      quickReplies: ["Who is Hasina?", "What are her skills?", "How to contact her?"]
    },
    {
      category: "thanks",
      keywords: ["thank", "thanks", "thx", "awesome", "great", "cool", "perfect", "appreciated", "good", "nice"],
      answer: "You're very welcome! 😊 Feel free to ask anything else or connect with Hasina directly via the contact section.",
      quickReplies: ["How to contact her?", "Download CV"]
    }
  ],
  da: [
    {
      category: "bio",
      keywords: ["کیست", "درباره", "حسینه", "رحیمی", "بیوگرافی", "معرفی", "رزومه", "توسعه‌دهنده"],
      answer: "<strong>حسینه رحیمی</strong> توسعه‌دهنده متعهد <strong>فرانت‌اند و طراح گرافیک</strong> مقیم کابل، افغانستان است. او اپلیکیشن‌های وب مدرن و هویت‌های بصری جذاب خلق می‌کند.",
      quickReplies: ["مهارت‌های او چیست؟", "راه ارتباط با او؟", "دانلود رزومه"]
    },
    {
      category: "role",
      keywords: ["نقش", "شغل", "حرفه", "عنوان", "موقعیت", "کار"],
      answer: "حسینه به عنوان <strong>توسعه‌دهنده فرانت‌اند وب</strong> و <strong>طراح گرافیک</strong> فعالیت می‌کند. او وب‌سایت‌های سریع و کاربرپسند می‌سازد.",
      quickReplies: ["مهارت‌های او چیست؟", "خدمات ارائه شده", "مشاهده پروژه‌ها"]
    },
    {
      category: "skills",
      keywords: ["مهارت", "مهارت‌ها", "تکنولوژی", "فناوری", "زبان", "ابزار", "تجربه", "ری‌اکت", "جاوااسکریپت", "فوتوشاپ", "ایلاستریتور", "کدنویسی"],
      answer: "مجموعه مهارت‌های فنی حسینه شامل:<br>• <strong>توسعه وب:</strong> HTML5، CSS3، JavaScript، React.js، Tailwind CSS<br>• <strong>طراحی گرافیک:</strong> وایرفریمینگ UI/UX، ادوبی فوتوشاپ، ایلاستریتور",
      quickReplies: ["مشاهده پروژه‌ها", "خدمات ارائه شده", "راه ارتباط با او؟"]
    },
    {
      category: "contact",
      keywords: ["تماس", "ارتباط", "ایمیل", "شماره", "تلفن", "واتساپ", "پیام", "استخدام", "آدرس", "موقعیت", "کابل", "افغانستان"],
      answer: "شما می‌توانید مستقیماً با حسینه ارتباط برقرار کنید:<br>• <strong>ایمیل:</strong> <a href='mailto:hasinarahimy5656@gmail.com' class='chat-inline-link'>hasinarahimy5656@gmail.com</a><br>• <strong>شماره تماس / واتساپ:</strong> <a href='https://wa.me/93788801110' target='_blank' rel='noopener' class='chat-inline-link'>+93788801110</a><br>• <strong>موقعیت:</strong> کابل، افغانستان",
      quickReplies: ["دانلود رزومه", "خدمات ارائه شده", "حسینه کیست؟"]
    },
    {
      category: "cv",
      keywords: ["سی وی", "رزومه", "دانلود", "پی دی اف", "مدرک", "فایل"],
      answer: "شما می‌توانید رزومه رسمی حسینه رحیمی را اینجا مشاهده یا دانلود کنید:<br><br><a href='Hasina Rahimy 2.pdf' target='_blank' class='chat-download-btn'><i class='bx bx-file'></i> دانلود رزومه حسینه (PDF)</a>",
      quickReplies: ["مهارت‌های او چیست؟", "راه ارتباط با او؟", "خدمات ارائه شده"]
    },
    {
      category: "services",
      keywords: ["خدمات", "پیشنهاد", "کارها", "وب‌سایت", "طراحی", "گرافیک", "لوگو", "برندسازی", "فریلنسر"],
      answer: "حسینه خدمات حرفه‌ای در زمینه‌های زیر ارائه می‌دهد:<br>۱. <strong>توسعه وب:</strong> وب‌سایت‌های اختصاصی، سریع و پاسخگو<br>۲. <strong>طراحی UI/UX:</strong> رابط‌های کاربری تمیز و روان<br>۳. <strong>طراحی گرافیک:</strong> لوگو، تصویرسازی و هویت برند",
      quickReplies: ["راه ارتباط با او؟", "مشاهده پروژه‌ها", "دانلود رزومه"]
    },
    {
      category: "portfolio",
      keywords: ["پروژه", "پروژه‌ها", "نمونه‌کار", "نمونه", "کارهای قبلی"],
      answer: "حسینه پروژه‌های متعددی در زمینه وب و گرافیک انجام داده است. می‌توانید آن‌ها را در <a href='#portfolio' class='chat-inline-link chat-nav-link'>بخش پروژه‌ها</a> مشاهده کنید!",
      quickReplies: ["مهارت‌های او چیست؟", "راه ارتباط با او؟"]
    },
    {
      category: "greetings",
      keywords: ["سلام", "درود", "خوش", "احوال", "صبح", "عصر"],
      answer: "سلام! 👋 به پورتفولیوی حسینه رحیمی خوش آمدید. چگونه می‌توانم به شما کمک کنم؟",
      quickReplies: ["حسینه کیست؟", "مهارت‌های او چیست؟", "راه ارتباط با او؟"]
    },
    {
      category: "thanks",
      keywords: ["تشکر", "ممنون", "سپاس", "عالی", "خوب", "تشکر از شما"],
      answer: "خواهش می‌کنم! 😊 اگر سوال دیگری دارید بپرسید یا مستقیماً از بخش تماس پیام بفرستید.",
      quickReplies: ["راه ارتباط با او؟", "دانلود رزومه"]
    }
  ]
};

function initChatbot() {
  const wrapper = document.getElementById('chatbot-wrapper');
  const toggleBtn = document.getElementById('chatbot-toggle-btn');
  const closeBtn = document.getElementById('chatbot-close-btn');
  const chatWindow = document.getElementById('chatbot-window');
  const messagesContainer = document.getElementById('chatbot-messages');
  const chatForm = document.getElementById('chatbot-form');
  const chatInput = document.getElementById('chatbot-input');
  const notificationDot = document.getElementById('chatbot-dot');

  if (!wrapper || !toggleBtn || !chatWindow || !chatForm || !chatInput) return;

  let isChatOpen = false;

  function openChat() {
    isChatOpen = true;
    wrapper.classList.add('open');
    chatWindow.classList.add('active');
    chatWindow.setAttribute('aria-hidden', 'false');
    if (notificationDot) notificationDot.classList.add('hidden');
    setTimeout(() => chatInput.focus(), 300);
  }

  function closeChat() {
    isChatOpen = false;
    wrapper.classList.remove('open');
    chatWindow.classList.remove('active');
    chatWindow.setAttribute('aria-hidden', 'true');
  }

  toggleBtn.addEventListener('click', () => {
    if (isChatOpen) {
      closeChat();
    } else {
      openChat();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeChat);
  }

  // Scroll messages to bottom helper
  function scrollToBottom() {
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  // Append user message
  function appendUserMessage(text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-msg user-msg';
    msgDiv.innerHTML = `
      <div class="msg-bubble">
        <p>${escapeHtml(text)}</p>
      </div>
    `;
    messagesContainer.appendChild(msgDiv);
    scrollToBottom();
  }

  // Append typing indicator
  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-msg bot-msg typing-msg';
    typingDiv.id = 'chatbot-typing-indicator';
    typingDiv.innerHTML = `
      <div class="msg-avatar"><i class='bx bx-bot'></i></div>
      <div class="typing-bubble">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    `;
    messagesContainer.appendChild(typingDiv);
    scrollToBottom();
  }

  function removeTypingIndicator() {
    const typingDiv = document.getElementById('chatbot-typing-indicator');
    if (typingDiv) {
      typingDiv.remove();
    }
  }

  // Append bot response
  function appendBotMessage(htmlContent, quickReplies = []) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-msg bot-msg';
    msgDiv.innerHTML = `
      <div class="msg-avatar"><i class='bx bx-bot'></i></div>
      <div class="msg-bubble">
        <p>${htmlContent}</p>
      </div>
    `;
    messagesContainer.appendChild(msgDiv);

    if (quickReplies && quickReplies.length > 0) {
      const suggestionsDiv = document.createElement('div');
      suggestionsDiv.className = 'chatbot-suggestions';
      
      const currentLang = document.documentElement.getAttribute('lang') || 'en';
      const translations = (typeof I18N_TRANSLATIONS !== 'undefined' && I18N_TRANSLATIONS[currentLang]) ? I18N_TRANSLATIONS[currentLang] : (typeof I18N_TRANSLATIONS !== 'undefined' ? I18N_TRANSLATIONS.en : {});
      const labelText = translations.chatRelatedQuestions || "Related questions:";

      let chipsHtml = `<span class="suggestions-label">${labelText}</span>`;
      quickReplies.forEach(reply => {
        chipsHtml += `<button type="button" class="chip-btn" data-query="${escapeHtml(reply)}">${escapeHtml(reply)}</button>`;
      });
      suggestionsDiv.innerHTML = chipsHtml;
      messagesContainer.appendChild(suggestionsDiv);
    }

    scrollToBottom();
  }

  // Search Knowledge Base
  function getBotResponse(userText) {
    const currentLang = document.documentElement.getAttribute('lang') || 'en';
    const knowledgeList = chatbotKnowledgeI18n[currentLang] || chatbotKnowledgeI18n.en;

    const cleanText = userText.toLowerCase().replace(/[^\w\s\u0600-\u06FF]/gi, ' ');
    const userTokens = cleanText.split(/\s+/).filter(w => w.length > 1);

    let bestItem = null;
    let maxScore = 0;

    knowledgeList.forEach(item => {
      let score = 0;
      item.keywords.forEach(keyword => {
        const lowerKw = keyword.toLowerCase();
        
        // Match full phrase or exact word in query
        if (cleanText.includes(lowerKw)) {
          score += 4;
        }

        userTokens.forEach(token => {
          if (token === lowerKw) {
            score += 3;
          } else if (lowerKw.length > 3 && (token.includes(lowerKw) || lowerKw.includes(token))) {
            score += 1.5;
          }
        });
      });

      if (score > maxScore) {
        maxScore = score;
        bestItem = item;
      }
    });

    if (maxScore >= 2 && bestItem) {
      return {
        answer: bestItem.answer,
        quickReplies: bestItem.quickReplies
      };
    }

    // Fallback response based on language
    if (currentLang === 'da') {
      return {
        answer: "متأسفانه متوجه منظور شما نشدم! می‌توانم به سوالات شما درباره <strong>مهارت‌ها</strong>، <strong>پروژه‌ها</strong>، <strong>اطلاعات تماس</strong> یا <strong>رزومه</strong> حسینه پاسخ دهم. همچنین می‌توانید از طریق <a href='#contact' class='chat-inline-link chat-nav-link'>فرم تماس</a> مستقیماً پیام بفرستید!",
        quickReplies: ["حسینه کیست؟", "مهارت‌های او چیست؟", "راه ارتباط با او؟", "دانلود رزومه"]
      };
    }

    return {
      answer: "I'm not quite sure about that! I can answer questions about Hasina's <strong>skills</strong>, <strong>projects</strong>, <strong>contact details</strong>, or <strong>CV</strong>. You can also send her a message directly using the <a href='#contact' class='chat-inline-link chat-nav-link'>Contact Form</a>!",
      quickReplies: ["Who is Hasina?", "What are her skills?", "How to contact her?", "Download CV"]
    };
  }

  // Send message handler
  function handleSendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed) return;

    appendUserMessage(trimmed);
    chatInput.value = '';

    showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();
      const botRes = getBotResponse(trimmed);
      appendBotMessage(botRes.answer, botRes.quickReplies);
    }, 450);
  }

  // Form submit handler
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSendMessage(chatInput.value);
  });

  // Chip buttons click delegate
  messagesContainer.addEventListener('click', (e) => {
    const chipBtn = e.target.closest('.chip-btn');
    if (chipBtn) {
      const query = chipBtn.getAttribute('data-query');
      if (query) {
        handleSendMessage(query);
      }
      return;
    }

    // Nav links inside chat bubbles (e.g. #contact or #portfolio)
    const navLink = e.target.closest('.chat-nav-link');
    if (navLink) {
      closeChat();
    }
  });

  // Utility HTML escape
  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChatbot);
} else {
  initChatbot();
}

// =========================================================
// FLOATING BACK TO TOP BUTTON WITH SVG PROGRESS RING
// =========================================================
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  const progressCircle = document.getElementById('back-to-top-progress');
  if (!backToTopBtn || !progressCircle) return;

  const circumference = 2 * Math.PI * 25; // ~157.08
  progressCircle.style.strokeDasharray = `${circumference}`;
  progressCircle.style.strokeDashoffset = `${circumference}`;

  function updateProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = scrollHeight > 0 ? Math.min(Math.max(scrollTop / scrollHeight, 0), 1) : 0;

    const offset = circumference - (scrollPercent * circumference);
    progressCircle.style.strokeDashoffset = offset;

    // Show button once scrolled past roughly one viewport height
    const showThreshold = window.innerHeight * 0.8 || 300;
    if (scrollTop > showThreshold) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress(); // Initial state check

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBackToTop);
} else {
  initBackToTop();
}

// =========================================================
// RESUME SECTION (EXPERIENCE & EDUCATION) TAB TOGGLE
// =========================================================
function initResumeTabs() {
  const tabBtns = document.querySelectorAll('.resume-tab-btn');
  const tabPanes = document.querySelectorAll('.resume-tab-pane');

  if (!tabBtns.length || !tabPanes.length) return;

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach((b) => b.classList.remove('active'));
      tabPanes.forEach((p) => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(`resume-${targetTab}`);
      if (targetPane) {
        targetPane.classList.add('active');

        // Re-trigger scroll reveal observer for elements inside target pane
        if (typeof initScrollRevealObserver === 'function') {
          initScrollRevealObserver();
        }
      }
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initResumeTabs);
} else {
  initResumeTabs();
}

// =========================================================
// SUBTLE 3D TILT EFFECT & MOVING LIGHTING GLARE (DESKTOP ONLY)
// =========================================================
function initCard3dTilt() {
  // Skip touch devices where hover is not supported
  if (window.matchMedia('(hover: none)').matches) return;

  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cards = document.querySelectorAll('.service-box, .portfoli-box');
  if (!cards.length) return;

  const maxTilt = 8; // Max tilt rotation angle in degrees (subtle, non-exaggerated)

  cards.forEach((card) => {
    if (card.dataset.tiltInitialized) return;
    card.dataset.tiltInitialized = 'true';

    // Ensure parent position relative for child glare placement
    if (window.getComputedStyle(card).position === 'static') {
      card.style.position = 'relative';
    }

    // Enable hardware-accelerated 3D transform rendering
    card.style.transformStyle = 'preserve-3d';

    // Create subtle moving lighting glare overlay
    let glare = card.querySelector('.card-tilt-glare');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'card-tilt-glare';
      card.appendChild(glare);
    }

    let leaveTimeout = null;

    function handleMouseMove(e) {
      if (leaveTimeout) clearTimeout(leaveTimeout);

      const rect = card.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      if (!width || !height) return;

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const centerX = width / 2;
      const centerY = height / 2;

      // Calculate normalized position (-1 to +1) relative to card center
      const normX = (mouseX - centerX) / centerX;
      const normY = (mouseY - centerY) / centerY;

      // Calculate 3D tilt rotation angles
      const rotateX = (-normY * maxTilt).toFixed(2);
      const rotateY = (normX * maxTilt).toFixed(2);

      // Fluid tracking transition while mouse moves
      card.style.transition = 'transform 0.1s cubic-bezier(0.1, 0.2, 0.1, 1)';
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;

      // Move radial gradient glare highlight to follow cursor
      const glareX = ((mouseX / width) * 100).toFixed(1);
      const glareY = ((mouseY / height) * 100).toFixed(1);
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0) 75%)`;
      glare.style.opacity = '1';
    }

    function handleMouseLeave() {
      // Smooth reset transition back to neutral position
      card.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';

      if (glare) {
        glare.style.opacity = '0';
      }

      leaveTimeout = setTimeout(() => {
        if (!card.matches(':hover')) {
          card.style.transform = '';
          card.style.transition = '';
        }
      }, 450);
    }

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCard3dTilt);
} else {
  initCard3dTilt();
}

// =========================================================
// INTERNATIONALIZATION (i18n) TRANSLATIONS & LANGUAGE SWITCHER
// =========================================================

const I18N_TRANSLATIONS = {
  en: {
    // Navigation
    navHome: "Home",
    navAbout: "About",
    navResume: "Resume",
    navServices: "Services",
    navPortfolio: "Portfolio",
    navContact: "Contact",

    // Hero Section
    availableForHire: "Available for Hire",
    currentlyLearningPrefix: "Currently learning:",
    currentlyLearningTech: "React",
    heroGreeting: "Hello, It's Me",
    heroName: "Hasina Rahimy",
    heroRoles: [
      "Frontend Developer",
      "Graphic Designer",
      "UI/UX Enthusiast",
      "Problem Solver"
    ],
    heroParagraph: "Passionate about creating modern, responsive, and visually appealing web experiences with clean code and intuitive design.",
    downloadCV: "Download CV",
    contactMe: "Contact Me",

    // Hero Stats
    statYearsExp: "Years Experience",
    statProjectsCompleted: "Projects Completed",
    statHappyClients: "Happy Clients",

    // About Section
    aboutTagline: "Get To Know Me",
    aboutTitle: "About Me",
    aboutTabOverview: "Overview",
    aboutTabSkills: "Skills & Tech",
    aboutTabExperience: "Experience",

    // About Tab Content
    aboutHeading: "A Creative Developer & Designer Based in Kabul",
    aboutBio1: "I am Hasina Rahimy, a dedicated Frontend Developer and Graphic Designer. I bridge the gap between creative visual design and responsive web engineering, delivering fast, accessible, and user-centric web applications.",
    aboutBio2: "With expertise in HTML5, CSS3, JavaScript, React, Tailwind CSS, and Adobe Creative Suite, I transform complex ideas into sleek, seamless digital experiences.",
    
    aboutSkillWebDevTitle: "Web Development",
    aboutSkillWebDevDesc: "HTML5, CSS3, JavaScript (ES6+), React, Tailwind CSS, Bootstrap, Responsive Web Design",
    aboutSkillDesignTitle: "UI/UX & Graphic Design",
    aboutSkillDesignDesc: "Figma, Adobe Photoshop, Illustrator, Prototyping, Wireframing, Brand Identity",
    aboutSkillToolsTitle: "Tools & Workflow",
    aboutSkillToolsDesc: "Git & GitHub, VS Code, Webpack, npm, Cross-Browser Testing, Accessibility (a11y)",

    aboutExpRole1: "Senior Frontend Developer",
    aboutExpComp1: "Tech Solutions | 2023 - Present",
    aboutExpDesc1: "Leading frontend development teams, implementing modern UI architectures, and crafting responsive web interfaces.",
    aboutExpRole2: "UI/UX Designer",
    aboutExpComp2: "Creative Studio | 2021 - 2023",
    aboutExpDesc2: "Designed user flows, wireframes, and high-fidelity mockups for web and mobile platforms.",

    satisfiedClientsCount: "100% Satisfied Clients",

    // Resume Section
    resumeTagline: "My Journey",
    resumeTitle: "My Resume",
    resumeTabExp: "Experience",
    resumeTabEdu: "Education",

    resumeExpTitle1: "Senior Frontend Developer",
    resumeExpOrg1: "Tech Solutions Inc. | Kabul",
    resumeExpDesc1: "Leading frontend development, architecting scalable UI components, and optimizing web performance.",

    resumeExpTitle2: "UI/UX & Web Designer",
    resumeExpOrg2: "Creative Media Agency | Remote",
    resumeExpDesc2: "Created intuitive user interfaces, wireframes, and visual branding assets for international client projects.",

    resumeExpTitle3: "Junior Web Developer",
    resumeExpOrg3: "Digital Horizons | Kabul",
    resumeExpDesc3: "Built responsive websites using HTML, CSS, JavaScript, and assisted with layout maintenance.",

    resumeEduTitle1: "Bachelor of Computer Science",
    resumeEduOrg1: "Kabul University | 2019 - 2023",
    resumeEduDesc1: "Specialized in Software Engineering, Web Technologies, Data Structures, and Database Management.",

    resumeEduTitle2: "Frontend Web Development Certification",
    resumeEduOrg2: "Online Tech Academy | 2022",
    resumeEduDesc2: "Completed intensive training in JavaScript ES6+, React, CSS Frameworks, and Modern Frontend Workflows.",

    resumeEduTitle3: "Graphic & UI Design Diploma",
    resumeEduOrg3: "Design Institute | 2020",
    resumeEduDesc3: "Mastered visual communication, typography, color theory, Figma, Photoshop, and Illustrator.",

    // Services Section
    servicesTagline: "What I Offer",
    servicesTitle: "My Services",

    service1Title: "Web Development",
    service1Desc: "Building fast, modern, and fully responsive websites tailored to your business needs using standard web technologies.",
    serviceReadMore: "Read More",

    service2Title: "UI/UX Design",
    service2Desc: "Crafting intuitive user interfaces and seamless user experiences with Figma wireframes and interactive prototypes.",

    service3Title: "Graphic Design",
    service3Desc: "Designing eye-catching brand identities, logos, marketing banners, and visual graphics for digital and print media.",

    // Portfolio Section
    portfolioTagline: "My Latest Work",
    portfolioTitle: "My Portfolio",
    modalTechLabel: "Technologies & Skills",
    modalLiveBtn: "View Live Project",
    modalCodeBtn: "View Code",
    modalViewProjectBtn: "View Project",

    // Testimonials Section
    testimonialsTagline: "Client Feedback",
    testimonialsTitle: "Testimonials",

    // Contact Section
    contactTagline: "Get In Touch",
    contactTitle: "Contact Me",
    contactSubtitle: "Have a project in mind or want to collaborate? Feel free to reach out using the form or contact details below.",
    contactInfoLabel: "Contact Information",
    contactInfoDesc: "Fill out the form and I will get back to you within 24 hours.",
    contactLocation: "Kabul, Afghanistan",
    contactAvailability: "Mon - Sat: 9:00 AM - 6:00 PM",

    formNamePlaceholder: "Your Full Name",
    formEmailPlaceholder: "Your Email Address",
    formPhonePlaceholder: "Phone Number",
    formSubjectPlaceholder: "Email Subject",
    formMessagePlaceholder: "Your Message",
    formSubmitBtn: "Send Message",
    formSuccessMsg: "Thank you! Your message has been sent successfully.",

    // Floating Navigation
    floatHome: "Home",
    floatAbout: "About",
    floatResume: "Resume",
    floatServices: "Services",
    floatPortfolio: "Portfolio",
    floatContact: "Contact",

    // Chatbot
    chatTitle: "Portfolio Assistant",
    chatSubtitle: "Ask me anything about Hasina!",
    chatGreeting: "Hi there! 👋 I'm Hasina's AI assistant. How can I help you today?",
    chatSugg1: "Tell me about Hasina",
    chatSugg2: "View Skills",
    chatSugg3: "How to hire?",
    chatRelatedQuestions: "Related questions:",
    chatInputPlaceholder: "Type your message here...",

    // Footer
    footerCopyright: "Copyright &copy; 2026 By Rahimy | All Rights Reserved"
  },

  da: {
    // Navigation
    navHome: "صفحه اصلی",
    navAbout: "درباره من",
    navResume: "رزومه",
    navServices: "خدمات",
    navPortfolio: "نمونه کارها",
    navContact: "تماس با من",

    // Hero Section
    availableForHire: "آماده برای کار",
    currentlyLearningPrefix: "در حال یادگیری:",
    currentlyLearningTech: "ری‌اکت (React)",
    heroGreeting: "سلام، من هستم",
    heroName: "حسینه رحیمی",
    heroRoles: [
      "توسعه‌دهنده فرانت‌اند",
      "طراح گرافیک",
      "علاقه‌مند به UI/UX",
      "حل‌کننده مسایل"
    ],
    heroParagraph: "علاقه‌مند به ایجاد تجربیات وب مدرن، پاسخگو و زیبا با استفاده از کدهای تمیز و طراحی کاربرپسند.",
    downloadCV: "دانلود رزومه (CV)",
    contactMe: "ارتباط با من",

    // Hero Stats
    statYearsExp: "سال تجربه کاری",
    statProjectsCompleted: "پروژه تکمیل شده",
    statHappyClients: "مشتری رضایت‌مند",

    // About Section
    aboutTagline: "شناخت بیشتر من",
    aboutTitle: "درباره من",
    aboutTabOverview: "نگاه کلی",
    aboutTabSkills: "مهارت‌ها و فناوری‌ها",
    aboutTabExperience: "تجربه کاری",

    // About Tab Content
    aboutHeading: "توسعه‌دهنده و طراح خلاق مقیم کابل",
    aboutBio1: "من حسینه رحیمی هستم، توسعه‌دهنده فرانت‌اند و طراح گرافیک متعهد. من میان طراحی بصری خلاقانه و مهندسی وب پاسخگو پل می‌زنم تا برنامه‌های وب سریع، قابل دسترس و کاربرمحور ارائه دهم.",
    aboutBio2: "با تخصص در HTML5، CSS3، JavaScript، React، Tailwind CSS و مجموعه برنامه‌های ادوبی (Adobe)، ایده‌های پیچیده را به تجربیات دیجیتالی جذاب و روان تبدیل می‌کنم.",
    
    aboutSkillWebDevTitle: "توسعه وب",
    aboutSkillWebDevDesc: "HTML5، CSS3، JavaScript (ES6+)، React، Tailwind CSS، Bootstrap، طراحی وب پاسخگو (Responsive)",
    aboutSkillDesignTitle: "طراحی UI/UX و گرافیک",
    aboutSkillDesignDesc: "فیگما (Figma)، ادوبی فوتوشاپ، ایلاستریتور، پروتوتایپ، وایرفریم، هویت بصری برند",
    aboutSkillToolsTitle: "ابزارها و روند کار",
    aboutSkillToolsDesc: "Git & GitHub، VS Code، Webpack، npm، تست مرورگرها، دسترسی‌پذیری (a11y)",

    aboutExpRole1: "توسعه‌دهنده ارشد فرانت‌اند",
    aboutExpComp1: "تک سلوشنز | ۱۴۰۲ - تاکنون",
    aboutExpDesc1: "رهبری تیم‌های توسعه فرانت‌اند، پیاده‌سازی معماری مدرن رابط کاربر و ساخت رابط‌های پاسخگو.",
    aboutExpRole2: "طراح UI/UX",
    aboutExpComp2: "استودیو خلاق | ۱۴۰۰ - ۱۴۰۲",
    aboutExpDesc2: "طراحی جریان‌های کاربری، وایرفریم‌ها و نمونه‌های اولیه با کیفیت بالا برای وب و موبایل.",

    satisfiedClientsCount: "۱۰۰٪ رضایت مشتریان",

    // Resume Section
    resumeTagline: "مسیر حرفه‌ای من",
    resumeTitle: "رزومه من",
    resumeTabExp: "تجربه کاری",
    resumeTabEdu: "تحصیلات",

    resumeExpTitle1: "توسعه‌دهنده ارشد فرانت‌اند",
    resumeExpOrg1: "شرکت تک سلوشنز | کابل",
    resumeExpDesc1: "رهبری توسعه فرانت‌اند، ساخت اجزای UI مقیاس‌پذیر و بهینه‌سازی سرعت و عملکرد وب‌سایت.",

    resumeExpTitle2: "طراح UI/UX و وب",
    resumeExpOrg2: "آژانس رسانه‌ای خلاق | دورکاری",
    resumeExpDesc2: "ایجاد رابط‌های کاربری جذاب، وایرفریم‌ها و طرح‌های برندسازی بصری برای پروژه‌های بین‌المللی.",

    resumeExpTitle3: "توسعه‌دهنده جونیور وب",
    resumeExpOrg3: "دیجیتال هورایزنز | کابل",
    resumeExpDesc3: "ساخت وب‌سایت‌های پاسخگو با استفاده از HTML، CSS و JavaScript و پشتیبانی در طرح‌بندی صفحات.",

    resumeEduTitle1: "لیسانس علوم کامپیوتر",
    resumeEduOrg1: "پوهنتون کابل | ۱۳۹۸ - ۱۴۰۲",
    resumeEduDesc1: "تخصص در مهندسی نرم‌افزار، فناوری‌های وب، ساختمان داده‌ها و مدیریت پایگاه داده.",

    resumeEduTitle2: "گواهینامه توسعه فرانت‌اند وب",
    resumeEduOrg2: "آکادمی آنلاین تکنولوژی | ۱۴۰۱",
    resumeEduDesc2: "تکمیل دوره فشرده در JavaScript ES6+، React، فریم‌ورک‌های CSS و روند کارهای مدرن فرانت‌اند.",

    resumeEduTitle3: "دیپلم طراحی گرافیک و UI",
    resumeEduOrg3: "انستیتوت دیزاین | ۱۳۹۹",
    resumeEduDesc3: "تسلط بر ارتباطات بصری، تایپوگرافی، نظریه رنگ‌ها، فیگما، فوتوشاپ و ایلاستریتور.",

    // Services Section
    servicesTagline: "آنچه ارائه می‌دهم",
    servicesTitle: "خدمات من",

    service1Title: "توسعه وب",
    service1Desc: "ساخت وب‌سایت‌های سریع، مدرن و کاملاً پاسخگو متناسب با نیازهای کاری شما با استانداردهای وب.",
    serviceReadMore: "بیشتر بخوانید",

    service2Title: "طراحی UI/UX",
    service2Desc: "ایجاد رابط‌های کاربری جذاب و تجربیات کاربری روان با استفاده از وایرفریم‌ها و پروتوتایپ‌های فیگما.",

    service3Title: "طراحی گرافیک",
    service3Desc: "طراحی هویت برند جذاب، لوگو، بنرهای تبلیغاتی و گرافیک‌های بصری برای رسانه‌های دیجیتال و چاپ.",

    // Portfolio Section
    portfolioTagline: "آخرین کارهای من",
    portfolioTitle: "نمونه کارهای من",
    modalTechLabel: "تکنولوژی‌ها و مهارت‌ها",
    modalLiveBtn: "مشاهده آنلاین پروژه",
    modalCodeBtn: "مشاهده کدها",
    modalViewProjectBtn: "مشاهده پروژه",

    // Testimonials Section
    testimonialsTagline: "نظر مشتریان",
    testimonialsTitle: "توصیه‌نامه‌ها",

    // Contact Section
    contactTagline: "ارتباط با من",
    contactTitle: "تماس با من",
    contactSubtitle: "پروژه‌ای در نظر دارید یا می‌خواهید همکاری کنید؟ از طریق فرم یا راه‌های ارتباطی زیر پیام بفرستید.",
    contactInfoLabel: "اطلاعات تماس",
    contactInfoDesc: "فرم را پر کنید و من در کمتر از ۲۴ ساعت با شما تماس خواهم گرفت.",
    contactLocation: "کابل، افغانستان",
    contactAvailability: "شنبه - پنجشنبه: ۹:۰۰ صبح - ۶:۰۰ عصر",

    formNamePlaceholder: "نام و نام خانوادگی",
    formEmailPlaceholder: "آدرس ایمیل شما",
    formPhonePlaceholder: "شماره تماس",
    formSubjectPlaceholder: "موضوع ایمیل",
    formMessagePlaceholder: "متن پیام شما",
    formSubmitBtn: "ارسال پیام",
    formSuccessMsg: "تشکر! پیام شما با موفقیت ارسال شد.",

    // Floating Navigation
    floatHome: "خانه",
    floatAbout: "درباره",
    floatResume: "رزومه",
    floatServices: "خدمات",
    floatPortfolio: "نمونه‌کار",
    floatContact: "تماس",

    // Chatbot
    chatTitle: "دستیار پورتفولیو",
    chatSubtitle: "هر سوالی درباره حسینه دارید بپرسید!",
    chatGreeting: "سلام! 👋 من دستیار هوشمند حسینه هستم. چگونه می‌توانم به شما کمک کنم؟",
    chatSugg1: "درباره حسینه بگویید",
    chatSugg2: "مشاهده مهارت‌ها",
    chatSugg3: "چگونه درخواست کار دهم؟",
    chatRelatedQuestions: "سوالات مرتبط:",
    chatInputPlaceholder: "پیام خود را اینجا بنویسید...",

    // Footer
    footerCopyright: "حقوق نشر &copy; ۲۰۲۶ متعلق به حسینه رحیمی | تمامی حقوق محفوظ است"
  }
};

function setLanguage(lang) {
  const targetLang = (lang && I18N_TRANSLATIONS[lang]) ? lang : 'en';
  const isRtl = targetLang === 'da';

  // Update HTML root attributes
  document.documentElement.setAttribute('lang', targetLang);
  document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');

  // Save to localStorage
  try {
    localStorage.setItem('portfolio_lang', targetLang);
  } catch (e) {
    console.warn('Unable to save language preference to localStorage:', e);
  }

  const translations = I18N_TRANSLATIONS[targetLang];

  // 1. Update text elements with data-i18n
  const textElements = document.querySelectorAll('[data-i18n]');
  textElements.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (translations[key] !== undefined) {
      el.textContent = translations[key];
    }
  });

  // 2. Update HTML elements with data-i18n-html
  const htmlElements = document.querySelectorAll('[data-i18n-html]');
  htmlElements.forEach((el) => {
    const key = el.getAttribute('data-i18n-html');
    if (translations[key] !== undefined) {
      el.innerHTML = translations[key];
    }
  });

  // 3. Update placeholders with data-i18n-placeholder
  const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
  placeholderElements.forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[key] !== undefined) {
      el.setAttribute('placeholder', translations[key]);
    }
  });

  // 4. Update Language Switcher UI Button Text & Active Option
  const langCurrentLabel = document.getElementById('lang-current-code') || document.getElementById('lang-current-label');
  if (langCurrentLabel) {
    langCurrentLabel.textContent = targetLang === 'da' ? 'دری' : 'EN';
  }

  const langOptions = document.querySelectorAll('.lang-option');
  langOptions.forEach((opt) => {
    const optLang = opt.getAttribute('data-lang');
    if (optLang === targetLang) {
      opt.classList.add('active');
    } else {
      opt.classList.remove('active');
    }
  });

  // 5. Re-render dynamic portfolio items if present
  if (typeof renderPortfolioProjects === 'function') {
    renderPortfolioProjects();
  }

  // 6. Re-run dynamic animations with updated translated text
  if (typeof initHeroNameAnimation === 'function') {
    initHeroNameAnimation();
  }

  if (typeof initTypewriter === 'function') {
    initTypewriter(translations.heroRoles);
  }
}

function initLanguageSwitcher() {
  const langSwitcher = document.querySelector('.lang-switcher');
  const langBtn = document.getElementById('lang-toggle-btn');
  const langOptions = document.querySelectorAll('.lang-option');

  // Load saved preference or default to 'en'
  let savedLang = 'en';
  try {
    savedLang = localStorage.getItem('portfolio_lang') || 'en';
  } catch (e) {
    savedLang = 'en';
  }

  // Initial apply
  setLanguage(savedLang);

  if (!langBtn || !langSwitcher) return;

  // Toggle dropdown on button click
  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langSwitcher.classList.toggle('open');
    const isExpanded = langSwitcher.classList.contains('open');
    langBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
  });

  // Language option selection
  langOptions.forEach((opt) => {
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      const selectedLang = opt.getAttribute('data-lang');
      setLanguage(selectedLang);
      langSwitcher.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close dropdown on click outside
  document.addEventListener('click', (e) => {
    if (!langSwitcher.contains(e.target)) {
      langSwitcher.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Close dropdown on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && langSwitcher.classList.contains('open')) {
      langSwitcher.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLanguageSwitcher);
} else {
  initLanguageSwitcher();
}



