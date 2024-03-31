import { debounce } from './_functions.js';

function createStars(rating) {
  const stars = document.createElement('div');
  stars.classList.add('stars');

  for (let i = 0; i < 5; i++) {
    const star = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    star.classList.add('star');
    star.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    star.setAttribute('viewBox', '0 0 24 24');
    star.setAttribute('fill', 'none');
    star.setAttribute('stroke', 'currentColor');
    star.setAttribute('stroke-width', '2');
    star.setAttribute('stroke-linecap', 'round');
    star.setAttribute('stroke-linejoin', 'round');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute(
      'd',
      'M12 2 L15.09 8.45 L22 9.27 L17 14 L18.18 21 L12 17.77 L5.82 21 L7 14 L2 9.27 L8.91 8.45 L12 2 Z'
    );
    star.appendChild(path);

    if (i + 1 <= rating) {
      star.classList.add('filled');
    }

    stars.appendChild(star);
  }

  return stars;
}

function createratingItem(itemInfo) {
  const item = document.createElement('div');
  item.classList.add('rating-item');

  item.innerHTML = `
        ${createStars(itemInfo.rating).outerHTML}
        <h5>${itemInfo.name}</h5>
        <p>${itemInfo.comment}</p>
    `;

  return item;
}

function createratingDot(index) {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  dot.setAttribute('data-index', index);

  return dot;
}

var PAUSED = false;

export function setupRatings(data) {
  const rating = document.querySelector('#ratings .rating');
  rating.addEventListener('mouseenter', () => {
    PAUSED = true;
  });
  rating.addEventListener('mouseleave', () => {
    PAUSED = false;
  });

  let ratingsInner = document.createElement('div');
  ratingsInner.classList.add('ratings-inner');

  data.forEach((rating, index) => {
    const ratingItem = createratingItem(rating);
    ratingItem.setAttribute('data-index', index);
    ratingsInner.appendChild(ratingItem);
  });
  rating.appendChild(ratingsInner);

  const debouncedUpdateRatings = debounce(updateRatings, 300);

  updateRatings();
  window.addEventListener('resize', function () {
    debouncedUpdateRatings();
  });

  setInterval(() => {
    if (!PAUSED) {
      walkRating();
    }
  }, 7500);
}

export function setRatingPage(index) {
  const maxIndex = document.querySelectorAll('#ratings .dot').length - 1;
  const ratingsInner = document.querySelector('#ratings .ratings-inner');

  if (index > maxIndex) {
    index = 0;
  }

  document
    .querySelectorAll('#ratings .dot.active')
    .forEach((dot) => dot.classList.remove('active'));
  try {
    document
      .querySelector(`#ratings .dot[data-index="${index}"]`)
      .classList.add('active');
  } catch (error) {
    setTimeout(() => {
      setRatingPage(index);
    }, 500);
  }

  const viewWidth = Number.parseInt(ratingsInner.getAttribute('data-view'));

  ratingsInner.style.transform = `translateX(-${index * viewWidth}px)`;
  ratingsInner.setAttribute('data-page', index);
}

function calcItemMeta() {
  let breakpoints = [0, 375, 576, 768, 992, 1200];

  const viewportWidth = window.innerWidth;
  let index =
    breakpoints.findIndex((breakpoint) => breakpoint > viewportWidth) - 1;

  if (index < 0) {
    index = breakpoints.length - 1;
  }

  // container width - 15px padding on each side
  let maxWidth = breakpoints[index] - 15 * 2;

  let width = 250;
  let maxItems = Math.floor(maxWidth / width);
  if (maxItems < 1) {
    if (maxWidth < 0) {
      // container width - 15px padding on each side
      maxWidth = document.querySelector('.container').clientWidth - 2 * 15;
    }

    width = maxWidth;
    maxItems = 1;
  }

  let itemMargin = maxWidth - maxItems * width;
  let finalMargin = itemMargin / maxItems;

  if (finalMargin <= 0) {
    finalMargin = 5;
  }

  return [width, maxItems, finalMargin / 2, maxWidth];
}

function updateRatings() {
  const meta = calcItemMeta();
  const ratingInner = document.querySelector('#ratings .ratings-inner');
  let currentPage = ratingInner.getAttribute('data-page') || 0;
  const ratingItems = document.querySelectorAll('#ratings .rating-item');
  const ratingDots = document.querySelector('#ratings .rating-dots');

  if (meta[1] == 1) {
    ratingInner.setAttribute('data-view', meta[3]);
  } else {
    ratingInner.setAttribute('data-view', meta[3]);
  }

  ratingItems.forEach((item, index) => {
    if (meta[2] > 0) {
      item.style.marginLeft = meta[2] + 'px';
      item.style.marginRight = meta[2] + 'px';
    }

    item.style.width = meta[0] + 'px';

    if (index == 0) {
      item.style.marginLeft = '0px';
    } else if (index == ratingItems.length - 1) {
      item.style.marginRight = '0px';
    }
  });

  ratingDots.innerHTML = '';
  let dotAmount = Math.ceil(ratingItems.length / meta[1]);
  for (let i = 0; i < dotAmount; i++) {
    const ratingDot = createratingDot(i);
    ratingDot.addEventListener('click', function () {
      let index = Number.parseInt(this.getAttribute('data-index'));
      setRatingPage(index);
    });
    ratingDots.appendChild(ratingDot);
  }

  setRatingPage(currentPage);
}

function walkRating() {
  const ratingInner = document.querySelector('#ratings .ratings-inner');
  let currentPage = Number.parseInt(ratingInner.getAttribute('data-page')) || 0;
  setRatingPage(currentPage + 1);
}
