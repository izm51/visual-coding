let parr = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  parr.push(new Particle(createVector(width / 2, 10)));
  for (let i = parr.length - 1; i >= 0; i--) {
    const p = parr[i];
    p.run();
    if (p.isDead()) {
      parr.splice(i, 1);
    }
  }
}

class Particle {
  constructor(l) {
    this.acceleration = createVector(0, 0.05);
    this.velocity = createVector(random(-1, 1), random(-2, 0));
    this.location = l;
    this.lifespan = 255.0;
  }
  run() {
    this.update();
    this.display();
  }
  update() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.lifespan -= 2.0;
  }
  display() {
    stroke(0, this.lifespan);
    fill(0, this.lifespan);
    ellipse(this.location.x, this.location.y, 8, 8);
  }
  isDead() {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}
