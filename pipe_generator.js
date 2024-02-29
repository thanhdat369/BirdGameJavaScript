class PipeGenerator {
    constructor() {
        this.listPipe = [];
        this.__default_pipe();
    }

    __default_pipe() {
        //TODO remove this function
        let pipeObject1 = new DoublePipe(ctx, img_pipeUp, img_pipeDown);
        pipeObject1.setXY(cvs.width, 100);
        pipeObject1.setGap(100);
        let pipeObject2 = new DoublePipe(ctx, img_pipeUp, img_pipeDown);
        pipeObject2.setXY(cvs.width + 300, -20);

        this.listPipe.push(pipeObject1);
        this.listPipe.push(pipeObject2);
    }

    getListPipe() {
        return this.listPipe;
    }

    __isCollision(bird) {
        isPipeGoOutOfScreen = pipe.x < 0;
        if (isPipeGoOutOfScreen) {
            pipe.setXY(cvs.width, y_render);
        }
    }

    draw() {
        this.listPipe.forEach((pipe) => {
            pipe.draw();
            pipe.moveLeft(1 * SPEEDSLOW);

            if (pipe.x < 0) {
                pipe.x = 700;
            }
        });
    }

    handle() {
        pipeDownCoord.forEach((pipe) => {
            pipe.draw();

            pipe.moveLeft(1 * SPEEDSLOW);

            y_render = generatorYPipeCoord();

            // detect collision
            isBirdOutOfScreen = bird.getXMax() >= cvs.height || bird.getX() < 0;

            if (pipe.checkColision(bird) || isBirdOutOfScreen) {
                clearInterval(interval_object);
                drawBackground(ctx);
            }

            is_pipe_through_checkpoint = pipe.getX() == 50;
            if (is_pipe_through_checkpoint) {
                score_object.addScore();
            }
        });
    }
}
