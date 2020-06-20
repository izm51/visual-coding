function setup() {
  createCanvas(640, 320);
}

function draw() {
  background(255);
  const mouse = new PVector(mouseX, mouseY);
  const center = new PVector(width / 2, height / 2);

  mouse.sub(center);

  if (mode == 'multi') {
    mouse.multi(2);
  } else if (mode == 'div') {
    mouse.div(2);
  } else if (mode == 'mag') {
    const m = mouse.mag();
    fill(0);
    rect(0, 0, m, 10);
  } else if (mode == 'normalize') {
    mouse.normalize();
    mouse.multi(50);
  }

  text(mode, mouseX - 15, mouseY - 5);
  translate(width / 2, height / 2);
  line(0, 0, mouse.x, mouse.y);
}

class PVector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
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
}

const modes = ['sub', 'multi', 'div', 'mag', 'normalize'];
let mode = modes[0];
const buttons = document.getElementById('buttons');
for (let m of modes) {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = m;
  button.id = `mode-${m}`;
  button.onclick = () => {
    mode = m;
  };
  buttons.appendChild(button);
}
