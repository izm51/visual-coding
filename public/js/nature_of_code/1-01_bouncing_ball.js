function setup() {
  createCanvas(640, 360);
}

let x = 100;
let y = 100;
let xspeed = 2;
let yspeed = 2.6;
const r = 16;

function draw() {
  background(255);
  x += xspeed;
  y += yspeed;

  if (x > width - r || x < r) {
    xspeed *= -1;
  }
  if (y > height - r || y < r) {
    yspeed *= -1;
  }

  stroke(0);
  fill(175);
  ellipse(x, y, r * 2, r * 2);
}
