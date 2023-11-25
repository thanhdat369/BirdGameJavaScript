let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

// set config 
const FPS = config.FPS;
const gap = config.gap;
const gravity = config.gravity;

const time_per_frame = 1000/FPS; //1000ms
// 1unit = 1px per frame in 60 FPS -> 120FPS 1 unit = 0.5px 
const px_frame_unit = 60/FPS * 1;

// end set config

// load images
let img_bird = new Image();
let img_background = new Image();
let img_foreground = new Image();
let img_pipeUp = new Image();
let img_pipeDown = new Image();

img_bird.src = "images/bird.png";
img_background.src = "images/bg.png";
img_foreground.src = "images/fg.png";
img_pipeUp.src = "images/pipe.png";
img_pipeDown.src = "images/pipe.png";
//TODO check the resource before add


// init value
let constant;

let isLose = false;

let speedSlow = 1 * px_frame_unit;

let pipeDownCoord = []

let pipeObject1 = new DoublePipe(ctx,img_pipeUp,img_pipeDown);
pipeObject1.setXY(cvs.width,100);
pipeObject1.setGap(100);
let pipeObject2 = new DoublePipe(ctx,img_pipeUp,img_pipeDown);
pipeObject2.setXY(cvs.width+300, -20);
pipeObject2.setGap(20);
// Init list pipe

pipeDownCoord[0] = pipeObject1;
pipeDownCoord[1] = pipeObject2;

// end init value
let score_object = new Score(ctx);

let bird = new Bird(ctx,img_bird);

onMouseClickFunction = ()=> {
	if (!isLose) {
		bird.birdUp(40);
	} else {
		location.reload();
		isLose = false;
	}
}

cvs.addEventListener("mousedown", onMouseClickFunction)

function drawBackground (ctx) {
	ctx.drawImage(img_background, 0, 0);
	ctx.drawImage(img_foreground, 0, cvs.height - img_foreground.height);
}



let randomYCoord = () => {
	y_render = Math.floor(Math.random() * img_pipeUp.height) - img_pipeUp.height;

	while (y_render > 0) {
		y_render -= 100;
	}
	while (y_render < (-img_pipeUp.height + gap)) {
		y_render += 100;
	}
	return y_render;
}

function draw() {
	drawBackground(ctx);
	pipeObject1.draw();
	for (let i = 0; i < pipeDownCoord.length; i++) {
		pipeDownCoord[i].draw();

		pipeDownCoord[i].moveLeft(1 * speedSlow);

		y_render = randomYCoord();

		isPipeGoOutOfScreen = pipeDownCoord[i].x < 0;

		if (isPipeGoOutOfScreen) {
			pipeDownCoord[i].setXY(cvs.width,y_render);
		}

		// detect collision
		let xmin_bird = bird.getX();
		let xmax_bird = bird.getXMax();
		let ymin_bird = bird.getY();
		let ymax_bird = bird.getYMax();

		isBirdOutOfScreen = xmax_bird >= cvs.height || xmin_bird < 0;

		if (
			pipeDownCoord[i].checkColision(xmin_bird,ymin_bird,xmax_bird,ymax_bird) || 
			isBirdOutOfScreen
		) {
			clearInterval(interval_object);
			drawBackground(ctx);
			isLose = true;
		}

		is_pipe_through_checkpoint = pipeDownCoord[i].x == 50;

		if (is_pipe_through_checkpoint) {
			score_object.addScore();
		}
	}

	bird.birdDown(gravity * speedSlow);
	bird.draw();
	score_object.draw();
}

interval_object = setInterval(draw, time_per_frame)