export const locations = [
  {
    name: 'Basel (Dreispitz)',
    addressStreet: 'Leimgrubenweg 4',
    addressZip: '4053',
    addressCity: 'Basel',
    phone: '052 557 16 04',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2693.5807540160536!2d7.60474041243819!3d47.53702467106329!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4791b83b7701ee19%3A0xbbdcf32b49ff046f!2sLeimgrubenweg%204%2C%204053%20Basel!5e0!3m2!1sde!2sch!4v1711691789760!5m2!1sde!2sch',
  },
  {
    name: 'Basel (Bahnhof)',
    addressStreet: 'Elisabethenanlage 11',
    addressZip: '4051',
    addressCity: 'Basel',
    phone: '052 557 16 04',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1346.4924147029863!2d7.588155631126008!3d47.54862399638305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4791b8527524dffb%3A0x79974e6fb9132c6f!2sElisabethenanlage%2011%2C%204051%20Basel!5e0!3m2!1sde!2sch!4v1711692073250!5m2!1sde!2sch',
  },
  {
    name: 'Zürich',
    addressStreet: 'Pflanzschulstrasse 7/9',
    addressZip: '8004',
    addressCity: 'Zürich',
    phone: '052 557 16 05',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2701.871671573978!2d8.516817412430504!3d47.37542307104927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900a188614ea9d%3A0xaf25f89367ebd980!2sPflanzschulstrasse%207%2F9%2C%208004%20Z%C3%BCrich!5e0!3m2!1sde!2sch!4v1711692659990!5m2!1sde!2sch',
  },
  {
    name: 'Aarau',
    addressStreet: 'Bahnhofstrasse 1',
    addressZip: '5000',
    addressCity: 'Aarau',
    phone: '052 557 16 06',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2701.0927603699074!2d8.042864212431255!3d47.39062297105063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47903bef292a0abf%3A0xb65f919be708afc7!2sBahnhofstrasse%201%2C%205000%20Aarau!5e0!3m2!1sde!2sch!4v1711691914928!5m2!1sde!2sch',
  },
];

export function setDisplayLocationInfo(
  info,
  selector = '#locations .location-info'
) {
  const target = document.querySelector(selector);

  target.innerHTML = `
    <h3 class="bottom-spacing">${info.name}</h3>
    <p>${info.addressStreet}</p>
    <p class="bottom-spacing">${info.addressZip} ${info.addressCity}</p>
    <p class="bottom-spacing with-icon">
      <img class="icon" src="./assets/img/icons/phone-solid.svg" alt="Phone Icon" /> 
      <a class="default" href="tel:${info.phone}">${info.phone}</a>
    </p>
    <iframe
        width="100%"
        height="270"
        frameborder="0" style="border:0"
        src="${info.mapUrl}"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
    </iframe>
  `;
}

function setActiveLocation(
  selector = '#locations .location .col .list',
  move = false
) {
  const active = document.querySelector(selector + ' a.active');
  if (active) {
    active.classList.remove('active');
  }
  let location = new URLSearchParams(window.location.search).get('location');
  let skipScroll = false;

  if (!location || location == '') {
    location = locations[0].name;
    skipScroll = true;
  }

  const item = document.querySelector(
    selector + ` a[href="./locations.html?location=${location}"]`
  );
  item.classList.add('active');

  if (move) {
    setDisplayLocationInfo(locations.find((loc) => loc.name === location));
    if (!skipScroll) {
      item.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'center',
      });
    }
  }
}

export function setupDisplayLocation(
  selector = '#locations .location .col .list'
) {
  const target = document.querySelector(selector);
  const dropdown = document.querySelector(
    '#locations .location #location-dropdown'
  );

  locations.forEach((location) => {
    const item = document.createElement('a');
    item.setAttribute('href', './locations.html?location=' + location.name);
    item.textContent = location.name;
    item.addEventListener('click', (event) => {
      event.preventDefault();
      let url = new URL(window.location.href);
      url.searchParams.set('location', location.name);
      window.history.pushState({}, '', url);
      setDisplayLocationInfo(location);
      setActiveLocation(selector, false);
    });
    target.appendChild(item);

    let targetLocation =
      new URLSearchParams(window.location.search).get('location') ||
      locations[0].name;

    const dropdownOption = document.createElement('option');
    dropdownOption.value = location.name;
    dropdownOption.textContent = location.name;
    if (location.name === targetLocation) {
      dropdownOption.selected = true;
    }
    dropdown.appendChild(dropdownOption);
  });

  dropdown.addEventListener('change', (event) => {
    let url = new URL(window.location.href);
    url.searchParams.set('location', event.target.value);
    window.history.pushState({}, '', url);
    setDisplayLocationInfo(
      locations.find((loc) => loc.name === event.target.value)
    );
    setActiveLocation(selector, false);
  });

  setActiveLocation(selector, true);
}
