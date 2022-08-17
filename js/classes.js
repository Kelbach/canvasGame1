class Sprite {
    constructor({pos, imgSrc}) {
        this.pos = pos;
        this.width = 50;
        this.height = 150;
        this.image = new Image()
        this.image.src = imgSrc
    }

    draw() {
        c.drawImage(this.image, this.pos.x, this.pos.y)
    }

    update() {
        this.draw();

    }
}

class Fighter {
    constructor({pos, vel, color, offset}) {
        this.pos = pos;
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
    }

    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.pos.x, this.pos.y, 50, this.height);

        //attackbox
        if (this.isAttacking) {
            c.fillStyle = 'red'
            c.fillRect(this.attackBox.pos.x, this.attackBox.pos.y, this.attackBox.width, this.attackBox.height);
        }
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