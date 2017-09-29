function Paddle(position) {
  var width = 50;
  var height = 250;

  var point;
  var paddeSpeed = 8;

  var paddleDest = $(document).height()/2;
  var paddleDestDist;

  if (position) {
    point = new paper.Point(50, $(document).height()/2-(350/2));
  } else {
    point = new paper.Point($(document).width()-50-50, $(document).height()/2-(350/2));
  }

  var size = new paper.Size(width, height);
	var path = new paper.Path.Rectangle(point, size);

  // path.selected = true;

  path.fillColor = '#ffffff';

  this.updatePaddle = function(keysPressed) {
    if (position) {
      if (keysPressed[65]) path.position.y -= paddeSpeed;
      if (keysPressed[90]) path.position.y += paddeSpeed;
    } else {
      if (keysPressed[74]) path.position.y -= paddeSpeed;
      if (keysPressed[77]) path.position.y += paddeSpeed;
    }

    if (path.position.y+(path.bounds.height/2)>$(document).height()) path.position.y = $(document).height()-(path.bounds.height/2);
    if (path.position.y-(path.bounds.height/2)<0) path.position.y = path.bounds.height/2;
  }

  this.updatePaddleAi = function() {
    if (paddleDestDist<0) {
      path.position.y += paddeSpeed/2;

      if (path.position.y>paddleDest) path.position.y = paddleDest;
    } else {
      path.position.y -= paddeSpeed/2;

      if (path.position.y<paddleDest) path.position.y = paddleDest;
    }

    if (path.position.y+(path.bounds.height/2)>$(document).height()) path.position.y = $(document).height()-(path.bounds.height/2);
    if (path.position.y-(path.bounds.height/2)<0) path.position.y = path.bounds.height/2;
    // if ((path.position.y+(path.bounds.height/2))>($(document).height) path.position.y = $(document).height-(path.bounds.height/2);
  }

  this.getPath = function() {
    return path;
  }

  this.moveAi = function(val) {
    paddleDest = Math.floor(Math.random() * ((val + 200) - (val-200) + 1)) + (val-200);
    paddleDestDist = path.position.y-paddleDest;
  }
}
