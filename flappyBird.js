var w = window.innerWidth;
var h = window.innerHeight;
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var a = null;

window.addEventListener("resize", function() {
    w = window.innerWidth;
    h = window.innerHeight;
    console.log('w ' + w + '- h ' + h);

});







// load images

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";


// some variables

var gap = 120;
var constant;

var bX = 120;
var bY = 150;

var gravity = 1.5;

var score = 0;

var pipe = [];

// audio files
// var fly = new Audio();
// var scor = new Audio();

// fly.src = "sounds/fly.mp3";
// scor.src = "sounds/score.mp3";

pipe[0] = {
    x: cvs.width,
    y: 0
};

pipe[1] = {
    x: cvs.width + 300,
    y: -20
};

// on key down

isLose = false;

cvs.addEventListener("mousedown", function() {
    if (!isLose) {
        smooth(30)
    } else {
        location.reload();
        isLose = false;
    }


    // fly.play();
})

var speedSlow = 1;

function smooth(Y) {
    // var max = bY + Y;
    // clearInterval(a);
    // a = setInterval(draw, 5)
    // if (bY == max)
    //     a = setInterval(draw, 15)
    bY -= Y;
}

function draw() {
    ctx.drawImage(bg, 0, 0);


    for (var i = 0; i < pipe.length; i++) {

        constant = pipeNorth.height + gap;
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

        pipe[i].x -= 1 * speedSlow;


        y_render = Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height;
        while (y_render > 0) {
            y_render -= 50;
        }
        while (y_render < (-pipeNorth.height + gap)) {
            y_render += 50;
        }
        if (pipe[i].x == 0) {
            pipe[i] = ({
                x: cvs.width,
                y: y_render
            });
        }

        // detect collision

        if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant) || bY + bird.height >= cvs.height - fg.height) {
            clearInterval(a);
            ctx.drawImage(bg, 0, 0);
            ctx.fillStyle = "#000";
            ctx.font = "20px Verdana";
            ctx.fillText("Your Score : " + score, 200, 250);
            isLose = true;
        }

        if (pipe[i].x == 50) {
            score++;
            // scor.play();
        }


    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);

    ctx.drawImage(bird, bX, bY);

    bY += gravity * speedSlow;

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : " + score, 10, cvs.height - 20);
}




a = setInterval(draw, 15)
    // draw();