//LOAD SPRITE IMAGE
const sprite = new Image();
sprite.src = "img/sprite.png";

//BACKGROUND
const bg = {
    sX : 0,
    sY : 0,
    w : 275,
    h : 226,
    x : 0,
    y : cvs.height - 226,

    draw : function() {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    }
}

//FOREGROUND
const fg = {
    sX : 276,
    sY : 0,
    w : 224,
    h : 112,
    x : 0,
    dx : 2,
    y : cvs.height - 112,

    draw : function() {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    },

    update : function() {
        if (state.current == state.game) {
            this.x = (this.x - this.dx)%(this.w/2);
        }
    }
}

//BIRD
const bird = {
    speed : 0,
    gravity : 0.25,
    jump : 4.6,
    rotation: 0, 

    animation : [
        {sX : 276, sY: 112},
        {sX : 276, sY: 139},
        {sX : 276, sY: 164},
        {sX : 276, sY: 139},
    ],
    
    x: 50,
    y: 150,
    w: 34,
    h: 26,

    radius : 12,

    frame : 0,
    
    draw : function() {
        let bird = this.animation[this.frame];

        ctx.save();

        ctx.translate(this.x, this.y);

        ctx.rotate(this.rotation);

        ctx.drawImage(sprite, bird.sX, bird.sY, this.w, this.h, -this.w/2, -this.h/2, this.w, this.h);
        
        ctx.restore();
    },

    flap : function() {
        this.speed = - this.jump;
    },

    update : function() {
        //IF THE GAME STATE IS GET READY STATE, THE BIRD MUST FLAP SLOWLY
        this.period = state.current == state.getReady ? 10 : 5;

        //WE INCREMENT THE FRAME BY 1, EACH PERIOD
        this.frame += frame%this.period == 0 ? 1 : 0;

        //FRAME GOES FROM 0 TO 4, THEN AGAIN TO 0
        this.frame = this.frame%this.animation.length;
    
        if (state.current == state.getReady) {
            this.y = 150; //RESET POSITION OF THE BIRD AFTER GAME OVER
            this.rotation = 0 * DEGREE;
        } else {
            this.speed += this.gravity;
            this.y += this.speed;

            if (this.y + this.h/2 >= cvs.height-fg.h) {
                this.y = cvs.height - fg.h - this.h/2;
                if (state.current == state.game) {
                    state.current = state.over;
                    DIE.play();
                }
            }

            //IF THE SPEED IS GREATER THAN THE JUMP MEANS THE BIRD IS FALLING DOWN
            if (this.speed >= this.jump) {
                this.rotation = 90 * DEGREE;
                this.frame = 1;
            } else {
                this.rotation = -25 * DEGREE;
            }
        }
    },

    speedReset : function() {
        this.speed = 0;
    }

}

//GET READY
const get_ready = {
    sX : 0,
    sY : 228,
    w : 173,
    h : 152,
    x : cvs.width/2 - 173/2,
    y : 80,

    draw : function() {
        if (state.current == state.getReady) {
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);       
        }
    }
}

//GAME OVER
const game_over = {
    sX : 175,
    sY : 228,
    w : 225,
    h : 202,
    x : cvs.width/2 - 225/2,
    y : 90,

    draw : function() {
        if (state.current == state.over) {
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
    }
}

//MEDAL NORMAL
const medal_normal = {
    sX : 312,
    sY : 112,
    w : 45,
    h : 45,
    x : 72,
    y : 176,

    draw : function() {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    }
}

//MEDAL BRONZE
const medal_bronze = {
    sX : 360,
    sY : 158,
    w : 45,
    h : 45,
    x : 72,
    y : 176,

    draw : function() {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    }
}

//MEDAL SILVER
const medal_silver = {
    sX : 360,
    sY : 112,
    w : 45,
    h : 45,
    x : 72,
    y : 176,

    draw : function() {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    }
}

//MEDAL GOLD
const medal_gold = {
    sX : 312,
    sY : 158,
    w : 45,
    h : 45,
    x : 72,
    y : 176,

    draw : function() {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    }
}

//SCORE
const score = {
    best : parseInt(localStorage.getItem("best")) || 0,
    value : 0,
 
    draw : function() {
        ctx.fillStyle = "#FFF";
        ctx.strokeStyle = "#000";

        if (state.current == state.game) {
            ctx.lineWidth = 2;
            ctx.font = "35px Teko";
            ctx.fillText(this.value, cvs.width/2, 50);
            ctx.strokeText(this.value, cvs.width/2, 50);
        } else if (state.current == state.over) {
            //SCORE VALUE
            ctx.font = "25px Teko";   
            ctx.fillText(this.value, 225, 186);
            ctx.strokeText(this.value, 225, 186);
            //BEST SCORE
            ctx.fillText(this.best, 225, 228);
            ctx.strokeText(this.best, 225, 228);
            
            if (this.value < SCORE_MEDAL_NORMAL) {
                medal_normal.draw();
            } else if (this.value < SCORE_MEDAL_BRONZE) {
                medal_bronze.draw();
            } else if (this.value < SCORE_MEDAL_SILVER) {
                medal_silver.draw();
            } else if (this.value > SCORE_MEDAL_GOLD){
                medal_gold.draw();
            }
        }
    },

    reset : function() {
        this.value = 0;
    }
}

//PIPES
const pipes = {
    position : [],

    top : {
        sX : 553,
        sY : 0
    },

    bottom : {
        sX : 502,
        sY : 0
    },

    w : 53,
    h : 400,
    gap : 85,
    maxYPos : -150,

    dx : 2,

    draw : function() {
        for (let i = 0; i < this.position.length; i++) {
            let p = this.position[i];

            let topYPos = p.y;
            let bottomYPos = p.y + this.h + this.gap;

            //top pipe
            ctx.drawImage(sprite, this.top.sX, this.top.sY, this.w, this.h, p.x, topYPos, this.w, this.h);        

            //bottom pipe
            ctx.drawImage(sprite, this.bottom.sX, this.bottom.sY, this.w, this.h, p.x, bottomYPos, this.w, this.h);       
        }
    },

    update : function() {
        if (state.current !== state.game) return;

        if (frame%100 == 0) {
            this.position.push(
            {
                x : cvs.width,
                y : this.maxYPos * (Math.random() + 1)
            });
        }
        for (let i = 0; i < this.position.length; i++) {
            let p = this.position[i];
            
            let bottomPipeYPos = p.y + this.h + this.gap;

             // COLLISION DETECTION
            // TOP PIPE
            if(bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > p.y && bird.y - bird.radius < p.y + this.h){
                state.current = state.over;
                HIT.play();
            }
            // BOTTOM PIPE
            if(bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > bottomPipeYPos && bird.y - bird.radius < bottomPipeYPos + this.h){
                state.current = state.over;
                HIT.play();
            }

            //MOVE THE PIPES TO THE LEFT
            p.x -= this.dx;

            //if the pipes go beyond canvas, we delete them from the array
            if (p.x + this.w <= 0) {
                this.position.shift();
                score.value += 1;
                SCORE_S.play();
                score.best = Math.max(score.value, score.best);
                localStorage.setItem("best", score.best);
            }
        }
    },

    reset : function() {
        this.position = [];
    }
}