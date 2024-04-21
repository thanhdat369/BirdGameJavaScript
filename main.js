let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

// Init the main object
var gamePlayDependencies = new GamePlayDependencies();

let backgroundDrawObject = new BaseDrawObject(ctx, img_background);
backgroundDrawObject.setLocation(0, 0);

let foregroundDrawObject = new BaseDrawObject(ctx, img_foreground);
foregroundDrawObject.setLocation(
    0,
    cvs.height - foregroundDrawObject.getImageHeight()
);
let score_object = new Score(ctx);
let bird = new Bird(ctx, img_bird);
let doublePipe = new PipeGenerator()

// add to gamePlayDependencies

gamePlayDependencies.registerBackgroundObject(backgroundDrawObject);
gamePlayDependencies.registerForegroudObject(foregroundDrawObject);
gamePlayDependencies.registerBirdObject(bird);
gamePlayDependencies.registerScore(score_object);
gamePlayDependencies.registerDoublePipeObject(doublePipe);

gamePlayDependencies.verify();

// Add to GamePlay
var gamePlayObj = new GamePlay(gamePlayDependencies);

let onClickHandle = () => {
    gamePlayObj.onClickHandle();
};

cvs.addEventListener("mousedown", onClickHandle);

setInterval(gamepadEventCheck.bind(this, onClickHandle), 100);

function play() {
    gamePlayObj.play();
}

interval_object = setInterval(play, TIME_PER_FRAME);
