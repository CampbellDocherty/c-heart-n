let font;

const loaded = [];
let index = 0;

function preload() {
  font = loadFont("fonts/mono.ttf");

  getImages().forEach(({ src, ...a }) => {
    loaded.push({ src: loadImage(src), ...a });
  });
}

const totalPoints = 100;

const points = [];

const placed = [];

function setup() {
  createCanvas(innerWidth, innerHeight);

  noStroke();
  fill("white");
  textSize(20);
  textFont(font);
  textAlign(CENTER, CENTER);
  imageMode(CENTER);

  for (let i = 0; i < totalPoints; i++) {
    const t = map(i, 0, totalPoints, 0, TWO_PI);
    const x = 16 * pow(sin(t), 3);
    const y = 13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t);
    const coords = createVector(x * 10, -y * 10);
    points.push({ x: coords.x, y: coords.y });
  }
}

function draw() {
  background(0);

  text("C + N", width / 2, height / 2);
  push();
  translate(width / 2, height / 2);
  points.forEach(({ x, y }) => {
    circle(x, y, 5);
  });
  pop();

  placed.forEach((img) => {
    const wdivider = img.src.width > 500 ? 10 : 6;
    image(
      img.src,
      img.x,
      img.y,
      img.src.width / wdivider,
      img.src.height / wdivider
    );
  });

  const img = loaded[index];

  if (img) {
    const wdivider = img.src.width > 500 ? 10 : 6;
    image(
      img.src,
      mouseX,
      mouseY,
      img.src.width / wdivider,
      img.src.height / wdivider
    );
    push();
    textAlign(LEFT, CENTER);
    text(
      img.description,
      mouseX - img.src.width / wdivider / 2,
      15 + mouseY + img.src.height / wdivider / 2
    );
    if (img.more) {
      text(
        img.more,
        mouseX - img.src.width / wdivider / 2,
        40 + mouseY + img.src.height / wdivider / 2
      );
    }
    pop();
  }
}

function mousePressed() {
  const img = loaded[index];
  if (img) {
    placed.push({ ...img, x: mouseX, y: mouseY });
    index++;
  }
}
