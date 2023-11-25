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
let img_bird_2 = new Image();
let img_background = new Image();
let img_foreground = new Image();
let img_pipeUp = new Image();
let img_pipeDown = new Image();

img_bird.src = "images/bird.png";
img_bird_2.src = "images/bird2.png";
img_background.src = "images/bg.png";
img_foreground.src = "images/fg.png";
img_pipeUp.src = "images/pipe.png";
img_pipeDown.src = "images/pipe.png";
//TODO check the resource before add


// init value
let curr_bird_image = 1;
let constant;
let birdCoord = {
	x: 120, 
	y: 150
}

let score = 0;

let isLose = false;

let speedSlow = 1 * px_frame_unit;

let pipeDownCoord = []

// Init list pipe
pipeDownCoord[0] = {
	x: cvs.width,
	y: 0
};

pipeDownCoord[1] = {
	x: cvs.width + 300,
	y: -20
};
// end init value

let bird_draw_img = img_bird;

function birdUp(value) {
	birdCoord.y -= value;
}

function birdDown(value) {
	birdCoord.y += value;
}

onMouseClickFunction = ()=> {
	if (!isLose) {
		birdUp(40);
	} else {
		location.reload();
		isLose = false;
	}
}

cvs.addEventListener("mousedown", onMouseClickFunction)

let drawBackground = (ctx) => {
	ctx.drawImage(img_background, 0, 0);
	ctx.drawImage(img_foreground, 0, cvs.height - img_foreground.height);
}

let drawPipe = (ctx, pipeDownCoord, constant) => {
	pipeUpCoord_X = pipeDownCoord.x
	pipeUpCoord_Y = pipeDownCoord.y + constant;

	ctx.drawImage(img_pipeDown, pipeDownCoord.x, pipeDownCoord.y);
	ctx.drawImage(img_pipeUp, pipeUpCoord_X, pipeUpCoord_Y);
}

let drawScore = (ctx, score, isLose) => {
	ctx.fillStyle = colorConfig.textColor;
	ctx.font = "20px Verdana";

	if (isLose) {
		ctx.fillText("Your Score : " + score, 200, 250);
		return;
	}
	ctx.fillText("Score : " + score, 10, cvs.height - 20);

}


function changeBirdImage() {
	if (bird_draw_img == img_bird_2) {
		bird_draw_img = img_bird;
	} else {
		bird_draw_img = img_bird_2;
	}
}

let frame = 0;
let drawBird = (ctx, birdCoord) => {
	let bX = birdCoord.x
	let bY = birdCoord.y
	
	if (frame > 20) {
		frame = 0;
		changeBirdImage();
	}
	frame += 1;
	ctx.drawImage(bird_draw_img, bX, bY);
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

function isInnerRange(x1min,x1max,x2min,x2max){
	if(x2min > x1min && x2min < x1max) { return true;}
	if(x2max > x1min && x2max < x1max) {return true;}
	return false;
}

function draw() {
	drawBackground(ctx);

	for (let i = 0; i < pipeDownCoord.length; i++) {
		let constant = img_pipeUp.height + gap;

		drawPipe(ctx, pipeDownCoord[i], constant)

		pipeDownCoord[i].x -= 1 * speedSlow;

		y_render = randomYCoord();

		isPipeGoOutOfScreen = pipeDownCoord[i].x < 0;

		if (isPipeGoOutOfScreen) {
			pipeDownCoord[i] = ({
				x: cvs.width,
				y: y_render
			});
		}

		// detect collision
		let xmin_bird = birdCoord.x;
		let xmax_bird = birdCoord.x + img_bird.width;
		let ymin_bird = birdCoord.y - img_bird.height;
		let ymax_bird = birdCoord.y;

		let xmin_pipe = pipeDownCoord[i].x;
		let xmax_pipe = pipeDownCoord[i].x + img_pipeDown.width;
		//     || 
		//     ||
		//    bird
		//     ||
		//     ||
		// it collision when the bird in area of the pipe
		// it like calculate iou
		// or you can check it is in the safe area (center) when x of the column 
		// same with x of bird
		isBirdInnerPipe = isInnerRange(xmin_pipe,xmax_pipe,xmin_bird,xmax_bird)

		isBirdLieInThePipe = ymin_bird <= pipeDownCoord[i].y + img_pipeDown.height || 
								ymax_bird >= pipeDownCoord[i].y + constant;

		isTheBirdCollisionWithThePipe = isBirdInnerPipe && isBirdLieInThePipe;
		isBirdOutOfScreen = xmax_bird >= cvs.height || xmin_bird < 0;

		if (
			isTheBirdCollisionWithThePipe || 
			isBirdOutOfScreen
		) {
			clearInterval(interval_object);
			drawBackground(ctx);
			isLose = true;
		}

		is_pipe_through_checkpoint = pipeDownCoord[i].x == 50;

		if (is_pipe_through_checkpoint) {
			score++;
		}
	}

	birdDown(gravity * speedSlow);

	drawBird(ctx, birdCoord);
	drawScore(ctx, score, isLose);
}

interval_object = setInterval(draw, time_per_frame)