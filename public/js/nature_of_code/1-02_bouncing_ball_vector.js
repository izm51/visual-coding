let loc, velocity;

function setup() {
  createCanvas(640, 360);
  loc = new PVector(100, 100);
  velocity = new PVector(2, 2.6);
}

const r = 16;

function draw() {
  background(255);

  loc.add(velocity);

  if (loc.x > width - r || loc.x < r) {
    velocity.x *= -1;
  }
  if (loc.y > height - r || loc.y < r) {
    velocity.y *= -1;
  }

  stroke(0);
  fill(175);
  ellipse(loc.x, loc.y, r * 2, r * 2);
}

class PVector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    this.y += v.y;
    this.x += v.x;
  }
}
