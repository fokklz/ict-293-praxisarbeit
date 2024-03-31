import '../scss/index.scss';

import { registerListener } from './_functions';
import { setupRatings } from './_ratings';
import {
  createPricingIconList,
  createPricingTable,
  createMobilePricingList,
} from './_pricing';
import { setDisplayLocationInfo, setupDisplayLocation } from './_location';
import { setupForms } from './_forms';

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
  mobileNav.style.paddingTop = `${navHeight}px`;
}

document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('header');
  const nav = document.querySelector('header nav');
  if (document.body.classList.contains('no-hero')) {
    document.body.style.marginTop = `${header.clientHeight}px`;
  }

  window.addEventListener('scroll', function () {
    nav.classList.toggle('expanded', !(window.scrollY > 200));
  });

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

  setupForms();
});
