let w = window.innerWidth;
let h = window.innerHeight;

let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

/*Load images*/
let img_bird = new Image();
let img_background = new Image();
let img_foreground = new Image();
let img_pipeUp = new Image();
let img_pipeDown = new Image();

img_bird.src = "images/bird.png";
img_background.src = "images/bg.png";
img_foreground.src = "images/fg.png";
img_pipeUp.src = "images/pipeNorth.png";
img_pipeDown.src = "images/pipeSouth.png";

//TODO check the resource before add

let gap = 100;
let constant;
let bX = 120;
let bY = 150;
let gravity = 1;
let score = 0;
let isLose = false;

let speedSlow = 1;

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

pipeDownCoord[2] = {
	x: cvs.width + 800,
	y: -60
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
	// let max = bY + Y;
	// clearInterval(a);
	// a = setInterval(draw, 5)
	// if (bY == max)
	//     a = setInterval(draw, 15)
	bY -= Y;
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
let randomYCoord = () => {
	y_render = Math.floor(Math.random() * img_pipeUp.height) - img_pipeUp.height;

	while (y_render > 0) {
		y_render -= 50;
	}
	while (y_render < (-img_pipeUp.height + gap)) {
		y_render += 50;
	}
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
			bX + img_bird.width >= pipeDownCoord[i].x &&
			bX <= pipeDownCoord[i].x + img_pipeUp.width &&
			((bY <= pipeDownCoord[i].y + img_pipeUp.height) || (bY + img_bird.height >= pipeDownCoord[i].y + constant)) ||
			bY + img_bird.height >= cvs.height - img_foreground.height
		) {
			clearInterval(interval_object);
			drawBackground(ctx);
			isLose = true;
		}

		if (pipeDownCoord[i].x == 50) {
			score++;
		}
	}

	ctx.drawImage(img_foreground, 0, cvs.height - img_foreground.height);

	ctx.drawImage(img_bird, bX, bY);

	bY += gravity * speedSlow;

	drawScore(ctx,score,isLose);
}

interval_object = setInterval(draw, 15)