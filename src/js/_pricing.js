const featuresList = [
  {
    name: 'Zugang zu Wasserspendern',
    icon: './assets/img/icons/droplet-solid.svg',
    budget: true,
    premium: true,
    luxury: true,
  },
  {
    name: 'Teilnahme an Gruppenkursen',
    icon: './assets/img/icons/users-viewfinder-solid.svg',
    budget: true,
    premium: true,
    luxury: true,
  },
  {
    name: '24/7 Zugang',
    icon: './assets/img/icons/clock-solid.svg',
    budget: false,
    premium: true,
    luxury: true,
  },
  {
    name: 'Personal Training',
    icon: './assets/img/icons/user-check-solid.svg',
    budget: false,
    premium: true,
    luxury: true,
  },
  {
    name: 'Zugang zum Wellness-Bereich',
    icon: './assets/img/icons/heart-pulse-solid.svg',
    budget: false,
    premium: true,
    luxury: true,
  },
  {
    name: 'Ernährungsberatung',
    icon: './assets/img/icons/utensils-solid.svg',
    budget: false,
    premium: true,
    luxury: true,
  },
  {
    name: 'Zugang zu Premium-Geräten',
    icon: './assets/img/icons/award-solid.svg',
    budget: false,
    premium: true,
    luxury: true,
  },
  {
    name: 'Exklusive Spa-Angebote',
    icon: './assets/img/icons/leaf-solid.svg',
    budget: false,
    premium: false,
    luxury: true,
  },
  {
    name: 'Teilnahme an VIP-Events',
    icon: './assets/img/icons/star-solid.svg',
    budget: false,
    premium: false,
    luxury: true,
  },
  {
    name: 'Zugang zu Workshops & Seminaren',
    icon: './assets/img/icons/chalkboard-user-solid.svg',
    budget: false,
    premium: false,
    luxury: true,
  },
];

function createIcon(feature, alt = null) {
  let popover = false;
  if (alt === null) {
    alt = feature.name;
    popover = true;
  }

  const img = document.createElement('img');
  img.classList.add('icon');
  img.src = feature.icon;
  img.alt = alt;
  if (popover) {
    img.setAttribute('title', alt);
  }
  return img;
}

export function createPricingIconList(plan, selector) {
  const target = document.querySelector(selector);

  featuresList.forEach((feature) => {
    if (plan === 'budget' && !feature.budget) return;
    if (plan === 'premium' && (!feature.premium || feature.budget)) return;
    if (plan === 'luxury' && (!feature.luxury || feature.premium)) return;

    let icon = createIcon(feature);
    target.appendChild(icon);
  });
}

export function createPricingTable(selector) {
  const target = document.querySelector(`${selector} tbody`);

  featuresList.forEach((feature) => {
    let row = document.createElement('tr');

    const checkSvg = './assets/img/icons/check-solid.svg';
    const xMarkSvg = './assets/img/icons/xmark-solid.svg';

    row.innerHTML = `
      <td>
        ${createIcon(feature, 'Icon').outerHTML}
        <span class="caption">${feature.name}</span>
      </td>
      <td>${
        createIcon({
          icon: feature.budget ? checkSvg : xMarkSvg,
          name: 'Budget',
        }).outerHTML
      }</td>       
      <td>${
        createIcon({
          icon: feature.premium ? checkSvg : xMarkSvg,
          name: 'Premium',
        }).outerHTML
      }</td>
      <td>${
        createIcon({
          icon: feature.luxury ? checkSvg : xMarkSvg,
          name: 'Luxus',
        }).outerHTML
      }</td>
    `;

    target.appendChild(row);
  });
}

export function createMobilePricingList(selector) {
  const target = document.querySelector(selector);

  featuresList.forEach((feature) => {
    let item = document.createElement('div');
    item.classList.add('list-item');
    item.innerHTML = `
      <div class="list-item-header">
        ${createIcon(feature, 'Icon').outerHTML}
        <h5>${feature.name}</h5>
      </div>
      <div class="list-item-content">
        <div class="tag ${
          feature.budget ? 'check' : 'not-covered'
        }">Budget</div>
        <div class="tag ${
          feature.premium ? 'check' : 'not-covered'
        }">Premium</div>
        <div class="tag check">Luxus</div>
      </div>  
    `;

    target.appendChild(item);
  });
}
