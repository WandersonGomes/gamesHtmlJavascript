
//GAME STATE
const state = {
    current : 0,
    getReady : 0,
    game : 1,
    over : 2
}

//BUTTON START GAME
const startBtn = {
    x : 120,
    y : 263,
    w : 83,
    h : 29
}

//CONTROL THE GAME
cvs.addEventListener("click", function(event) {
    switch(state.current) {
        case state.getReady:
            state.current = state.game;
            SWOOSHING.play();
            break;
        case state.game:
            bird.flap();
            FLAP.play();
            break;
        case state.over:
            let rect = cvs.getBoundingClientRect();

            let clickX = event.clientX - rect.left;
            let clickY = event.clientY - rect.top;

            if ( clickX >= startBtn.x && clickX <= startBtn.x + startBtn.w && clickY >= startBtn.y && clickY <= startBtn.y + startBtn.h) {
                bird.speedReset();
                pipes.reset();
                score.reset();
                state.current = state.getReady;
            }

            break;
    }
});