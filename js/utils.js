//hitbox detection function
function rectCollision( {rect1, rect2} ) {
    return (
        rect1.attackBox.pos.x + rect1.attackBox.width >= rect2.pos.x &&
        rect1.attackBox.pos.x <= rect2.pos.x + rect2.width &&
        rect1.attackBox.pos.y + rect1.attackBox.height >= rect2.pos.y &&
        rect1.attackBox.pos.y <= rect2.pos.y + rect2.height
    )
}

function winner({player, enemy, timerId}) {
    clearTimeout(timerId);
    document.querySelector("#result").style.display = "flex"
    if (player.health === enemy.health) {
        document.querySelector("#result").innerHTML = "Double KO";
    }
    if (player.health > enemy.health) {
        document.querySelector("#result").innerHTML = "Player Wins";
    }
    if (player.health < enemy.health) {
        document.querySelector("#result").innerHTML = "Enemy Wins";
    }
}

//time out wind conditions
let timer = 90;
let timerId;
function decreaseTimer() {
    if(timer>0) {
        timerId = setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector("#timer").innerHTML = timer;
    }

    if (timer === 0){
        winner({player, enemy, timerId});
    }
}