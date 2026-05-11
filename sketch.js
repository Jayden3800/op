function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  textFont('monospace');
}

function draw() {
  background(20, 24, 38);

  let cx = width / 2;
  let cy = height / 2;
  let radius = 140;

  // ---- Clock face ----
  // Outer ring
  noFill();
  strokeWeight(4);
  stroke(80, 180, 220, 80);
  ellipse(cx, cy, radius * 2 + 20);
  strokeWeight(2);
  stroke(80, 180, 220, 40);
  ellipse(cx, cy, radius * 2);

  // Hour markers & numbers
  for (let i = 1; i <= 12; i++) {
    let angle = i * 30 - 90;
    let x1 = cx + cos(angle) * (radius - 10);
    let y1 = cy + sin(angle) * (radius - 10);
    let x2 = cx + cos(angle) * (radius - 25);
    let y2 = cy + sin(angle) * (radius - 25);

    strokeWeight(i % 3 === 0 ? 3 : 1.5);
    stroke(80, 180, 220, 180);
    line(x1, y1, x2, y2);

    // Numbers
    let nx = cx + cos(angle) * (radius - 42);
    let ny = cy + sin(angle) * (radius - 42);
    noStroke();
    fill(200, 220, 255);
    textAlign(CENTER, CENTER);
    textSize(18);
    text(i, nx, ny);
  }

  // Minute tick marks
  for (let i = 0; i < 60; i++) {
    let angle = i * 6 - 90;
    let x1 = cx + cos(angle) * (radius - 8);
    let y1 = cy + sin(angle) * (radius - 8);
    let x2 = cx + cos(angle) * (radius - 14);
    let y2 = cy + sin(angle) * (radius - 14);
    strokeWeight(0.8);
    stroke(80, 180, 220, 60);
    line(x1, y1, x2, y2);
  }

  // ---- Time ----
  let h = hour();
  let m = minute();
  let s = second();
  let ms = millis() % 1000;

  // Smooth angles (seconds + millis for sweep)
  let secAngle = map(s + ms / 1000, 0, 60, 0, 360) - 90;
  let minAngle = map(m + (s + ms / 1000) / 60, 0, 60, 0, 360) - 90;
  let hrAngle = map(h % 12 + m / 60, 0, 12, 0, 360) - 90;

  // ---- Draw hands ----

  // Second hand
  strokeWeight(1.5);
  stroke(255, 80, 80);
  let sx = cx + cos(secAngle) * (radius - 30);
  let sy = cy + sin(secAngle) * (radius - 30);
  let stx = cx + cos(secAngle + 180) * 20;
  let sty = cy + sin(secAngle + 180) * 20;
  line(stx, sty, sx, sy);

  // Minute hand
  strokeWeight(4);
  stroke(120, 200, 255);
  let mx = cx + cos(minAngle) * (radius - 40);
  let my = cy + sin(minAngle) * (radius - 40);
  let mtx = cx + cos(minAngle + 180) * 15;
  let mty = cy + sin(minAngle + 180) * 15;
  line(mtx, mty, mx, my);

  // Hour hand
  strokeWeight(5);
  stroke(180, 210, 255);
  let hx = cx + cos(hrAngle) * (radius - 70);
  let hy = cy + sin(hrAngle) * (radius - 70);
  let htx = cx + cos(hrAngle + 180) * 12;
  let hty = cy + sin(hrAngle + 180) * 12;
  line(htx, hty, hx, hy);

  // Center dot
  fill(255);
  noStroke();
  ellipse(cx, cy, 10, 10);
  fill(20, 24, 38);
  ellipse(cx, cy, 5, 5);

  // ---- Digital time display ----
  let ampm = h >= 12 ? 'PM' : 'AM';
  let h12 = h % 12;
  if (h12 === 0) h12 = 12;
  let timeStr = nf(h12, 2) + ':' + nf(m, 2) + ':' + nf(s, 2) + ' ' + ampm;

  noStroke();
  fill(30, 35, 50, 200);
  rectMode(CENTER);
  rect(cx, cy + radius - 10, 140, 32, 8);

  fill(80, 180, 220);
  textSize(18);
  textAlign(CENTER, CENTER);
  text(timeStr, cx, cy + radius - 10);
}
