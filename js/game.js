let canvas;
let world;
let keyboard = new Keyboard();
let currentState;

function startGame(){
    world.gameStarts = false;
    document.getElementById('start-game').classList.add('d-none')
}

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    pressMobileButtons();
}

function restartGame(){
    location.reload(); 
}

function mutePage(){
    if (world.gameMuted) {
        currentState = false;
        document.getElementById('mute-page').src = "img/10_other/volume.png";
    }else{
        currentState = true;
        document.getElementById('mute-page').src = "img/10_other/mute.png";
    }
    world.endboss_hurt_sound.muted = currentState;
    world.collect_coin_sound.muted = currentState;
    world.collect_bottle_sound.muted = currentState;
    world.game_over_sound.muted = currentState;
    world.game_win_sound.muted = currentState;
    world.character.walking_sound.muted = currentState;
    world.character.character_hurt_sound.muted = currentState;
    world.character.jumping_sound.muted = currentState;
    world.gameMuted = currentState;
}

function changeToFullscreen(){
    canvas.requestFullscreen();
}

function pressMobileButtons(){
    document.getElementById('arrow-left').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('arrow-left').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('arrow-right').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('arrow-right').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById('arrow-up').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('arrow-up').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
    document.getElementById('throw-bottle').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    document.getElementById('throw-bottle').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });

}

//wenn Taste gedrückt wird --> Variable auf Right geändert
window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    };
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    };
    if (e.keyCode == 38) {
        keyboard.UP = true;
    };
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    };
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    };
    if (e.keyCode == 68) {
        keyboard.D = true;
    };
});

window.addEventListener('keyup', (e) => {
    if (e.keyCode== 39) {
        keyboard.RIGHT = false;
    };
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    };
    if (e.keyCode == 38) {
        keyboard.UP = false;
    };
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    };
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    };
    if (e.keyCode == 68) {
        keyboard.D = false;
    };
})