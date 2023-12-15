/**
 * class representing the clouds
 * 
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;

    /**
     * creating clouds
     * 
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png')
        this.x = Math.random() * 500;
        this.animate();
    }
    
    /**
     * This function animates the clouds and move them left
     * 
     */
    animate(){
    this.moveLeft();    
    };
}