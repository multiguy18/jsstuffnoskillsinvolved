var gol_canvas = document.getElementById('canvas'),
context = gol_canvas.getContext("2d");

let scale = 4;

let scaledWidth = Math.round(gol_canvas.width / scale);
let scaledHeight = Math.round(gol_canvas.height / scale);

context.scale(scale, scale);

let currentState = new Array(scaledWidth);
let nextState = new Array(scaledHeight);

for (let x = 0; x < scaledWidth; x++) {
	currentState[x] = new Array(scaledHeight);
	for (let y = 0; y < scaledHeight; y++) {
		currentState[x][y] = false;
	}
}

for (let x = 0; x < scaledWidth; x++) {
	nextState[x] = new Array(scaledHeight);
	for (let y = 0; y < scaledHeight; y++) {
		nextState[x][y] = false;
	}
}

setRow(60, 45, "........................#............");
setRow(60, 46, "......................#.#............");
setRow(60, 47, "............##......##............##.");
setRow(60, 48, "...........#...#....##............##.");
setRow(60, 49, "##........#.....#...##...............");
setRow(60, 50, "##........#...#.##....#.#............");
setRow(60, 51, "..........#.....#.......#............");
setRow(60, 52, "...........#...#.....................");
setRow(60, 53, "............##.......................");

setInterval(loop, 25);

function setRow(x, y, string) {
	for (let ci = 0; ci < string.length && ci < scaledWidth; ci++) {
		if (string[ci] == "#") {
			nextState[x][y] = 1;
		}
		x++
	}
}


function loop() {
	for (let x = 0; x < scaledWidth; x++) {
		for (let y = 0; y < scaledHeight; y++) {
			currentState[x][y] = nextState[x][y]
		}
	}
  
	for (let x = 1; x < scaledWidth - 1; x++) {
		for (let y = 1; y < scaledHeight - 1; y++) {
			let numNeighbours = 	currentState[x - 1][y - 1] + currentState[x][y - 1] + 	currentState[x + 1][y - 1] + 
									currentState[x - 1][y] + 		0 					+ 	currentState[x + 1][y] + 
									currentState[x - 1][y + 1] + currentState[x][y + 1] + 	currentState[x + 1][y + 1];
			
			if (currentState[x][y]) {
				nextState[x][y] = numNeighbours == 2 || numNeighbours == 3;
				let state = numNeighbours == 2 || numNeighbours == 3;
			}
			else {
				nextState[x][y] = numNeighbours == 3;
			}
			
			if (currentState[x][y]) {
				context.fillStyle = "black";
				context.fillRect(x, y, 1, 1);
			}
			else {
				context.fillStyle = "white";
				context.fillRect(x, y, 1, 1);
			}
		}
	}
}
