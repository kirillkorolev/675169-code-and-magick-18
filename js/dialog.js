'use strict';

(function () {
  var openButton = document.querySelector('.setup-open');
  var closeButton = window.setup.menu.querySelector('.setup-close');

  openButton.addEventListener('click', function () {
    window.util.openMenu(window.setup.menu);
  });

  openButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      window.util.openMenu(window.setup.menu);
    }
  });

  closeButton.addEventListener('click', function () {
    window.util.closeMenu(window.setup.menu);
  });

  closeButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      window.util.closeMenu(window.setup.menu);
    }
  });

  var dialogHandler = window.setup.menu.querySelector('.upload');

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.setup.menu.style.top =
        window.setup.menu.offsetTop - shift.y + 'px';
      window.setup.menu.style.left =
        window.setup.menu.offsetLeft - shift.x + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evtClick) {
          evtClick.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var form = window.setup.menu.querySelector('.setup-wizard-form');

  var onSuccessSaveHandler = function () {
    window.setup.menu.classList.add('hidden');
  };

  form.addEventListener('submit', function (evt) {
    window.save(
        new FormData(form),
        onSuccessSaveHandler,
        window.backend.errorHandler
    );
    evt.preventDefault();
  });
})();
