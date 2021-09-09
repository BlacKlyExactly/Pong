const keysPressed = {
    w: false,
    s: false,
}

const playerY = playerPallete.style.top;

const switchKeys = (event, value) => keysPressed[event.key] = value;

window.addEventListener("keydown", (e) => switchKeys(e, true));
window.addEventListener("keyup", (e) => switchKeys(e, false));

const movementLoop = () => {
    window.requestAnimationFrame(movementLoop);

    const playerHeight = playerPallete.getBoundingClientRect().height;
    const { y } = playerPallete.getBoundingClientRect();
    const { height } = board.getBoundingClientRect();

    if(
        (!keysPressed.w && !keysPressed.s) ||
        (keysPressed.w && keysPressed.s)
    ) return;

    const value = 
        keysPressed.w && !keysPressed.s ?
        y > 0 ? y - palleteSpeed : y : y < height - playerHeight ? y + palleteSpeed : y;

    playerPallete.style.top = `${value}px`;
}

movementLoop();
