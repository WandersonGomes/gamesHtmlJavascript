/*
Game criado seguindo o tutorial do seguinte canal no youtube:
https://www.youtube.com/watch?v=9TcU2C1AACw
*/

const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

//unidade dentro do jogo
const box = 32;

//plano de fundo
let ground = new Image();
ground.src = './img/ground.png'

//carrega os sons
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = './audio/dead.mp3'
down.src = './audio/down.mp3'
eat.src = './audio/eat.mp3'
left.src = './audio/left.mp3'
right.src = './audio/right.mp3'
up.src = './audio/up.mp3'

//a cobra
let snake = [];
snake[0] = {x: 9 * box, y: 10 * box};

//comida
let food = {
    x: Math.floor(Math.random()*17 + 1) * box,
    y: Math.floor(Math.random()*15 + 3) * box
}

let foodImg = new Image();
foodImg.src = './img/food.png';

//pontuacao
let score = 0;

//controles do game
let d;

document.addEventListener("keydown", direction);

function direction(event) {
    let key_code = event.keyCode;

    if (key_code == 37 && d != "RIGHT") {
        left.play();
        d = "LEFT";
    }
    else if (key_code == 38 && d != "DOWN") {
        up.play();
        d = "UP";
    }
    else if (key_code == 39 && d != "LEFT") {
        right.play();
        d = "RIGHT"
    }
    else if (key_code == 40 && d != "UP") {
        down.play();
        d = "DOWN";
    }

}



//metodo para desenhar no canvas
function draw() {
    ctx.drawImage(ground,0,0);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green":"white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
    
    //posicao da velha cabeca
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    //escolhe a direcao
    if (d == "LEFT") snakeX -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "UP") snakeY -= box;
    if (d == "DOWN") snakeY += box;   

    //funcao que checa a colisao
    function collision(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (head.x == array[i].x && head.y == array[i].y) {
                return true;
            }
        }
        return false;
    }
    
    //se a cobra come a comida
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        eat.play();
        do {
            food = {
                x: Math.floor(Math.random()*17 + 1) * box,
                y: Math.floor(Math.random()*15 + 3) * box
            }
        } while (collision(food, snake));
        //nao removemos a calda

    } else {
        //remove a calda
        snake.pop();
    }

    //cria a nova cabeca
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    
    //fim de jogo
    if (snakeX < box || snakeX > 17*box 
        || snakeY < 3 * box || snakeY > 17 * box
        || collision(newHead, snake)) {
        dead.play();
        clearInterval(game);
    }


    //adiciona a nova cabeca
    snake.unshift(newHead);


    ctx.fillStyle = "white";
    ctx.font = "45px Change One";
    ctx.fillText(score, 2*box, 1.6*box);
}

//tempo de atualizacao do frames do game
let game = setInterval(draw, 100);