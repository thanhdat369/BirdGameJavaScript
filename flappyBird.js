let w = window.innerWidth;
let h = window.innerHeight;

let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

window.addEventListener("resize", function () {
	w = window.innerWidth;
	h = window.innerHeight;
	console.log('w ' + w + '- h ' + h);

});

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

let gap = 120;
let constant;
let bX = 120;
let bY = 150;
let gravity = 1.5;
let score = 0;
let isLose = false;

let speedSlow = 1;

let pipe = []

pipe[0] = {
	x: cvs.width,
	y: 0
};

pipe[1] = {
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
	// fly.play();
})


function smooth(Y) {
	// let max = bY + Y;
	// clearInterval(a);
	// a = setInterval(draw, 5)
	// if (bY == max)
	//     a = setInterval(draw, 15)
	bY -= Y;
}

function draw() {
	ctx.drawImage(img_background, 0, 0);

	for (let i = 0; i < pipe.length; i++) {
		constant = img_pipeUp.height + gap;

		ctx.drawImage(img_pipeUp, pipe[i].x, pipe[i].y);
		ctx.drawImage(img_pipeDown, pipe[i].x, pipe[i].y + constant);

		pipe[i].x -= 1 * speedSlow;

		y_render = Math.floor(Math.random() * img_pipeUp.height) - img_pipeUp.height;

		while (y_render > 0) {
			y_render -= 50;
		}
		while (y_render < (-img_pipeUp.height + gap)) {
			y_render += 50;
		}
		if (pipe[i].x == 0) {
			pipe[i] = ({
				x: cvs.width,
				y: y_render
			});
		}

		// detect collision
		if (
			bX + img_bird.width >= pipe[i].x &&
			bX <= pipe[i].x + img_pipeUp.width &&
			((bY <= pipe[i].y + img_pipeUp.height) || (bY + img_bird.height >= pipe[i].y + constant)) ||
			bY + img_bird.height >= cvs.height - img_foreground.height
		) {
			clearInterval(a);
			ctx.drawImage(img_background, 0, 0);
			ctx.fillStyle = "#000";
			ctx.font = "20px Verdana";
			ctx.fillText("Your Score : " + score, 200, 250);
			isLose = true;
		}

		if (pipe[i].x == 50) {
			score++;
			// scor.play();
		}
	}

	ctx.drawImage(img_foreground, 0, cvs.height - img_foreground.height);

	ctx.drawImage(img_bird, bX, bY);

	bY += gravity * speedSlow;

	ctx.fillStyle = "#000";
	ctx.font = "20px Verdana";
	ctx.fillText("Score : " + score, 10, cvs.height - 20);
}

a = setInterval(draw, 15)