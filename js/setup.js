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

var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomNumber = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

var menu = document.querySelector('.setup');
menu.classList.remove('hidden');

var similarListElement = menu.querySelector('.setup-similar-list');

var getWizards = function (arr) {
  for (var i = 0; i < 4; i++) {
    var wizard = {
      name: WIZARD_NAMES[getRandomNumber(WIZARD_NAMES)],
      surname: WIZARD_SURNAMES[getRandomNumber(WIZARD_SURNAMES)],
      coat: COAT_COLORS[getRandomNumber(COAT_COLORS)],
      eye: EYES_COLORS[getRandomNumber(EYES_COLORS)]
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
