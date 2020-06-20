let m;

function setup() {
  createCanvas(640, 320);
  m = new Mover();
}

function draw() {
  background(255);
  m.update();
  m.checkEdges();
  m.display();
}

class Mover {
  constructor() {
    this.location = new PVector(random(width), random(height));
    this.velocity = new PVector(random(-2, 2), random(-2, 2));
    this.r = random(16, 32);
  }

  update() {
    this.location.add(this.velocity);
  }

  display() {
    stroke(0);
    fill(175);
    ellipse(this.location.x, this.location.y, this.r * 2, this.r * 2);
  }

  checkEdges() {
    if (this.location.x > width - this.r) {
      this.location.x = this.r;
    } else if (this.location.x < this.r) {
      this.location.x = width - this.r;
    }

    if (this.location.y > height - this.r) {
      this.location.y = this.r;
    } else if (this.location.y < this.r) {
      this.location.y = height - this.r;
    }
  }
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
