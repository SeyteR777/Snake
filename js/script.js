const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');

const ground = new Image();
ground.src = 'img/ground.png';

const foodImg = new Image();
foodImg.src = 'img/food.png';

let box = 32;
let score = 0;

let food = {
    x: Math.floor((Math.random() * 17 + 1))* box,
    y: Math.floor((Math.random() * 15 + 3))* box
}

let snake = [];

snake[0] = {
    x: 9 * box,
    y: 10 * box
}

document.addEventListener('keydown', direction);

let dir;

function direction(event) {
    //left =  37, top = 38, right = 39, bottom = 40
    if(event.keyCode == 37) {
        dir = 'left';
    } else if (event.keyCode == 38) {
        dir = 'top';
    } else if (event.keyCode == 39) {
        dir = 'right';
    } else if (event.keyCode == 40) {
        dir = 'bottom';
    }
}

function drawGame() {
    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(foodImg, food.x, food.y);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = 'green'
        ctx.fillRect(snake[i].x, snake[i].y, box, box)
    }

    ctx.fillStyle = "white";
    ctx.font = '50px Arial';
    ctx.fillText(score, box * 2.5, box * 1.7)

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor((Math.random() * 17 + 1))* box,
            y: Math.floor((Math.random() * 15 + 3))* box
        }
    } else {
        snake.pop();
    }

    if (snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17)
    {
        clearInterval(game);
        let restart = confirm('Вы програлиб хотите начать заново');
        if (restart === true) {
            location.reload();
        }
    }



    let btns = document.querySelectorAll('.button');

    btns.forEach(btn => {
        btn.addEventListener('click', () =>{
            btn.classList.contains("left") ? dir = 'left' : '';
            btn.classList.contains("right") ? dir = 'right' : '';
            btn.classList.contains("up") ? dir = 'top' : '';
            btn.classList.contains("down") ? dir = 'bottom' : '';
        })
    })

    if (dir == 'left') {snakeX -= box};
    if (dir == 'right') {snakeX += box};
    if (dir == 'top') {snakeY -= box};
    if (dir == 'bottom') {snakeY += box};

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

    // let snakeX = snake[0].x;
    // let snakeY = snake[0].y;

}

let game = setInterval(drawGame, 100);