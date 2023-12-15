/**
 * class representing the game over animation
 * 
 * @extends DrawableObject
 */
class GameOver extends DrawableObject {
    x = 0;
    width = 720;
    height = 480;
    LOSE_GAME = 'img/9_intro_outro_screens/game_over/game over!.png'

    /**
     * creating the game over animation
     * 
     */
    constructor(){
        super().loadImage(this.LOSE_GAME);
        this.y = 480 - this.height;
    }
}