/************************************/
//This is a file containing the setup and draw loop, as well as the events relevant to making the game
/***********************************/

var time = {
    t:0,
    h:0,
    win:0,
    fr:0
}

    var xx = 0;
var yy = 0;
var zz = 70;
var ball = {
    x: 0,
    y: 0,
    z: -35,
    rx: 0,
    ry: 0,
    f: 0,
    fr: 0,
    speed: 11

};

var splats = [];

var splat = {
    time: 0,
    x: 0,
    y: 0,
};

var rn = {
    x: 100,
    y: 0,
    z: 0,
    xx: 0,
    yy: 0,
    zz: 0,
    upx: 1,
    upz: 1,
    rotx: 0,
    roty: 0
};
var score = 0;
var cam = {
    x: 0,
    y: -40
};
var eggt;
var cannont;
var cannon;
var egg;
var myFont;
var smash;

function preload() {
    c = loadSound('.assets/bounce.mp3');
    l = loadSound('.assets/egg.wav');
    loss = loadImage('./assets/michaelscott.jpg');
    iront = loadImage('./assets/iron.jpg');
    eggt = loadImage('./assets/egg.jpg');
    cannont = loadImage('./assets/iron.jpg');
    myFont = loadFont('./assets/AvenirNextLTPro-Demi.otf');
    //cannon = loadModel('./assets/cannon.obj');
    egg = loadModel('./assets/egg.obj');
}


function setup() {
    createCanvas(400, 400, WEBGL);
    camera(0, -40, 0, 0, -40, 100, 0, 1, 0);

    //textSize(12);
}


function draw() {
    //orbitControl();
    background(220);
    //pointLight(250, 250, 250, 0, -400, 400);
    //ambientMaterial(250);
    camera(0, -40, 100, cam.x, cam.y, -100, 0, 1, 0);
    //charge();

    print(score);
    txter();

    //cylinder(3, 30);
    rotateZ(PI / 2);
    translate(25, 0, 0);
    //texture(eggt);
    box(3, 800, 100);
    translate(-25, 0, 0);
    rotateZ(-PI / 2);
    rings();

    nextBall();
    splatter();

    //rings();
    rotateX(xx * 0.008);
    rotateY(-yy * 0.004);
    translate(0, 0, -35);
    //model(cannon);

    //fill(255,255,255);
    //texture(cannont);
    box(17, 17, 70);
    //texture(eggt);
    rotateX(-xx * 0.008);
    rotateY(yy * 0.004);

}

function splatter() {
    //image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight]);
    //var i;
    //translate(splats[i].x, splats[i].y, 500);
    for (var i = 0; i < splats.length; i++) {
	if (splats[i].time > 30) {
	    //texture(smash);
	    splats[i].time -= 1;
	    translate(splats[i].x, splats[i].y, 500);

	    box(50, 50, 50);
	    translate(-splats[i].x, -splats[i].y, -500);
	    //print("here");
	    //image(smash, 50, 50, 100, 100, 100, 100);//splats[i].x, splats[i].y);
	} else if (splats[i].time > 15) {
	    //plane(50, 50);
	    splats[i].time -= 1;
	} else if (splats[i].time > 0) {
	    //plane(50, 50);
	    splats[i].time -= 1;
	}
    }
    //translate(-splats[i].x, -splats[i].y, -500);

}

function txter() {
    time.t = frameCount / 60;

    if (!time.win){
	time.h = time.t;
	time.fr = frameCount;
    }
    if (score <= 41 && time.t < 30) {
	translate(-70, -200, -300);
	textSize(50);
	textFont(myFont);
	//fill(255,255,255);
	text("score: ", -140, 0);
	text(score, 0, 0);
	textSize(27);
	text("/42", 57, 0);
	textSize(27);
	if (time.t < 20 || (round(time.t) %2 == 0)){
      
	    text("time:", -140, 42);
	}
	text((30 - time.t), -57, 42);
	translate(70, 200, 300);
    } else if (score <= 41) {
	lss();
    } else {

	won();
    }
}

function lss() {
    translate(-70, -200, -300);
    textSize(50);
    textFont(myFont);
    //fill(255,255,255);
    //text("score: ", -140, 0);
    translate(127, 142, 0);
    texture(loss);
    box(311,377, 20);
    translate(-127, -142, 0);
    text(score, -140, 0);

    text("/42", -140, 42);
    text("you", -170, 84);
    text("lost!", -170, 126);
    translate(70, 200, 300);
    
}

function won() {
  
    translate(-70, -200, -300);
    textSize(50);
    textFont(myFont);
    //fill(255,255,255);

    text("score: 42/42", -140, 0);
    text("you won!", -140, 42);
    textSize(27);
    text("time left: ", -140, 84);
    text((30-time.h),-17, 84);
    translate(70, 200, 300);
    time.win = 1;
    rn.rotx = 0.07;
    rn.roty = 0.07;
}

function rings() {

    if (rn.upx == 1) {
	rn.x++;
    } else {
	rn.x--;
    }
    if (rn.upz == 1) {
	rn.z++;
    } else {
	rn.z--;
    }
    if (rn.x >= 200) {
	rn.upx = 0;
    } else if (rn.x <= -200) {
	rn.upx = 1;
    }
    if (rn.z <= -370) {
	rn.upz = 1;
    } else if (rn.z >= -200) {
	rn.upz = 0;
    }
    rn.xx = ((rn.x - 25) * 0.5);
    rn.zz = rn.z; //(0.5 * (-500 + rn.z));

    rotateX(frameCount * rn.rotx);
    rotateY(frameCount * rn.roty);
    translate(rn.xx, -100, rn.zz);
    torus(17, 5);
    debris();
    translate(-rn.xx, 100, -rn.zz);
    rotateY(-frameCount * rn.roty);
    rotateX(-frameCount * rn.rotx);
}

function debris() {
    translate(-2 * rn.xx, -100, 2 * -rn.zz);
    model(egg);
    translate(2 * rn.Count * 0.1);
 

 