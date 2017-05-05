function init() {

  // initialize game settings
  var canvWidth = 600;    // canvas height
  var canvHeight = 600;   // canvas width
  var radius = 10;        // keep track of radius of player
  var radiusMin = 10;     // minimum radius of player
  var radiusMax = 100;    // maximum radius of player
  var numCircles = 5;     // initial number of circles
  var speed = 4;          // speed of player
  var maxVel = speed;     // maximum x or y velocity of circles
  var minVel = -speed;    // minimum x or y velocity of circles 
  var growthRate = 3;     // how fast player can grow/shrink in radius
  var points = 0;         // keep track of points earned
  var circleColors = ["#1B13F2", "#0750FA", "#67B5F5", "#4BC8DB", "#1552B3"]; // possible colors for circles

  // initialize stage and tickers
  var stage = new createjs.Stage("game-canvas");
  createjs.Ticker.setFPS(30);
  createjs.Ticker.addEventListener("tick", stage);
  createjs.Ticker.addEventListener("tick", tick);

  // set points to be 0
  points = 0;
  document.getElementById("points").innerHTML = points;

  // draw background
  var background = new createjs.Shape();
  background.graphics.beginFill("#39AD50").drawRect(0, 0, canvWidth, canvHeight);
  stage.addChild(background);

  // create circles
  var circles = new Array();
  //var circleRad = 20;
  for (var i = 0; i < numCircles; i++){
    var rad = Math.floor((Math.random()*radiusMax/2)+radiusMin);
    var xvel = 0;
    var yvel = 0;
    while (xvel == 0 && yvel == 0) { // make sure both velocities are not 0
      var xvel = Math.floor((Math.random()*(maxVel - minVel))+minVel);
      var yvel = Math.floor((Math.random()*(maxVel - minVel))+minVel);
    }
    var circle = new Circle((i+1)*100, (i+1)*100, rad, xvel, yvel, circleColors[i]);
    circle.initDraw();
    circles[i] = circle;
  }

  // draw player
  var player = new createjs.Shape();
  player.graphics.setStrokeStyle(1).beginStroke("red").beginFill("#FFFFFF").drawCircle(0, 0, radius);
  player.x = canvWidth/2;
  player.y = canvHeight/2;
  stage.addChild(player).set({alpha:0.25});

  // handle ticks
  function tick(event) {
    // handle circles
    for (var i = 0; i < circles.length; i++){
      // move circles - wrap around canvas if go off
      circles[i].move();
      circles[i].wrap();

      // if any circles are encased by player, eat them
      if (player.x + radius >= circles[i].getX() + circles[i].getRadius() && 
          player.x - radius <= circles[i].getX() - circles[i].getRadius() &&
          player.y + radius >= circles[i].getY() + circles[i].getRadius() && 
          player.y - radius <= circles[i].getY() - circles[i].getRadius()){
        circles[i].clear();
        points += 100 - (radius - circles[i].getRadius()); // increase points
        document.getElementById("points").innerHTML = points;
        circles.splice(i, 1); // remove circle from array  
      }
    }

    // move player
    if (key.isPressed('w')) {
      player.y -= speed;
      drawPlayer();
    }
    if (key.isPressed('s')) {
      player.y += speed;
      drawPlayer();
    }
    if (key.isPressed('a')) {
      player.x -= speed;
      drawPlayer();
    }
    if (key.isPressed('d')) {
      player.x += speed;
      drawPlayer();
    }

    // wrap player if it goes off screen
    if (player.x > canvWidth){
      player.x = 0;
    }
    else if (player.x < 0){
      player.x = canvWidth;
    }
    if (player.y > canvHeight){
      player.y = 0;
    }
    else if (player.y < 0) {
      player.y = canvHeight;
    }

    // shrink/expand player
    if (key.isPressed('.') && radius < radiusMax) {
      radius += growthRate;
      drawPlayer()
    }
    else if (key.isPressed(',') && radius > radiusMin) {
      radius -= growthRate;
      drawPlayer()
    }
  }

  // clear and redraw player
  function drawPlayer() {
    player.graphics.clear();
    player.graphics.setStrokeStyle(1).beginStroke("#000000").beginFill("#FFFFFF").drawCircle(0, 0, radius);
  }

  function Circle(x, y, radius, xvel, yvel, color) {
    this.initX = x;
    this.initY = y;
    this.radius = radius;
    this.xvel = xvel;
    this.yvel = yvel;
    this.color = color;
    this.circle = new createjs.Shape();

    this.getX = function() {
      return this.circle.x;
    }

    this.getY = function() {
      return this.circle.y;
    }

    this.getRadius = function() {
      return this.radius;
    }

    // initially draw the circle (only call once)
    this.initDraw = function() {
      this.circle.graphics.beginFill(this.color).drawCircle(0, 0, this.radius);
      this.circle.x = this.initX;
      this.circle.y = this.initY;
      stage.addChild(this.circle);
    }

    // move the circle by its x and y velocities
    this.move = function() {
      this.circle.x += xvel;
      this.circle.y += yvel;
    }

    // if circle is at end of canvas, wrap around to other side
    this.wrap = function() {
      if (this.circle.x - this.radius > canvWidth){
        this.circle.x = 0;
      }
      else if (this.circle.x + this.radius < 0){
        this.circle.x = canvWidth;
      }
      if (this.circle.y - this.radius > canvHeight){
        this.circle.y = 0;
      }
      else if (this.circle.y + this.radius < 0) {
        this.circle.y = canvHeight;
      }
    }

    // clear circle graphic from stage
    this.clear = function() {
      this.circle.graphics.clear(); 
    }
  }

}


