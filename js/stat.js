'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var COLUMN_WIDTH = 40;
var COLUMN_MAX_HEIGHT = 150;
var FONT_HEIGHT = 60;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 110, 30);
  ctx.fillText('Список результатов:', 110, 50);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var currentColumnHeight = (times[i] * COLUMN_MAX_HEIGHT) / maxTime;

    ctx.fillText(
        Math.round(times[i]),
        CLOUD_X + COLUMN_WIDTH + i * 2 * COLUMN_WIDTH,
        CLOUD_Y + FONT_HEIGHT + COLUMN_MAX_HEIGHT - currentColumnHeight
    );

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240,100%,50%)';
      ctx.fillStyle = 'hsl(240,' + getRandomIntInclusive(0, 100) + '%,50%)';
    }

    ctx.fillRect(
        CLOUD_X + COLUMN_WIDTH + i * 2 * COLUMN_WIDTH,
        CLOUD_Y + 2 * GAP + FONT_HEIGHT + COLUMN_MAX_HEIGHT - currentColumnHeight,
        COLUMN_WIDTH,
        currentColumnHeight
    );

    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';

    ctx.fillText(
        players[i],
        CLOUD_X + COLUMN_WIDTH + i * 2 * COLUMN_WIDTH,
        CLOUD_Y + FONT_HEIGHT + COLUMN_MAX_HEIGHT + 3 * GAP
    );
  }
};
