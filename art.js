const LINE_WIDTH = 10;

var canvas = document.getElementById('art');

function VerticalLine(x, canvas) {
  this.pos = x;
  this.canvas = canvas;
  this.color = 'black';
}

VerticalLine.prototype = {
  draw: function() {
    var ctx = this.canvas.getContext('2d');
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos, 0, LINE_WIDTH, this.canvas.height);
  }
}

function HorizontalLine(y, canvas) {
  this.pos = y;
  this.canvas = canvas;
  this.color = 'black';
}

HorizontalLine.prototype = {
  draw: function() {
    var ctx = this.canvas.getContext('2d');
    ctx.fillStyle = this.color;
    ctx.fillRect(0, this.pos, this.canvas.width, LINE_WIDTH);
  }
}

function Rectangle(minX, minY, maxX, maxY, color, canvas) {
  this.minX = minX;
  this.minY = minY;
  this.maxX = maxX;
  this.maxY = maxY;
  this.color = color;
  this.canvas = canvas;
}

Rectangle.prototype = {
  draw: function() {
    var ctx = this.canvas.getContext('2d');
    ctx.fillStyle = this.color;
    ctx.fillRect(this.minX, this.minY, this.maxX - this.minX, this.maxY - this.minY);
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

var lines = [VerticalLine, HorizontalLine].map(function(constructor) {
  var ls = [];

  var pos = randomInt(0, canvas.width / 2);
  ls.push(new constructor(pos, canvas));

  for (var i = 1; i < 5; i++) {
    pos = randomInt(
      ls[i - 1].pos + 2 * LINE_WIDTH,
      canvas.width * (1 - 1 / Math.pow(2, i + 1))
    );
    ls.push(new constructor(pos, canvas));
  }

  ls.forEach(function(line) {
    line.draw();
  });

  return ls;
});

function rectangleBounds(canvas, lines) {
  var minPos = 0;
  var maxPos = canvas.width;
  var numLines = lines.length;
  var i = randomInt(-1, numLines);
  if (i >= 0) {
    minPos = lines[i].pos + LINE_WIDTH;
  }

  if (++i < numLines) {
    maxPos = lines[i].pos;
  }
  return { min: minPos, max: maxPos };
}

['red', 'yellow', 'blue'].forEach(function(color) {
  var xBounds = rectangleBounds(canvas, lines[0]);
  var yBounds = rectangleBounds(canvas, lines[1]);

  var rect = new Rectangle(
    xBounds.min,
    yBounds.min,
    xBounds.max,
    yBounds.max,
    color,
    canvas
  );
  rect.draw();
});
