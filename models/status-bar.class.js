/**
 * class representing all the status bars of the game
 * 
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
    x = 20;
    width = 200;
    height = 60;

    /**
     * creating the status bars
     * 
     */
    constructor() {
        super();
    }  

    /**
     * This function shows the matching image of the status bar according to the amount of objects
     * 
     * @param {number} objects - number of objects displayed by the status bar 
     */
    setAmountOfObjects(objects){
        let path = this.IMAGES[objects]
        this.img = this.imageCache[path];
    }
}

