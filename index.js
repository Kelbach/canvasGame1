const canvas = document.querySelector('canvas');
//grabs 2d superclass
const c = canvas.getContext('2d');

//set height/width to fixed amount
canvas.width = 1024;
canvas.height = 576;

//fillRect(x,y,width,height) ; set to be canvas size
c.fillRect(0, 0, canvas.width, canvas.height);

//use OOP to get actors to interact

const gravity = 0.2;
const startPos = 300;
class Sprite {
    constructor({position, velocity}) {
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
    }

    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, 50, this.height);
    }

    update() {
        this.draw();
        
        this.position.y += this.velocity.y; //gravity sorta

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
        }
    }
}

const player = new Sprite(
    {
        position: {
            x: startPos,
            y: 0
        },
        velocity: {
            x: 0,
            y: 0,
        }
    }
)


const enemy = new Sprite(
    {
        position: {
            x: canvas.width - startPos,
            y: 0
        },
        velocity: {
            x: 0,
            y: 0,
        }
    }
)


function animate() {
    //this refreshes position
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    //updates on every draw
    player.update();
    enemy.update();
}

animate();