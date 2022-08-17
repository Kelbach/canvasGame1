class Sprite {
    constructor({pos, imgSrc, scale=1, maxFrame = 1}) {
        this.pos = pos;
        this.width = 50;
        this.height = 150;
        this.image = new Image();
        this.image.src = imgSrc;
        this.scale = scale; //specify scale when rendering a creating new sprite
        this.maxFrame = maxFrame;
        this.currentFrame = 0;
        this.framesElapsed = 0;
        this.framesHold = 5; //higher number makes a slower framerate
    }

    draw() {
        c.drawImage(
            this.image, 
            /*                                  2:12:00 for cropping sprites from a single image
            *
            * crop x  - current Frame * (image.width / number of frames horiz)
            * crop y  - current Frame * (image.height / number of frames vert)
            * image.width / number of frames horiz
            * image.height / number of frames vert
            * REMEMBER to add these divisors to the width and height*scale below
            */
            this.pos.x, 
            this.pos.y, 
            this.image.width*this.scale, // divided by maxFrame
            this.image.height*this.scale // divided by maxFrame
        )
    }

    update() {
        this.draw();
        this.framesElapsed++
        
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.currentFrame < this.maxFrame){
                this.currentFrame++
            } else {
                this.currentFrame = 0
            }
        }
    }
}

class Fighter extends Sprite {
    constructor({
        pos, 
        vel, 
        color, 
        offset,
        imgSrc, 
        scale=1, 
        maxFrame = 1
        }) {
            super({ //calls constructor of parent
                pos,
                imgSrc,
                scale, 
                maxFrame,
            }); 
            this.vel = vel;
            this.width = 50;
            this.height = 150;
            this.lastKey;
            this.attackBox = {
                pos: {
                    x: this.pos.x,
                    y: this.pos.y
                },
                offset,
                width: 100,
                height: 50
            }
            this.color = color;
            this.isAttacking;
            this.health = 100;
            this.currentFrame = 0;
            this.framesElapsed = 0;
            this.framesHold = 5;
    }

    update() {
        this.draw();

        if (enemy.pos.x + enemy.width <= player.pos.x) {
            player.attackBox.offset.x = 50;
            enemy.attackBox.offset.x = 0;
        } else {
            player.attackBox.offset.x = 0;
            enemy.attackBox.offset.x = 50;
        }

        this.attackBox.pos.x = this.pos.x - this.attackBox.offset.x;
        this.attackBox.pos.y = this.pos.y;
        
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y; //gravity sorta

        if (this.pos.y + this.height + this.vel.y >= canvas.height-60) {
            this.vel.y = 0;
        } else {
            this.vel.y += gravity;
        }
    }

    attack() {
        this.isAttacking = true;
        setTimeout(()=>{
            this.isAttacking = false;
        }, 100)
    }
}