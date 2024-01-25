const lauks = document.getElementById("spl");
const ctx = lauks.getContext("2d");

const ground = new Image();
ground.src = "IMG/ground.png";

const foodImg = new Image();
foodImg.src = "IMG/food1.png";

let score = 0;

let box = 32;

let food = {
	x: (Math.floor(17*Math.random())+1)*box,
	y: (Math.floor(15*Math.random())+3)*box
}


var gameEnd = false

let highScore = localStorage.getItem("HighScore")

let snake = []
snake[0] = {
	x: 9*box,
	y: 10*box
}

function restartGame() {
	if (gameEnd) {
		if (score>highScore) {
			localStorage.setItem("HighScore", score)
		}
		location.reload()
	}
}

document.addEventListener("keydown", direction);

let dir;

function direction( event ) {
	let key = event.key.toLowerCase()

	if( ( key == 'a' || key == 'arrowleft' ) && dir != "right"){
		dir = "left"
	}
	if( ( key == 'd' || key == 'arrowright' ) && dir != "left"){
		dir = "right"
	}
	if( ( key == 'w' || key == 'arrowup' ) && dir != "down"){
		dir = "up"
	}
	if( ( key == 's' || key == 'arrowdown' ) && dir != "up"){
		dir = "down"
	}

	//restartēšanas pogas
	if (key == 'r') {
		location.reload()
	}
	if (event.keyCode == 32) {
		restartGame()
	}
}

function isColliding(jaunaGalva, cuska){
	for(i=0; i<cuska.length; i++){
		if(jaunaGalva.x == cuska[i].x && jaunaGalva.y == cuska[i].y){
			clearInterval(game);
			gameEnd = true
		}
	}
	//sienas
	if(jaunaGalva.x <= 0*box || jaunaGalva.x >= 18*box || jaunaGalva.y <= 2*box || jaunaGalva.y >= 18*box){
		clearInterval(game);
		gameEnd = true
	}
}

function drawGame() {
	ctx.drawImage(ground, 0, 0);
	ctx.drawImage(foodImg, food.x, food.y);
	ctx.fillStyle = "yellow";
	ctx.font = "40px Arial";
	ctx.fillText("Score: " + score + "  High Score: " + highScore, 2*box, 2*box);
	
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;
	
	for(let i = 0; i < snake.length; i++){
		//pirmais krāsu minējums nosaka galvas krāsu, otrais krāsu minējums nosaka ķermeni
		ctx.fillStyle = (i == 0) ? "yellow" : "green"; 
		ctx.fillRect(snake[i].x, snake[i].y, box, box); 
		// if(i == 0){
		// 	ctx.drawImage(foodImg, snake[i].x, snake[i].y);
		// } else {
		// 	ctx.fillRect(snake[i].x, snake[i].y, box, box); 
		// }
	}
	
	if(snakeX == food.x && snakeY == food.y){
		score++;
		food = {
			x: (Math.floor(17*Math.random())+1)*box,
			y: (Math.floor(15*Math.random())+3)*box
		}
	} else {
		snake.pop();
	}
	
	
	if(dir == "up"){
		snakeY -= box;
	}
	if(dir == "down"){
		snakeY += box;
	}
	if(dir == "right"){
		snakeX += box;
	}
	if(dir == "left"){
		snakeX -= box;
	}
	
	let newHead = {
		x: snakeX,
		y: snakeY
	}
	
	isColliding(newHead, snake);
	
	snake.unshift(newHead);

}

let game = setInterval(drawGame, 100);
