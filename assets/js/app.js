(() => {
  'use strict';

  const CONFIG = {
    eventDate: '2026-08-22T10:30:00+07:00',
    invitationUrl: 'https://tuananhphamcoder-ctrl.github.io/mung-tho-90-tuoi/',
    // Dán URL Web App của Google Apps Script vào giữa hai dấu nháy sau khi thiết lập Google Sheets.
    rsvpEndpoint: ''
  };

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const intro = $('#intro');
  const envelope = $('#envelope');
  const openButton = $('#openInvitation');
  const music = $('#backgroundMusic');
  const musicToggle = $('#musicToggle');
  const backToTop = $('#backToTop');
  const shareButton = $('#shareInvitation');
  const form = $('#rsvpForm');
  const formStatus = $('#formStatus');
  const guestCount = $('#guestCount');

  document.body.classList.add('intro-open');

  if (window.lucide) window.lucide.createIcons();

  if (window.AOS) {
    window.AOS.init({
      once: true,
      duration: 900,
      offset: 70,
      easing: 'ease-out-cubic'
    });
  }

  if (window.Swiper) {
    new window.Swiper('.photo-swiper', {
      loop: true,
      speed: 850,
      spaceBetween: 18,
      centeredSlides: true,
      autoplay: { delay: 4200, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      breakpoints: {
        0: { slidesPerView: 1.13, spaceBetween: 12 },
        640: { slidesPerView: 1.35, spaceBetween: 18 },
        960: { slidesPerView: 1.7, spaceBetween: 24 }
      }
    });
  }

  function createLotusParticles() {
    const host = $('#lotusParticles');
    if (!host || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const count = window.innerWidth < 640 ? 12 : 22;
    for (let i = 0; i < count; i += 1) {
      const item = document.createElement('span');
      item.className = 'lotus-particle';
      item.textContent = i % 3 === 0 ? '✦' : '❀';
      item.style.left = `${Math.random() * 100}%`;
      item.style.fontSize = `${10 + Math.random() * 18}px`;
      item.style.animationDuration = `${12 + Math.random() * 14}s`;
      item.style.animationDelay = `${-Math.random() * 20}s`;
      item.style.setProperty('--drift', `${-60 + Math.random() * 120}px`);
      host.appendChild(item);
    }
  }
  createLotusParticles();

  async function playMusic() {
    try {
      await music.play();
      musicToggle.classList.add('is-playing');
      musicToggle.setAttribute('aria-pressed', 'true');
      musicToggle.setAttribute('aria-label', 'Tắt nhạc nền');
    } catch (error) {
      musicToggle.classList.remove('is-playing');
    }
  }

  function pauseMusic() {
    music.pause();
    musicToggle.classList.remove('is-playing');
    musicToggle.setAttribute('aria-pressed', 'false');
    musicToggle.setAttribute('aria-label', 'Bật nhạc nền');
  }

  openButton?.addEventListener('click', () => {
    envelope.classList.add('opened');
    playMusic();
    if (window.gsap) {
      window.gsap.to('.intro-title, .intro-button, .intro-hint', { opacity: 0, y: 14, duration: .45, stagger: .05 });
    }
    window.setTimeout(() => {
      intro.classList.add('is-hidden');
      document.body.classList.remove('intro-open');
      if (window.gsap) {
        window.gsap.fromTo('.hero-card', { opacity: 0, y: 42, scale: .97 }, { opacity: 1, y: 0, scale: 1, duration: 1.15, ease: 'power3.out' });
        window.gsap.fromTo('.hero-photo', { scale: 1.08 }, { scale: 1.02, duration: 2.4, ease: 'power2.out' });
      }
    }, 1400);
  });

  musicToggle?.addEventListener('click', () => {
    if (music.paused) playMusic(); else pauseMusic();
  });

  function updateCountdown() {
    const target = new Date(CONFIG.eventDate).getTime();
    const now = Date.now();
    let distance = target - now;
    const message = $('#countdownMessage');

    if (distance <= 0) {
      distance = 0;
      if (message) message.textContent = 'Ngày vui đã đến. Kính chúc Bà phúc thọ an khang!';
    }

    const days = Math.floor(distance / 86400000);
    const hours = Math.floor((distance % 86400000) / 3600000);
    const minutes = Math.floor((distance % 3600000) / 60000);
    const seconds = Math.floor((distance % 60000) / 1000);

    $('#days').textContent = String(days).padStart(2, '0');
    $('#hours').textContent = String(hours).padStart(2, '0');
    $('#minutes').textContent = String(minutes).padStart(2, '0');
    $('#seconds').textContent = String(seconds).padStart(2, '0');
  }
  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  window.addEventListener('scroll', () => {
    backToTop?.classList.toggle('visible', window.scrollY > 720);
  }, { passive: true });
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  shareButton?.addEventListener('click', async () => {
    const shareData = {
      title: 'Lễ mừng thượng thọ Bà Phạm Thị Phi Yến — 90 tuổi',
      text: 'Trân trọng kính mời quý khách đến chung vui cùng gia đình vào ngày 22/08/2026.',
      url: CONFIG.invitationUrl
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(CONFIG.invitationUrl);
        const oldText = shareButton.querySelector('span').textContent;
        shareButton.querySelector('span').textContent = 'Đã sao chép đường dẫn';
        window.setTimeout(() => { shareButton.querySelector('span').textContent = oldText; }, 2200);
      }
    } catch (error) {
      if (error?.name !== 'AbortError') window.prompt('Sao chép đường dẫn thiệp:', CONFIG.invitationUrl);
    }
  });

  function setFormMessage(message, type = '') {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`.trim();
  }

  function localResponses() {
    try { return JSON.parse(localStorage.getItem('rsvpResponses') || '[]'); }
    catch { return []; }
  }

  function localGuestTotal() {
    return localResponses().reduce((sum, item) => item.attendance === 'Có tham dự' ? sum + Number(item.guests || 0) : sum, 0);
  }

  function saveLocalResponse(payload) {
    const responses = localResponses();
    responses.push(payload);
    localStorage.setItem('rsvpResponses', JSON.stringify(responses));
    guestCount.textContent = String(localGuestTotal());
  }

  function loadGuestCount() {
    if (!CONFIG.rsvpEndpoint) {
      guestCount.textContent = String(localGuestTotal());
      return;
    }

    const callbackName = `__rsvpCount_${Date.now()}`;
    const script = document.createElement('script');
    const cleanup = () => {
      delete window[callbackName];
      script.remove();
    };

    window[callbackName] = (data) => {
      guestCount.textContent = String(Number(data?.count || 0));
      cleanup();
    };

    script.onerror = cleanup;
    script.src = `${CONFIG.rsvpEndpoint}?action=count&callback=${callbackName}&t=${Date.now()}`;
    document.body.appendChild(script);
    window.setTimeout(cleanup, 7000);
  }
  loadGuestCount();

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitButton = form.querySelector('button[type="submit"]');
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') || '').trim(),
      phone: String(data.get('phone') || '').trim(),
      guests: Number(data.get('guests') || 1),
      attendance: String(data.get('attendance') || ''),
      message: String(data.get('message') || '').trim(),
      createdAt: new Date().toISOString()
    };

    if (!payload.name || !payload.attendance) {
      setFormMessage('Vui lòng nhập họ tên và chọn tình trạng tham dự.', 'error');
      return;
    }

    submitButton.disabled = true;
    setFormMessage('Đang gửi xác nhận…');

    try {
      if (CONFIG.rsvpEndpoint) {
        const body = new URLSearchParams();
        Object.entries(payload).forEach(([key, value]) => body.append(key, String(value)));
        await fetch(CONFIG.rsvpEndpoint, { method: 'POST', mode: 'no-cors', body });
        setFormMessage('Gia đình đã nhận được xác nhận. Trân trọng cảm ơn quý khách!', 'success');
        window.setTimeout(loadGuestCount, 1500);
      } else {
        saveLocalResponse(payload);
        setFormMessage('Đã ghi nhận trên thiết bị này. Chủ thiệp cần kết nối Google Sheets trước khi gửi khách.', 'success');
      }
      form.reset();
      form.querySelector('input[name="attendance"][value="Có tham dự"]').checked = true;
    } catch (error) {
      setFormMessage('Chưa gửi được xác nhận. Vui lòng thử lại hoặc liên hệ gia đình.', 'error');
    } finally {
      submitButton.disabled = false;
    }
  });
})();
