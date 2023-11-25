let config = {
    FPS: 60,
    gap: 100,
    gravity: 1
}

let colorConfig = {
    textColor: "#00000",
}

let checkColision = (pipe, img_bird, img_pipeUp,cvs) => {
    //TODO
    // if (
    //     bX + img_bird.width >= pipe[i].x &&
    //     bX <= pipe[i].x + img_pipeUp.width &&
    //     ((bY <= pipe[i].y + img_pipeUp.height) || (bY + img_bird.height >= pipe[i].y + constant)) ||
    //     bY + img_bird.height >= cvs.height - img_foreground.height) {
    //     return true;
    // }
    // else false
}

function isInnerRange(x1min,x1max,x2min,x2max){
	if(x2min > x1min && x2min < x1max) { return true;}
	if(x2max > x1min && x2max < x1max) {return true;}
	return false;
}

class Bird {
	constructor(ctx, image) {
        this.image = image;
		this.ctx = ctx;
        this.x = 50;
        this.y = 50;
	}

    setLocation(x,y){
        this.x = x;
        this.y = y;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getXMax() {
        return this.x + this.image.width;
    }

    getYMax() {
        return this.y + this.image.height;
    }

    birdUp(value) {
        this.y -= value;
    }
    
    birdDown(value) {
        this.y += value;
    }
	
    draw() {
        this.ctx.drawImage(this.image,this.x,this.y);
    }
}

class Score {
    constructor(ctx){
        this.ctx = ctx;
        this.score = 0;
    }

    setScore(score) {
        this.score = score;
    }

    addScore() {
        this.score += 1;
    }

    draw() {
	    this.ctx.fillStyle = colorConfig.textColor;
	    this.ctx.font = "20px Verdana";
        this.ctx.fillText("Score: " + this.score, 20, 20);
    }
}

class BaseDrawObject {
    constructor(ctx, image) {
        this.image = image;
		this.ctx = ctx;
        this.x = 50;
        this.y = 50;
	}

    setLocation(x,y){
        this.x = x;
        this.y = y;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getXMax() {
        return this.x + this.image.width;
    }

    getYMax() {
        return this.y + this.image.height;
    }
    
    draw() {
        this.ctx.drawImage(this.image,this.x,this.y);
    }
}

class DoublePipe {
    constructor(ctx,imagePipeUp, imagePipeDown) {
        this.ctx = ctx;
        this.imagePipeDown = imagePipeDown;
        this.imagePipeUp = imagePipeUp;
        this.pipeUp = new BaseDrawObject(this.ctx,this.imagePipeUp);
        this.pipeDown = new BaseDrawObject(this.ctx,this.imagePipeDown);
        this.gap = 0;
        this.x = 0;
        this.y = 0;
    }
    
    checkColision(xmin,ymin,xmax,ymax) {
		//     || 
		//     ||
		//    bird
		//     ||
		//     ||
		// it collision when the bird in area of the pipe
		// it like calculate iou
		// or you can check it is in the safe area (center) when x of the column 
		// same with x of bird
		let xmin_pipe = this.pipeDown.getX();
		let xmax_pipe = this.pipeDown.getXMax();

		let isBirdInnerPipe = isInnerRange(this.pipeDown.getX(),this.pipeDown.getXMax(),xmin,xmax);

		let isBirdLieInThePipe = ymin <= this.pipeUp.getYMax() || ymax >= this.pipeDown.getX();

		return isBirdInnerPipe && isBirdLieInThePipe;
    }

    setXY(x,y) {
        this.x = x;
        this.y = y;
        this.setCenterYLocation();
    }
    setGap(gap) {
        this.gap = gap; 
        this.setCenterYLocation();
    }

    setCenterYLocation() {
        this.y_pipDown = parseInt(this.y + gap/2);
        this.y_pipUp = this.y_pipDown - this.gap - this.imagePipeUp.height;
    }

    moveLeft(val) {
        this.x -= val;
    }

    resetX(X) {
        this.x = X; 
    }

    upDateLocation() {
        this.pipeUp.setLocation(this.x,this.y_pipUp);
        this.pipeDown.setLocation(this.x,this.y_pipDown);
    }

    draw() {
        console.log("debug call");
        this.upDateLocation();
        this.pipeUp.draw();
        this.pipeDown.draw();
    }

}