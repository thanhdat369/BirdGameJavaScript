let w = window.innerWidth;
let h = window.innerHeight;

const FPS = 60;
const time_per_frame = 1000/FPS; //1000ms
// 1unit = 1px per frame in 60 FPS -> 120FPS 1 unit = 0.5px 
const px_frame_unit = 60/FPS * 1;


let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

/*Load images*/
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
img_pipeUp.src = "images/pipeNorth.png";
img_pipeDown.src = "images/pipeSouth.png";

let curr_bird_image = 1;
//TODO check the resource before add

let gap = 100;
let constant;
let birdCoord = {
	x: 120,
	y: 150
}
let gravity = 1;
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

cvs.addEventListener("mousedown", function () {
	if (!isLose) {
		smooth(30)
	} else {
		location.reload();
		isLose = false;
	}
})


function smooth(Y) {
	birdCoord.y -= Y;
}

let drawBackground = (ctx) => {
	ctx.drawImage(img_background, 0, 0);
}

let drawPipe = (ctx, pipeDownCoord, constant) => {
	pipeUpCoord_X = pipeDownCoord.x
	pipeUpCoord_Y = pipeDownCoord.y + constant;

	ctx.drawImage(img_pipeDown, pipeDownCoord.x, pipeDownCoord.y);
	ctx.drawImage(img_pipeUp, pipeUpCoord_X, pipeUpCoord_Y);
}

let drawScore = (ctx, score, isLose) => {
	ctx.fillStyle = "#000";
	ctx.font = "20px Verdana";
	if (isLose) {
		ctx.fillText("Your Score : " + score, 200, 250);
		return;
	}
	ctx.fillText("Score : " + score, 10, cvs.height - 20);

}
let draw_bird = img_bird_2;
let frame = 0;

function changeBirdImage() {
	if (draw_bird == img_bird_2) {
		draw_bird = img_bird;
	} else {
		draw_bird = img_bird_2;
	}
}

let drawBird = (ctx, birdCoord) => {
	let bX = birdCoord.x
	let bY = birdCoord.y
	ctx.drawImage(img_foreground, 0, cvs.height - img_foreground.height);
	
	if (frame > 20) {
		frame = 0;
		changeBirdImage();
	}
	frame += 1;
	console.log(frame);
	ctx.drawImage(draw_bird, bX, bY);
}

let randomYCoord = () => {
	y_render = Math.floor(Math.random() * img_pipeUp.height) - img_pipeUp.height;

	while (y_render > 0) {
		y_render -= 50;
	}
	while (y_render < (-img_pipeUp.height + gap)) {
		y_render += 50;
	}
	return y_render;
}

function draw() {
	// draw background
	drawBackground(ctx);

	for (let i = 0; i < pipeDownCoord.length; i++) {
		let constant = img_pipeUp.height + gap;
		drawPipe(ctx, pipeDownCoord[i], constant)

		pipeDownCoord[i].x -= 1 * speedSlow;

		y_render = randomYCoord();

		isPipeGoOutOfScreen = pipeDownCoord[i].x == 0;
		if (isPipeGoOutOfScreen) {
			pipeDownCoord[i] = ({
				x: cvs.width,
				y: y_render
			});
		}

		// detect collision
		if (
			birdCoord.x + img_bird.width >= pipeDownCoord[i].x &&
			birdCoord.x <= pipeDownCoord[i].x + img_pipeUp.width &&
			((birdCoord.y <= pipeDownCoord[i].y + img_pipeUp.height) || (birdCoord.y + img_bird.height >= pipeDownCoord[i].y + constant)) ||
			birdCoord.y + img_bird.height >= cvs.height - img_foreground.height
		) {
			clearInterval(interval_object);
			drawBackground(ctx);
			isLose = true;
		}

		if (pipeDownCoord[i].x == 50) {
			score++;
		}
	}

	drawBird(ctx, birdCoord);
	drawScore(ctx, score, isLose);

	birdCoord.y += gravity * speedSlow;
}

interval_object = setInterval(draw, time_per_frame)