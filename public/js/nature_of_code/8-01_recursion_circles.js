let t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  translate(width * 0.5, height * 0.5);
  rotate(t);

  drawCircle(0, 0, 1200);

  t += 0.003;
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
