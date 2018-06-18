function jugador() {
  var usuario = document.getElementById('usuario').value;
document.getElementById('usuarioATM').innerText = usuario.toUpperCase();
document.getElementById('cabecera').style.height = "0";

  
//declaracion de las variables de sonido

var songInicio = document.getElementById("songInicio");
var Rebote = document.getElementById("songRebote");
var Perdiste = document.getElementById("FinGame");
var Ganar = document.getElementById("WinGame");
// Variable para almacenar el nombre

//varibales de entorno
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 4;
var dy = -4;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 6;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
//var Win = 0;
//var Lost = 0
// Declaramos e inicializamos una variable que la utilizaremos para controlar las vidas del jugador.
var lives = 3;
var bricks = [];
//intento fallido de cabecera llamada a la accion
  

for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
//control del movimiento con las flechas o con el raton
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}
//funcion de la colision
function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                      songInicio.pause();
                       Ganar.play();
                        alert("YOU WIN, CONGRATS!");
                        document.location.reload();
                        //Win = Win++;
                    }
                }
            }
        }
    }
}
//dibujar la bola
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#52BE80";
    ctx.fill();
    ctx.closePath();
}
//dibujar la pala
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#EC7063";
    ctx.fill();
    ctx.closePath();
}
//dibujar bloques
function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#2C3E50";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
//dibujamos un score
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}
//intento de contador victorias y derrotas
/*function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Win: "+Win, 8, 20);
}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lose: "+Lose, 8, 20);
}*/
//Funcion que dibuja en el lienzo el numero de vidas que le queda al jugador.
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}
//Funcion main que dibuja y se encarga el juego
function draw() {
songInicio.play();
songInicio.loop=true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius  ) {
        dx = -dx ;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            songRebote.play();
        }
        else {
		//Aqui estamos controlando si las vidas llegan a 0 es cuando volveremos a cargar la interfaz de nuevo.
            lives--;
            if(!lives) {
                songInicio.pause();
                Perdiste.play();
                alert("GAME OVER");
                document.location.reload();
                //Lose = Lose++;
            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    x += dx;
    y += dy;
    requestAnimationFrame(draw);
	
	
}
	draw();
}