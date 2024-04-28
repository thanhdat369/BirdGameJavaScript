class ConllisionHandler {
    constructor(dependencies) {
        this.dependencies = dependencies;
        this.bird = this.dependencies.getBirdObject();
        this.doublePipe = this.dependencies.getDoublePipeObject();
    }
    
    checkCollision() {
        return this.doublePipe.checkCollision(this.bird);
    }
}
