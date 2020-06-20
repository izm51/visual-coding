let t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  translate(width * 0.5, height * 0.5);
  rotate(t * 3);

  // cantor(10, 20, width - 20);

  stroke('#f00');
  drawLine(0, 0, width * 0.2, 1);

  t += 0.003;
}
function drawLine(x, y, l, r) {
  const m = 0.65;
  stroke('#f00');
  if (l > 4) {
    if (r) {
      line(x - l, y, x, y);
      line(x + l, y, x, y);
      drawLine(x - l, y, l * m, !r);
      drawLine(x + l, y, l * m, !r);
    } else {
      line(x, y - l, x, y);
      line(x, y + l, x, y);
      drawLine(x, y - l, l * m, !r);
      drawLine(x, y + l, l * m, !r);
    }
  }
}

function cantor(x, y, l) {
  if (l >= 1) {
    stroke('#f00');
    line(x, y, x + l, y);

    y += 20;
    cantor(x, y, l / 3);
    cantor(x + (2 / 3) * l, y, l / 3);
  }
}

let p = 2;
function drawCircle(x, y, r) {
  stroke('#f00');
  noFill();
  ellipse(x, y, r, r);
  if (r > 25) {
    drawCircle(x + r / p, y, r / p);
    drawCircle(x - r / p, y, r / p);
    drawCircle(x, y + r / p, r / p);
    drawCircle(x, y - r / p, r / p);
  }
}
