class Coin extends DrawableObject {
    height = 50;
    width = 50;
    
    constructor() {
        super().loadImage('img/7_statusbars/3_icons/icon_coin.png');
        this.x = 200 + Math.random() * 1500;
        this.y = 150 - Math.random() * 70;
     }
}