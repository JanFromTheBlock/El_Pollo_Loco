/**
 * Class reprenting the objects in the back of the game.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;
    /**
     * create a background object
     * 
     * @param {URL} imagePath - path to the image to load
     * @param {number} x - defines the x-coordinate of the image on the canvas 
     */
    constructor(imagePath, x){
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}