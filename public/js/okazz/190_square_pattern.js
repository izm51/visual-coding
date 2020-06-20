// https://note.com/outburst/n/n0f621210ff03?magazine_key=m5e2f1a4e23c7

function setup() {
  createCanvas(800, 800);
  noLoop();
}

function draw() {
  let forms = [];
  const c = 80;
  const w = width / c;
  const cc = Math.floor(c * 1.1);
  for (let j = 0; j < cc; j++) {
    for (let i = 0; i < cc; i++) {
      const x = i * w + w / 2;
      const y = j * w + w / 2;
      forms.push(createVector(x, y, w));
    }
  }
  background(0);
  noStroke();
  for (let i = 0; i < forms.length; i++) {
    const f = forms[i];
    form(f.x, f.y, f.z);
  }
  noiseSeed(Math.floor(random(10000)));
}

function form(x, y, s) {
  const nScl = 0.008;
  s *= noise(x + nScl, y * nScl) * 100;
  const hs = s / 2;
  fill(getColor());
  beginShape();
  vertex(x - hs, y);
  vertex(x, y - hs);
  vertex(x + hs, y);
  vertex(x, y + hs);
  endShape(CLOSE);
}

function mousePressed() {
  console.log('redraw!');
  redraw();
}

function keyTyped() {
  if (key == 's') {
    saveFrames('sq', 'png', 1, 1);
  }
}

const colors = ['#540d6e', '#ee4266', '#ffd23f', '#f3fcf0', '#1f271b'];
function getColor() {
  return colors[Math.floor(random(colors.length))];
}
