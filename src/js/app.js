// Menu Management
const menuManager = {
  init() {
    this.bindMenuEvents();
    this.initializeSwiper();
    this.initializeScrollEvents();
    this.initializeCountdown();
  },

  bindMenuEvents() {
    document.querySelectorAll('[data-menu-toggle]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleMenu(btn.dataset.menuToggle);
      });
    });

    // Close menus on overlay click
    ['mobileMenu', 'mobileCategoryMenu'].forEach(id => {
      document.getElementById(id)?.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) this.toggleMenu(id);
      });
    });
  },

  toggleMenu(menuId) {
    const menu = document.getElementById(menuId);
    const content = document.getElementById(`${menuId}Content`);
    
    if (!menu || !content) return;

    if (menu.classList.contains('hidden')) {
      this.closeAllMenus();
      menu.classList.remove('hidden');
      setTimeout(() => content.classList.remove('-translate-x-full'), 1);
    } else {
      content.classList.add('-translate-x-full');
      setTimeout(() => menu.classList.add('hidden'), 300);
    }
  },

  closeAllMenus() {
    ['mobileMenu', 'mobileCategoryMenu'].forEach(id => {
      const menu = document.getElementById(id);
      const content = document.getElementById(`${id}Content`);
      if (menu && !menu.classList.contains('hidden')) {
        content.classList.add('-translate-x-full');
        setTimeout(() => menu.classList.add('hidden'), 300);
      }
    });
  }
};

// Swiper Configuration
const swiperConfig = {
  initializeSwiper() {
    // Banner Swiper
    new Swiper('.bannerSwiper', {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      }
    });

    // Flash Sales Swiper
    new Swiper('.flashSalesSwiper', {
      slidesPerView: 2,
      spaceBetween: 12,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 16 },
        768: { slidesPerView: 3, spaceBetween: 16 },
        1024: { slidesPerView: 4, spaceBetween: 16 },
        1280: { slidesPerView: 5, spaceBetween: 16 }
      }
    });
  }
};

// Countdown Timer
const countdownManager = {
  initializeCountdown() {
    const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
    
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = endTime - now;
      
      if (distance < 0) {
        ['hours', 'minutes', 'seconds'].forEach(unit => {
          document.getElementById(unit).textContent = '00';
        });
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
      document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
      document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    };

    setInterval(updateTimer, 1000);
    updateTimer();
  }
};

// Scroll Events
const scrollManager = {
  initializeScrollEvents() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      // Scroll to top button visibility
      if (currentScroll > 300) {
        scrollToTopBtn.classList.replace('scale-0', 'scale-100');
      } else {
        scrollToTopBtn.classList.replace('scale-100', 'scale-0');
      }

      lastScroll = currentScroll;
    });

    // Scroll to top functionality
    scrollToTopBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
};

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
  Object.assign(menuManager, swiperConfig, countdownManager, scrollManager);
  menuManager.init();
});
