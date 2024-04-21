class GamePlayDependencies {
    // Remember add new dependencies to the verify function
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

    verify() {
        if(DEBUG) {
            if (!this.getBackgroundObject()) {throw Error("No background object added");}
            if (!this.getBirdObject()) {throw Error("No bird object added");}
            if (!this.getDoublePipeObject()) {throw Error("No double pipe object added");}
            if (!this.getForegroudObject()) {throw Error("No foreground object added");}
            if (!this.getScore()) {throw Error("No score object added");}
        }
    }
}