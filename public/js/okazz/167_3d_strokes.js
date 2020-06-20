// https://note.com/outburst/n/na93ed56a7b16?magazine_key=m5e2f1a4e23c7

let act;
let t = 0;
let form = [];

function setup() {
  createCanvas(800, 800, WEBGL);
  rectMode(CENTER);
  newForm();
}

function draw() {
  randomSeed(act);

  background(0);
  camera(width * 0.5, height * 1.1, width * 0.5, width * 0.5, height * 0.7, 0, 0, 1, 0);

  push();
  translate(width * 0.5, height * 0.5);
  rotate(t);
  for (let i = 0; i < form.length; i++) {
    const f = form[i];
    f.show();
  }
  pop();

  t += 0.003;

  if (frameCount % (60 * 10) == 0) {
    newForm();
  }
}

class Form {
  constructor(x, y, s) {
    this.r = random(1);

    this.x = x;
    this.y = y;
    this.s = s;

    this.max = Math.floor(random(100, 201));
    this.life = this.max;
    this.p = Math.floor(random(5));
  }

  show() {
    const color = getColor();
    const ss = map(this.life, this.max, 0, this.s, 0);
    const alph = ('0' + Math.floor(map(this.life, this.max, 0, 255, 0)).toString(16)).slice(-2);
    const z = map(this.life, this.max, 0, 0, this.s);
    const a = map(this.life, this.max, 0, 0, TAU);

    noFill();
    stroke(color);

    if (this.p < 2) {
      circle(this.x, this.y, this.s);
    } else {
      square(this.x, this.y, this.s);
    }

    strokeWeight(5);
    point(this.x, this.y);

    strokeWeight(1);

    if (this.p == 0) {
      push();
      translate(0, 0, z);
      stroke(color + alph);
      circle(this.x, this.y, ss);
      pop();
    }

    if (this.p == 1) {
      push();
      translate(this.x, this.y);
      if (this.r < 0.5) rotateX(a);
      rotateY(a);
      stroke(color + alph);
      circle(0, 0, ss);
      pop();
    }

    if (this.p == 2) {
      push();
      translate(0, 0, z);
      stroke(color + alph);
      square(this.x, this.y, ss);
      pop();
    }

    if (this.p == 3) {
      push();
      translate(this.x, this.y);
      if (this.r < 0.5) rotateX(a);
      rotateY(a);
      stroke(color + alph);
      square(0, 0, ss);
      pop();
    }

    if (this.p == 4) {
      push();
      translate(this.x, this.y, this.s / 2);
      box(this.s);
      pop();
    }

    this.life--;
    if (this.life < 0) {
      this.life = this.max;
    }
  }
}

function tile(x_, y_, w_) {
  const c = Math.floor(random(2, 4));
  const w = w_ / c;

  noFill();
  stroke(255);

  for (let x = x_; x < x_ + w_ - 1; x += w) {
    for (let y = y_; y < y_ + w_ - 1; y += w) {
      if (random(1) < 0.5 && w > 120) {
        tile(x, y, w);
      } else {
        form.push(new Form(x + w / 2, y + w / 2, w - 6));
      }
    }
  }
}

function mousePressed() {
  newForm();
}

function newForm() {
  form = [];
  act = Math.floor(random(10000));
  tile(-width * 0.5, -width * 0.5, width);
}

function keyTyped() {
  if (key == 's') {
    saveFrames('p5', 'png', 1, 1);
  }
}

const colors = ['#4aa2ef', '#ef476f', '#ffd166', '#06d6a0', '#fcfcfc'];
function getColor() {
  return colors[Math.floor(random(colors.length))];
}
