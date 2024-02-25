class BaseDrawObject {
    constructor(ctx, image_path) {
        this.image = this.__createImageObject(image_path);
        this.ctx = ctx;
        // init the xy location
        this.x = 50;
        this.y = 50;
    }

    __createImageObject(image_path) {
        let image_object = new Image();
        image_object.src = image_path;
        return image_object;
    }

    setLocation(x, y) {
        this.x = x;
        this.y = y;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getImageWidth() {
        return this.image.width;
    }

    getImageHeight() {
        return this.image.height;
    }

    getXMax() {
        return this.x + this.image.width;
    }

    getYMax() {
        return this.y + this.image.height;
    }

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y);
    }
}

class Bird extends BaseDrawObject {
    constructor(ctx, image_path) {
        super(ctx, image_path);
    }

    up(value) {
        this.y -= value;
    }

    down(value) {
        this.y += value;
    }
}

class DoublePipe {
    constructor(ctx, imagePipeUp, imagePipeDown) {
        this.ctx = ctx;
        this.imagePipeDown = imagePipeDown;
        this.imagePipeUp = imagePipeUp;
        this.pipeUp = new BaseDrawObject(this.ctx, this.imagePipeUp);
        this.pipeDown = new BaseDrawObject(this.ctx, this.imagePipeDown);
        this.gap = 0;
        this.x = 0;
        this.y = 0;
    }

    checkColision(bird) {
        // it collision when the bird in area of the pipe
        // it like calculate iou
        // or you can check it is in the safe area (center) when x of the column
        //     ||
        //     ||
        //    bird
        //     ||
        //     ||
        // ------------------------

        let xmin = bird.getX();
        let xmax = bird.getXMax();
        let ymin = bird.getY();
        let ymax = bird.getYMax();

        let isBirdInnerPipe = isInnerRange(
            this.pipeDown.getX(),
            this.pipeDown.getXMax(),
            xmin,
            xmax
        );

        let isBirdLieInThePipe =
            ymin <= this.pipeUp.getYMax() || ymax >= this.pipeDown.getX();

        return isBirdInnerPipe && isBirdLieInThePipe;
    }

    setXY(x, y) {
        this.x = x;
        this.y = y;
        this.setCenterYLocation();
    }
    setGap(gap) {
        this.gap = gap;
        this.setCenterYLocation();
    }

    setCenterYLocation() {
        this.y_pipDown = parseInt(this.y + this.gap / 2);
        this.y_pipUp = this.y_pipDown - this.gap - this.imagePipeUp.height;
    }

    moveLeft(val) {
        this.x -= val;
    }

    resetX(X) {
        this.x = X;
    }
    getX() {
        return this.x;
    }

    upDateLocation() {
        this.pipeUp.setLocation(this.x, this.y_pipUp);
        this.pipeDown.setLocation(this.x, this.y_pipDown);
    }

    draw() {
        this.upDateLocation();
        this.pipeUp.draw();
        this.pipeDown.draw();
    }
}

class Score {
    constructor(ctx) {
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
        this.ctx.fillStyle = "black";
        this.ctx.font = "20px Arial";
        this.ctx.fillText("Score: " + this.score, 20, 20);
    }
}
