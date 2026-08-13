document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('a[href^="#"]');
  const revealItems = document.querySelectorAll('.reveal');
  const yearElement = document.getElementById('year');

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  if (menuButton && navMenu) {
    menuButton.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuButton.classList.toggle('active');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuButton.classList.remove('active');
      });
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: 'smooth',
        });
      }
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));

  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-menu a');

  const setActiveLink = () => {
    let currentSection = 'inicio';

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 150) {
        currentSection = section.getAttribute('id');
      }
    });

    navItems.forEach((item) => {
      const href = item.getAttribute('href');
      const isActive = href === `#${currentSection}`;
      item.classList.toggle('active', isActive);
    });
  };

  window.addEventListener('scroll', setActiveLink);
  setActiveLink();
});
