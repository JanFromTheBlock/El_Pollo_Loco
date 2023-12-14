let canvas;
let world;
let keyboard = new Keyboard();
let currentState;

/**
 * This function sets the canvas, the world and mobile buttons
 * 
 */
function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    pressMobileButtons();
}

/**
 * This function is used to start all the game animations and hides the start-screen
 * 
 */
function startGame(){
    world.gameStarts = false;
    document.getElementById('start-game').classList.add('d-none');
    document.getElementById('how-to-play-button').classList.add('d-none');
    document.getElementById('full-screen').classList.remove('d-none');
}

/**
 * this function restarts the game after ending a game
 * 
 */
function restartGame(){
    location.reload(); 
}

/**
 * this function is used to switch between muted and unmuted playing
 * 
 */
function mutePage(){
    if (world.gameMuted) {
        currentState = false;
        document.getElementById('mute-page').src = "img/10_other/volume.png";
    }else{
        currentState = true;
        document.getElementById('mute-page').src = "img/10_other/mute.png";
    }
   switchTheAudabilityOfAllSounds(currentState)
}

/**
 * This function gives all sounds the current audio settings 
 * 
 * @param {*} currentState - This is the current audio setting and switches between true(muted) and false(unmuted)
 */
function switchTheAudabilityOfAllSounds(currentState){
    world.endboss_hurt_sound.muted = currentState;
    world.collect_coin_sound.muted = currentState;
    world.collect_bottle_sound.muted = currentState;
    world.game_over_sound.muted = currentState;
    world.game_win_sound.muted = currentState;
    world.character.walking_sound.muted = currentState;
    world.character.character_hurt_sound.muted = currentState;
    world.character.jumping_sound.muted = currentState;
    world.endboss_died_sound.muted = currentState;
    world.character.character_died_sound.muted = currentState;
    world.gameMuted = currentState;
}

/**
 * This function shows a new window with game explanations 
 * 
 */
function openHowToPlay(){
    document.getElementById('how-to-play').classList.remove('d-none')
}

/**
 * This function closes the window with the game explanations
 * 
 */
function closeHowToPlay(){
    document.getElementById('how-to-play').classList.add('d-none')
}

/**
 * This function opens the canvas in fullscreen
 * 
 */
function changeToFullscreen(){
    canvas.requestFullscreen();
}

/**
 * This function gives mobile buttons the value of keys, to play the game without a keyboard.
 * 
 */
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
    document.getElementById('space').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('space').addEventListener('touchend', (e) => {
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

/**
 * This function converts boleand variables true, by pressing a key
 * 
 */
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

/**
 * This function converts boleand variables false, by releasing a key
 * 
 */
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