const botPalleteSpeed = palleteSpeed * 2;

const botLoop = () => {
    const { y, height } = botPallete.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();
    
    if(ballRect.y < y || ballRect.y > y + height){
        const value = y > ballRect.y ? y - botPalleteSpeed - 2 : y + botPalleteSpeed - 2;
        botPallete.style.top = `${value}px`; 
    }

    window.requestAnimationFrame(botLoop);
}

botLoop();