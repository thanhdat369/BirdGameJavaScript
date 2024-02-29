const GameState = {
    Playing: 1,
    Lose: 0
}

class GamePlayDependencies {
    constructor() {

    }
    registerBackgroundObject(obj) {
        this.backgroundDrawObject = obj;
    }

    registerForegroudObject(obj) {
        this.foregroundDrawObject = obj;
    }

    registerBirdObject(obj) {
        this.birdObject = obj;
    }

    registerScore(obj) {
        this.scoreObject = obj;
    }

    registerDoublePipeObject(obj) {
        this.doublePipe = obj;
    }

    getBackgroundObject() {
        return this.backgroundDrawObject;
    }

    getForegroudObject() {
        return this.foregroundDrawObject;
    }

    getBirdObject() {
        return this.birdObject;
    }

    getScore() {
        return this.scoreObject;
    }

    getDoublePipeObject() {
        return this.doublePipe;
    }
}

class GamePlay {
    constructor(gamePlayDependency) {
        this.gamePlayDependency = gamePlayDependency;
        this.__getFromDependencies();
        this.GamePlay = GameState.Lose;
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
        this.birdObject.up(30);
    }

    handle() {
        this.__drawBackground();
        this.doublePipeObject.draw();

        this.birdObject.draw();
        this.birdObject.down(GRAVITY * SPEEDSLOW);

    }

    play() {
        this.handle();
    }
}
