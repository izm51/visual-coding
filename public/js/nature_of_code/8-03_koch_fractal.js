// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
// Koch Curve

// Renders a simple fractal, the Koch snowflake
// Each recursive level drawn in sequence

var ks = [];

function setup() {
  createCanvas(640, 640);

  background(255);
  frameRate(1); // Animate slowly
  ks.push(new KochFractal(120, 200, 520, 200));
  ks.push(new KochFractal(520, 200, 320, 200 + 200 * 3 ** 0.5));
  ks.push(new KochFractal(320, 200 + 200 * 3 ** 0.5, 120, 200));
}

function draw() {
  background(51);
  // Draws the snowflake!
  for (let k of ks) {
    k.render();
    // Iterate
    k.nextLevel();
    // Let's not do it more than 5 times. . .
    if (k.getCount() > 5) {
      k.restart();
    }
  }
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Koch Curve
// A class to manage the list of line segments in the snowflake pattern

function KochFractal(x, y, o, p) {
  this.start = createVector(x, y); // A p5.Vector for the start
  this.end = createVector(o, p); // A p5.Vector for the end
  this.lines = []; // An array to keep track of all the lines
  this.count = 0;

  this.nextLevel = function () {
    // For every line that is in the arraylist
    // create 4 more lines in a new arraylist
    this.lines = this.iterate(this.lines);
    this.count++;
  };

  this.restart = function () {
    this.count = 0; // Reset count
    this.lines = []; // Empty the array list
    this.lines.push(new KochLine(this.start, this.end)); // Add the initial line (from one end p5.Vector to the other)
  };
  this.restart();

  this.getCount = function () {
    return this.count;
  };

  // This is easy, just draw all the lines
  this.render = function () {
    for (var i = 0; i < this.lines.length; i++) {
      this.lines[i].display();
    }
  };

  // This is where the **MAGIC** happens
  // Step 1: Create an empty arraylist
  // Step 2: For every line currently in the arraylist
  //   - calculate 4 line segments based on Koch algorithm
  //   - add all 4 line segments into the new arraylist
  // Step 3: Return the new arraylist and it becomes the list of line segments for the structure

  // As we do this over and over again, each line gets broken into 4 lines, which gets broken into 4 lines, and so on. . .
  this.iterate = function (before) {
    var now = []; // Create emtpy list
    for (var i = 0; i < before.length; i++) {
      var l = before[i];
      // Calculate 5 koch p5.Vectors (done for us by the line object)
      var a = l.kochA();
      var b = l.kochB();
      var c = l.kochC();
      var d = l.kochD();
      var e = l.kochE();
      // Make line segments between all the p5.Vectors and add them
      now.push(new KochLine(a, b));
      now.push(new KochLine(b, c));
      now.push(new KochLine(c, d));
      now.push(new KochLine(d, e));
    }
    return now;
  };
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Koch Curve
// A class to describe one line segment in the fractal
// Includes methods to calculate midp5.Vectors along the line according to the Koch algorithm

function KochLine(a, b) {
  // Two p5.Vectors,
  // start is the "left" p5.Vector and
  // end is the "right p5.Vector
  this.start = a.copy();
  this.end = b.copy();

  this.display = function () {
    stroke(255);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  };

  this.kochA = function () {
    return this.start.copy();
  };

  // This is easy, just 1/3 of the way
  this.kochB = function () {
    var v = p5.Vector.sub(this.end, this.start);
    v.div(3);
    v.add(this.start);
    return v;
  };

  // More complicated, have to use a little trig to figure out where this p5.Vector is!
  this.kochC = function () {
    var a = this.start.copy(); // Start at the beginning
    var v = p5.Vector.sub(this.end, this.start);
    v.div(3);
    a.add(v); // Move to point B
    v.rotate(-PI / 3); // Rotate 60 degrees
    a.add(v); // Move to point C
    return a;
  };

  // Easy, just 2/3 of the way
  this.kochD = function () {
    var v = p5.Vector.sub(this.end, this.start);
    v.mult(2 / 3.0);
    v.add(this.start);
    return v;
  };

  this.kochE = function () {
    return this.end.copy();
  };
}
