class PipeGenerator {
    constructor() {
        this.listPipe = [];
        this.__default_pipe();
    }

    __default_pipe() {
        //TODO remove this function and replace by map
        let pipeObject1 = new DoublePipe(ctx, img_pipeUp, img_pipeDown);
        pipeObject1.setXY(cvs.width, 10);
        pipeObject1.setGap(100)
        let pipeObject2 = new DoublePipe(ctx, img_pipeUp, img_pipeDown);
        pipeObject2.setXY(cvs.width + 300, -10);
        pipeObject2.setGap(150);

        this.listPipe.push(pipeObject1);
        this.listPipe.push(pipeObject2);
    }

    getListPipe() {
        return this.listPipe;
    }

    __isCollision(bird) {
        // isPipeGoOutOfScreen = pipe.x < 0;
        // if (isPipeGoOutOfScreen) {
        //     pipe.setXY(cvs.width, y_render);
        // }
    }

    draw() {
        this.listPipe.forEach((pipe) => {
            pipe.draw();
            pipe.moveLeft(1 * SPEEDSLOW);

            if (pipe.x < 0 - pipe.getImageWidth()) {
                pipe.x = 700;
            }
        });
    }

    handle() {
        pipeDownCoord.forEach((pipe) => {
            pipe.draw();

            pipe.moveLeft(1 * SPEEDSLOW);

            y_render = generatorYPipeCoord();

            // if (pipe.checkColision(bird) || isBirdOutOfScreen) {
            //     clearInterval(interval_object);
            //     drawBackground(ctx);
            // }

            // is_pipe_through_checkpoint = pipe.getX() == 50;
            // if (is_pipe_through_checkpoint) {
            //     score_object.addScore();
            // }
        });
    }
    
    notifyCollision() {

    }
}
