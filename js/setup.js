'use strict';

var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var WIZARD_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

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
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var getRandomNumber = function (number) {
  return Math.floor(Math.random() * number);
};

var getRandomElement = function (arr) {
  return arr[getRandomNumber(arr.length)];
};

var menu = document.querySelector('.setup');

var similarListElement = menu.querySelector('.setup-similar-list');

var getWizards = function (arr) {
  for (var i = 0; i < 4; i++) {
    var wizard = {
      name: getRandomElement(WIZARD_NAMES),
      surname: getRandomElement(WIZARD_SURNAMES),
      coat: getRandomElement(COAT_COLORS),
      eye: getRandomElement(EYES_COLORS)
    };

    arr[i] = wizard;
  }
  return arr;
};

var wizards = [];

getWizards(wizards);

var template = document
  .querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');

var renderWizard = function (wizardItem) {
  var wizardElement = template.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent =
    wizardItem.name + ' ' + wizardItem.surname;
  wizardElement.querySelector('.wizard-coat').style.fill = wizardItem.coat;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizardItem.eye;

  return wizardElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

menu.querySelector('.setup-similar').classList.remove('hidden');

var openButton = document.querySelector('.setup-open');
var closeButton = menu.querySelector('.setup-close');

var onMenuEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeMenu();
  }
};

var openMenu = function () {
  menu.classList.remove('hidden');
  document.addEventListener('keydown', onMenuEscPress);
};

var closeMenu = function () {
  menu.classList.add('hidden');
  document.removeEventListener('keydown', onMenuEscPress);
};

openButton.addEventListener('click', function () {
  openMenu();
});

openButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openMenu();
  }
});

closeButton.addEventListener('click', function () {
  closeMenu();
});

closeButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeMenu();
  }
});

var wizard = menu.querySelector('.setup-wizard');

var wizardCoat = wizard.querySelector('.wizard-coat');
var wizardEyes = wizard.querySelector('.wizard-eyes');
var wizardFireball = menu.querySelector('.setup-fireball-wrap');

var changeWizardPartsColor = function (part, colorArr, inputName) {
  part.addEventListener('click', function () {
    var color = getRandomElement(colorArr);
    part.style.fill = color;
    menu.querySelector(inputName).value = color;
  });
};

var changeWizardFireballColor = function (part, colorArr, inputName) {
  part.addEventListener('click', function () {
    var fireballColor = getRandomElement(colorArr);
    part.querySelector('.setup-fireball').style.backgroundColor = fireballColor;
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
