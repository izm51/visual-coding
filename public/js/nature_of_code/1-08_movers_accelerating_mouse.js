let movers = Array(20);

function setup() {
  createCanvas(640, 320);
  for (let i = 0; i < movers.length; i++) {
    movers[i] = new Mover();
  }
}

function draw() {
  background(255);
  for (let i = 0; i < movers.length; i++) {
    movers[i].update();
    movers[i].checkEdges();
    movers[i].display();
  }
}

class Mover {
  constructor() {
    this.r = 32;
    this.location = new PVector(width / 2, height / 2);
    this.velocity = new PVector(random(-2, 2), random(-2, 2));
    this.acceleration = new PVector(0, 0);
    this.topspeed = 10;
  }

  update() {
    const mouse = new PVector(mouseX, mouseY);
    let dir = PVector.sub(mouse, this.location);
    dir.normalize();
    dir.multi(0.5);
    this.acceleration = dir;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.location.add(this.velocity);
  }

  display() {
    stroke(0);
    fill(175, 200);
    ellipse(this.location.x, this.location.y, this.r * 2, this.r * 2);
  }

  checkEdges() {
    // if (this.location.x > width - this.r) {
    //   this.location.x = this.r;
    // } else if (this.location.x < this.r) {
    //   this.location.x = width - this.r;
    // }
    // if (this.location.y > height - this.r) {
    //   this.location.y = this.r;
    // } else if (this.location.y < this.r) {
    //   this.location.y = height - this.r;
    // }
  }
}

class PVector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static sub(v1, v2) {
    const v3 = new PVector(v1.x - v2.x, v1.y - v2.y);
    return v3;
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
