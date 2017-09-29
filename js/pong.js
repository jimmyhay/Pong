$(document).ready(function() {
	var spacePressed = false;
	var gameStarted = false;
	var canvas = document.getElementById('myCanvas');
  context = canvas.getContext('2d');

  canvas.width = window.innerWidth; //document.width is obsolete
  canvas.height = window.innerHeight; //document.height is obsolete

	paper.setup(canvas);

	var background = new paper.Path.Rectangle(new paper.Point(0,0), new paper.Size(paper.view.size.width, paper.view.size.height));

	background.fillColor = '#000000';

	// console.log(this.updateScore());

	var puck = new Puck(this);
	var leftPaddle = new Paddle(true);
	var rightPaddle = new Paddle(false);

	var keysPressed = [];
	var countdown;
	var aiCount;

	paper.view.onFrame = function (event) {
		if (gameStarted) {
			leftPaddle.updatePaddle(keysPressed);
			rightPaddle.updatePaddleAi(keysPressed);
			puck.updatePuck();
			puck.checkPaddleLeft(leftPaddle);
			puck.checkPaddleRight(rightPaddle);
		}
	}

	window.onkeyup = function(e) {
	  keysPressed[e.keyCode] = false;

		if (!spacePressed && e.keyCode == 32) {
			spacePressed = true;

			document.getElementById("countdown").innerHTML = "3";

				countdown = setInterval(changeCountdownValue, 1000);
		}
	}

	window.onkeydown = function(e) {
	  keysPressed[e.keyCode] = true;
	}

	window.moveAiPaddle = function(val) {
		setTimeout(rightPaddle.moveAi, 1000, val);
	}

	puck.reset();

	var changeCountdownValue = function() {
		if (document.getElementById("countdown").innerHTML-1>0) {
			document.getElementById("countdown").innerHTML = document.getElementById("countdown").innerHTML-1;
		} else if (!gameStarted) {
			document.getElementById("countdown").innerHTML = 'GO!';
			gameStarted = true;
		} else {
			document.getElementById("countdown").style.display = 'none';

			clearInterval(countdown);
		}
	}

	window.updateScore = function(left) {
		if (left) {
			document.getElementById("scoreLeft").innerHTML = parseInt(document.getElementById("scoreLeft").innerHTML)+1;
		} else {
			document.getElementById("scoreRight").innerHTML = parseInt(document.getElementById("scoreRight").innerHTML)+1;
		}

		document.getElementById("countdown").innerHTML = 'Press space when ready.';
		document.getElementById("countdown").style.display = 'inline-block';

		spacePressed = false;
		gameStarted = false;

		puck.reset();
	}
});
