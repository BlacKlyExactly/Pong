const ballDirections = {
    top: Math.round(Math.random()) === 1,
    left: Math.round(Math.random()) === 1,
}

let ballSpeedX = Math.random() + 3;
let ballSpeedY = Math.random() + 3;
let palleteColDetected = false;

const detectCollision = ( 
    rect1, 
    rect2 
) => {
    if(
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    ) return true;
    return false;    
}

const initBall = () => {
    ballSpeedX = 0;
    ballSpeedY = 0;

    ball.style.top = "50%";
    ball.style.left = "50%";

    ballDirections.top = Math.round(Math.random()) === 1
    ballDirections.left = Math.round(Math.random()) === 1

    ballSpeedX = Math.random() + 3;
    ballSpeedY = Math.random() + 3;

    palleteColDetected = false;
}

window.addEventListener("load", () => {
    initBall();

    const ballLoop = () => {
        const botPos = botPallete.getBoundingClientRect();
        const playerPos = playerPallete.getBoundingClientRect();
        const ballPos = ball.getBoundingClientRect();
        const { width, height } = board.getBoundingClientRect();

        const { x, y } = ballPos;

        if(x < 0 || x > width + ballPos.width){
            setTimeout(() => {
                x < 0 && botPoints++;
                x > width + ballPos.width && playerPoints++;

                playerScore.innerHTML = playerPoints.toString();
                botScore.innerHTML = botPoints.toString();

                initBall();
                window.requestAnimationFrame(ballLoop);
            }, 100)

            return;
        }
    
        if(y > height - 10) ballDirections.top = true;
        if(y < 0) ballDirections.top = false;

        if(
            (
                detectCollision(ballPos, playerPos) ||
                detectCollision(ballPos, botPos)
            ) && !palleteColDetected
        ){
            ballDirections.left = !ballDirections.left;

            ballSpeedX += Math.random() / 2;
            ballSpeedY += Math.random() / 2;

            palleteColDetected = true;

            setTimeout(() => palleteColDetected = false, 50);
        }
    
        const valueY = ballDirections.top ? y - ballSpeedY : y + ballSpeedY;
        const valueX = ballDirections.left ? x - ballSpeedX : x + ballSpeedX;
    
        ball.style.top = `${valueY}px`;
        ball.style.left = `${valueX}px`;
    
        window.requestAnimationFrame(ballLoop);
    }
    
    ballLoop();
})
