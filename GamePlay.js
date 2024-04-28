const GameState = {
    Playing: 1,
    Lose: 0
}

FLY_UP_VEC = 30;


class GamePlay {
    constructor(ctx,gamePlayDependency) {
        this.gamePlayDependency = gamePlayDependency;
        this.__getFromDependencies();
        this.collisionHandler = new ConllisionHandler(gamePlayDependency);
        this.gameOver = false;
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
        if (this.gameOver) {
            this.gameOver = false;
            document.location.reload();
        }
        else {
            this.birdObject.up(FLY_UP_VEC);
        }
    }

    gamePlayNormal() {
        this.__drawBackground();
        this.doublePipeObject.draw();

        this.birdObject.draw();

        if(this.birdObject.getY() < 400) { 
            this.birdObject.down(GRAVITY * SPEEDSLOW);
        }

        if (this.collisionHandler.checkCollision()) {
            this.gameOver = true;
        }

        this.foregroundDrawObject.draw();
    }

    notify(gamePlayType) {
        if (gamePlayType == NotifyGamePlay.Collison) {
            this.gameOver = true;
        }
        if (gamePlayType == NotifyGamePlay.AddScore) {
            this.scoreObject.addScore(1);
        }
    }


    handle() {
        if (!this.gameOver) {
            this.gamePlayNormal();
        } else {
            this.showGame
        }
    }

    play() {
        this.handle();
    }
}
