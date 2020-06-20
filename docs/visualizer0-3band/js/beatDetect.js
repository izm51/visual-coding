let mic, fft;
let beatDetectors = [];
let forms = [];
let bars = [];
const colors = ['#ff0000', '#00ff00', '#0000ff'];

function setup() {
  createCanvas(710, 400);

  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT();
  fft.setInput(mic);

  beatDetectors = [new BeatDetect('kick'), new BeatDetect('snare'), new BeatDetect('male')];
  for (let i = 0; i < beatDetectors.length; i++) {
    forms.push(new Form((width / 6) * (i * 2 + 1), height / 2, width / 4, colors[i]));
    bars.push(new Bar(i, colors[i]));
  }
}

function draw() {
  background(200);

  for (let i = 0; i < beatDetectors.length; i++) {
    const beat = beatDetectors[i].update(fft);

    forms[i].show(beat.isBeat);
    bars[i].show(beat.level, beat.threshold);
  }

  showSpectrum(fft);
}

function showSpectrum(fft) {
  let spectrum = fft.analyze();

  noFill();
  beginShape();
  for (i = 0; i < spectrum.length; i++) {
    vertex(i, map(spectrum[i], 0, 255, height, 0));
  }
  endShape();
}

function mousePressed() {
  userStartAudio();
}

class Bar {
  constructor(i, color) {
    this.i = i;
    this.color = color;

    this.height = 10;
  }
  show(level, threshold) {
    fill(this.color);
    rect(0, this.height * this.i, level * width, this.height);
    fill(255);
    rect(threshold * width, this.height * this.i, 2, this.height);
  }
}

class Form {
  constructor(x, y, maxW, color) {
    this.x = x;
    this.y = y;
    this.maxW = maxW;
    this.color = color;

    this.w = 0;
  }

  show(isBeat) {
    if (isBeat) {
      fill(this.color);
      this.w = this.maxW;
    } else {
      noFill();
      this.w -= 10;
      this.w = max(this.w, 0);
    }
    rect(this.x - this.w / 2, height / 2 - this.w / 2, this.w, this.w);
  }
}

// https://www.airtightinteractive.com/2013/10/making-audio-reactive-visuals/

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
      this.threshold = level;
      this.minThreshold = max(this.minThreshold, level * this.minThresholdRate);
      this.time = 0;
      isBeat = true;
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
