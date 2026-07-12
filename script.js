(() => {
  'use strict';

  // ---------- Footer year ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Sticky top bar + route progress + hero van wipe ----------
  const topbar = document.getElementById('topbar');
  const routeFill = document.getElementById('routeFill');
  const heroSection = document.getElementById('hero');
  const heroVan = document.getElementById('heroVan');

  const updateHeroWipe = () => {
    if (!heroSection || !heroVan) return;
    const rect = heroSection.getBoundingClientRect();
    // Non-sticky hero: progress runs from 0 (hero top at viewport top)
    // to 1 (hero top has scrolled up by its own full height, i.e. hero
    // has fully scrolled past the top of the viewport).
    const total = heroSection.offsetHeight;
    if (total <= 0) { heroVan.style.setProperty('--wipe', 0); return; }
    const scrolled = -rect.top;
    let progress = scrolled / total;
    progress = Math.max(0, Math.min(1, progress));
    heroVan.style.setProperty('--wipe', progress.toFixed(4));
  };

  const onScroll = () => {
    if (window.scrollY > 12) topbar.classList.add('is-scrolled');
    else topbar.classList.remove('is-scrolled');

    // route progress line
    const doc = document.documentElement;
    const scrollTop = window.scrollY;
    const height = doc.scrollHeight - doc.clientHeight;
    const pct = height > 0 ? (scrollTop / height) * 100 : 0;
    routeFill.style.width = pct + '%';

    updateHeroWipe();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateHeroWipe);
  onScroll();

  // ---------- Mobile nav ----------
  const menuToggle = document.getElementById('menuToggle');
  const topnav = document.getElementById('topnav');

  const closeMenu = () => {
    menuToggle.classList.remove('is-open');
    topnav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };
  const openMenu = () => {
    menuToggle.classList.add('is-open');
    topnav.classList.add('is-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = topnav.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  topnav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 920) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  document.addEventListener('click', (e) => {
  if (!topnav.classList.contains('is-open')) return;
  if (topnav.contains(e.target) || menuToggle.contains(e.target)) return;
  closeMenu();
});

  // ---------- Scroll reveal ----------
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }


  // ---------- Portfolio carousel ----------
  const portfolioItems = [
    { title: 'Beverage Distribution', desc: 'Water, soft drinks and juices, delivered on schedule to keep every shelf and fridge stocked.' },
    { title: 'FMCG Distribution', desc: 'Biscuits, chocolates, baby care essentials and cigarettes moved efficiently across our retail network.' },
    { title: 'Import & Export', desc: 'Cross-border sourcing and sales handled with full documentation and compliance support.' },
    { title: 'Clearing & Forwarding', desc: 'Customs clearance and freight forwarding managed end to end, so shipments keep moving.' },
    { title: 'Warehousing & Logistics', desc: 'Secure storage and coordinated transport that keeps stock available and orders on time.' },
    { title: 'Retail & Wholesale Supply', desc: 'Flexible supply arrangements built around the volumes that retailers and wholesalers need.' }
  ];

  const portfolioStack = document.getElementById('portfolioStack');
  const portfolioCards = portfolioStack ? Array.from(portfolioStack.querySelectorAll('.portfolio-card')) : [];
  const portfolioDotsWrap = document.getElementById('portfolioDots');
  const portfolioTitleEl = document.getElementById('portfolioTitle');
  const portfolioDescEl = document.getElementById('portfolioDesc');
  const portfolioPrevBtn = document.getElementById('portfolioPrev');
  const portfolioNextBtn = document.getElementById('portfolioNext');

  if (portfolioCards.length) {
    let activeIndex = 0;
    const total = portfolioCards.length;

    portfolioCards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'portfolio-dot';
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.addEventListener('click', () => goTo(i));
      portfolioDotsWrap.appendChild(dot);
    });
    const portfolioDots = Array.from(portfolioDotsWrap.querySelectorAll('.portfolio-dot'));

    const renderStack = () => {
      portfolioCards.forEach((card, i) => {
        let offset = i - activeIndex;
        if (offset > total / 2) offset -= total;
        if (offset < -total / 2) offset += total;

        const abs = Math.abs(offset);
        const x = offset * 32;
        const rotate = offset * 9;
        const scale = 1 - abs * 0.09;
        const z = 100 - abs;
        const opacity = abs > 3 ? 0 : 1 - abs * 0.46;

        card.style.transform = `translateX(calc(-50% + ${x}px)) rotate(${rotate}deg) scale(${scale})`;
        card.style.zIndex = z;
        card.style.opacity = opacity;
        card.style.filter = abs === 0 ? 'none' : `blur(${Math.min(abs * 2.5, 4)}px) brightness(${1 - abs * 0.12})`;
        card.style.pointerEvents = abs === 0 ? 'auto' : 'none';
      });

      portfolioDots.forEach((dot, i) => dot.classList.toggle('is-active', i === activeIndex));

      [portfolioTitleEl, portfolioDescEl].forEach(el => el.classList.remove('is-in'));
      void portfolioTitleEl.offsetWidth; // restart animation
      portfolioTitleEl.textContent = portfolioItems[activeIndex].title;
      portfolioDescEl.textContent = portfolioItems[activeIndex].desc;
      requestAnimationFrame(() => {
        portfolioTitleEl.classList.add('is-in');
        portfolioDescEl.classList.add('is-in');
      });
    };

    const goTo = (i) => {
      activeIndex = (i + total) % total;
      renderStack();
    };

    portfolioPrevBtn.addEventListener('click', () => goTo(activeIndex - 1));
    portfolioNextBtn.addEventListener('click', () => goTo(activeIndex + 1));

    portfolioCards.forEach(card => {
      card.addEventListener('click', () => goTo(Number(card.dataset.index)));
    });

    // swipe support
    let touchStartX = 0;
    portfolioStack.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    portfolioStack.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) goTo(activeIndex + (dx < 0 ? 1 : -1));
    }, { passive: true });

    renderStack();
  }
})();