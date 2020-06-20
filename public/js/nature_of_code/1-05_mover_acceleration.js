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
    this.r = random(16, 32);
    this.location = new PVector(width / 2, height / 2);
    this.velocity = new PVector(random(-2, 2), random(-2, 2));
    this.acceleration = new PVector(-0.001, 0.01);
    this.topspeed = 10;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
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

  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
  }

  multi(n) {
    this.x *= n;
    this.y *= n;
  }

  div(n) {
    this.x /= n;
    this.y /= n;
  }

  mag() {
    return sqrt(this.x ** 2 + this.y ** 2);
  }

  normalize() {
    const m = this.mag();
    if (m != 0) {
      this.div(m);
    }
  }

  limit(max) {
    if (this.mag() > max) {
      this.normalize();
      this.multi(max);
    }
  }
}
