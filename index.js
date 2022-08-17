const canvas = document.querySelector('canvas');
//grabs 2d superclass
const c = canvas.getContext('2d');

//set height/width to fixed amount
canvas.width = 1280;
canvas.height = 720;

//fillRect(x,y,width,height) ; set to be canvas size
c.fillRect(0, 0, canvas.width, canvas.height);

//use OOP to get actors to interact

const gravity = 0.5;
const startPos = 300;

const background = new Sprite({
    pos: {
        x: 0,
        y: 0,
    },
    imgSrc: './assets/maxresdefault.jpg'
})

const player = new Fighter(
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
        },
        imgSrc: './assets/sol_complete_v2/00157.png', //START HERE FIGURE OUT HOW TO FLIP SPRITES AND ANIMATE
        maxFrame: 5
    }
)


const enemy = new Fighter(
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

decreaseTimer();

function animate() {
    //this refreshes pos
    window.requestAnimationFrame(animate);
    c.fillStyle = 'tan';
    c.fillRect(0, 0, canvas.width, canvas.height);
    //updates on every draw
    background.update();
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

    // end game based on health
    if (player.health<=0 || enemy.health<=0) {
        winner({player, enemy, timerId});
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

