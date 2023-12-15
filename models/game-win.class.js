/**
 * class representing the animation for winning the game
 * 
 * @extends DrawableObject
 */
class GameWin extends DrawableObject {
    x = 0;
    width = 720;
    height = 480;
    WON_GAME = 'img/9_intro_outro_screens/start/startscreen_2.png'

    /**
     * creating the animation for winning the game
     * 
     */
    constructor(){
        super().loadImage(this.WON_GAME);
        this.y = 480 - this.height;
    }
}