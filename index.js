const canvas = document.querySelector('canvas');
//grabs 2d superclass
const c = canvas.getContext('2d');

//set height/width to fixed amount
canvas.width = 1024;
canvas.height = 576;

//fillRect(x,y,width,height) ; set to be canvas size
c.fillRect(0, 0, canvas.width, canvas.height);

//use OOP to get actors to interact

const gravity = 0.5;
const startPos = 300;

class Sprite {
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

        if (this.pos.y + this.height + this.vel.y >= canvas.height) {
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

const player = new Sprite(
    {
        pos: {
            x: startPos,
            y: 0
        },
        vel: {
            x: 0,
            y: 0,
        },
        color: 'green',
        offset: {
            x: 0,
            y: 0
        }
    }
)


const enemy = new Sprite(
    {
        pos: {
            x: canvas.width - startPos,
            y: 0
        },
        vel: {
            x: 0,
            y: 0,
        },
        color: 'orange',
        offset: {
            x: 50,
            y: 0
        }
    }
)

//use keybank of controls to determine if pressed
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    s: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    }
}

//double presses caused movement left due to logic in animate
let lastKey

//hitbox detection function
function rectCollision( {rect1, rect2} ) {
    return (
        rect1.attackBox.pos.x + rect1.attackBox.width >= rect2.pos.x &&
        rect1.attackBox.pos.x <= rect2.pos.x + rect2.width &&
        rect1.attackBox.pos.y + rect1.attackBox.height >= rect2.pos.y &&
        rect1.attackBox.pos.y <= rect2.pos.y + rect2.height
    )
}

function animate() {
    //this refreshes pos
    window.requestAnimationFrame(animate);
    c.fillStyle = 'tan';
    c.fillRect(0, 0, canvas.width, canvas.height);
    //updates on every draw
    player.update();
    enemy.update();

    player.vel.x = 0;
    enemy.vel.x = 0;

    //player movement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.vel.x = -5;
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.vel.x = 5;
    } 
    // //crouch
    // else if (keys.s.pressed && player.lastKey === 's') {
    //     player.height = 75;
    //     player.vel.x = 0;
    // }

    //enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.vel.x = -5;
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.vel.x = 5;
    }

    //player hit enemy detection
    if (
        rectCollision({
            rect1: player,
            rect2: enemy
        }) 
        && player.isAttacking
        ) {
        console.log('player hit enemy');
        player.isAttacking = false;
        enemy.health -= 20;
        document.querySelector('#enemyHealth').style.width = enemy.health+'%';
    }

    //enemy hit player detection
    if (
        rectCollision({
            rect1: enemy,
            rect2: player
        }) 
        && enemy.isAttacking
        ) {
        console.log('enemy hit player');
        enemy.isAttacking = false;
        player.health -= 20;
        document.querySelector('#playerHealth').style.width = player.health+'%';
    }
}

animate();

//movement with event listeners
window.addEventListener('keydown', (event) => {
    switch(event.key) {
        //player
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break
        case 'w':
            player.vel.y = -15;
            break
        // case "s":
        //     keys.s.pressed = true;
        //     player.lastKey = "s";
        //     break

        //enemy
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
            break
        case 'ArrowUp':
            enemy.vel.y = -15;
            break
        case ' ':
            player.attack();
            break
        case 'ArrowDown':
            enemy.attack();
            break
    }
})
//stops movment
window.addEventListener('keyup', (event) => {
    switch(event.key) {
        //player
        case 'd':
            keys.d.pressed = false;
            break
        case 'a':
            keys.a.pressed = false;
            break
        // case 's':
        //     keys.s.pressed = false;
        //     player.height = 150;

        //     break

        //enemy
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break
    }
})

