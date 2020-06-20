function setup() {
  createCanvas(640, 320);
}

let inc = 0.01;
let zoff = 0.0;

function draw() {
  console.log('tik');
  background(180, 204, 255);
  let xoff = 0.0;
  for (let x = 0; x < width; x++) {
    let yoff = 0.0;
    for (let y = 0; y < height; y++) {
      let opacity = Math.floor(map(noise(xoff, yoff, zoff), 0, 1, 0, 255));
      stroke(255, opacity);
      point(x, y);
      yoff += inc;
    }
    xoff += inc;
  }
  zoff += 0.1;
}
