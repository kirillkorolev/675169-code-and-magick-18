'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var getRandomNumber = function (number) {
    return Math.floor(Math.random() * number);
  };

  var getRandomElement = function (arr) {
    return arr[getRandomNumber(arr.length)];
  };

  var onMenuEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeMenu();
    }
  };

  var openMenu = function (block) {
    block.classList.remove('hidden');
    document.addEventListener('keydown', onMenuEscPress);
  };

  var closeMenu = function (block) {
    block.classList.add('hidden');
    document.removeEventListener('keydown', onMenuEscPress);

    window.setup.menu.style.top = '';
    window.setup.menu.style.left = '';
  };

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    getRandomElement: getRandomElement,
    openMenu: openMenu,
    closeMenu: closeMenu
  };
})();
