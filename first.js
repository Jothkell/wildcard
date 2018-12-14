/************************************/
//This is a file containing the setup and draw loop, as well as the events relevant to making the game
/***********************************/



function preload() {
  c = loadSound('.assets/bounce.mp3');
  l = loadSound('.assets/egg.wav');
  loss = loadImage('./assets/michaelscott.jpg');
  iront = loadImage('./assets/iron.jpg');
  eggt = loadImage('./assets/egg.jpg');
  cannont = loadImage('./assets/iron.jpg');
  myFont = loadFont('./assets/AvenirNextLTPro-Demi.otf');
  egg = loadModel('./assets/egg.obj');
}

function setup() {
  createCanvas(400, 400, WEBGL);
  camera(0, -40, 0, 0, -40, 100, 0, 1, 0);

}


function draw() {
  background(220);
  camera(0, -40, 100, cam.x, cam.y, -100, 0, 1, 0);

  print(score);
  txter();

  rotateZ(PI / 2);
  translate(25, 0, 0);
  box(3, 800, 100);
  translate(-25, 0, 0);
  rotateZ(-PI / 2);
  rings();

  nextBall();
  splatter();

  rotateX(xx * 0.008);
  rotateY(-yy * 0.004);
  translate(0, 0, -35);

  box(17, 17, 70);
  rotateX(-xx * 0.008);
  rotateY(yy * 0.004);
}

function mouseClicked() {

  if (ball.rx == 201 && ball.ry == 201) {
    c.play();
    ball.rx = mouseY - 300;
    ball.ry = mouseX - 200;
    ball.f = frameCount;
  }
}

function mouseMoved() {
  cam.x = mouseX * 0.07 - 17;
  cam.y = mouseY * 0.07 - 70;
  yy = mouseX - 200;
  xx = mouseY - 300;


}
