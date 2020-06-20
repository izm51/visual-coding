let mic, fft;
let kickDetector;
let snareDetector;
let voiceDetector;

let panels;
let kickBall;
let circle_arr = [];
let sq_arr = [];
let parr = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);

  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT();
  fft.setInput(mic);

  kickDetector = new BeatDetect('kick');
  snareDetector = new BeatDetect('snare');
  voiceDetector = new BeatDetect('male');
  panels = new Panels(6);
  kickBall = new BounceBall();
}

function draw() {
  background(0);
  push();
  translate(width * 0.5, height * 0.5);

  const kick = kickDetector.update(fft);
  const snare = snareDetector.update(fft);
  const voice = voiceDetector.update(fft);

  if (snare.isBeat) {
    panels.setColors();
  }
  panels.run();

  kickBall.run(kick.isBeat);

  if (kick.isBeat) {
    if (random(1) <= 0.3) {
      circle_arr.push(new BeatCircle(0, 0));
    } else {
      sq_arr.push(new BeatSquare(0, 0));
    }
  }

  // beatCircle
  for (let i = circle_arr.length - 1; i >= 0; i--) {
    const c = circle_arr[i];
    c.run();
    if (c.isDead()) {
      circle_arr.splice(i, 1);
    }
  }

  // beatSquare
  for (let i = sq_arr.length - 1; i >= 0; i--) {
    const s = sq_arr[i];
    s.run();
    if (s.isDead()) {
      sq_arr.splice(i, 1);
    }
  }

  // parr.push(new Particle(createVector(0, 0)));
  // for (let i = parr.length - 1; i >= 0; i--) {
  //   const p = parr[i];
  //   p.run();
  //   if (p.isDead()) {
  //     parr.splice(i, 1);
  //   }
  // }

  pop();

  showSpectrum(fft);
  startMessage();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

let isStarted = false;
function mousePressed() {
  userStartAudio();
  isStarted = true;
  kickDetector = new BeatDetect('kick');
  snareDetector = new BeatDetect('snare');
}

function startMessage() {
  if (!isStarted) {
    strokeWeight(1);
    stroke(0);
    fill(255);

    rect(width - 105, height - 45, 200, 80);

    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    text('マイクを許可\n&\nクリックでスタート', width - 105, height - 45);
  }
}

function showSpectrum(fft) {
  let spectrum = fft.analyze();

  noFill();
  strokeWeight(1);
  beginShape();
  stroke(255);
  for (i = 0; i < spectrum.length; i++) {
    vertex((i * width) / spectrum.length, map(spectrum[i], 0, 255, height - 10, height * 0.4));
  }
  endShape();
}

class BounceBall {
  constructor() {
    this.maxR = 100;
    this.minR = 10;
    this.r = this.minR;
  }
  run(isBeat = false) {
    this.update(isBeat);
    this.display();
  }
  update(isBeat) {
    if (isBeat) {
      this.r = this.maxR;
    }
    this.r = max(this.r - 2, this.minR);
  }
  display() {
    stroke(240);
    fill(240);
    ellipse(0, 0, this.r, this.r);
  }
}

class Panels {
  constructor(n) {
    this.n = n;
    this.lifemax = 300;
    this.life = 0;
    this.colors = [];
    this.setColors(n);
  }
  setColors() {
    this.n = Math.floor(random(5, 9));
    let colors = [];
    for (let i = 0; i < this.n; i++) {
      colors.push(random(['#836f88', '#e37a8b', '#f7a695', '#d1ead7', '#92a49d', '#92a49d', '#4aa2ef', '#ef476f', '#ffd166', '#06d6a0']));
    }
    this.colors = colors;
    this.life = this.lifemax;
  }
  run() {
    this.update();
    this.display();
  }
  update() {
    this.alph = ('0' + Math.floor(map(this.life, this.lifemax, 0, 255, 100)).toString(16)).slice(-2);
    this.life = max(this.life - 4, 0);
  }
  display() {
    push();
    rotate(frameCount * 0.01);
    for (let i = 0; i < this.n; i++) {
      stroke(255);
      strokeWeight(2);
      fill(this.colors[i % this.colors.length] + this.alph);
      arc(0, 0, width + height, width + height, ((2 * PI) / this.n) * i, ((2 * PI) / this.n) * (i + 1), PIE);
    }
    pop();
  }
}

class BeatSquare {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.l = 30;
    this.m = 6;
    this.lifespan = 300;
    this.angle = random(PI);
  }
  run() {
    this.update();
    this.display();
  }
  update() {
    this.l += this.m;
    this.lifespan -= 2.0;
  }
  display() {
    push();
    rotate(this.angle);
    stroke(255, this.lifespan);
    strokeWeight(3);
    noFill();
    square(this.x, this.y, this.l);
    pop();
  }
  isDead() {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}

class BeatCircle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 20;
    this.m = 6;
    this.lifespan = 300;
  }
  run() {
    this.update();
    this.display();
  }
  update() {
    this.r += this.m;
    this.lifespan -= 2.0;
  }
  display() {
    stroke(255, this.lifespan);
    strokeWeight(2);
    noFill();
    ellipse(this.x, this.y, this.r, this.r);
  }
  isDead() {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}

class Particle {
  constructor(l) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(6, -6), random(4, -4));
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
    this.lifespan -= 1.5;
  }
  display() {
    stroke(255, map(this.lifespan, 0, 230, 230, 0));
    fill(255, map(this.lifespan, 0, 230, 230, 0));
    const r = map(this.lifespan, 0, 255, 6, 2);
    ellipse(this.location.x, this.location.y, r, r);
  }
  isDead() {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}

class BeatDetect {
  constructor(mode = 'kick', freq2) {
    if (!isNaN(freq2) && !isNaN(mode)) {
      this.freq1 = mode;
      this.freq2 = freq2;
    } else {
      if (mode == 'snare') {
        this.freq1 = 2000;
        this.freq2 = 6000;
      } else if (mode == 'male') {
        this.freq1 = 200;
        this.freq2 = 2000;
      } else {
        // mode == "kick"
        this.freq1 = 20;
        this.freq2 = 80;
      }
    }

    this.time = 0;
    this.threshold = 0;
    this.minThreshold = 0;

    this.decayRate = 0.01;
    this.minThresholdRate = 0.8;

    this.holdTime = 45;
    this.marginThresholdTime = 10;
    this.marginThreshold = 0.06;
  }
  update(fft) {
    const e = fft.getEnergy(this.freq1, this.freq2);
    const level = e / 255.0 || 0.0;
    let isBeat = false;
    if (level > this.threshold && level > this.minThreshold) {
      this.threshold = level * 1.05;
      this.minThreshold = max(this.minThreshold, level * this.minThresholdRate);
      if (this.time > this.marginThresholdTime) {
        isBeat = true;
      }
      this.time = 0;
    } else {
      if (this.time == this.marginThresholdTime) {
        this.threshold -= this.marginThreshold;
      }
      this.time += 1;
      if (this.time > this.holdTime) {
        this.threshold -= this.decayRate;
      }
    }
    return { threshold: this.threshold, level: level, isBeat: isBeat };
  }
}
