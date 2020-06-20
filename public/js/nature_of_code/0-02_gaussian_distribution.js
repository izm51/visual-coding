function setup() {
  createCanvas(640, 360);
  // background(220);
}

function draw() {
  let x = randomGaussian(320, 90);
  let y = randomGaussian(180, 50);
  let r = Math.floor(random(60, 255));
  let g = Math.floor(random(60, 255));
  let b = Math.floor(random(60, 255));
  noStroke();
  fill(r, g, b, 250);
  ellipse(x, y, 16, 16);
}
