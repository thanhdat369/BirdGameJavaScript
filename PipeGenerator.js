var NotifyGamePlay = {
    Collison : 1,
    AddScore : 2,
}
class PipeGenerator {
    constructor() {
        this.listPipe = [];
        this.__default_pipe();
    }

    __default_pipe() {
        //TODO remove this function and replace by map
        let pipeObject1 = new DoublePipe(ctx, img_pipeUp, img_pipeDown);
        pipeObject1.setXY(400, 10);
        pipeObject1.setGap(200)
        let pipeObject2 = new DoublePipe(ctx, img_pipeUp, img_pipeDown);
        pipeObject2.setXY(cvs.width + 300, -10);
        pipeObject2.setGap(150);

        this.listPipe.push(pipeObject1);
        this.listPipe.push(pipeObject2);
    }

    registerGamePlay(gamePlay) {
        this.gamePlay = gamePlay;
    }

    registerBird(bird) {
        this.bird = bird;
    }

    getListPipe() {
        return this.listPipe;
    }

    checkCollision(bird) {
        // TODO remove maybe unused
        let rs = false;
        this.listPipe.forEach((pipe) => {
            if (pipe.checkCollision(bird)) {
                rs = true;
                return;
            }
        });
        return rs;
    }

    draw() {
        this.listPipe.forEach((pipe) => {
            pipe.moveLeft(1 * SPEEDSLOW);
            if (pipe.x < 600) { // In the screen
                pipe.draw();
            }

            if (pipe.x < 100) { // To the bird
                let isCollission = pipe.checkCollision(this.bird);
                if (isCollission) {
                    this.gamePlay.notify(NotifyGamePlay.Collison);
                }
            }
            
            if (pipe.getX() === 50) { // To the score
                this.gamePlay.notify(NotifyGamePlay.AddScore);
            }

            if (pipe.x < 0 - pipe.getImageWidth()) {
                pipe.x = 800;
            }
        });
    }
}
