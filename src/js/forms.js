import { locations } from './location';

const patterns = {
  email: [
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    'Bitte gib eine gültige E-Mail-Adresse ein.',
  ],
  phone: [
    /^\+41\s?7[0-9]{1}\s?[0-9]{3}\s?[0-9]{2}\s?[0-9]{2}$/,
    'Bitte gib eine gültige Schweizer Telefonnummer ein (+41 7x xxx xx xx).',
  ],
  'credit-card-number': [
    /^[0-9]{4}\s*[0-9]{4}\s*[0-9]{4}\s*[0-9]{4}$/,
    'Bitte gib eine gültige Kartennummer ein.',
  ],
  'credit-card-expiry': [
    /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
    'Bitte gib das Ablaufdatum im Format MM/YY ein.',
  ],
  'credit-card-cvc': [
    /^[0-9]{3,4}$/,
    'Bitte gib einen gültigen Sicherheitscode ein (3 oder 4 Ziffern).',
  ],
};

function hideSubForms(name) {
  let targets = document.querySelectorAll(`[data-for="${name}"].selected`);
  targets.forEach((target) => {
    target.classList.remove('selected');

    let inputs = target.querySelectorAll('input, select');
    inputs.forEach((input) => {
      input.required = false;
      input.value = '';
    });
  });
}

function showSubForm(name, value) {
  hideSubForms(name);
  let target = document.querySelector(
    `[data-for="${name}"][data-value="${value}"]`
  );
  if (target) {
    target.classList.add('selected');

    let inputs = target.querySelectorAll('input, select');
    inputs.forEach((input) => {
      input.required = true;
    });
  }
}

function findAndRegisterSubForms() {
  let wrappers = document.querySelectorAll('.sub-form-wrapper');

  wrappers.forEach((wrapper) => {
    let select = wrapper.querySelector('select');
    select.addEventListener('change', function () {
      showSubForm(this.getAttribute('name'), this.value);
    });

    showSubForm(select.getAttribute('name'), select.value);
  });
}

function fillDynamicSelects() {
  const selects = document.querySelectorAll('select.dynamic-select');

  selects.forEach((select) => {
    const name = select.getAttribute('name');

    switch (name) {
      case 'studio':
        locations.forEach((location) => {
          const option = document.createElement('option');
          option.value = location.name;
          option.textContent = location.name;
          select.appendChild(option);
        });
        break;
    }
  });
}

function setInputInvalid(name, message) {
  let input = document.querySelector(`[name="${name}"]`);

  let messageContainer = input.parentElement.querySelector('div.message');
  if (!messageContainer) {
    messageContainer = document.createElement('div');
    messageContainer.classList.add('message');
    input.parentElement.appendChild(messageContainer);
  }

  messageContainer.textContent = message;
  input.parentElement.classList.add('invalid');
}

function resetInputValidation(name) {
  let input = document.querySelector(`[name="${name}"]`);
  if (input.parentElement.classList.contains('invalid')) {
    let message = input.parentElement.querySelector('div.message');
    if (message) {
      message.remove();
    }
    input.parentElement.classList.remove('invalid');
  }
}

function applyFromSearchAndPatterns() {
  let urlParams = new URLSearchParams(window.location.search);
  let inputs = document.querySelectorAll('[name]');

  inputs.forEach((input) => {
    let tagName = input.tagName.toLowerCase();
    let paramName = input.getAttribute('name');
    let paramValue = urlParams.get(paramName);
    let hasPattern = patterns[paramName];
    if (hasPattern) {
      const validate = () => {
        if (
          input.value.length >= 1 &&
          !input.value.match(patterns[paramName][0])
        ) {
          setInputInvalid(paramName, patterns[paramName][1]);
        } else {
          resetInputValidation(paramName);
        }
      };
      input.addEventListener('keyup', validate);
      validate();
    }

    if (paramValue !== null) {
      input.value = paramValue;
      if (tagName === 'select') {
        input.dispatchEvent(new Event('change'));
      }
    }
  });
}

function setupFormSubmitListener() {
  let forms = document.querySelectorAll('form');

  forms.forEach((form) => {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      let invalidState = false;
      let inputs = document.querySelectorAll('[name]');
      inputs.forEach((input) => {
        const inputName = input.getAttribute('name');

        if (patterns[inputName]) {
          if (
            input.value.length >= 1 &&
            !input.value.match(patterns[inputName][0])
          ) {
            setInputInvalid(inputName, patterns[inputName][1]);
            invalidState = true;
          } else {
            resetInputValidation(inputName);
            invalidState = false;
          }
        }
      });

      if (!invalidState) {
        let formData = new FormData(form);
        let data = Object.fromEntries(formData.entries());
        let nonEmptyData = Object.keys(data).reduce((acc, key) => {
          if (data[key] !== '') {
            acc[key] = data[key];
          }
          return acc;
        }, {});
        console.log(nonEmptyData);

        let url = new URL(window.location.href);
        let params = new URLSearchParams();

        Object.keys(nonEmptyData).forEach((key) => {
          params.append(key, nonEmptyData[key]);
        });
        url.search = params.toString();
        console.log(url.href);
      }
    });
    form.addEventListener('reset', function () {
      let inputs = document.querySelectorAll('[name]');
      inputs.forEach((input) => {
        resetInputValidation(input.getAttribute('name'));
      });
    });
  });
}

export function setupForms() {
  findAndRegisterSubForms();
  fillDynamicSelects();
  applyFromSearchAndPatterns();
  setupFormSubmitListener();
}
