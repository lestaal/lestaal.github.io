var canvas;
var context;
var MAX_ITERS = 6;
var START_LEN = 200;
var START_THICK = 1;
var iter;
var origX;
var origY;

function init() {
    // initialize canvas
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    context.beginPath();

    // initialize starting values
    initValues();

    // draw first H
    tree();
}

function initValues() {
    // initialize iter
    iter = 0;

    // initialize origin for first H
    origX = canvas.width/2 - START_LEN/2;
    origY = canvas.height/2;
}

function tree() {
    // do nothing if we hit the maximum number of iters
    if (iter >= MAX_ITERS) {
        return;
    }

    // show iteration
    document.getElementById("stage").innerHTML = iter + 1;

    // draw H's
    var dimen = Math.pow(2, iter); 
    var length = START_LEN/dimen;
    for (var i = 0; i < dimen; i++) {
        for (var j = 0; j < dimen; j++) {
            drawH(origX + 2*length*j, origY + 2*length*i, length, START_THICK);
        }
    }

    // update origin
    origX -= length/4;
    origY -= length/2;

    // fill H's
    context.fillStyle="#000000";
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fill();

    // increment iter
    iter++;
}

function drawH(origX, origY, length, thickness) {
    context.rect(origX, origY, length, thickness);
    context.rect(origX, origY - length/2, thickness, length);
    context.rect(origX + length, origY - length/2, thickness, length);
}

function restart() {
    context.beginPath();
    context.clearRect(0, 0, canvas.width, canvas.height);
    initValues();
    tree();
}
