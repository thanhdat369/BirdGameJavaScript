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

var gamePlayDependency = new GamePlayDependencies();
gamePlayDependency.registerBackgroundObject(backgroundDrawObject);
gamePlayDependency.registerForegroudObject(foregroundDrawObject);
gamePlayDependency.registerBirdObject(bird);
gamePlayDependency.registerScore(score_object);
// gamePlayDependency.registerDoublePipeObject();

var gamePlayObj = new GamePlay(gamePlayDependency);
onClickHandle = () => {
    gamePlayObj.onClickHandle();
};
cvs.addEventListener("mousedown", onClickHandle);

function play() {
    gamePlayObj.play();
}

interval_object = setInterval(play, TIME_PER_FRAME);
