function Puck(parent) {
  console.log("I am a puck");

  var xVal = $(document).width()/2;
  var yVal = $(document).height()/2;
  var xVel = 10;
  var yVel = 10;

  var point = new paper.Point(xVal, yVal);
	var size = Math.ceil(Math.random() * 50);
	var path = new paper.Path.Circle(point, size);
  var pongParent = parent;
  var aiDest;
  var debugAi = new paper.Path.Circle(new paper.Point(xVal, yVal), 20);
	//path.rotation = 130;
	//path.selected = true;
	path.fillColor = '#ffff00';
  debugAi.fillColor = 'blue';

  this.updatePuck = function () {
    path.position = new paper.Point(path.position.x+xVel, path.position.y+yVel);
    checkCollisions();
    //checkBounds();
  }

  this.reset = function() {
    xVel = 10;
    yVel = 10;
    path.position.x = xVal;
    path.position.y = yVal;

    dist = $(document).width()-path.position.x;

    aiDest = Math.tan(45*(Math.PI/180)) * dist;
    aiDest = path.position.y+aiDest;

    debugAi.position = new paper.Point($(document).width(), aiDest);

    window.moveAiPaddle(aiDest);
  }

  var checkBounds = function () {
    if (path.position.x+path.bounds.width > $(document).width()+500 ||
        path.position.x-path.bounds.width < 0-500) {
          path.position = new paper.Point(xVal, yVal);
        }
  }

  var checkCollisions = function() {
    if (path.position.x > $(document).width()+path.bounds.width) {
      window.updateScore(true);
    } else if (path.position.x < 0-path.bounds.width) {
      window.updateScore(false);
    }
    if (path.position.y > $(document).height()-path.bounds.height/2 || path.position.y < 0+path.bounds.height/2) {
      yVel *= -1;

      bounds = Math.atan2(yVel, xVel);

      dist = $(document).width()-path.position.x;

      aiDest = Math.tan(bounds) * dist;
      aiDest = path.position.y+aiDest;

      debugAi.position = new paper.Point($(document).width(), aiDest);

      window.moveAiPaddle(aiDest);
    }
  }

  this.checkPaddleRight = function(paddle) {
    var paddleBounds = paddle.getPath().bounds;
    var dist;
    var bounds;

    if (xVel > 0) {
      if (path.bounds.center.y > paddleBounds.topCenter.y && path.bounds.center.y < paddleBounds.bottomCenter.y) {
        if (path.bounds.rightCenter.x > paddleBounds.leftCenter.x) {
          dist = Math.sqrt((xVel*xVel)+(yVel*yVel));

          path.position.x = paddleBounds.leftCenter.x-path.bounds.width/2;

          bounds = ((path.position.y-paddleBounds.center.y)/(paddleBounds.height/2) * -45)+180;
          xVel = Math.cos(bounds*(Math.PI/180)) * dist;
          yVel = Math.sin(bounds*(Math.PI/180)) * dist;
        }
      }
    }
  }

  this.checkPaddleLeft = function(paddle) {
    var paddleBounds = paddle.getPath().bounds;
    var dist;
    var bounds;

    if (xVel < 0) {
      if (path.bounds.bottomCenter.y > paddleBounds.topCenter.y && path.bounds.topCenter.y < paddleBounds.bottomCenter.y) {
        if (path.bounds.leftCenter.x < paddleBounds.rightCenter.x) {
          dist = Math.sqrt((xVel*xVel)+(yVel*yVel));

          path.position.x = paddleBounds.rightCenter.x+path.bounds.width/2;

          bounds = (path.position.y-paddleBounds.center.y)/(paddleBounds.height/2) * 45;
          xVel = Math.cos(bounds*(Math.PI/180)) * dist;
          yVel = Math.sin(bounds*(Math.PI/180)) * dist;

          dist = $(document).width()-path.position.x;

          aiDest = Math.tan(bounds*(Math.PI/180)) * dist;
          aiDest = path.position.y+aiDest;

          debugAi.position = new paper.Point($(document).width(), aiDest);

          window.moveAiPaddle(aiDest);
        }
      }
    }
  }
}
