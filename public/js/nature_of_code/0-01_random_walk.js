let w;

function setup() {
  // createCanvas(windowWidth, windowHeight);
  createCanvas(200, 200);
  background(220);
  w = new Walker();
}

function draw() {
  w.step();
  w.display();
}

class Walker {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
  }

  display() {
    stroke(0);
    point(this.x, this.y);
  }

  step() {
    const choice = Math.floor(random(4));
    if (choice == 0) {
      this.x++;
    } else if (choice == 1) {
      this.x--;
    } else if (choice == 2) {
      this.y++;
    } else {
      this.y--;
    }
  }
}
