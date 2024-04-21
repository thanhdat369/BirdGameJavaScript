// set config
const FPS = 60;
const DEFAULT_GAP = 50;
const GRAVITY = 1;

const TIME_PER_FRAME = 1000 / FPS; //1000ms
// 1unit = 1px per frame in 60 FPS -> 120FPS 1 unit = 0.5px
const PX_FRAME_UNIT = (60 / FPS) * 1;
const SPEEDSLOW = 1 * PX_FRAME_UNIT;

// load images
const img_bird = "images/bird.png";
const img_background = "images/bg.png";
const img_foreground = "images/fg.png";
const img_pipeUp = "images/pipeUp.png";
const img_pipeDown = "images/pipeDown.png";

const DEFAULT_COORD_PIPES = [
    { x: 500, y: 250, gap: 30 },
    { x: 550, y: 250 },
];

DEBUG = true;


const MessageCollision = {
    CapiOutOfScreen: 1,
    FlyToTree:2
}

function debug_print(msg) {
    if (DEBUG) {
        console.log(msg);
    }
}