'use strict';

(function () {
  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var menu = document.querySelector('.setup');

  var similarListElement = menu.querySelector('.setup-similar-list');

  var template = document
    .querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');

  var renderWizard = function (wizardItem) {
    var wizardElement = template.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent =
      wizardItem.name;
    wizardElement.querySelector('.wizard-coat').style.fill =
      wizardItem.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill =
      wizardItem.colorEyes;

    return wizardElement;
  };

  var successHandler = function (wizard) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(window.util.getRandomElement(wizard)));
    }
    similarListElement.appendChild(fragment);

    menu.querySelector('.setup-similar').classList.remove('hidden');
  };

  window.load(successHandler, window.backend.errorHandler);

  var wizard = menu.querySelector('.setup-wizard');

  var wizardCoat = wizard.querySelector('.wizard-coat');
  var wizardEyes = wizard.querySelector('.wizard-eyes');
  var wizardFireball = menu.querySelector('.setup-fireball-wrap');

  var changeWizardPartsColor = function (part, colorArr, inputName) {
    part.addEventListener('click', function () {
      var color = window.util.getRandomElement(colorArr);
      part.style.fill = color;
      menu.querySelector(inputName).value = color;
    });
  };

  var changeWizardFireballColor = function (part, colorArr, inputName) {
    part.addEventListener('click', function () {
      var fireballColor = window.util.getRandomElement(colorArr);
      part.querySelector(
          '.setup-fireball'
      ).style.backgroundColor = fireballColor;
      part.querySelector(inputName).value = fireballColor;
    });
  };

  changeWizardPartsColor(wizardCoat, COAT_COLORS, 'input[name = coat-color]');
  changeWizardPartsColor(wizardEyes, EYES_COLORS, 'input[name = eyes-color]');

  changeWizardFireballColor(
      wizardFireball,
      FIREBALL_COLORS,
      'input[name = fireball-color]'
  );

  window.setup = {
    menu: menu
  };
})();
