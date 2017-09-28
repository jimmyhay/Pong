function Paddle(position) {
  var width = 50;
  var height = 350;

  var point;
  var paddeSpeed = 10;

  if (position) {
    point = new paper.Point(50, $(document).height()/2-(350/2));
  } else {
    point = new paper.Point($(document).width()-50-50, $(document).height()/2-(350/2));
  }

  var size = new paper.Size(width, height);
	var path = new paper.Path.Rectangle(point, size);

  path.selected = true;

  path.fillColor = '#ffffff';

  this.updatePaddle = function(keysPressed, dest) {
    if (position) {
      if (keysPressed[65]) path.position.y -= paddeSpeed;
      if (keysPressed[90]) path.position.y += paddeSpeed;
    } else {
      if (keysPressed[74]) path.position.y -= paddeSpeed;
      if (keysPressed[77]) path.position.y += paddeSpeed;
    }
  }

  this.getPath = function() {
    return path;
  }
}
