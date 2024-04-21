const GameState = {
    Playing: 1,
    Lose: 0
}

FLY_UP_VEC = 30;


class GamePlay {
    constructor(gamePlayDependency) {
        this.gamePlayDependency = gamePlayDependency;
        this.__getFromDependencies();
        // this.GamePlay = GameState.Lose;
        this.msg
    }

    __getFromDependencies() {
        this.birdObject = this.gamePlayDependency.getBirdObject();
        this.backgroundDrawObject = this.gamePlayDependency.getBackgroundObject();
        this.foregroundDrawObject = this.gamePlayDependency.getForegroudObject();
        this.scoreObject = this.gamePlayDependency.getScore();
        this.doublePipeObject = this.gamePlayDependency.getDoublePipeObject();
    }

    __drawBackground() {
        this.backgroundDrawObject.draw();
        this.scoreObject.draw();
    }

    onClickHandle() {
        this.birdObject.up(FLY_UP_VEC);
    }

    handle() {
        this.__drawBackground();
        this.doublePipeObject.draw();

        this.birdObject.draw();
        if(this.birdObject.getY() < 400) { 
            this.birdObject.down(GRAVITY * SPEEDSLOW);
        }

        this.foregroundDrawObject.draw();
    }

    receiveTheMessageCollision(msg) {

    }

    play() {
        this.handle();
    }
}
