let w;

function setup() {
  createCanvas(640, 360);
  w = new Walker();
}

function draw() {
  background(255, 25);
  w.step();
}

class Walker {
  constructor() {
    this.tx = 0;
    this.ty = 10000;
  }

  step() {
    let x = map(noise(this.tx), 0, 1, 0, width);
    let y = map(noise(this.ty), 0, 1, 0, height);

    ellipse(x, y, 32, 32);

    this.tx += 0.01;
    this.ty += 0.01;
  }
}

class StepWalker {
  constructor() {
    this.tx = 0;
    this.ty = 10000;
    this.x = width / 2;
    this.y = height / 2;
  }

  step() {
    let stepx = map(noise(this.tx), 0, 1, -1, 1);
    let stepy = map(noise(this.ty), 0, 1, -1, 1);

    this.x += stepx;
    this.y += stepy;

    ellipse(this.x, this.y, 32, 32);

    this.tx += 0.01;
    this.ty += 0.01;
  }
}
