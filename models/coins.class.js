/**
 * class representing a collectable coin
 * 
 * @extends DrawableObject
 */
class Coin extends DrawableObject {
    height = 50;
    width = 50;
    
    /**
     * create a coin
     * 
     */
    constructor() {
        super().loadImage('img/7_statusbars/3_icons/icon_coin.png');
        this.x = 200 + Math.random() * 1500;
        this.y = 150 - Math.random() * 70;
     }
}