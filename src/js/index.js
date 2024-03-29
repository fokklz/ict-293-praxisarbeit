import '../scss/index.scss';
import { registerListener } from './functions';
import { setupRatings } from './ratings';
import {
  createPricingIconList,
  createPricingTable,
  createMobilePricingList,
} from './pricing';
import { setDisplayLocationInfo, setupDisplayLocation } from './location';

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
window.createPricingIconList = createPricingIconList;
window.createMobilePricingList = createMobilePricingList;
window.createPricingTable = createPricingTable;
window.setDisplayLocationInfo = setDisplayLocationInfo;
window.setupDisplayLocation = setupDisplayLocation;

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

  const fakeHrefs = document.querySelectorAll('[data-href]');
  fakeHrefs.forEach((fakeHref) => {
    fakeHref.addEventListener('click', () => {
      window.location.href = fakeHref.getAttribute('data-href');
    });
  });
});
