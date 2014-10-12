function fern(clear) {
    // initialize stage and tickers
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    context.beginPath();

    // clear context if needed
    if (clear) {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    // initialize point
    var x = 0;
    var y = 0;
    var xtemp = 0;
    var ytemp = 0;

    for (var i = 0; i < 4000; i++) {
        // generate random number between 0 and 1
        var rand = Math.random();

        // choose point
        if (rand < 0.85) {
            x = 0.85*xtemp + 0.04*ytemp;
            y = -0.04*xtemp + 0.85*ytemp + 1.6;
        } else if (rand < 0.92) {
            x = 0.2*xtemp + -0.26*ytemp;
            y = 0.23*xtemp + 0.22*ytemp; + 1.6;
        } else if (rand < 0.99) {
            x = -0.15*xtemp + 0.28*ytemp;
            y = 0.26*xtemp + 0.24*ytemp + 0.44;
        } else {
            x = 0;
            y = 0.16*ytemp;
        }
        
        // draw point
        context.rect(x*40+100, canvas.height - y*40, 1, 1);

        // update xtemp and ytemp
        xtemp = x;
        ytemp = y;
    }
    
    // fill points
    context.fillStyle="#39AD50";
    context.fill();
}
