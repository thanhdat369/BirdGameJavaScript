let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

// Init the main object
let backgroundDrawObject = new BaseDrawObject(ctx, img_background);
backgroundDrawObject.setLocation(0, 0);
let foregroundDrawObject = new BaseDrawObject(ctx, img_foreground);
foregroundDrawObject.setLocation(
    0,
    cvs.height - foregroundDrawObject.getImageHeight()
);
let score_object = new Score(ctx);
let bird = new Bird(ctx, img_bird);

var gamePlayDependencies = new GamePlayDependencies();
gamePlayDependencies.registerBackgroundObject(backgroundDrawObject);
gamePlayDependencies.registerForegroudObject(foregroundDrawObject);
gamePlayDependencies.registerBirdObject(bird);
gamePlayDependencies.registerScore(score_object);
// gamePlayDependencies.registerDoublePipeObject();

var gamePlayObj = new GamePlay(gamePlayDependencies);

onClickHandle = () => {
    gamePlayObj.onClickHandle();
};

cvs.addEventListener("mousedown", onClickHandle);

function play() {
    gamePlayObj.play();
}

interval_object = setInterval(play, TIME_PER_FRAME);
