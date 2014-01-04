(function(root){
	var SnakeGame = root.SnakeGame = (root.SnakeGame || {});

	var View = SnakeGame.View = function(el){
		this.$el = el;
		this.board = new SnakeGame.Board();
		this.snake = new SnakeGame.Snake();
		this._addApples(5);
	}

	View.prototype._addApples = function(numApples){
		for(var i = 0; i < numApples; i++){
			var coord = this._createRandomCoord();
			this.board.board[coord[0]][coord[1]] = "A";
		}
	}

	View.prototype._createRandomCoord = function(){
		var pos = [Math.floor(Math.random()*20), Math.floor(Math.random()*20)];
		console.log(pos);
		while (this.board.board[pos[0]][pos[1]] !== undefined){
			pos = [Math.floor(Math.random()*20), Math.floor(Math.random()*20)];
		}
		return pos;
	}

	View.prototype.start = function(){
		var view = this;

		var coords = this.snake.segments[0].coordArr
		this.board.board[coords[0]][coords[1]] = "SH";

		$("body").on('keydown', function(event){
			console.log("keydown")
			view._handleKeyEvent(event);
		});

		view._setInterval();
	}

	View.prototype._setInterval = function(){
		var view = this;
		this.gameInterval = setInterval(function(){
			view.step();
		}, 500);

		this.appleInterval = setInterval(function(){
			view._addApples(1);
		}, 5000);
	}

	View.prototype.end = function(){
		clearInterval(this.gameInterval);
		clearInterval(this.appleInterval);
	}

	View.prototype._handleKeyEvent = function(event){
		switch (event.keyCode){
		case 37:
			console.log("W")
			this.snake.turn("W")
			break;
		case 38:
			console.log("N")
			this.snake.turn("N");
			break;
		case 39:
			console.log("E")
			this.snake.turn("E");
			break;
		case 40:
			console.log("S")
			this.snake.turn("S");
			break;
		}
	}

	View.prototype.step = function(){
		this.snake.move(this.board, this);
		this.board.render(this.$el);
	};

	View.prototype.lose = function(){
		alert("You lose!");
		this.end();
		return
	};

})(this);