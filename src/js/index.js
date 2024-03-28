import '../scss/index.scss';
import { registerListener } from './functions';
import { setupRatings } from './ratings';

export function setActive(className) {
  document.querySelectorAll('.nav-link.active').forEach((link) => {
    link.classList.remove('active');
  });
  document.querySelectorAll(`.nav-link.${className}`).forEach((link) => {
    link.classList.add('active');
  });
}
window.setActive = setActive;
window.setupRatings = setupRatings;

function updateMobileNavHeight() {
  const mobileNav = document.getElementById('mobile-nav');
  const navHeight = document.getElementsByTagName('nav')[0].clientHeight;
  mobileNav.style.top = `${navHeight}px`;
}

document.addEventListener('DOMContentLoaded', function () {
  updateMobileNavHeight();

  registerListener('#mobile-nav-trigger', 'change', function () {
    const mobileNav = document.getElementById('mobile-nav');

    if (this.checked) {
      updateMobileNavHeight();
      mobileNav.style.transform = 'translateY(0)';
    } else {
      mobileNav.style.transform = '';
    }
  });
});
