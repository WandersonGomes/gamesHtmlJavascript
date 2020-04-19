//DRAW
function draw() {
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    bg.draw();
    pipes.draw();
    fg.draw();
    bird.draw();
    get_ready.draw();
    game_over.draw();
    score.draw();
}

//UPDATE
function update(){
    bird.update();
    fg.update();
    pipes.update();
}

//LOOP
function loop() {
    update();
    draw();

    frame++;

    requestAnimationFrame(loop);
}

loop();