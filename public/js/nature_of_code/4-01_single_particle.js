function setup() {
  createCanvas(windowWidth, windowHeight);
  p = new Particle(createVector(width / 2, 10));
}

function draw() {
  background(255);
  p.run();
  if (p.isDead()) {
    console.log('dead');
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
