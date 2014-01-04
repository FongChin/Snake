(function (root) {
	var SnakeGame = root.SnakeGame = (root.SnakeGame || {});

	var Coord = SnakeGame.Coord = function(arr) {
		this.coordArr = arr;
	};

	Coord.prototype.plus = function(arr){
		return [this.coordArr[0] + arr[0], this.coordArr[1] + arr[1]]
	}

	var Snake = SnakeGame.Snake = function () {
		this.dir = "E";
		this.segments = [
			new SnakeGame.Coord([10, 10]),
			new SnakeGame.Coord([10, 11])
		];
		this.size = 2;
	}

	Snake.diff = {
		"N": [-1, 0],
		"E": [0, 1],
		"W": [0, -1],
		"S": [1, 0]
	}

	Snake.prototype.move = function(board, view) {
		new_coord = this.segments[this.segments.length - 1].plus(Snake.diff[this.dir]);
		this.segments.push(new SnakeGame.Coord(new_coord));
		// check if new_coord is one of the positions of apple
		// if it is, we increment this.size
		if(board.outOfBounds(new_coord)){
			view.lose();
			return
		}
		if (board.board[new_coord[0]][new_coord[1]] === "S"){
			view.lose();
			return
		}
		if (board.checkIsAppleThere(new_coord)){
			this.size += 1;
		}
		if (this.segments.length > this.size){
			shiftedCoord = this.segments.shift().coordArr;
		}else {
			shiftedCoord = []
		}
		board.updateBoard(this, shiftedCoord, view);
	};

	Snake.prototype.turn = function(dir) {
		this.dir = dir;
	};

	var Board = SnakeGame.Board = function(){
		this.board = [];
		this.constructBoard();
	}

	Board.prototype.constructBoard = function(){
		for (var row = 0; row < 20; row++){
			this.board.push(new Array(20));
		};
	}

	Board.prototype.outOfBounds = function(pos){
		return pos[0] < 0 || pos[0] > 19 || pos[1] < 0 || pos[1] > 19
	};

	Board.prototype.checkIsAppleThere = function(pos){
		console.log(pos);
		if(this.outOfBounds(pos)){
			return false
		}else{
			return this.board[pos[0]][pos[1]] === "A";
		}
	}

	Board.prototype.updateBoard = function(snake, shiftedCoord, view) {
		var board = this;
		if (shiftedCoord.length !== 0){
			this.board[shiftedCoord[0]][shiftedCoord[1]] = undefined;
		}
		for(var i = 0; i < snake.segments.length; i++){
			var coordObj = snake.segments[i];
			var pos = coordObj.coordArr;
			console.log("out of bound?")
			console.log(board.outOfBounds(pos));
			if(i === snake.segments.length - 1){
				board.board[pos[0]][pos[1]] = "SH";
			}else{
				board.board[pos[0]][pos[1]] = "S";
			}
		};
	};

	Board.prototype.render = function(el){
		el.html("");
		for (var row = 0; row < this.board.length; row++){
			var rowDiv = $("<div class='row'></div>"); // div with class row
			for (var col = 0; col < this.board[row].length; col++){
				if (this.board[row][col] === undefined){
					rowDiv.append($("<div class='grid'></div>"));
				}else if (this.board[row][col] === "S") {
					rowDiv.append($("<div class='grid snake'></div>"));
				}else if (this.board[row][col] === "SH") {
					rowDiv.append($("<div class='grid snakeHead'></div>"));
				}else if (this.board[row][col] === "A"){
					rowDiv.append($("<div class='grid apple'></div>"));
				}
			}
			el.append(rowDiv);
		}
		return;
	};

})(this);